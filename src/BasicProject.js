import React, { Component } from 'react'
import { Message, Menu, Icon, Popup, Button } from 'semantic-ui-react'
import NavBar from './NavBar'
import CardUI from './CardUI'
import PreviewA4Portrait from './PreviewA4Portrait'
import { translate, Trans } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { withCurrentProject } from './withCurrentProject'
import { withCurrentUser } from './withCurrentUser'
import { withApolloFetch } from './withApolloFetch'

class BasicProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleOption: false,
            mode: false,
            previewPage: false,
            saveProject: 'false',
            currentProject: {},
            saveMessage: true,
            navbarCard: {id:0 ,
                    lemma: 'React',
                    lemmaPrevious: 'React',
                    img: 'react.png',
                    sinonimi: 0,
                    imgAlt: [{voice_human: 'react',voice_start: 'react', voice_last: 'react', img: 'react.png'}],
                    lock: 'unlock',
                    codClass: 'Altro',
                    complex: '0',
                },
            // Unsaved Card Variables
            cardStyle: { 'top': '0px', 'width': '100%' },
            posInput: 'bottom',
            sizeInput: 'small',
            styleInput: 'normal',
            formatInput: 'freeInput',
            colorTextInput: '#000000',
            colorBackgroundInput: '#FFFFFF',
            weightInput: 'weightNormalInput',
            decorationInput: 'decorationNormalInput',
            fontStyleInput: 'styleNormalInput',
            imgSize: 'small',
            imgPadding: 'imgpadding1',
            imgType: 0,
            imgStyle: 0,
            priorityOrder: [{text: 'type'},{text: 'color'}],
            borderCard: {
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
            },
            urlRest: window.env.GraphQLServer,
            urlImg: window.env.PathImages,
            // Triger NavBar
            triggerImg: false,
            shiftLeft: false,
            shiftRight: false,
            linkCard: false,
            lockCard: false,
            copyCard: false,
            searchLemma: false,
            addCardAfter: false,
            addCardBefore: false,
            deleteCard: false,
        }
        this.handleMode = this.handleMode.bind(this)

        // Handle Save
        this.triggerSave = this.triggerSave.bind(this)
        this.savedSuccessfully = this.savedSuccessfully.bind(this)

        //  Set focused Card
        this.setNavbarCard = this.setNavbarCard.bind(this)

        // Trigger navbar button
        this.triggerImg = this.triggerImg.bind(this)
        this.shiftLeft = this.shiftLeft.bind(this)
        this.shiftRight = this.shiftRight.bind(this)
        this.linkCard = this.linkCard.bind(this)
        this.lockCard = this.lockCard.bind(this)
        this.copyCard = this.copyCard.bind(this)
        this.searchLemma = this.searchLemma.bind(this)
        this.addCardAfter = this.addCardAfter.bind(this)
        this.addCardBefore = this.addCardBefore.bind(this)
        this.deleteCard = this.deleteCard.bind(this)

        // Preview Modal
        this.openPreviewA4 = this.openPreviewA4.bind(this)
    }

    componentWillMount() {
        if (this.props.project.proj_profile) {
            let data = JSON.parse(this.props.project.proj_profile)
            this.setState({...data})
        }
    }

    componentDidMount() {
        let self = this
        // Setta la mode to view se l'url è quello della view
        if (this.props.match.params.mode === 'view') {
            this.handleMode()
        } else {
            // Blocca il capitolo, TODO: rivedere per eliminare il timeout
            let query = `
            mutation BlockChapter {
                updateCaaChapter(id: ${this.props.match.params.chapterid}, chapt_user_block: ${this.props.user.id}) {
                    id
                }
            }
            `
            this.props.apolloFetch({ query })
            .then((data) => {

            })
            .catch((error) => {
                console.log(error);
            })
        }


        // TODO: Rivedere questa parte per eliminare il timeout
        setTimeout(function() {
            let elem = document.getElementById('navbar')
            let navbarHeight = elem.offsetHeight + 10
            let style = { 'top': navbarHeight + 'px'}
            self.setState({cardStyle: style, SavedCardStyle: style})
        }, 50)
    }

    // HANDLE EDIT-VIEW MODE
    handleMode() {
        let navbar = document.getElementById("navbar-icon")
        if (this.state.mode === false) {
            navbar.classList.add("viewMode")
        } else {
            navbar.classList.remove("viewMode")
        }
        let elem = document.getElementById('navbar')
        let navbarHeight = elem.offsetHeight + 10
        let style = this.state.cardStyle
        style.top = navbarHeight + 'px'
        this.setState({ mode: !this.state.mode, cardStyle: style})
    }

    // TRIGGER SAVE
    triggerSave(value = null) {
        if (value !== null) {
            this.setState({saveProject: value})
        } else {
            this.setState({saveProject: 'true'})
        }
    }

    // SHOW THE SAVED MESSAGE
    savedSuccessfully(toPage = null) {
        this.setState({saveMessage: !this.state.saveMessage, saveProject: 'false'})
        this.sleep(1000).then(() => {
            this.setState({saveMessage: !this.state.saveMessage})
            if (toPage === 'preview') {
                this.openPreviewA4()
            } else if (toPage === 'typo') {
                let size = this.getSizeCard()
                sessionStorage.setItem('cardWidth', size.width)
                sessionStorage.setItem('cardHeight', size.height)
                this.props.history.push('/layout/' + this.props.match.params.projectid + '/' + this.props.match.params.chapterid)
            }
        });
    }

    // SLEEP (is a test instead of classic setTimeout)
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    // Get dimension of cards
    getSizeCard() {
        let numCard = document.getElementsByClassName('cardUI');
        let cardHeight = document.getElementById('card-0').offsetHeight
        let cardWidth = []
        for (let i = 0; i < numCard.length; i++) {
            cardWidth[i] = document.getElementById('card-' + i).offsetWidth
        }
        return {width: cardWidth, height: cardHeight}
    }

    setNavbarCard(card) {
        this.setState({navbarCard: card})
    }

    triggerImg() {
        this.setState({triggerImg: !this.state.triggerImg})
    }

    shiftLeft() {
        this.setState({shiftLeft: !this.state.shiftLeft})
    }

    shiftRight() {
        this.setState({shiftRight: !this.state.shiftRight})
    }

    linkCard() {
        this.setState({linkCard: !this.state.linkCard})
    }

    lockCard() {
        this.setState({lockCard: !this.state.lockCard})
    }

    copyCard() {
        this.setState({copyCard: !this.state.copyCard})
    }

    searchLemma() {
        this.setState({searchLemma: !this.state.searchLemma})
    }

    addCardAfter() {
        this.setState({addCardAfter: !this.state.addCardAfter})
    }

    addCardBefore() {
        this.setState({addCardBefore: !this.state.addCardBefore})
    }

    deleteCard() {
        this.setState({deleteCard: !this.state.deleteCard})
    }

    // PREVIEW MODAL
    openPreviewA4() {
        this.setState({previewPage: !this.state.previewPage})
    }

    render() {
        const { t, i18n } = this.props

        // TODO: Da attivare in fase finale per evitare refresh o chiusura della scheda del browser
        // window.addEventListener("beforeunload", function(event) {
        //     event.returnValue = "Confirm to exit";
        // })

        if (this.state.currentProject.length === 0 ) {
            return (<p>Loading...</p>)
        }

        if (this.state.previewPage) {
            // Prendo e calcolo width e height delle card per passarle alla Preview
            let size = this.getSizeCard()

            return (
                <div>
                    <Menu className='no-print'>
                        <Menu.Item>
                            <Button primary onClick={() => {window.print()}}>Print</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button negative onClick={this.openPreviewA4.bind(this)}>Return to Chapter</Button>
                        </Menu.Item>
                    </Menu>
                    <PreviewA4Portrait cardWidth={size.width} cardHeight={size.height} />
                </div>
            )
        }

        return (
            <div>
                <div className="no-print">
                    <Menu id='navbar' style={{'marginBottom': '10px', 'width': '100%'}}
                        vertical
                        fixed='top'
                    >
                        <Menu.Item className='navbar-button'>
                            <NavBar
                                checkMode={this.handleMode}
                                checked={this.state.mode}
                                save={this.triggerSave}
                                openPreviewA4={this.openPreviewA4}
                            />
                        </Menu.Item>
                        <Menu.Item className='navbar-icon' id='navbar-icon'>
                            <Popup
                                trigger={<Icon name='arrow left' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.shiftLeft()}}/>}
                                content='Merge with left Card'
                            />
                            <Popup
                                trigger={<Icon name='arrow right' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.shiftRight()}}/>}
                                content='Merge with right Card'
                            />
                            <Popup
                                trigger={<Icon name='unlinkify' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.linkCard()}}/>}
                                content='Unlink Card when are linked'
                            />
                            <Icon
                                name='image'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.triggerImg()}}
                                style={{cursor: 'pointer'}}
                            />
                            <Icon name={this.state.navbarCard.lock} bordered inverted
                                color="teal"
                                size='large'
                                onClick={() => {this.lockCard()}}/>
                            <Popup
                                trigger={
                                    <Icon name='clone' bordered inverted color="teal"
                                        size='large'
                                        onClick={() => {this.copyCard()}}/>
                                }
                                content='Copy current Card'
                            />
                            <Icon
                                name='search'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.searchLemma()}}
                                style={{cursor: 'pointer'}}
                            />
                            <Icon
                                name='external share'
                                flipped='horizontally'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.addCardBefore()}}
                                style={{cursor: 'pointer'}}
                            />
                            <Icon
                                name='external share'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.addCardAfter()}}
                                style={{cursor: 'pointer'}}
                            />
                            <Icon
                                name='delete'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.deleteCard()}}
                                style={{cursor: 'pointer'}}
                            />
                            <img src={this.state.urlImg + this.state.navbarCard.img}
                                style={{'verticalAlign': 'middle',
                                        'marginRight': '10px',
                                        'marginLeft': '10px'}}
                                width='35'/>
                            {this.state.navbarCard.lemma}
                        </Menu.Item>
                    </Menu>
                </div>
                <Message
                    positive
                    compact={true}
                    hidden={this.state.saveMessage}
                    style={this.state.cardStyle}
                    icon={'save'}
                    header='Projet Saved'
                />
                <CardUI
                    Style={this.state.cardStyle}
                    setNavbarCard={this.setNavbarCard}
                    saveComplete={this.savedSuccessfully}
                    project={this.state.currentProject}
                    saveToDb={this.state.saveProject}
                    newLine={this.state.newLine}
                    mode={this.state.mode}
                    transparent={this.state.styleInput}
                    sizeInput={this.state.sizeInput}
                    posInput={this.state.posInput}
                    formatInput={this.state.formatInput}
                    weightInput={this.state.weightInput}
                    decorationInput={this.state.decorationInput}
                    fontStyleInput={this.state.fontStyleInput}
                    colorTextInput={this.state.colorTextInput}
                    colorBackgroundInput={this.state.colorBackgroundInput}
                    imgSize={this.state.imgSize}
                    imgPadding={this.state.imgPadding}
                    imgType={this.state.imgType}
                    imgStyle={this.state.imgStyle}
                    borderCard={this.state.borderCard}
                    urlRest={this.state.urlRest}
                    urlImg={this.state.urlImg}
                    priorityOrder={this.state.priorityOrder}

                    triggerImg={this.state.triggerImg}
                    shiftLeft={this.state.shiftLeft}
                    shiftRight={this.state.shiftRight}
                    linkCard={this.state.linkCard}
                    lockCard={this.state.lockCard}
                    copyCard={this.state.copyCard}
                    searchLemma={this.state.searchLemma}
                    addCardAfter={this.state.addCardAfter}
                    addCardBefore={this.state.addCardBefore}
                    deleteCard={this.state.deleteCard}
                />
            </div>
        );
    }
}

export default translate('translations')(withRouter(withApolloFetch(withCurrentProject(withCurrentUser(BasicProject)))))
