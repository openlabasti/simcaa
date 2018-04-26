import React, { Component } from 'react'
import { Segment, Button, Dropdown, Image, Message, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Rnd from 'react-rnd'
import CardLayout from './CardLayout'
import CustomImgsDnDUpload from './CustomImgsDnDUpload'
import { translate, Trans } from 'react-i18next'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { withApolloFetch } from './withApolloFetch'
import { withRouter } from 'react-router-dom'

class LayoutExport extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            savedProject: [],
            profile: {},
            cards: [],
            classSheet: 'A4-portrait',
            imageSize: [{type: 'imgsize', value: 35, text: 'mini'},
                        {type: 'imgsize', value: 80, text: 'tiny'},
                        {type: 'imgsize', value: 150, text: 'small'},
                        {type: 'imgsize', value: 300, text: 'medium'},
                        {type: 'imgsize', value: 450, text: 'large'},
                        {type: 'imgsize', value: 600, text: 'big'},
                        {type: 'imgsize', value: 800, text: 'huge'},
                        {type: 'imgsize', value: 960, text: 'massive'}],
            x: 0,
            y: 0,
            customImgs: [],
            multipleDrag: false,
            listMultipleDragIds: [],
            saveMessage: true,
            finishLoad: false,
            loadingButton: false,
        }
    }

    componentWillMount() {
        let query = `
        query Chapter {
            projects (id: ${this.props.match.params.projectid}) {
                data {
                    id
                    proj_profile
                }
            }
            chapters (id: ${this.props.match.params.chapterid}) {
                data {
                    id
                    chapt_content
                    chapt_typo
                    chapt_layout
                }
            }
        }
        `

        this.props.apolloFetch({ query })
            .then((data) => {
                // Parse del capitolo e del profilo
                let profile = JSON.parse(data.data.projects.data[0].proj_profile)
                let stateCard = JSON.parse(data.data.chapters.data[0].chapt_content)
                let savedTypo = JSON.parse(data.data.chapters.data[0].chapt_typo)

                this.cleanCard(stateCard)

                if (savedTypo === null || savedTypo.length === 0) {
                    // Salvo il width delle card
                    let localCardWidth = JSON.parse('[' + sessionStorage.getItem('cardWidth') + ']')

                    // Setto le righe correttamente in base al foglio
                    let pageWidth = 794 - localCardWidth[0]
                    for (let i = 0; i < stateCard.length; i++) {
                        if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                            pageWidth = pageWidth - localCardWidth[i] - 10
                        } else {
                            if (i === 0) {
                                pageWidth = 794 - localCardWidth[0] - 10
                            } else {
                                pageWidth = 794 - localCardWidth[i] - 10
                            }
                        }
                        if (pageWidth < 0) {
                            for (let j = i; j < stateCard.length; j++) {
                                stateCard[j].row++
                            }
                            pageWidth = 794 - localCardWidth[i]
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
                    let numCardPage = Math.floor(1123/heightY)
                    for (let i = 0; i < stateCard.length; i++) {
                        if (stateCard[i].row % numCardPage === 0 &&
                            stateCard[i].row !== 0 &&
                            stateCard[i].row !== stateCard[i-1].row) {
                            for (let j = i; j < stateCard.length; j++) {
                                stateCard[j].y -= heightY * numCardPage * (stateCard[i-1].page + 1)
                                stateCard[j].page++
                            }
                        }
                    }
                    this.setState({savedProject: data.data.chapters.data[0], cards: stateCard, profile})
                } else {
                    let typoCard = savedTypo.card
                    let typoImg = savedTypo.img
                    this.setState({savedProject: data.data.chapters.data[0], cards: typoCard, customImgs: typoImg, profile})
                }
            })
            .catch((error) => {
                console.log(error)
            })
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
        let localCard = this.state.cards
        for (var i = 0; i < localCard.length; i++) {
            localCard[i].rndWidth = data.value + 28
            localCard[i].rndHeight = data.value + 40 + 28
        }
        this.setState({cards: localCard})
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
                } else if (tmpX + localCard[localListIds[i]].rndWidth > 794) {
                    localCard[localListIds[i]].x = 794 - localCard[localListIds[i]].rndWidth
                } else {
                    localCard[localListIds[i]].x = tmpX
                }
                localCard[localListIds[i]].y = tmpY < (-1123 * localCard[item.id].page) ? -1123 * localCard[item.id].page : tmpY
                localCard[localListIds[i]].lastX = localCard[localListIds[i]].x
                localCard[localListIds[i]].lastY = localCard[localListIds[i]].y
            }
        } else {
            let tmpX = localCard[item.id].lastX + deltaX
            let tmpY = localCard[item.id].lastY + deltaY
            if (tmpX < 0) {
                localCard[item.id].x = 0
            } else if (tmpX + localCard[item.id].rndWidth > 794) {
                localCard[item.id].x = 794 - localCard[item.id].rndWidth
            } else {
                localCard[item.id].x = tmpX
            }
            localCard[item.id].y = tmpY < (-1123 * localCard[item.id].page) ? -1123 * localCard[item.id].page : tmpY
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
        } else if (d.x + localImgs[index].width > 794) {
            localImgs[index].x = 794 - localImgs[index].width
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

    // Handle custom imgs upload
    handler(imgs){
        //handler per ricevere immagini caricate da modale, salvo solo il nome di ciascuna immagine e pos iniziale
        let localImgs = this.state.customImgs
        imgs.map((img, index)=>{
            //costruisco oggetto che rappresenta immagine, nome+(x,y)
            let imgWithPos = {
                name: img.name,
                x: 0,
                y: 0,
                height: 'auto',
                width: 'auto'
            }
            //lo aggiungo ad array nello state
            localImgs.push(imgWithPos)
        })
        // console.log(localImgs);
        this.setState({customImgs: localImgs})
    }

    setMultipleDrag(e) {
        if (e.shiftKey) {
            this.setState({multipleDrag: true})
        } else {
            this.setState({multipleDrag: false})
        }
        if (e.shiftKey && e.ctrlKey) {
            for (let i = 0; i < this.state.listMultipleDragIds.length; i++) {
                document.getElementById('layout-' + this.state.listMultipleDragIds[i]).classList.remove('multipleDrag')
            }
            this.setState({multipleDrag: false, listMultipleDragIds: []})
        }
    }

    checkMultipleDrag(item, e) {
        if (this.state.multipleDrag) {
            let localListIds = this.state.listMultipleDragIds
            let ifInList = localListIds.indexOf(item.id)
            if (ifInList < 0) {
                document.getElementById('layout-' + item.id).classList.add('multipleDrag')
                localListIds.push(item.id)
            } else {
                document.getElementById('layout-' + item.id).classList.remove('multipleDrag')
                localListIds.splice(ifInList, 1)
            }
            this.setState({listMultipleDragIds: localListIds})
        }
    }

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
        let localProject = { "id":  this.props.match.params.chapterid, "chapt_typo": {"card": this.state.cards, "img": this.state.customImgs}}
        localProject.chapt_typo = JSON.stringify(localProject.chapt_typo)
        let url = window.env.RestApiCard
        let self = this
        let data = JSON.stringify(localProject)
        let xhr = new XMLHttpRequest()
        this.setState({loadingButton: true})
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
                self.setState({saveMessage: false, loadingButton: false})
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
                    this.setState({customImgs: []})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // SLEEP (is a test instead of classic setTimeout)
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

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

    render() {
        const { t, i18n } = this.props

        if (this.state.savedProject.length === 0) {
            return (
                <Segment className={this.state.classSheet}>
                    <Loader active inline='centered' size='massive'/>
                </Segment>
            )
        } else {
            let customImgsLayout = this.state.customImgs
            customImgsLayout = customImgsLayout.map((img,index) => {
                // Build Src Path for the images
                let tmpProjectId = this.props.match.params.projectid
                let tmpChapterId = this.props.match.params.chapterid
                let fileName = tmpProjectId + '_' + tmpChapterId + '_' + img.name
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
                        minHeight= '150'
                        minWidth= '100'
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
                                imgSize= {this.state.profile.imgSize}
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
                            <Segment className={this.state.classSheet + ' section-to-print'}>
                                {customImgsLayout}
                                {cardPerPage}
                            </Segment>
                            <br className='no-print' />
                        </div>
                    )
                } else {
                    return(
                        <div key={index}>
                            <Segment className={this.state.classSheet + ' section-to-print'}>
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
                        <Segment>
                            <Button color='blue' onClick={this.resetTypo.bind(this)}>{t("HEAD_BTN_RESET")}</Button>
                            <Button color='blue' onClick={this.resetTypo.bind(this, 'full')}>Full Reset</Button>
                            <Button color='green'
                                disabled={this.state.loadingButton}
                                loading={this.state.loadingButton}
                                onClick={this.saveTypo.bind(this)}
                            >
                                {t("HEAD_BTN_SAVE")}
                            </Button>
                            <Button color='blue' disabled onClick={this.printDocument}>{t("HEAD_BTN_EXPORTPDF")}</Button>
                            <Button color='blue' onClick={() => {window.print()}}>{t("HEAD_BTN_PRINT")}</Button>
                            <Button color='red' as={Link}
                                to={'/basic/edit/' + this.props.match.params.projectid + '/' + this.props.match.params.chapterid}
                            >
                                {t("HEAD_BTN_RETURN")}
                            </Button>
                            <CustomImgsDnDUpload handler={this.handler}/>
                        </Segment>
                        <Segment>
                            <Dropdown placeholder={t("TYPO_FRM_PLACEHOLDER")} selection
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
