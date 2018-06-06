import React, { Component } from 'react'
import { Segment, Button, Dropdown, Image, Message, Loader, Card, Dimmer } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Rnd from 'react-rnd'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { withApolloFetch } from './withApolloFetch'
import CardLayout from './CardLayout'
import CustomImgsDnDUpload from './CustomImgsDnDUpload'
import AddCustomTitle from './AddCustomTitle'
import DeleteCustomTitle from './DeleteCustomTitle'
import AddCustomText from './AddCustomText'


class LayoutExport extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            savedProject: [],
            profile: {},
            layout: {},
            cards: [],
            title: [],
            text: [],
            classSheet: 'PreviewTypoDocument',
            imageSize: [{type: 'imgsize', value: 35, text: 'mini'},
                        {type: 'imgsize', value: 80, text: 'tiny'},
                        {type: 'imgsize', value: 150, text: 'small'},
                        {type: 'imgsize', value: 300, text: 'medium'},
                        {type: 'imgsize', value: 450, text: 'large'},
                        {type: 'imgsize', value: 600, text: 'big'},
                        {type: 'imgsize', value: 800, text: 'huge'},
                        {type: 'imgsize', value: 960, text: 'massive'}],
            customSymbolSize: '',
            customImgs: [],
            multipleDrag: {on: false, key: ''},
            listMultipleDragIds: [],
            saveMessage: true,
            finishLoad: false,
            loadingButton: false,
            hasTypoSaved: false,
        }
    }

    componentWillMount() {
        let query = `
        query Chapter {
            projects (id: ${this.props.match.params.projectid}) {
                data {
                    id
                    proj_profile
                    proj_layout
                }
            }
            chapters (id: ${this.props.match.params.chapterid}) {
                data {
                    id
                    chapt_content
                    chapt_typo
                }
            }
        }
        `

        this.props.apolloFetch({ query })
            .then((data) => {
                // Parse del capitolo e del profilo
                let profile = JSON.parse(data.data.projects.data[0].proj_profile)
                let stateCard = JSON.parse(data.data.chapters.data[0].chapt_content)
                let layout = JSON.parse(data.data.projects.data[0].proj_layout)
                let savedTypo
                try {
                    savedTypo = JSON.parse(data.data.chapters.data[0].chapt_typo)
                }
                catch(e) {
                    savedTypo = null
                }

                // Pulisco dalle card vuote
                this.cleanCard(stateCard)

                // Definisco la nuova dimensione dei simboli
                let newSymbolSize = this.state.customSymbolSize !== '' ? this.state.customSymbolSize : profile.imgSize

                if (savedTypo === null || savedTypo.length === 0) {
                    // Salvo il width delle card
                    let localCardWidth = JSON.parse('[' + sessionStorage.getItem('cardWidth') + ']')

                    // Setto le righe correttamente in base al foglio
                    let pageWidth = layout.width - localCardWidth[0]
                    for (let i = 0; i < stateCard.length; i++) {
                        if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                            pageWidth = pageWidth - localCardWidth[i] - 10
                        } else {
                            if (i === 0) {
                                pageWidth = layout.width - localCardWidth[0] - 10
                            } else {
                                pageWidth = layout.width - localCardWidth[i] - 10
                            }
                        }
                        if (pageWidth < 0) {
                            for (let j = i; j < stateCard.length; j++) {
                                stateCard[j].row++
                            }
                            pageWidth = layout.width - localCardWidth[i]
                        }
                    }

                    // Calcolo la posizione in cui mettere le card
                    let heightY = parseInt(sessionStorage.getItem('cardHeight'))
                    let widthX = 0
                    for (let i = 0; i < stateCard.length; i++) {
                        if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                            widthX += localCardWidth[i-1] + 20
                        } else {
                            widthX = 0
                        }
                        let distance = stateCard[i].row * 10
                        stateCard[i].x = widthX
                        stateCard[i].y = heightY * stateCard[i].row + distance
                        stateCard[i].rndWidth = localCardWidth[i]
                        stateCard[i].rndHeight = heightY
                        stateCard[i].lastX = stateCard[i].x
                        stateCard[i].lastY = stateCard[i].y
                    }

                    // Setto la pagina
                    let numCardPage = Math.floor(layout.height/heightY)
                    for (let i = 0; i < stateCard.length; i++) {
                        if (stateCard[i].row % numCardPage === 0 &&
                            stateCard[i].row !== 0 &&
                            stateCard[i].row !== stateCard[i-1].row) {
                            for (let j = i; j < stateCard.length; j++) {
                                stateCard[j].y = heightY * (stateCard[j].row - stateCard[i].row)
                                stateCard[j].page++
                            }
                        }
                    }
                    this.setState({savedProject: data.data.chapters.data[0], cards: stateCard,
                                    profile, layout, customSymbolSize: newSymbolSize})
                } else {
                    let typoCard = savedTypo.card
                    let typoImg = savedTypo.img
                    let typoTitle = savedTypo.title
                    let typoText = savedTypo.text
                    this.setState({savedProject: data.data.chapters.data[0], cards: typoCard, title: typoTitle, text: typoText,
                                    customImgs: typoImg, profile, layout , customSymbolSize: newSymbolSize, hasTypoSaved: true})
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Distanzia le card se serve
    componentDidUpdate() {
        if (this.state.finishLoad === false) {
            let self = this
            setTimeout(() => {
                let imgDivs = document.getElementsByClassName('image')
                for (let i = 0; i < imgDivs.length; i++) {
                    imgDivs[i].style.setProperty("display", "block", "important")
                    imgDivs[i].style.setProperty("margin", "auto", "important")
                }
                self.setState({finishLoad: true})
            }, 0)
        }
    }

    expandInputAll(globalWidth) {
        let localCard = this.state.cards
        for (var i = 0; i < localCard.length; i++) {
            let inputResize = document.getElementById('textLayout-' + i)
            if (inputResize) {
                inputResize.style.width = '0px'
                if (inputResize.scrollWidth > inputResize.clientWidth) {
                    inputResize.style.width = inputResize.scrollWidth + 20 + 'px'
                    globalWidth[i] = inputResize.scrollWidth + 30
                }
            }
        }
        sessionStorage.setItem('cardWidth', globalWidth)
    }

    // Elimino le card vuote, allineo gli id e aggiungo la pagina
    cleanCard(stateCard) {
        for (let i = 0; i < stateCard.length; i++) {
            if (!stateCard[i].lemma) {
                stateCard.splice(i, 1)
                i--
            }
        }
        for (let i = 0; i < stateCard.length; i++) {
            stateCard[i].id = i
            stateCard[i].page = 0
        }
    }

    // Change all cards size
    onChangeDropdown(event, data) {
        let currentSelectedSize = this.state.imageSize.find(x => x.value === data.value)
        let localCard = this.state.cards
        for (var i = 0; i < localCard.length; i++) {
            localCard[i].rndWidth = data.value + 28
            localCard[i].rndHeight = data.value + 40 + 28
        }
        this.setState({cards: localCard, customSymbolSize: currentSelectedSize.text, finishLoad: false}, () => {
            // Ricalcolo le dimensioni delle card
            let numCard = document.getElementsByClassName('uicardlayout');
            let cardHeight = document.getElementById('layout-0').offsetHeight
            let cardWidth = []
            let inWhile = false

            for (let i = 0; i < numCard.length; i++) {
                let inputResize = document.getElementById('textLayout-' + i)
                if (inputResize) {
                    // TODO: RIVEDERE PER IL CALCOLO DELLO SPAZIO --- NOT WORKING (NON ENTRA NELLA IF)
                    // if (inputResize.scrollWidth > inputResize.clientWidth) {
                    //     document.getElementsByClassName('typoCard-' + i)[0].style.width = 'auto'
                    // }
                    cardWidth[i] = document.getElementById('layout-' + i).offsetWidth
                }
            }

            sessionStorage.setItem('cardWidth', cardWidth)
            sessionStorage.setItem('cardHeight', cardHeight)
            this.expandInputAll(cardWidth)
            this.componentWillMount()
        })
    }

    // DnD of cards
    drag(item, e, d) {
        let localCard = this.state.cards
        let localListIds = this.state.listMultipleDragIds
        let deltaX = d.x - item.lastX
        let deltaY = d.y - item.lastY
        if (localListIds.indexOf(item.id) > -1) {
            for (let i = 0; i < localListIds.length; i++) {
                let tmpX = localCard[localListIds[i]].lastX + deltaX
                let tmpY = localCard[localListIds[i]].lastY + deltaY
                if (tmpX < 0) {
                    localCard[localListIds[i]].x = 0
                } else if (tmpX + localCard[localListIds[i]].rndWidth > this.state.layout.width) {
                    localCard[localListIds[i]].x = this.state.layout.width - localCard[localListIds[i]].rndWidth
                } else {
                    localCard[localListIds[i]].x = tmpX
                }
                localCard[localListIds[i]].y = tmpY < (-this.state.layout.height * localCard[item.id].page) ? -this.state.layout.height * localCard[item.id].page : tmpY
                localCard[localListIds[i]].lastX = localCard[localListIds[i]].x
                localCard[localListIds[i]].lastY = localCard[localListIds[i]].y
            }
        } else {
            let tmpX = localCard[item.id].lastX + deltaX
            let tmpY = localCard[item.id].lastY + deltaY
            if (tmpX < 0) {
                localCard[item.id].x = 0
            } else if (tmpX + localCard[item.id].rndWidth > this.state.layout.width) {
                localCard[item.id].x = this.state.layout.width - localCard[item.id].rndWidth
            } else {
                localCard[item.id].x = tmpX
            }
            localCard[item.id].y = tmpY < (-this.state.layout.height * localCard[item.id].page) ? -this.state.layout.height * localCard[item.id].page : tmpY
            localCard[item.id].lastX = localCard[item.id].x
            localCard[item.id].lastY = localCard[item.id].y
        }
        this.setState({cards: localCard})
    }

    // Resize of cards
    resize(item, e, direction, ref, delta, position, event) {
        let img = document.getElementById('layout-' + item.id).getElementsByClassName('image')
        img[0].classList.add('imgFullWidth')
        let localCard = this.state.cards
        localCard[item.id].rndWidth = ref.offsetWidth
        localCard[item.id].rndHeight = ref.offsetHeight
        this.setState({cards: localCard})
    }

    // DnD of custom imgs
    dragImg(item, index, e, d){
        let localImgs = this.state.customImgs
        if (localImgs[index].height === 'auto' || localImgs[index].width === 'auto') {
            localImgs[index].height = document.getElementById('dndImg-' + index).height
            localImgs[index].width = document.getElementById('dndImg-' + index).width
        }
        if (d.x < 0) {
            localImgs[index].x = 0
        } else if (d.x + localImgs[index].width > this.state.layout.width) {
            localImgs[index].x = this.state.layout.width - localImgs[index].width
        } else {
            localImgs[index].x = d.x
        }
        localImgs[index].y = d.y < 0 ? 0 : d.y
        this.setState({customImgs: localImgs})
    }

    // Resize of the custom imgs
    resizeImg(item, index, e, direction, ref, dimensions, position){
        let localImgs = this.state.customImgs
        localImgs[index].height = document.getElementById('dndImg-' + index).height
        localImgs[index].width = document.getElementById('dndImg-' + index).width
        this.setState({customImgs: localImgs})
    }

    // DnD of custom titles
    dragTitle(item, index, e, d){
        let localTitle = this.state.title
        let width = document.getElementById('title-' + index).offsetWidth
        if (d.x < 0) {
            localTitle[index].x = 0
        } else if (d.x + width > this.state.layout.width) {
            localTitle[index].x = this.state.layout.width - width
        } else {
            localTitle[index].x = d.x
        }
        localTitle[index].y = d.y < 0 ? 0 : d.y
        this.setState({title: localTitle})
    }

    // TODO: RIVEDERE
    // Resize of the custom Title
    resizeTitle(item, index, e, direction, ref, dimensions, position){
        let localTitle = this.state.title
        for (var i = 0; i < item.card.length; i++) {
            localTitle[index].card[i].height += dimensions.height
            localTitle[index].card[i].width += dimensions.width
        }
        this.setState({title: localTitle})
    }

    // DnD of custom text
    dragText(item, index, e, d){
        let localText = this.state.text
        let width = document.getElementById('customText-' + index).offsetWidth
        if (d.x < 0) {
            localText[index].x = 0
        } else if (d.x + width > this.state.layout.width) {
            localText[index].x = this.state.layout.width - width
        } else {
            localText[index].x = d.x
        }
        localText[index].y = d.y < 0 ? 0 : d.y
        this.setState({text: localText})
    }

    // Resize of the custom text
    resizeText(item, index, e, direction, ref, dimensions, position){
        let localText = this.state.text
        localText[index].height = document.getElementById('customText-' + index).height
        localText[index].width = document.getElementById('customText-' + index).width
        this.setState({text: localText})
    }

    // Handle custom imgs upload
    handler(imgs){
        //handler per ricevere immagini caricate da modale, salvo solo il nome di ciascuna immagine e pos iniziale
        let localImgs = this.state.customImgs
        for (let i = 0; i < imgs.length; i++) {
            let imgWithPos = {
                name: imgs[i].name,
                x: 0,
                y: 0,
                height: 'auto',
                width: 'auto',
                old: imgs[i].old
            }
            localImgs.push(imgWithPos)
        }

        this.setState({customImgs: localImgs})
    }

    // Multiple Drag Set
    setMultipleDrag(e) {
        if (e.shiftKey) {
            this.setState({multipleDrag: {on: true, key: 'shift'}})
        } else if (e.ctrlKey) {
            this.setState({multipleDrag: {on: true, key: 'ctrl'}})
        } else {
            this.setState({multipleDrag: {on: false, key: ''}})
        }
        if (e.shiftKey && e.ctrlKey) {
            for (let i = 0; i < this.state.listMultipleDragIds.length; i++) {
                document.getElementById('layout-' + this.state.listMultipleDragIds[i]).classList.remove('multipleDrag')
            }
            this.setState({multipleDrag: {on: false, key: ''}, listMultipleDragIds: []})
        }
    }

    // Controlla se una o più card sono selezionate per il multiple drag
    checkMultipleDrag(item, e) {
        if (this.state.multipleDrag.on === true) {
            let localListIds = this.state.listMultipleDragIds
            let ifInList = localListIds.indexOf(item.id)
            if (ifInList < 0) {
                if (this.state.multipleDrag.key === 'shift' && localListIds.length === 1) {
                    let minMaxId = [localListIds[0], item.id]
                    for (let i = Math.min(...minMaxId); i <= Math.max(...minMaxId); i++) {
                        localListIds.push(i)
                        document.getElementById('layout-' + i).classList.add('multipleDrag')
                    }
                } else {
                    document.getElementById('layout-' + item.id).classList.add('multipleDrag')
                    localListIds.push(item.id)
                }
            } else {
                document.getElementById('layout-' + item.id).classList.remove('multipleDrag')
                localListIds.splice(ifInList, 1)
            }
            // Rimuovo i duplicati degli id se serve
            localListIds = Array.from(new Set(localListIds))
            this.setState({listMultipleDragIds: localListIds})
        }
    }

    // Save to PDF, NON FUNZIONANTE TODO: DA RIVEDERE
    printDocument() {
      const input = document.getElementById('printable-div');
      html2canvas(document.body, {allowTaint: true, useCORS: true, proxy:'127.0.0.1'})
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'png', 0, 0);
            // pdf.output('dataurlnewwindow');
            // pdf.save("download.pdf");
        })
    }

    // Save the current Typo configuration
    saveTypo() {
        let localProject = { "id":  this.props.match.params.chapterid,
                                "chapt_typo": {'card': this.state.cards, 'img': this.state.customImgs,
                                                'title': this.state.title, 'text': this.state.text}}
        localProject.chapt_typo = JSON.stringify(localProject.chapt_typo)
        let url = window.env.RestApiCard
        let self = this
        let data = JSON.stringify(localProject)
        let xhr = new XMLHttpRequest()
        this.setState({loadingButton: true})
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
                self.setState({saveMessage: false, loadingButton: false, hasTypoSaved: true})
                self.sleep(1000).then(() => {
                    self.setState({saveMessage: true})
                });

            }
          }
        })
        xhr.open("POST", url)
        xhr.setRequestHeader("content-type", "application/json")
        xhr.send(data)
    }

    // Reset the layout to null
    resetTypo(mode = null, e) {
        let self = this
        let query = `
        mutation resetTypo {
            updateCaaChapter (id: ${this.props.match.params.chapterid}, chapt_typo: "null") {
                id
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                self.componentWillMount()
                let imgDivs = document.getElementsByClassName('imgFullWidth')
                for (let i = 0; i < imgDivs.length; i++) {
                    imgDivs[i].classList.remove("imgFullWidth")
                }
                if (mode === 'full') {
                    this.setState({customImgs: [], title: [], hasTypoSaved: false})
                } else {
                    this.setState({hasTypoSaved: false})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Add the title to page
    addTitle(title, borderSize, borderType, borderColor) {
        let localTitle = this.state.title
        localTitle.splice(localTitle.length, 0, {card: title, border: borderSize + 'px ' + borderColor + ' ' + borderType, x: 0, y: 0, rndWidth: 'auto', rndHeight: 'auto'})
        this.setState({title: localTitle})
    }

    // Delete selected title
    deleteTitle(title) {
        let localTitle = this.state.title
        let index = localTitle.indexOf(title)
        localTitle.splice(index, 1)
        this.setState({title: localTitle})
    }

    // Add Text to page
    addText(text, size, color, inverted) {
        let localText = this.state.text
        localText.splice(localText.length, 0, {text: text, size: size, color, inverted, x: 0, y: 0})
        this.setState({text: localText})
    }

    // Delete selected text
    deleteText(text) {
        let localText = this.state.text
        let index = localText.indexOf(text)
        localText.splice(index, 1)
        this.setState({text: localText})
    }

    // Delete selected image
    deleteImage(image) {
        let localImage = this.state.customImgs
        let index = localImage.indexOf(image)
        localImage.splice(index, 1)
        this.setState({customImgs: localImage})
    }

    // SLEEP (is a test instead of classic setTimeout)
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

    render() {
        const { t, i18n } = this.props

        // Vede se si è in view mode e setta lo style per nascondere i pulsanti se serve
        let isView = this.props.match.params.mode === 'edit' ? false : true
        let hideButton = {}
        let enableResizing = {}
        if (isView === true) {
            hideButton = {'display': 'none'}
            enableResizing = {
                            bottom: false,
                            bottomLeft: false,
                            bottomRight: false,
                            left: false,
                            right: false,
                            top: false,
                            topLeft: false,
                            topRight: false,
                            }
        } else {
            enableResizing = {
                            bottom: true,
                            bottomLeft: true,
                            bottomRight: true,
                            left: true,
                            right: true,
                            top: true,
                            topLeft: true,
                            topRight: true,
                            }
        }

        if (this.state.savedProject.length === 0) {
            return (
                <Dimmer
                    active={!this.state.finishLoad}
                    page
                >
                    <Loader active inline='centered' size='massive' />
                    <br />
                    <Button color='red' as={Link}
                        to={'/basic/' + this.props.match.params.mode + '/' + this.props.match.params.projectid + '/' + this.props.match.params.chapterid}
                    >
                        {t("HEAD_BTN_RETURN")}
                    </Button>
                </Dimmer>
            )
        } else {
            let customImgsLayout = this.state.customImgs
            customImgsLayout = customImgsLayout.map((img,index) => {
                // Build Src Path for the images
                let tmpProjectId = this.props.match.params.projectid
                let tmpChapterId = this.props.match.params.chapterid
                let fileName
                if (img.old && img.old === true) {
                    fileName = img.name
                } else {
                    fileName = tmpProjectId + '_' + tmpChapterId + '_' + img.name
                }
                let composedSrc = window.env.MediaImage + tmpProjectId + '/' + fileName

                //stampo le immagini custom
                return(
                <Rnd
                    key={index}
                    style={{background: '#ddd'}}
                    z={99}
                    position={{ x: img.x, y: img.y}}
                    size={{ height: img.height, width: img.width}}
                    onDragStop={this.dragImg.bind(this, img, index)}
                    onResize={this.resizeImg.bind(this, img, index)}
                    disableDragging = {isView}
                    enableResizing = {enableResizing}
                >
                    <Image id={'dndImg-' + index} style={{'height': '100%'}} className='imgFullWidth' src={composedSrc}/>
                </Rnd>
                )
            })

            let cardsLayout = this.state.cards
            cardsLayout = cardsLayout.map((item, index) => {
                return (
                    <Rnd
                        key={index}
                        z = {99}
                        position={{ x: item.x, y: item.y }}
                        size={{width: item.rndWidth, height: item.rndHeight}}
                        onDragStop={this.drag.bind(this, item)}
                        onResize={this.resize.bind(this, item)}
                        disableDragging = {isView}
                        enableResizing = {enableResizing}
                        minHeight= '150'
                        minWidth= '100'
                        className={'typoCard-' + index}
                    >
                        <div style={{"width": "100%", "height":"100%"}} onClick={this.checkMultipleDrag.bind(this, item)}>
                            <CardLayout
                                Card={item}
                                isTypo={true}
                                imgFullWidth={false}
                                mode={true}
                                posInput= {this.state.profile.posInput}
                                sizeInput= {this.state.profile.sizeInput}
                                styleInput= {this.state.profile.styleInput}
                                formatInput= {this.state.profile.formatInput}
                                colorTextInput= {this.state.profile.colorTextInput}
                                colorBackgroundInput= {this.state.profile.colorBackgroundInput}
                                weightInput= {this.state.profile.weightInput}
                                decorationInput= {this.state.profile.decorationInput}
                                fontStyleInput= {this.state.profile.fontStyleInput}
                                imgSize= {this.state.customSymbolSize}
                                imgPadding= {this.state.profile.imgPadding}
                                imgType= {this.state.profile.imgType}
                                borderCard= {this.state.profile.borderCard}
                                urlRest= {window.env.GraphQLServer}
                                urlImg= {window.env.PathImages}
                            />
                        </div>
                    </Rnd>
                )
            })

            // render the titles
            let title = this.state.title
            title = title.map((item, index) => {
                // render card for every title
                let titleCard = item.card
                titleCard = titleCard.map((item, index) => {
                    return (
                        <CardLayout
                            key={index}
                            Card={item}
                            isTypo={true}
                            isTitle={true}
                            imgFullWidth={false}
                            mode={true}
                            posInput= {this.state.profile.posInput}
                            sizeInput= {this.state.profile.sizeInput}
                            styleInput= {this.state.profile.styleInput}
                            formatInput= {this.state.profile.formatInput}
                            colorTextInput= {this.state.profile.colorTextInput}
                            colorBackgroundInput= {this.state.profile.colorBackgroundInput}
                            weightInput= {this.state.profile.weightInput}
                            decorationInput= {this.state.profile.decorationInput}
                            fontStyleInput= {this.state.profile.fontStyleInput}
                            imgSize= {this.state.customSymbolSize}
                            imgPadding= {this.state.profile.imgPadding}
                            imgType= {this.state.profile.imgType}
                            urlRest= {window.env.GraphQLServer}
                            urlImg= {window.env.PathImages}
                            Style={{'width': 'auto'}}
                        />
                    )
                })

                // return complete title
                return (
                    <Rnd
                        key={index}
                        z = {99}
                        position={{ x: item.x, y: item.y }}
                        onDragStop={this.dragTitle.bind(this, item, index)}
                        // onResize={this.resizeTitle.bind(this, item, index)}
                        disableDragging = {isView}
                        enableResizing
                        style={{border: item.border, padding: '3px'}}
                    >
                        <Card.Group id={'title-' + index}>
                            {titleCard}
                        </Card.Group>
                    </Rnd>
                )
            })

            // render custom text
            let text = this.state.text
            text = text.map((item, index) => {
                return (
                    <Rnd
                        key={index}
                        z = {99}
                        position={{ x: item.x, y: item.y }}
                        onDragStop={this.dragText.bind(this, item, index)}
                        onResize={this.resizeText.bind(this, item, index)}
                        disableDragging = {isView}
                        enableResizing = {enableResizing}
                        style={{border: item.border, padding: '3px'}}
                    >
                        <Segment id={'customText-' + index} size={item.size}
                            color={item.color} inverted={item.inverted}
                            style={{'height': '100%'}}
                        >
                            {item.text}
                        </Segment>
                    </Rnd>
                )
            })

            // render the divs page
            let segmentPage = []
            for (let i = 0; i <= this.state.cards[this.state.cards.length-1].page; i++) {
                segmentPage.push(this.state.cards[this.state.cards.length-1].page)
            }
            segmentPage = segmentPage.map((item, index) => {
                let cardPerPage = []
                for (let i = 0; i < this.state.cards.length; i++) {
                    if (this.state.cards[i].page === index) {
                        cardPerPage.push(cardsLayout[i])
                    }
                }
                if (index === 0) {
                    return(
                        <div key={index}>
                            <Segment className={this.state.classSheet + ' section-to-print'}
                                style={{'width': this.state.layout.width, 'height': this.state.layout.height}}
                            >
                                {title}
                                {text}
                                {customImgsLayout}
                                {cardPerPage}
                            </Segment>
                            <br className='no-print' />
                        </div>
                    )
                } else {
                    return(
                        <div key={index}>
                            <Segment className={this.state.classSheet + ' section-to-print'}
                                style={{'width': this.state.layout.width, 'height': this.state.layout.height}}
                            >
                                {cardPerPage}
                            </Segment>
                            <br className='no-print' />
                        </div>
                    )
                }
            })

            // Main render return
            return (
                <div onKeyDown={this.setMultipleDrag.bind(this)} onKeyUp={this.setMultipleDrag.bind(this)} tabIndex="0">
                    <Segment.Group className='no-print'>
                        <Segment className='fix-display'>
                            <CustomImgsDnDUpload
                                disabled={isView}
                                style={hideButton}
                                handler={this.handler}
                            />
                            <AddCustomTitle
                                disabled={isView}
                                style={hideButton}
                                addTitle={this.addTitle.bind(this)}
                            />
                            <AddCustomText
                                disabled={isView}
                                style={hideButton}
                                addText={this.addText.bind(this)}
                            />
                            <DeleteCustomTitle
                                disabled={isView}
                                style={hideButton}
                                title={this.state.title}
                                text={this.state.text}
                                image={this.state.customImgs}
                                projectid ={this.props.match.params.projectid}
                                deleteTitle={this.deleteTitle.bind(this)}
                                deleteText={this.deleteText.bind(this)}
                                deleteImage={this.deleteImage.bind(this)}
                            />
                            <Button color='blue'
                                disabled={isView}
                                style={hideButton}
                                onClick={this.resetTypo.bind(this)}>{t("HEAD_BTN_RESET")}</Button>
                            <Button color='blue'
                                disabled={isView}
                                style={hideButton}
                                onClick={this.resetTypo.bind(this, 'full')}>Full Reset</Button>
                            <Button color='green'
                                disabled={this.state.loadingButton}
                                loading={this.state.loadingButton}
                                onClick={this.saveTypo.bind(this)}
                                style={hideButton}
                            >
                                {t("HEAD_BTN_SAVE")}
                            </Button>
                            {
                            // <Button color='blue' disabled onClick={this.printDocument}>{t("HEAD_BTN_EXPORTPDF")}</Button>
                            }
                            <Button color='blue' onClick={() => {window.print()}}>{t("HEAD_BTN_PRINT")}</Button>
                            <Button color='red' as={Link}
                                to={'/basic/' + this.props.match.params.mode + '/' + this.props.match.params.projectid + '/' + this.props.match.params.chapterid}
                            >
                                {t("HEAD_BTN_RETURN")}
                            </Button>
                        </Segment>
                        <Segment style={hideButton} disabled={isView}>
                            <Dropdown placeholder={t("TYPO_FRM_PLACEHOLDER")} selection
                                disabled={this.state.hasTypoSaved}
                                style={{'zIndex': 100}}
                                options={this.state.imageSize}
                                onChange={this.onChangeDropdown.bind(this)}
                            />
                        </Segment>
                    </Segment.Group>
                    <Message
                        positive
                        compact={true}
                        hidden={this.state.saveMessage}
                        icon={'save'}
                        header='Projet Saved'
                    />
                    {segmentPage}
                </div>
            )
        }
    }
}

export default translate('translations')(withApolloFetch(withRouter(LayoutExport)))
