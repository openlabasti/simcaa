import React, { Component } from 'react'
import { Card, Input, Image, Label, Transition, Segment } from 'semantic-ui-react'
import { withApolloFetch } from './withApolloFetch'
import { withRouter } from 'react-router-dom'

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
            chapter: {},
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
        // Controllo se c'è una card fissa
        if (this.checkPropsCard() === true) {
            this.setState({card: this.props.Card})
        }
        else {
            let query = `
                query CurrentChapter {
                    chapters (id: ${this.props.match.params.chapterid}) {
                        data {
                            id
                            caa_project_id
                            chapt_title
                            chapt_content
                            chapt_layout
                            chapt_user_block
                        }
                    }
                }
            `
            this.props.apolloFetch({ query })
                .then((data) => {
                    let chapter = data.data.chapters.data [0]
                    let content = chapter.chapt_content
                    content = content.length === 0 ? '' : JSON.parse(content)
                    if(Object.keys(content).length !== 0 && typeof(content) === 'object') {
                        this.setState({chapter: chapter, card: content})
                    }
                    else {
                        this.setState({chapter: chapter})
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Style !== this.props.Style) {
            for (var i = 0; i < this.state.card.length; i++) {
                this.handleExpandInput(this.state.card[i])
            }
        }

        // TODO: rivedere per creare funzione con stessa codice sopra
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

        // Trigger NavBar button
        if (nextProps.triggerImg !== this.props.triggerImg) {
            this.toggleVisibilityImg()
        }
        if (nextProps.shiftLeft !== this.props.shiftLeft) {
            this.mergeCard(null, 'left')
        }
        if (nextProps.shiftRight !== this.props.shiftRight) {
            this.mergeCard(null, 'right')
        }
        if (nextProps.linkCard !== this.props.linkCard) {
            this.unlinkCard()
        }
        if (nextProps.lockCard !== this.props.lockCard) {
            this.handleBlock()
        }
        if (nextProps.copyCard !== this.props.copyCard) {
            this.copyCard()
        }
        if (nextProps.deleteCard !== this.props.deleteCard) {
            this.deleteCard()
        }
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

    // Cambio il lemma in base alla input
    handleChange(currentCard, input) {
        let localCard = this.state.card
        localCard[currentCard.id].lemma = input.target.value
        this.setState({ card: localCard })
    }

    // Main loop onKeyDown
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

    // handle del blocco della card
    handleBlock(input) {
        let currentCard = this.state.focusedCard
        var localCards = this.state.card
        localCards[currentCard.id].lock === 'lock' ? localCards[currentCard.id].lock = 'unlock' : localCards[currentCard.id].lock = 'lock'
        this.setState({card: localCards})
        this.setFocusedCard(localCards[currentCard.id])
    }

    // handle della dimensione della input
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

    // Chiamata al db per cercare il simbolo associato al lemma
    setImg(array, index, lemma) {
        lemma = lemma.toLowerCase()

        let query = `
        query FatchLemma {
            query_view (voice_master: "${lemma}"){
                data {
                    voice_master
                    voice_human
                    voice_last
                    symbol_sign
                    idclass
                    lexical_expr
                    imgcolor
                    idstyle
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                let newDataSorting = data.data.query_view.data
                let completeOrderedArray = this.prioritySort(newDataSorting, lemma)

                // TODO: Cambiare una volta aggiunto il multilingua
                // Identifica la classe del lemma
                switch (completeOrderedArray[0].idclass) {
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
                array[index].sinonimi = completeOrderedArray.length
                array[index].img = completeOrderedArray[0].symbol_sign
                array[index].imgAlt = []
                array[index].complex = completeOrderedArray[0].lexical_expr
                for (let i=0; i<completeOrderedArray.length; i++) {
                    array[index].imgAlt.splice(i, 0, {voice_human: completeOrderedArray[i].voice_human,
                                                    voice_start: completeOrderedArray[i].voice_master,
                                                    voice_last: completeOrderedArray[i].voice_last,
                                                    img: completeOrderedArray[i].symbol_sign,
                                                    complex: completeOrderedArray[i].lexical_expr
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

    // handle per i verbi composti/complessi
    setComplexVerbs(currentCard) {
        let localCards = this.state.card
        let previousId = currentCard.id - 1
        let self = this
        setTimeout(function() {
            if (previousId > -1 && localCards[previousId].codClass === 'Verbo' && currentCard.codClass === 'Verbo' && localCards[previousId].lock === 'unlock') {
                let complexLemma = localCards[previousId].lemma + ' ' + currentCard.lemma
                let query = `
                query CheckComplex {
                    query_view(voice_master: "${complexLemma}") {
                        data {
                            idheadword
                            voice_master
                        }
                    }
                }
                `
                self.props.apolloFetch({ query })
                    .then((data) => {
                        if (data.data.query_view.data.length > 0) {
                            self.mergeCard(localCards[previousId], 'left', null)
                            self.setFocus(currentCard.id)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }, 100)
    }

    // Ordina in base alla priorità
    prioritySort(newDataSorting, lemma) {
        let count = 0
        for (let item of newDataSorting) {
            if (item.voice_human === lemma) {
                count++
            }
        }
        newDataSorting
            .sort((a, b) => {
                return a.lexical_expr - b.lexical_expr
            })
        let arrayInnerLemma, arrayOuterLemma
        if (count === newDataSorting.length) {
            arrayInnerLemma = newDataSorting
            arrayOuterLemma = []
        } else {
            arrayInnerLemma = newDataSorting.slice(0,count/2)
            arrayOuterLemma = newDataSorting.slice(count/2)
        }
        for (let i = 0; i < arrayInnerLemma.length; i++) {
            arrayInnerLemma[i].tmpOrder = {color: '', type: ''}
            arrayInnerLemma[i].finalOrder = ''
            if (arrayInnerLemma[i].imgcolor === this.props.imgType) {
                arrayInnerLemma[i].tmpOrder.color = '1'
            } else {
                arrayInnerLemma[i].tmpOrder.color = '0'
            }
            if (arrayInnerLemma[i].idstyle === this.props.imgStyle) {
                arrayInnerLemma[i].tmpOrder.type = '1'
            } else {
                arrayInnerLemma[i].tmpOrder.type = '0'
            }
            for (let j = 0; j < this.props.priorityOrder.length; j++) {
                arrayInnerLemma[i].finalOrder += arrayInnerLemma[i].tmpOrder[this.props.priorityOrder[j].text]
            }
        }
        arrayInnerLemma
            .sort((a, b) => {
                return parseInt(b.finalOrder) - parseInt(a.finalOrder)
            })
        for (let i = 0; i < arrayInnerLemma.length; i++) {
            delete arrayInnerLemma[i].tmpOrder
            delete arrayInnerLemma[i].finalOrder
        }
        let finalArray = arrayInnerLemma.concat(arrayOuterLemma)
        return finalArray
    }

    // riordina gli ID nell'array delle card
    reorderIds(cards) {
        for (let i=0; i< cards.length; i++) {
            cards[i].id = i
        }
    }

    // setta il focus sulla input richiamata
    setFocus(index) {
        var idText = "text-" + index
        setTimeout(function() {
            document.getElementById(idText).focus()
        }, 50)
    }

    // handle del cambio di immagine
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

    // handle della copia della card
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

    // handle del unlink delle card
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

    // handel del merge delle card
    mergeCard(input, direction) {
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

    // handle del delete della card
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

    // toggle della visibilità delle immagini alternative della card
    toggleVisibilityImg() {
        let currentCard = this.state.focusedCard
        if (!this.state.visibleImg) {
            this.setState({ visibleImg: !this.state.visibleImg, imgDiv: currentCard.imgAlt, imgDivId: currentCard.id})
        }
        else {
            this.setState({ visibleImg: !this.state.visibleImg})
        }
    }

    // post al db per salvare il capitolo
    handleSaveProject() {
        let localProject = { "id":  this.props.match.params.chapterid, "chapt_content": ""}
        localProject.chapt_content = JSON.stringify(this.state.card)
        let url = window.env.RestApiCard
        var self = this
        var data = JSON.stringify(localProject)
        var xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
                self.props.saveComplete()
            }
          }
        });
        xhr.open("POST", url)
        xhr.setRequestHeader("content-type", "application/json")
        xhr.send(data)
    }

    // focus della card nella navbar
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

export default withRouter(withApolloFetch(CardUI))
