import React, { Component } from 'react'
import { Segment, Loader } from 'semantic-ui-react'
import Rnd from 'react-rnd'
import CardLayout from './CardLayout'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import { withRouter } from 'react-router-dom'

class PreviewA4Portrait extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savedProject: [],
            profile: {},
            cards: [],
            cardWidth: [],
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
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                // Parse del capitolo e del profilo
                let profile = JSON.parse(data.data.projects.data[0].proj_profile)
                let stateCard = JSON.parse(data.data.chapters.data[0].chapt_content)

                this.cleanCard(stateCard)

                // Salvo il width delle card
                let localCardWidth = this.props.cardWidth

                // Setto le righe correttamente in base al foglio
                let numCardRow = 0
                let pageWidth = 794 - localCardWidth[0]
                for (let i = 0; i < stateCard.length; i++) {
                    if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                        pageWidth = pageWidth - localCardWidth[i]
                    } else {
                        if (i === 0) {
                            pageWidth = 794 - localCardWidth[0]
                        } else {
                            pageWidth = 794 - localCardWidth[i]
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
                let heightY = this.props.cardHeight
                let widthX = -1
                for (let i = 0; i < stateCard.length; i++) {
                    if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                        widthX++
                    } else {
                        widthX = 0
                    }
                    stateCard[i].x = localCardWidth[i] * widthX
                    stateCard[i].y = heightY * stateCard[i].row
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
                this.setState({savedProject: data.data.chapters.data[0], cards: stateCard, profile, cardWidth: localCardWidth})
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

    // componentDidUpdate() {
    //     for (let i = 0; i < this.state.cards.length; i++) {
    //         setTimeout(() => {
    //             let card = document.getElementById('layout-' + i)
    //             card.style.width = this.state.cardWidth[i] + 'px'
    //         }, 0)
    //     }
    // }

    render() {
        const { t, i18n } = this.props

        if (this.state.savedProject.length === 0) {
            return (
                <Segment className={this.state.classSheet}>
                    <Loader active inline='centered' size='massive'/>
                </Segment>
            )
        } else {
            let cardsLayout = this.state.cards
            cardsLayout = cardsLayout.map((item, index) => {
                return (
                    <Rnd
                        key={index}
                        disableDragging
                        enableResizing
                        position={{ x: item.x, y: item.y}}
                        size={{width: this.state.cardWidth[index] - 10, height: this.props.cardHeight}}
                    >
                        <CardLayout
                            Card={item}
                            isTypo={false}
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
                    </Rnd>
                )
            })

            // render the Row
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
                return(
                    <div key={index}>
                        <Segment className={this.state.classSheet + ' section-to-print'}>
                            {cardPerPage}
                        </Segment>
                        <br className={'no-print'} />
                    </div>
                )
            })

            return (
                <div>
                    {segmentPage}
                </div>
            )
        }
    }
}

export default translate('translations')(withApolloFetch(withRouter(PreviewA4Portrait)))
