import React, { Component } from 'react'
import { Segment, Button, Dropdown, Image } from 'semantic-ui-react'
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
            customImgs: []
        }
    }

    componentWillMount() {
        let query = `
        query Chapter {
            chapters (id: ${this.props.match.params.chapterid}) {
                data {
                    id
                    chapt_content
                    chapt_layout
                }
            }
        }
        `

        this.props.apolloFetch({ query })
            .then((data) => {
                let stateCard = JSON.parse(data.data.chapters.data[0].chapt_content)
                let numCardRow = Math.floor(794 / 200)
                let xCard = 200
                let yCard = 0
                let k = 0
                for (let i = 0; i < stateCard.length; i++) {
                    if (!stateCard[i].lemma) {
                        stateCard.splice(i, 1)
                        i--
                    }
                }
                for (let i = 0; i < stateCard.length; i++) {
                    stateCard[i].id = i
                }

                for (let i = 0, j = 0; i < stateCard.length; i++, j++) {
                    if (i % numCardRow === 0 && i > 0) {
                        k++
                        j = 0
                        yCard = 240 * k
                    }
                    stateCard[i].x = xCard * j
                    stateCard[i].y = yCard
                    stateCard[i].rndWidth = 178
                    stateCard[i].rndHeight = 226
                }
                this.setState({savedProject: data.data.chapters.data[0], cards: stateCard})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onChangeDropdown(event, data) {
        let localCard = this.state.cards
        for (var i = 0; i < localCard.length; i++) {
            localCard[i].rndWidth = data.value + 28
            localCard[i].rndHeight = data.value + 40 + 28
        }
        this.setState({cards: localCard})
    }

    drag(item, e, d, event) {
        let localCard = this.state.cards
        localCard[item.id].x = d.x
        localCard[item.id].y = d.y
        this.setState({ cards: localCard })
    }
    dragImg(item, index, e, d){
      let localImgs = this.state.customImgs
      localImgs[index].x = d.x
      localImgs[index].y = d.y
      this.setState({ customImgs: localImgs})
    }
    resize(item, e, direction, ref, delta, position, event) {
        let localCard = this.state.cards
        localCard[item.id].rndWidth = ref.offsetWidth
        localCard[item.id].rndHeight = ref.offsetHeight
        this.setState({cards: localCard})
    }
    resizeImg(item, index, e, direction, ref, dimensions, position){
      console.log(dimensions)
      let localImgs = this.state.customImgs
      localImgs[index].height += dimensions.height
      localImgs[index].width += dimensions.width
      this.setState({customImgs: localImgs})
    }
    handler(imgs){
      //handler per ricevere immagini caricate da modale, salvo solo il nome di ciascuna immagine e pos iniziale
      let localImgs = this.state.customImgs
      imgs.map((img)=>{
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
      this.setState({customImgs: localImgs})
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
    render() {
        const { t, i18n } = this.props
        if (this.state.savedProject.length === 0) {
            return (<p>Loading...</p>)
        } else {
            let borderCard = {
                Aggettivo: {color: '',size: '1',type: ''},
                Articolo: {color: '',size: '1',type: ''},
                Avverbio: {color: '',size: '1',type: ''},
                Congiunzione: {color: '',size: '1',type: ''},
                Interiezione: {color: '',size: '1',type: ''},
                Pronome: {color: '',size: '1',type: ''},
                Preposizione: {color: '',size: '1',type: ''},
                Sostantivo: {color: '',size: '1',type: ''},
                Verbo: {color: '',size: '1',type: ''},
                Altro: {color: '',size: '1',type: ''}
            }
            let customImgsLayout = this.state.customImgs
            customImgsLayout = customImgsLayout.map((img,index) => {
              //stampo le immagini custom
              return(
                <Rnd
                    key={index}
                    style={{background: '#ddd'}}
                    position={{ x: img.x, y: img.y}}
                    size={{ height: img.height, width: img.width}}
                    onDragStop={this.dragImg.bind(this, img, index)}
                    onResize={this.resizeImg.bind(this, img, index)}
                    >
                      <Image src={"http://www.radis-svil.it/simcaa/laravel-imageupload/public/uploads/images/"+img.name}/>
                </Rnd>
              )
            })
            let cardsLayout = this.state.cards
            cardsLayout = cardsLayout.map((item, index) => {
                return (
                    <Rnd
                        key={index}
                        style={{ background: '#ddd' }}
                        bounds="parent"
                        size={{ width: item.rndWidth,
                                height: item.rndHeight }}
                                position={{ x: item.x, y: item.y }}
                        onDragStop={this.drag.bind(this, item)}
                        onResize={this.resize.bind(this, item)}
                        minHeight= '150'
                        minWidth= '100'
                    >
                        <CardLayout
                            Card={item}
                            isTypo={true}
                            imgFullWidth={true}
                            mode={true}
                            posInput= {'bottom'}
                            sizeInput= {'small'}
                            styleInput= {'normal'}
                            formatInput= {'freeInput'}
                            colorTextInput= {'#000000'}
                            colorBackgroundInput= {'#FFFFFF'}
                            weightInput= {'weightNormalInput'}
                            decorationInput= {'decorationNormalInput'}
                            fontStyleInput= {'styleNormalInput'}
                            imgSize= {'small'}
                            imgPadding= {'imgpadding1'}
                            imgType= {'color'}
                            borderCard= {borderCard}
                            urlRest= {window.env.RestApiLemmi}
                            urlImg= {window.env.PathImages}
                        />
                    </Rnd>
                )
            })
            return (
                <div>
                    <Segment.Group className='no-print'>
                        <Segment>
                            <Button color='blue' disabled>{t("HEAD_BTN_RESET")}</Button>
                            <Button color='blue' onClick={this.printDocument}>{t("HEAD_BTN_EXPORTPDF")}</Button>
                            <Button color='blue' onClick={() => {window.print()}}>{t("HEAD_BTN_PRINT")}</Button>
                            <Button color='red' as={Link} to='/'>{t("HEAD_BTN_RETURN")}</Button>
                            <CustomImgsDnDUpload handler={this.handler}/>
                        </Segment>
                        <Segment>
                            <Dropdown placeholder={t("TYPO_FRM_PLACEHOLDER")} selection
                                options={this.state.imageSize}
                                onChange={this.onChangeDropdown.bind(this)}
                            />
                        </Segment>
                    </Segment.Group>
                    <Segment className={this.state.classSheet} id='printable-div'>
                        {customImgsLayout}
                        {cardsLayout}
                    </Segment>
                </div>
            )
        }
    }
}

export default translate('translations')(withApolloFetch(withRouter(LayoutExport)))
