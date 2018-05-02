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
            layout: {},
            cards: [],
            cardWidth: [],
            classSheet: 'PreviewTypoDocument',
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
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                // Parse dei dati
                let profile = JSON.parse(data.data.projects.data[0].proj_profile)
                let stateCard = JSON.parse(data.data.chapters.data[0].chapt_content)
                let layout = JSON.parse(data.data.projects.data[0].proj_layout)

                this.cleanCard(stateCard)

                // Salvo il width delle card
                let localCardWidth = this.props.cardWidth

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
                let heightY = this.props.cardHeight
                let widthX = 0
                for (let i = 0; i < stateCard.length; i++) {
                    if (stateCard[i-1] && stateCard[i].row === stateCard[i-1].row) {
                        widthX += localCardWidth[i-1] + 20
                    } else {
                        widthX = 0
                    }
                    stateCard[i].x = widthX
                    stateCard[i].y = heightY * stateCard[i].row
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
                this.setState({savedProject: data.data.chapters.data[0], cards: stateCard, profile, layout, cardWidth: localCardWidth})
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

    componentDidUpdate() {
        setTimeout(() => {
            let div = document.getElementsByClassName('cardUI')
            for (let i = 0; i < div.length; i++) {
                div[i].style.setProperty("margin", "15px 0px 5px 10px", "important")
            }
        }, 0)
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
            let cardsLayout = this.state.cards
            cardsLayout = cardsLayout.map((item, index) => {
                return (
                    <Rnd
                        key={index}
                        disableDragging
                        enableResizing
                        position={{ x: item.x, y: item.y}}
                        size={{width: this.state.cardWidth[index], height: this.props.cardHeight}}
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
                        <Segment
                            className={this.state.classSheet}
                            style={{'width': this.state.layout.width, 'height': this.state.layout.height}}
                        >
                            {cardPerPage}
                        </Segment>
                        <br className='no-print' />
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
