import React, { Component } from 'react'
import { Card, Input, Image, Label, Transition, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { withApolloFetch } from './withApolloFetch'
import { withApolloFetchNoAuth } from './withApolloFetchNoAuth'
import { withRefreshToken } from './withRefreshToken'
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
                    imgAlt: [{voice_human: 'react',voice_start: 'react', img: 'react.png'}],
                    lock: 'unlock',
                    codClass: 'Altro',
                    complex: '0',
                    row: 0,
                }],
            focusedCard: {id:0 ,
                    lemma: 'React',
                    lemmaPrevious: 'React',
                    img: 'react.png',
                    sinonimi: 0,
                    imgAlt: [{voice_human: 'react',voice_start: 'react', img: 'react.png'}],
                    lock: 'unlock',
                    codClass: 'Altro',
                    complex: '0',
                    row: 0,
                },
            chapter: {},
            borderCard: {},
            imgDiv: [],
            imgDivId: 0,
            visibleImg: false,
            finishLoad: false,
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
                            chapt_user_block
                        }
                    }
                }
            `
            this.props.apolloFetchNoAuth({ query })
                .then((data) => {
                    let chapter = data.data.chapters.data[0]
                    let content = chapter.chapt_content
                    content = content.length === 0 ? '' : JSON.parse(content)
                    if(Object.keys(content).length !== 0 && typeof(content) === 'object') {
                        this.setState({chapter: chapter, card: content, finishLoad: true})
                        this.setExpandAll()
                    }
                    else {
                        this.setState({chapter: chapter, finishLoad: true})
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
            this.mergeCard('left')
        }
        if (nextProps.shiftRight !== this.props.shiftRight) {
            this.mergeCard('right')
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
        if (nextProps.searchLemma !== this.props.searchLemma) {
            this.searchLemma()
        }
        if (nextProps.addCardAfter !== this.props.addCardAfter) {
            this.addCardAfter()
        }
        if (nextProps.addCardBefore !== this.props.addCardBefore) {
            this.addCardBefore()
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
        if ((input.keyCode === 32 && currentCard.lock === 'unlock') || input.keyCode === 13) {
            input.preventDefault()
            if (currentCard.lemma) {
                // Controlla se esiste già una card con lo stesso lemma
                // al fine di evitare di fare la chiamata al db
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
                // Se ci sono spazi nel lemma non fa la ricerca del simbolo
                if (currentCard.lemma.indexOf(' ') >= 0) {
                    found = true
                }
                // Se il lemma non è cambiato non fa la ricerca del simbolo
                if (currentCard.lemma === currentCard.lemmaPrevious) {
                    found = true
                }
                // In caso i controlli precedenti falliscano esegue la chiamata al db
                if (input.target.value !== '' && !found && currentCard.complex === '0') {
                    this.setImg(localCards, index, input.target.value, currentCard.row, true)
                }
                // Shifto tutte le card dopo nella nuova riga in caso di invio
                // in mezzo alla frase
                if (input.keyCode === 13 && localCards[index + 1]) {
                    for (let i = index + 1; i <= localCards[localCards.length - 1].id; i++) {
                        localCards[i].row = localCards[i].row + 1
                    }
                }
                // Crea la nuova card vuota
                if (!localCards[index + 1] || localCards[index + 1].lemma) {
                    let newRow = currentCard.row
                    if (input.keyCode === 13) {
                        newRow++
                    }
                    localCards.splice(index + 1, 0, {id: 0,
                        lemma: '',
                        lemmaPrevious: '',
                        img: 'placeholder.png',
                        sinonimi: 0,
                        imgAlt: [],
                        lock: 'unlock',
                        codClass: 'Altro',
                        complex: '0',
                        row: newRow
                    })
                }
                this.reorderIds(localCards)
                this.setFocus(index + 1)
                this.setFocusedCard(localCards[localCards.length - 1])
            }
        }
        if (input.keyCode === 8 && localCards.length > 1) {
            var start = input.target.selectionStart
            if (start === 0) {
                input.preventDefault()
                // lemma != null and card in first position...SHIFT ROW else DELETE
                if (localCards[index-1] !== undefined &&
                    localCards[index-1].row !== localCards[index].row &&
                    localCards[index].lemma !== '') {
                        for (let i = index; i <= localCards[localCards.length - 1].id; i++) {
                            localCards[i].row = localCards[i].row - 1
                        }
                        this.setFocus(index)
                } else {
                    localCards.splice(index, 1)
                    this.reorderIds(localCards)
                    this.setFocusedCard(localCards[localCards.length - 1])
                    index > 0 ? this.setFocus(index-1) : this.setFocus(index)
                }
            }
        }
        found = false
        this.setState({card: localCards})
        this.setExpandAll()
    }

    // handle del blocco della card, elimina eventuali spazi iniziali e finali dal lemma
    handleBlock(input) {
        let currentCard = this.state.focusedCard
        var localCards = this.state.card
        localCards[currentCard.id].lock === 'lock' ? localCards[currentCard.id].lock = 'unlock' : localCards[currentCard.id].lock = 'lock'
        localCards[currentCard.id].lemma = localCards[currentCard.id].lemma.trim()
        this.setState({card: localCards})
        this.setFocusedCard(localCards[currentCard.id])
    }

    // handle della dimensione della input
    handleExpandInput(currentCard) {
        let textId = 'text-' + currentCard.id
        let inputResize = document.getElementById(textId)
        if (inputResize) {
            inputResize.style.width = '0px'
            if (inputResize.scrollWidth > inputResize.clientWidth) {
                inputResize.style.width = inputResize.scrollWidth + 20 + 'px'
            }
        }
    }

    // Chiamata al db per cercare il simbolo associato al lemma
    setImg(array, index, lemma, row, NoAuth = null) {
        lemma = lemma.toLowerCase()
        let query = `
        query FatchLemma {
            query_view (voice_master: "${lemma}", limit: 100){
                data {
                    voice_master
                    voice_human
                    symbol_sign
                    idclass
                    lexical_expr
                    imgcolor
                    idstyle
                }
            }
            preload_headword(voice_master: "${lemma}") {
                data {
                    id
                    headword
                    lexical_expr
                    idclass
                    symbol_sign
                    imgcolor
                    idstyle
                }
            }
        }
        `
        let catchVar = (error) => {
            array[index].lemma = lemma
            array[index].sinonimi = 0
            array[index].img = 'placeholder.png'
            array[index].row = row
            this.setState({card: array})
        }

        let thenVar = (data) => {
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
            array[index].row = row
            for (let i=0; i<completeOrderedArray.length; i++) {
                array[index].imgAlt.splice(i, 0, {voice_human: completeOrderedArray[i].voice_human,
                                                voice_start: completeOrderedArray[i].voice_master,
                                                img: completeOrderedArray[i].symbol_sign,
                                                complex: completeOrderedArray[i].lexical_expr
                                                })
            }

            // accodo le img della seconda query
            // TODO: vedere meglio con ordinamento
            let imgAltQuery2 = data.data.preload_headword.data
            for (let i = 0; i < imgAltQuery2.length; i++) {
                array[index].imgAlt.splice(i + array[index].imgAlt.length, 0,
                                                {voice_human: imgAltQuery2[i].headword,
                                                voice_start: imgAltQuery2[i].headword,
                                                img: imgAltQuery2[i].symbol_sign,
                                                complex: imgAltQuery2[i].lexical_expr,
                                                custom: true,
                                                })
            }

            this.setState({card: array})
            this.setComplexVerbs(array[index])
            this.props.setNavbarCard(array[index])
            this.setExpandAll()
        }

        if (NoAuth) {
            this.props.apolloFetchNoAuth({ query })
            .then(thenVar)
            .catch(catchVar)
        } else {
            this.props.apolloFetch({ query })
            .then(thenVar)
            .catch(catchVar)
        }
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
                            voice_human
                        }
                    }
                }
                `
                self.props.apolloFetch({ query })
                    .then((data) => {
                        if (data.data.query_view.data.length > 0) {
                            self.mergeCard('left', previousId, data.data.query_view.data[0].voice_human)
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
            arrayInnerLemma = newDataSorting.slice(0,count - 1)
            arrayOuterLemma = newDataSorting.slice(count - 1)
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
        let idText = "text-" + index
        let localCard = this.state.card
        let self = this
        setTimeout(function() {
            if (document.getElementById(idText)) {
                self.setFocusedCard(localCard[index])
                document.getElementById(idText).focus()
            }
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
        this.setFocusedCard(localCards[index])
        this.setState({card: localCards, visibleImg: !this.state.visibleImg})
        this.setExpandAll()
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
                                        lock: 'unlock',
                                        row: localCards[localCards.length-1].row
                                    })
        this.reorderIds(localCards)
        this.setState({card: localCards})
    }

    // handle del unlink delle card
    unlinkCard(input) {
        let currentCard = this.state.focusedCard
        let lockStatus = currentCard.codClass === 'Verbo' ? 'lock' : 'unlock'
        let localCards = this.state.card
        let complexLemmaSplit = currentCard.lemma.split(' ')
        if (complexLemmaSplit.length === 1) {
            return 0
        }
        for (var i = currentCard.id, j = 0; i < currentCard.id + complexLemmaSplit.length; j++, i++) {
            localCards.splice(i + 1, 0, {id: 0,
                                            lemma: complexLemmaSplit[j],
                                            lemmaPrevious: '',
                                            img: 'placeholder.png',
                                            sinonimi: 0,
                                            imgAlt: [],
                                            lock: lockStatus,
                                            codClass: 'Altro',
                                            complex: '0'
                                        })
            if (i !== currentCard.id + complexLemmaSplit.length - 1) {
                this.setImg(localCards, i, complexLemmaSplit[j], currentCard.row, true)
            } else {
                // TODO: momentaneamente fa tutto senza jwt
                this.setImg(localCards, i, complexLemmaSplit[j], currentCard.row, true)
            }
        }
        localCards.splice(currentCard.id,1)
        this.reorderIds(localCards)
        let newFocusId = currentCard.id + complexLemmaSplit.length
        let self = this
        setTimeout(function() {
            localCards[newFocusId] ? self.setFocus(newFocusId) : self.setFocus(newFocusId - 1)
        }, 300)
    }

    // handle del merge delle card
    mergeCard(direction, id = null, lemma = null) {
        let currentCard = this.state.focusedCard
        let localCards = this.state.card
        let self = this
        if (direction === 'right' && localCards[currentCard.id+1]) {
            localCards[currentCard.id+1].lemma = currentCard.lemma + ' ' + localCards[currentCard.id+1].lemma
            localCards[currentCard.id+1].lock = 'lock'
            setTimeout(function() {
                // TODO: verificare se non serve
                // self.handleExpandInput(localCards[currentCard.id+1])
                self.handleExpandInput(localCards[currentCard.id])
            }, 0)
            localCards.splice(currentCard.id, 1)
            this.props.setNavbarCard(localCards[currentCard.id])
        }
        else if (direction === 'left' && localCards[currentCard.id-1]) {
            localCards[currentCard.id-1].lemma += ' ' + currentCard.lemma
            localCards[currentCard.id-1].lock = 'lock'
            setTimeout(function() {
                self.handleExpandInput(localCards[currentCard.id-1])
            }, 0)
            localCards.splice(currentCard.id, 1)
            this.props.setNavbarCard(localCards[currentCard.id-1])
        }
        this.reorderIds(localCards)
        this.setState({card: localCards})
        if (id && lemma) {
            localCards = this.state.card
            this.setImg(localCards, id, lemma, currentCard.row)
        }
        this.setExpandAll()
    }

    // handle del search della card senza la creazione di una nuova
    searchLemma() {
        let array = this.state.card
        let index = this.state.focusedCard.id
        let lemma = this.state.focusedCard.lemma
        let row = this.state.focusedCard.row
        this.setImg(array, index, lemma, row, null)
    }

    // handle della creazione di una card successiva a quella corrente senza la ricerca
    addCardAfter() {
        let localCards = this.state.card
        let index = this.state.focusedCard.id
        localCards.splice(index + 1, 0, {id: 0,
            lemma: '',
            lemmaPrevious: '',
            img: 'placeholder.png',
            sinonimi: 0,
            imgAlt: [],
            lock: 'unlock',
            codClass: 'Altro',
            complex: '0',
            row: this.state.focusedCard.row
        })
        this.reorderIds(localCards)
        this.setExpandAll()
        this.setState({card: localCards})
    }

    // handle della creazione di una card precedente a quella corrente senza la ricerca
    addCardBefore() {
        let localCards = this.state.card
        let index = this.state.focusedCard.id
        localCards.splice(index, 0, {id: 0,
            lemma: '',
            lemmaPrevious: '',
            img: 'placeholder.png',
            sinonimi: 0,
            imgAlt: [],
            lock: 'unlock',
            codClass: 'Altro',
            complex: '0',
            row: this.state.focusedCard.row
        })
        this.reorderIds(localCards)
        this.setExpandAll()
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
                self.props.saveComplete(self.props.saveToDb)
            }
          }
        })
        xhr.open("POST", url)
        xhr.setRequestHeader("content-type", "application/json")
        xhr.send(data)

        // Refresh the token for the current user
        this.props.refreshToken()
    }

    // focus della card nella navbar
    setFocusedCard(currentCard, input) {
        if (document.getElementById('text-' + currentCard.id)) {
            this.setState({focusedCard: currentCard})
            this.props.setNavbarCard(currentCard)
        }
    }

    // Espande tutte le input del capitolo
    setExpandAll() {
        let localCard = this.state.card
        let self = this
        for (let i = 0; i < localCard.length; i++) {
            setTimeout(function() {
                self.handleExpandInput(localCard[i])
            }, 0)
        }
    }

    render() {
        if (this.props.saveToDb !== 'false') {
            this.handleSaveProject()
        }

        // render the Cards Array to display
        var cards = this.state.card
        var inputBorder = this.props.transparent === 'normal' ? false : true
        cards = cards.map((item, index) => {
            let testCustom = item.imgAlt.find(x => x.img === item.img)
            let srcImg = testCustom && testCustom.custom ? window.env.CustomImage + item.img : this.props.urlImg + item.img

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
                            color={item.id === this.state.focusedCard.id ? 'blue' : null}
                        >
                            <Card.Content className={this.props.imgPadding}>
                                <Image src={srcImg} size={this.props.imgSize} />
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
                            color={item.id === this.state.focusedCard.id ? 'blue' : null}
                        >
                            {cardInput}
                            <Card.Content className={this.props.imgPadding}>
                            <Image src={srcImg} size={this.props.imgSize} />
                            </Card.Content>
                        </Card>
                    </div>
                )
            }
        })

        // render the Row
        let cardGroup = []
        for (let i = 0; i <= this.state.card[this.state.card.length-1].row; i++) {
            cardGroup.push(this.state.card[this.state.card.length-1].row)
        }
        cardGroup = cardGroup.map((item, index) => {
            let cardPerRow = []
            for (let i = 0; i < this.state.card.length; i++) {
                if (this.state.card[i].row === index) {
                    cardPerRow.push(cards[i])
                }
            }
            return(
                <Card.Group key={index}>
                    {cardPerRow}
                </Card.Group>
            )
        })

        // render the div for the alternative imgs
        var imagesDiv = this.state.imgDiv
        imagesDiv = imagesDiv.map((item, index) => {
            let srcImg = item.custom ? window.env.CustomImage + item.img : this.props.urlImg + item.img
            return(
                    <Image
                        src={srcImg}
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
        if (this.state.finishLoad === false) {
            return (
                <Dimmer
                    active={!this.state.finishLoad}
                    page
                >
                    <Loader active inline='centered' size='massive' />
                </Dimmer>
            )
        }
        return(
            <div>
                {cardGroup}
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

export default withRouter(withApolloFetchNoAuth(withApolloFetch(withRefreshToken(CardUI))))
