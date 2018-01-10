import React, { Component } from 'react'
import { Segment, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Rnd from 'react-rnd'
import CardLayout from './CardLayout'
import { translate, Trans } from 'react-i18next'

class LayoutExport extends Component {
    constructor(props) {
        super(props)
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
        }
    }

    componentWillMount() {
        let url = window.env.RestApiProject + '0'

        let request = new Request(url,{
            mode: 'cors',
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        })

        fetch(request)
            .then((response) => { return response.json() })
            .then((data) => {
                let stateCard = JSON.parse(data[0].card_array)
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
                this.setState({savedProject: data[0], cards: stateCard})
            })
            // .catch((error) => {
            //     console.log('Cannot retrieve Project Data')
            // })
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

    resize(item, e, direction, ref, delta, position, event) {
        let localCard = this.state.cards
        localCard[item.id].rndWidth = ref.offsetWidth
        localCard[item.id].rndHeight = ref.offsetHeight
        this.setState({cards: localCard})
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
                            <Button color='blue' disabled>{t("HEAD_BTN_EXPORTPDF")}</Button>
                            <Button color='blue' onClick={() => {window.print()}}>{t("HEAD_BTN_PRINT")}</Button>
                            <Button color='red' as={Link} to='/'>{t("HEAD_BTN_RETURN")}</Button>
                        </Segment>
                        <Segment>
                            <Dropdown placeholder={t("TYPO_FRM_PLACEHOLDER")} selection
                                options={this.state.imageSize}
                                onChange={this.onChangeDropdown.bind(this)}
                            />
                        </Segment>
                    </Segment.Group>
                    <Segment className={this.state.classSheet}>
                        {cardsLayout}
                    </Segment>
                </div>
            )
        }
    }
}

export default translate('translations')(LayoutExport)
