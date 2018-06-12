import React, { Component } from 'react'
import { Card, Input, Image } from 'semantic-ui-react'

class CardLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: [{id:0 ,
                    lemma: 'React',
                    lemmaPrevious: 'React',
                    img: 'react.png',
                    sinonimi: 0,
                    imgAlt: [{voice_human: 'react',voice_start: 'react', voice_last: 'react', img: 'react.png'}],
                    lock: 'unlock',
                    codClass: 'Altro',
                    complex: 0,
                }],
            borderCard: {},
        }
    }

    componentDidMount() {
        this.checkPropsColorCard()
        let styleCard = this.props.borderCard ?
        {
            Aggettivo: {border: this.props.borderCard['Aggettivo'].size + 'px ' + this.props.borderCard['Aggettivo'].type + ' ' + this.props.borderCard['Aggettivo'].color},
            Articolo: {border: this.props.borderCard['Articolo'].size + 'px ' + this.props.borderCard['Articolo'].type + ' ' + this.props.borderCard['Articolo'].color},
            Avverbio: {border: this.props.borderCard['Avverbio'].size + 'px ' + this.props.borderCard['Avverbio'].type + ' ' + this.props.borderCard['Avverbio'].color},
            Congiunzione: {border: this.props.borderCard['Congiunzione'].size + 'px ' + this.props.borderCard['Congiunzione'].type + ' ' + this.props.borderCard['Congiunzione'].color},
            Interiezione: {border: this.props.borderCard['Interiezione'].size + 'px ' + this.props.borderCard['Interiezione'].type + ' ' + this.props.borderCard['Interiezione'].color},
            Pronome: {border: this.props.borderCard['Pronome'].size + 'px ' + this.props.borderCard['Pronome'].type + ' ' + this.props.borderCard['Pronome'].color},
            Preposizione: {border: this.props.borderCard['Preposizione'].size + 'px ' + this.props.borderCard['Preposizione'].type + ' ' + this.props.borderCard['Preposizione'].color},
            Sostantivo: {border: this.props.borderCard['Sostantivo'].size + 'px ' + this.props.borderCard['Sostantivo'].type + ' ' + this.props.borderCard['Sostantivo'].color},
            Verbo: {border: this.props.borderCard['Verbo'].size + 'px ' + this.props.borderCard['Verbo'].type + ' ' + this.props.borderCard['Verbo'].color},
            Altro: {border: this.props.borderCard['Altro'].size + 'px ' + this.props.borderCard['Altro'].type + ' ' + this.props.borderCard['Altro'].color}
        } : {}
        this.setState({borderCard: styleCard})
    }

    componentWillMount() {
        if (this.checkPropsCard() === true) {
            this.setState({card: this.props.Card})
        }
    }

    componentDidUpdate() {
        this.checkPropsColorCard()
    }

    // Setto il colore delle input in caso di profilo non base
    checkPropsColorCard() {
        let cardElement = document.getElementById('textLayout-' + this.state.card.id)
        if (cardElement) {
            cardElement.style.setProperty('color', this.props.colorTextInput, 'important')
            cardElement.style.setProperty('background-color', this.props.colorBackgroundInput, 'important')
        }
    }

    checkPropsCard() {
        if (this.props.Card) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        let inputBorder = this.props.transparent === 'normal' ? false : true
        let imgFullWidth = this.props.imgFullWidth ? 'imgFullWidth' : ''

        let srcImg = ''
        if (this.props.Card.custom !== undefined && this.props.Card.custom === true) {
            srcImg = window.env.CustomImage
        } else {
            srcImg = this.props.urlImg
        }

        let styles = {}
        if (this.props.Style && this.props.borderCard) {
            styles = Object.assign({}, this.props.Style, this.state.borderCard[this.state.card.codClass]);
        }
        else if (this.props.Style) {
            let {top, ...other} = this.props.Style
            styles = other
        }
        else if (this.props.borderCard) {
            styles = this.state.borderCard[this.state.card.codClass]
        }

        let cardInput = <Card.Content>
                            <Input
                                size= {this.props.sizeInput}
                                disabled={this.props.mode}
                                transparent={inputBorder}
                                className={this.props.formatInput + ' ' + this.props.weightInput + ' ' + this.props.decorationInput + ' ' + this.props.fontStyleInput + ' colorTextInput colorBackgroundInput'}
                                id = {'textLayout-' + this.state.card.id}
                                value = {this.state.card.lemma}
                            />
                        </Card.Content>

        let cardImage = <Card.Content className={this.props.imgPadding}>
                            <Image
                                src={srcImg + this.state.card.img}
                                className={imgFullWidth}
                                size={this.props.imgSize}
                            />
                        </Card.Content>

        if (this.props.posInput === 'bottom' && this.props.isTypo === true) {
            return(
                <Card
                    id={this.props.isTitle ? null : 'layout-' + this.state.card.id}
                    style={{...styles}}
                    className='uicardlayout'
                    onClick={this.props.onClick}
                >
                    {cardImage}
                    {cardInput}
                </Card>
            )
        }
        else if (this.props.posInput === 'top' && this.props.isTypo === true) {
            return(
                <Card
                    id={this.props.isTitle ? null : 'layout-' + this.state.card.id}
                    style={{...styles}}
                    className="uicardlayout"
                    onClick={this.props.onClick}
                >
                    {cardInput}
                    {cardImage}
                </Card>
            )
        }
        else if (this.props.posInput === 'bottom' && this.props.isTypo === false) {
            return(
                <Card.Group>
                    <div className={this.props.disabledCard}>
                        <Card
                            id={'layout-' + this.state.card.id}
                            style={{...styles}}
                            className='cardUI'
                        >
                            {cardImage}
                            {cardInput}
                        </Card>
                    </div>
                </Card.Group>
            )
        }
        else if (this.props.posInput === 'top' && this.props.isTypo === false) {
            return(
                <Card.Group>
                    <div className={this.props.disabledCard}>
                        <Card
                            id={'layout-' + this.state.card.id}
                            style={{...styles}}
                            className="cardUI"
                        >
                            {cardInput}
                            {cardImage}
                        </Card>
                    </div>
                </Card.Group>
            )
        }
    }
}

export default CardLayout
