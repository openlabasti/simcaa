import React, { Component } from 'react'
import { Card, Input, Image, Label, Transition, Segment } from 'semantic-ui-react'

class CardUI extends Component {
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
                    complex: '0',
                }],
            focusedCard: {id:0 ,
                    lemma: 'React',
                    lemmaPrevious: 'React',
                    img: 'react.png',
                    sinonimi: 0,
                    imgAlt: [{voice_human: 'react',voice_start: 'react', voice_last: 'react', img: 'react.png'}],
                    lock: 'unlock',
                    codClass: 'Altro',
                    complex: '0',
                },
            borderCard: {},
            imgDiv: [],
            imgDivId: 0,
            visibleImg: false,
        }
    }

    componentDidMount() {
        if (this.props.colorTextInput) {
            document.styleSheets[1].cssRules[1].style.setProperty('color', this.props.colorTextInput, 'important')
        }
        if (this.props.colorBackgroundInput) {
            document.styleSheets[1].cssRules[2].style.setProperty('background-color', this.props.colorBackgroundInput, 'important')
        }
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.Style !== this.props.Style) {
            for (var i = 0; i < this.state.card.length; i++) {
                this.handleExpandInput(this.state.card[i])
            }
        }

        // Cambia i bordi in tempo reale
        let styleCard = nextProps.borderCard ?
        {
            Aggettivo: {border: nextProps.borderCard['Aggettivo'].size + 'px ' + nextProps.borderCard['Aggettivo'].type + ' ' + nextProps.borderCard['Aggettivo'].color},
            Articolo: {border: nextProps.borderCard['Articolo'].size + 'px ' + nextProps.borderCard['Articolo'].type + ' ' + nextProps.borderCard['Articolo'].color},
            Avverbio: {border: nextProps.borderCard['Avverbio'].size + 'px ' + nextProps.borderCard['Avverbio'].type + ' ' + nextProps.borderCard['Avverbio'].color},
            Congiunzione: {border: nextProps.borderCard['Congiunzione'].size + 'px ' + nextProps.borderCard['Congiunzione'].type + ' ' + nextProps.borderCard['Congiunzione'].color},
            Interiezione: {border: nextProps.borderCard['Interiezione'].size + 'px ' + nextProps.borderCard['Interiezione'].type + ' ' + nextProps.borderCard['Interiezione'].color},
            Pronome: {border: nextProps.borderCard['Pronome'].size + 'px ' + nextProps.borderCard['Pronome'].type + ' ' + nextProps.borderCard['Pronome'].color},
            Preposizione: {border: nextProps.borderCard['Preposizione'].size + 'px ' + nextProps.borderCard['Preposizione'].type + ' ' + nextProps.borderCard['Preposizione'].color},
            Sostantivo: {border: nextProps.borderCard['Sostantivo'].size + 'px ' + nextProps.borderCard['Sostantivo'].type + ' ' + nextProps.borderCard['Sostantivo'].color},
            Verbo: {border: nextProps.borderCard['Verbo'].size + 'px ' + nextProps.borderCard['Verbo'].type + ' ' + nextProps.borderCard['Verbo'].color},
            Altro: {border: nextProps.borderCard['Altro'].size + 'px ' + nextProps.borderCard['Altro'].type + ' ' + nextProps.borderCard['Altro'].color}
        } :
        this.state.borderCard
        this.setState({borderCard: styleCard})
    }

    componentDidUpdate() {
        if (this.props.colorTextInput) {
            document.styleSheets[1].cssRules[1].style.setProperty('color', this.props.colorTextInput, 'important')
        }
        if (this.props.colorBackgroundInput) {
            document.styleSheets[1].cssRules[2].style.setProperty('background-color', this.props.colorBackgroundInput, 'important')
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

    handleChange(currentCard, input) {
        let localCard = this.state.card
        localCard[currentCard.id].lemma = input.target.value
        this.setState({ card: localCard })
    }

    handleSetCard(currentCard, input) {
        var localCards = this.state.card
        var index = localCards[currentCard.id].id
        var found = false
        if (input.keyCode === 32 && currentCard.lock === 'unlock') {
            input.preventDefault()
            if (currentCard.lemma) {
                for (let i=0; i<localCards.length; i++) {
                    if (localCards[i].lemma === currentCard.lemma && localCards[i].id !== currentCard.id) {
                        currentCard.img = localCards[i].img
                        currentCard.sinonimi = localCards[i].sinonimi
                        currentCard.imgAlt = localCards[i].imgAlt
                        currentCard.lock = localCards[i].lock
                        currentCard.codClass = localCards[i].codClass
                        currentCard.complex = localCards[i].complex
                        found = true
                    }
                }
                if (currentCard.lemma === currentCard.lemmaPrevious) {
                    found = true
                }
                if (input.target.value !== '' && !found && currentCard.complex === '0') {
                    this.setImg(localCards, index, input.target.value)
                }
                if (!localCards[index + 1] || localCards[index + 1].lemma) {
                    localCards.splice(index + 1, 0, {id: 0,
                        lemma: '',
                        lemmaPrevious: '',
                        img: 'placeholder.png',
                        sinonimi: 0,
                        imgAlt: [],
                        lock: 'unlock',
                        codClass: 'Altro',
                        complex: '0',
                    })
                }
                this.reorderIds(localCards)
                this.setFocus(index + 1)
                this.setFocusedCard(localCards[localCards.length - 2])
            }
        }
        if (input.keyCode === 8 && localCards.length > 1) {
            var start = input.target.selectionStart
            if (start === 0) {
                input.preventDefault()
                localCards.splice(index, 1)
                this.reorderIds(localCards)
                this.setFocusedCard(localCards[localCards.length - 1])
                index > 0 ? this.setFocus(index-1) : this.setFocus(index)
            }
        }
        found = false
        this.setState({card: localCards})
    }

    handleBlock(input) {
        let currentCard = this.state.focusedCard
        var localCards = this.state.card
        localCards[currentCard.id].lock === 'lock' ? localCards[currentCard.id].lock = 'unlock' : localCards[currentCard.id].lock = 'lock'
        this.setState({card: localCards})
        this.setFocusedCard(localCards[currentCard.id])
    }

    handleExpandInput(currentCard, input) {
        let textId = 'text-' + currentCard.id
        let cardId = 'card-' + currentCard.id
        let cardResize = document.getElementById(cardId)
        let inputResize = document.getElementById(textId)
        inputResize.style.minWidth = '50px'
        inputResize.style.width = '0';
        cardResize.style.width = 'auto'
        let newWidth = inputResize.scrollWidth + 20;
        if(inputResize.scrollWidth > inputResize.clientWidth){
            newWidth += 20;
            cardResize.style.width = 'auto'
            inputResize.style.width = newWidth + 'px';
        }
    }

    setImg(array, index, lemma) {
        lemma = lemma.toLowerCase()
        let url = this.props.urlRest + this.props.imgType + '/' + lemma
        let myHeaders = new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })

        let request = new Request(url,{
            header: myHeaders,
            mode: 'cors',
            method: 'GET'
        })

        fetch(request)
            .then((response) => { return response.json() })
            .then((data) => {
                switch (data[0].idclass) {
                    case 2:
                        array[index].codClass = 'Aggettivo'
                    break
                    case 3:
                        array[index].codClass = 'Articolo'
                    break
                    case 4:
                        array[index].codClass = 'Avverbio'
                    break
                    case 5:
                        array[index].codClass = 'Congiunzione'
                    break
                    case 10:
                        array[index].codClass = 'Interiezione'
                    break
                    case 14:
                        array[index].codClass = 'Pronome'
                    break
                    case 16:
                        array[index].codClass = 'Preposizione'
                    break
                    case 17:
                        array[index].codClass = 'Sostantivo'
                    break
                    case 20:
                        array[index].codClass = 'Verbo'
                    break
                    case 27:
                        array[index].codClass = 'Altro'
                    break
                    default:
                    break
                }
                array[index].lemmaPrevious = array[index].lemma
                array[index].sinonimi = data.length
                array[index].img = data[0].symbol_sign
                array[index].imgAlt = []
                array[index].complex = data[0].lexical_expr
                for (let i=0; i<data.length; i++) {
                    array[index].imgAlt.splice(i, 0, {voice_human: data[i].voice_human,
                                                    voice_start: data[i].voice_master,
                                                    voice_last: data[i].voice_last,
                                                    img: data[i].symbol_sign,
                                                    complex: data[i].lexical_expr
                                                    })
                }
                this.setState({card: array})
                this.setComplexVerbs(array[index])
                this.props.setNavbarCard(array[index])
            })
            .catch((error) => {
                array[index].lemma = lemma
                array[index].sinonimi = 0
                array[index].img = 'placeholder.png'
                this.setState({card: array})
            })

    }

    setComplexVerbs(currentCard) {
        let localCards = this.state.card
        let previusId = currentCard.id - 1
        let self = this
        setTimeout(function() {
            if (previusId > -1 && localCards[previusId].codClass === 'Verbo' && currentCard.codClass === 'Verbo' && localCards[previusId].lock === 'unlock') {
                let url = self.props.urlRest + self.props.imgType + '/' + localCards[previusId].lemma + ' ' + currentCard.lemma
                let request = new Request(url,{
                    mode: 'cors',
                    method: 'GET'
                })
                fetch(request)
                    .then((response) => { return response.json() })
                    .then((data) => {
                        if (data.length > 0) {
                            self.mergeCard(localCards[previusId], 'right', null)
                            self.setFocus(currentCard.id + 1)
                        }
                    })
            }
        }, 100)
    }

    reorderIds(cards) {
        for (let i=0; i< cards.length; i++) {
            cards[i].id = i
        }
    }

    setFocus(index) {
        var idText = "text-" + index
        setTimeout(function() {
            document.getElementById(idText).focus()
        }, 50)
    }

    setNewImg(currentImg, input) {
        var localCards = this.state.card
        let index = this.state.imgDivId
        localCards[index].img = currentImg.img
        localCards[index].lemma = currentImg.voice_human
        localCards[index].complex = currentImg.complex
        let complexLemmaSplit = localCards[index].lemma.split(' ')
        let cont = 0
        if (localCards[index+complexLemmaSplit.length-1]) {
            for (let i = 1; i < complexLemmaSplit.length; i++) {
                index++
                if (localCards[index].lemma === complexLemmaSplit[i]) {
                    cont++
                }
            }
        }
        if (cont === complexLemmaSplit.length-1) {
            localCards.splice(this.state.imgDivId+1, cont)
        }
        this.reorderIds(localCards)
        this.setState({card: localCards, visibleImg: !this.state.visibleImg})
    }

    copyCard(input) {
        var localCards = this.state.card
        let currentCard = this.state.focusedCard
        localCards.splice(localCards.length, 0, {id: 0,
                                        lemma: currentCard.lemma,
                                        lemmaPrevious: currentCard.lemmaPrevious,
                                        img: currentCard.img,
                                        sinonimi: currentCard.sinonimi,
                                        imgAlt: currentCard.imgAlt,
                                        codClass: currentCard.codClass,
                                        complex: currentCard.complex,
                                        lock: 'unlock'
                                    })
        this.reorderIds(localCards)
        this.setState({card: localCards})
    }

    unlinkCard(input) {
        let currentCard = this.state.focusedCard
        let lockStatus = currentCard.codClass === 'Verbo' ? 'lock' : 'unlock'
        var localCards = this.state.card
        let complexLemmaSplit = currentCard.lemma.split(' ')
        for (var i = currentCard.id, j = 0; i < currentCard.id + complexLemmaSplit.length; j++, i++) {
            localCards.splice(i+1, 0, {id: 0,
                                            lemma: complexLemmaSplit[j],
                                            lemmaPrevious: '',
                                            img: 'placeholder.png',
                                            sinonimi: 0,
                                            imgAlt: [],
                                            lock: lockStatus,
                                            codClass: 'Altro',
                                            complex: '0'
                                        })
            this.setImg(localCards, i, complexLemmaSplit[j])
        }
        localCards.splice(currentCard.id,1)
        this.reorderIds(localCards)
        let newFocusId = currentCard.id + complexLemmaSplit.length
        let self = this
        setTimeout(function() {
            localCards[newFocusId] ? self.setFocus(newFocusId) : self.setFocus(newFocusId - 1)
        }, 300)
    }

    mergeCard(direction, input) {
        let currentCard = this.state.focusedCard
        var localCards = this.state.card
        if (direction === 'right' && localCards[currentCard.id+1]) {
            localCards[currentCard.id+1].lemma = currentCard.lemma + ' ' + localCards[currentCard.id+1].lemma
            localCards.splice(currentCard.id, 1)
        }
        else if (direction === 'left' && localCards[currentCard.id-1]) {
            localCards[currentCard.id-1].lemma += ' ' + currentCard.lemma
            localCards.splice(currentCard.id, 1)
        }
        this.reorderIds(localCards)
        this.setState({card: localCards})
    }

    deleteCard(input) {
        let currentCard = this.state.focusedCard
        var localCards = this.state.card
        var index = localCards[currentCard.id].id
        if (localCards.length > 1) {
            localCards.splice(index, 1)
            this.reorderIds(localCards)
            index > 0 ? this.setFocus(index-1) : this.setFocus(index)
        }
        this.setState({card: localCards})
    }

    toggleVisibilityImg(input) {
        let currentCard = this.state.focusedCard
        if (!this.state.visibleImg) {
            this.setState({ visibleImg: !this.state.visibleImg, imgDiv: currentCard.imgAlt, imgDivId: currentCard.id})
        }
        else {
            this.setState({ visibleImg: !this.state.visibleImg})
        }
    }

    handleSaveProject() {
        let localProject = this.props.project[0]
        localProject.card_array = JSON.stringify(this.state.card)
        let url = this.props.urlProject + localProject.id
        var self = this
        var data = JSON.stringify(localProject);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
                self.props.saveComplete()
            }
          }
        });
        xhr.open("PUT", url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    setFocusedCard(currentCard, input) {
        this.setState({focusedCard: currentCard})
        this.props.setNavbarCard(currentCard)
    }

    render() {
        if (this.props.saveToDb) {
            this.handleSaveProject()
        }
        var cards = this.state.card
        var inputBorder = this.props.transparent === 'normal' ? false : true
        cards = cards.map((item, index) => {

            let styles = {}
            if (this.props.Style && this.props.borderCard) {
                styles = Object.assign({}, this.props.Style, this.state.borderCard[item.codClass]);
            }
            else if (this.props.Style) {
                styles = this.props.Style
            }
            else if (this.props.borderCard) {
                styles = this.state.borderCard[item.codClass]
            }

            // Move this under onKeyDown of Card when fixed
            // onKeyUp={this.handleExpandInput.bind(this, item)}
            let cardInput = <Card.Content>
                        <Input
                            size= {this.props.sizeInput}
                            disabled={this.props.mode}
                            transparent={inputBorder}
                            className={this.props.formatInput + ' ' + this.props.weightInput + ' ' + this.props.decorationInput + ' ' + this.props.fontStyleInput + ' colorTextInput colorBackgroundInput'}
                            id = {'text-' + item.id}
                            value = {item.lemma}
                            onChange = {this.handleChange.bind(this, item)}
                            onKeyDown = {this.handleSetCard.bind(this, item)}
                            onKeyUp={this.handleExpandInput.bind(this, item)}
                        />
                        </Card.Content>
            if (this.props.posInput === 'bottom') {
                return(
                    <div key={'' + item.id + ''} className={this.props.disabledCard}
                        onClick={this.setFocusedCard.bind(this, item)}>
                        <Card
                            id={'card-' + item.id}
                            className="cardUI"
                            style={{...styles}}
                        >
                            <Card.Content className={this.props.imgPadding}>
                                <Image src={this.props.urlImg + item.img} size={this.props.imgSize} />
                            </Card.Content>
                            {cardInput}
                        </Card>
                    </div>
                )
            }
            else if (this.props.posInput === 'top') {
                return(
                    <div key={item.id} className={this.props.disabledCard}
                        onClick={this.setFocusedCard.bind(this, item)}>
                        <Card
                            id={'card-' + item.id}
                            className="cardUI"
                            style={{...styles}}
                        >
                            {cardInput}
                            <Card.Content className={this.props.imgPadding}>
                            <Image src={this.props.urlImg + item.img} size={this.props.imgSize} />
                            </Card.Content>
                        </Card>
                    </div>
                )
            }
        })

        var imagesDiv = this.state.imgDiv
        imagesDiv = imagesDiv.map((item, index) => {
            return(
                    <Image
                        src={this.props.urlImg + item.img}
                        style={{margin: "10px"}}
                        width={'100'}
                        height={'100'}
                        alt="test"
                        key={index}
                        label={item.voice_human}
                        onClick={this.setNewImg.bind(this, item)}
                    />
            )
        })
        return(
            <div>
                <Card.Group>
                    {cards}
                </Card.Group>
                <Transition visible={this.state.visibleImg} animation='slide up' duration={500}>
                    <Segment
                    inverted
                    color="green"
                    className="footer"
                    >
                        <Label attached='top right' color='red'
                            onClick={this.toggleVisibilityImg.bind(this)}
                            style={{cursor: 'pointer'}}>Close</Label>
                        <Image.Group>
                            {imagesDiv}
                        </Image.Group>
                    </Segment>
                </Transition>
            </div>
        )}
}

export default CardUI
