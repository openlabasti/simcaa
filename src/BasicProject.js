import React, { Component } from 'react'
import { Modal, Button, Tab, Message, Menu, Icon, Popup } from 'semantic-ui-react'
import NavBar from './NavBar'
import CardUI from './CardUI'
import { translate, Trans } from 'react-i18next'

import InputOptions from './InputOptions'
import ImageOptions from './ImageOptions'
import CardOptions from './CardOptions'
import ProfileOptions from './ProfileOptions'
import ProjectOptions from './ProjectOptions'

import LanguageSwitcher from './LanguageSwitcher'

class BasicProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardRow: [{row: 0}],
            visibleOption: false,
            mode: false,
            saveProject: false,
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
            imgType: 'color',
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
            urlRest: window.env.RestApiLemmi,
            urlImg: window.env.PathImages,
            // Saved Card Variables
            SavedCardStyle: {},
            SavedPosInput: 'bottom',
            SavedSizeInput: 'small',
            SavedStyleInput: 'normal',
            SavedFormatInput: 'freeInput',
            SavedColorTextInput: '#000000',
            SavedColorBackgroundInput: '#FFFFFF',
            SavedWeightInput: 'weightNormalInput',
            SavedDecorationInput: 'decorationNormalInput',
            SavedFontStyleInput: 'styleNormalInput',
            SavedImgSize: 'small',
            SavedImgPadding: 'imgpadding1',
            SavedImgType: 'color',
            SavedBorderCard: {
                Aggettivo: {class: 'Aggettivo',color: '',size: '1',type: ''},
                Articolo: {class: 'Articolo',color: '',size: '1',type: ''},
                Avverbio: {class: 'Avverbio',color: '',size: '1',type: ''},
                Congiunzione: {class: 'Congiunzione',color: '',size: '1',type: ''},
                Interiezione: {class: 'Interiezione',color: '',size: '1',type: ''},
                Pronome: {class: 'Pronome',color: '',size: '1',type: ''},
                Preposizione: {class: 'Preposizione',color: '',size: '1',type: ''},
                Sostantivo: {class: 'Sostantivo',color: '',size: '1',type: ''},
                Verbo: {class: 'Verbo',color: '',size: '1',type: ''},
                Altro: {class: 'Altro',color: '',size: '1',type: ''}
            },
            SavedUrlRest: window.env.RestApiLemmi,
            SavedUrlImg: window.env.PathImages,
        }
        this.toggleVisibilityOption = this.toggleVisibilityOption.bind(this)
        this.saveOption = this.saveOption.bind(this)
        this.handleMode = this.handleMode.bind(this)

        this.handleChangeOption = this.handleChangeOption.bind(this)
        this.handleChangeColorTextInput = this.handleChangeColorTextInput.bind(this)
        this.handleChangeColorBackgroundInput = this.handleChangeColorBackgroundInput.bind(this)
        this.handleChangeColorBorder = this.handleChangeColorBorder.bind(this)
        this.handleChangeBorder = this.handleChangeBorder.bind(this)
        this.handleChangeUrl = this.handleChangeUrl.bind(this)

        this.triggerSave = this.triggerSave.bind(this)
        this.savedSuccessfully = this.savedSuccessfully.bind(this)

        this.setNavbarCard = this.setNavbarCard.bind(this)
    }

    componentDidMount() {
        // TODO: Rivedere questa parte per eliminare il timeout
        let self = this
        setTimeout(function() {
            let elem = document.getElementById('navbar')
            let navbarHeight = elem.offsetHeight + 10
            let style = { 'top': navbarHeight + 'px'}
            self.setState({cardStyle: style, SavedCardStyle: style})
        }, 50)
    }

    componentWillMount() {
        let url = window.env.RestApiProject + '0'
        let myHeaders = new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })

        let request = new Request(url,{
            header: myHeaders,
            mode: 'cors',
            method: 'GET',
        })

        fetch(request)
            .then((response) => { return response.json() })
            .then((data) => {
                this.setState({currentProject: data})
            })
            .catch((error) => {
                console.log('Cannot retrieve current project')
                console.log(error);
            })
    }

    toggleVisibilityOption() {
        this.setState({ visibleOption: !this.state.visibleOption })
        if (!this.state.visibleOption) {
            this.setState({
                cardStyle: this.state.SavedCardStyle,
                posInput: this.state.SavedPosInput,
                sizeInput: this.state.SavedSizeInput,
                styleInput: this.state.SavedStyleInput,
                formatInput: this.state.SavedFormatInput,
                colorTextInput: this.state.SavedColorTextInput,
                colorBackgroundInput: this.state.SavedColorBackgroundInput,
                weightInput: this.state.SavedWeightInput,
                decorationInput: this.state.SavedDecorationInput,
                fontStyleInput: this.state.SavedFontStyleInput,
                imgSize: this.state.SavedImgSize,
                imgPadding: this.state.SavedImgPadding,
                imgType: this.state.imgType,
                borderCard: this.state.SavedBorderCard,
                urlRest: this.state.SavedUrlRest,
                urlImg: this.state.SavedUrlImg
            })
        }
    }

    handleMode() {
        let navbar = document.getElementById("navbar-icon")
        if (this.state.mode === false) {
            navbar.classList.add("viewMode")
        }
        else {
            navbar.classList.remove("viewMode")
        }
        let elem = document.getElementById('navbar')
        let navbarHeight = elem.offsetHeight + 10
        let style = this.state.cardStyle
        style.top = navbarHeight + 'px'
        this.setState({ mode: !this.state.mode, cardStyle: style})
    }

    handleChangeOption(data) {
        switch (data.options[0].type) {
            case 'position':
                this.setState({ posInput: data.value })
                break
            case 'size':
                this.setState({ sizeInput: data.value })
                break
            case 'style':
                this.setState({ styleInput: data.value })
                break
            case 'format':
                this.setState({ formatInput: data.value })
                break
            case 'weight':
                this.setState({ weightInput: data.value })
                break
            case 'decoration':
                this.setState({ decorationInput: data.value })
                break
            case 'font-style':
                this.setState({ fontStyleInput: data.value })
                break
            case 'imgsize':

                // TODO: Rivedere e forse eliminare
                let localStyle = JSON.parse(JSON.stringify(this.state.cardStyle));
                if (data.value === 'mini') {
                    // localStyle.width = '50%'
                    localStyle.width = 'auto'
                } else if (data.value === 'tiny') {
                    // localStyle.width = '70%'
                    localStyle.width = 'auto'
                } else {
                    localStyle.width = 'auto'
                }

                this.setState({ imgSize: data.value, cardStyle: localStyle })
                break
            case 'imgpadding':
                this.setState({ imgPadding: data.value })
                break
            case 'imgtype':
                this.setState({ imgType: data.value })
                break
            default:
                break
        }

    }

    handleChangeBorder(data, item) {
        let localBorderCard = this.state.borderCard
        data.options[0].type === 'bordertype' ?
        localBorderCard[item.text].type = data.value :
        localBorderCard[item.text].size = data.value
        this.setState({ borderCard: localBorderCard })
    }

    handleChangeColorTextInput(color) {
        this.setState({ colorTextInput: color.hex })
    }

    handleChangeColorBackgroundInput(color) {
        this.setState({ colorBackgroundInput: color.hex })
    }

    handleChangeColorBorder(color, item) {
        let localBorderCard = this.state.borderCard
        localBorderCard[item.text].color = color.hex
        this.setState({ borderCard: localBorderCard })
    }

    handleChangeUrl(id, data) {
        id === 'url_api' ?
        this.setState({ urlRest: data }) :
        this.setState({ urlImg: data })
    }

    saveOption() {
        this.setState({
            SavedPosInput: this.state.posInput,
            SavedSizeInput: this.state.sizeInput,
            SavedStyleInput: this.state.styleInput,
            SavedFormatInput: this.state.formatInput,
            SavedColorTextInput: this.state.colorTextInput,
            SavedColorBackgroundInput: this.state.colorBackgroundInput,
            SavedWeightInput: this.state.weightInput,
            SavedDecorationInput: this.state.decorationInput,
            SavedFontStyleInput: this.state.fontStyleInput,
            SavedImgSize: this.state.imgSize,
            SavedImgPadding: this.state.imgPadding,
            SavedImgType: this.state.imgType,
            SavedBorderCard: this.state.borderCard,
            SavedUrlRest: this.state.urlRest,
            SavedUrlImg: this.state.urlImg,
            SavedCardStyle: this.state.cardStyle
        })
        this.toggleVisibilityOption()
    }

    triggerSave(value) {
        this.setState({saveProject: value})
    }

    savedSuccessfully() {
        this.setState({saveMessage: false, saveProject: false})
        this.sleep(1000).then(() => {
            this.setState({saveMessage: true})
        });
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    setNavbarCard(card) {
        this.setState({navbarCard: card})
    }

    render() {
        const { t, i18n } = this.props

        // Da attivare in fase finale per evitare refresh o chiusura della scheda del browser
        // window.addEventListener("beforeunload", function(event) {
        //     event.returnValue = "Confirm to exit";
        // })

        let InputOptionsPane = <InputOptions
            changeOtions={this.handleChangeOption}
            changeColorBack={this.handleChangeColorBackgroundInput}
            changeColorText={this.handleChangeColorTextInput}
            sizeInput={this.state.sizeInput}
            mode={this.state.mode}
            posInput={this.state.posInput}
            transparent={this.state.styleInput}
            formatInput={this.state.formatInput}
            weightInput={this.state.weightInput}
            decorationInput={this.state.decorationInput}
            fontStyleInput={this.state.fontStyleInput}
            colorTextInput={this.state.colorTextInput}
            colorBackgroundInput={this.state.colorBackgroundInput}
            urlRest={this.state.urlRest}SavedCardStyle
            urlImg={this.state.urlImg}
            Style={this.state.cardStyle}
            />

        let ImageOptionsPane = <ImageOptions
            changeOtions={this.handleChangeOption}
            sizeInput={this.state.sizeInput}
            mode={this.state.mode}
            posInput={this.state.posInput}
            transparent={this.state.styleInput}
            formatInput={this.state.formatInput}
            weightInput={this.state.weightInput}
            decorationInput={this.state.decorationInput}
            fontStyleInput={this.state.fontStyleInput}
            colorTextInput={this.state.colorTextInput}
            colorBackgroundInput={this.state.colorBackgroundInput}
            imgSize={this.state.imgSize}
            imgPadding={this.state.imgPadding}
            urlRest={this.state.urlRest}
            urlImg={this.state.urlImg}
            Style={this.state.cardStyle}
            />

        let CardOptionsPane = <CardOptions
            changeOtions={this.handleChangeBorder}
            changeColorBorder={this.handleChangeColorBorder}
            borderCard={this.state.borderCard}
            sizeInput={this.state.sizeInput}
            mode={this.state.mode}
            posInput={this.state.posInput}
            transparent={this.state.styleInput}
            formatInput={this.state.formatInput}
            weightInput={this.state.weightInput}
            decorationInput={this.state.decorationInput}
            fontStyleInput={this.state.fontStyleInput}
            colorTextInput={this.state.colorTextInput}
            colorBackgroundInput={this.state.colorBackgroundInput}
            urlRest={this.state.urlRest}
            urlImg={this.state.urlImg}
            Style={this.state.cardStyle}
            />

        let ProfileOptionsPane = <ProfileOptions
            changeOtions={this.handleChangeOption}
            imgType={this.state.imgType}
            />

        let ProjectOptionsPane = <ProjectOptions
            changeOtions={this.handleChangeUrl}
            urlRest={this.state.urlRest}
            urlImg={this.state.urlImg}
            />

        const panes = [
                    { menuItem: t("OPT_MNU_INPUTOPTIONS"), render: () => <Tab.Pane>{InputOptionsPane}</Tab.Pane> },
                    { menuItem: t("OPT_MNU_IMAGEOPTIONS"), render: () => <Tab.Pane >{ImageOptionsPane}</Tab.Pane> },
                    { menuItem: t("OPT_MNU_CARDOPTIONS"), render: () => <Tab.Pane >{CardOptionsPane}</Tab.Pane> },
                    { menuItem: t("OPT_MNU_PROFILEOPTIONS"), render: () => <Tab.Pane >{ProfileOptionsPane}</Tab.Pane> },
                    { menuItem: t("OPT_MNU_PROJECTOPTIONS"), render: () => <Tab.Pane >{ProjectOptionsPane}</Tab.Pane> },
                    { menuItem: 'Language', render: () => <Tab.Pane ><LanguageSwitcher /></Tab.Pane> },
                ]

        let cardRow = this.state.cardRow
        cardRow = cardRow.map((item, index) => {
            return (
                <CardUI
                    Style={this.state.SavedCardStyle}
                    ref={instance => {this.child = instance}}
                    setNavbarCard={this.setNavbarCard}
                    key={index}
                    saveComplete={this.savedSuccessfully}
                    project={this.state.currentProject}
                    saveToDb={this.state.saveProject}
                    newLine={this.state.newLine}
                    mode={this.state.mode}
                    row={item.row}
                    transparent={this.state.SavedStyleInput}
                    sizeInput={this.state.SavedSizeInput}
                    posInput={this.state.SavedPosInput}
                    formatInput={this.state.SavedFormatInput}
                    weightInput={this.state.SavedWeightInput}
                    decorationInput={this.state.SavedDecorationInput}
                    fontStyleInput={this.state.SavedFontStyleInput}
                    colorTextInput={this.state.SavedColorTextInput}
                    colorBackgroundInput={this.state.SavedColorBackgroundInput}
                    imgSize={this.state.SavedImgSize}
                    imgPadding={this.state.SavedImgPadding}
                    imgType={this.state.SavedImgType}
                    borderCard={this.state.SavedBorderCard}
                    urlRest={this.state.SavedUrlRest}
                    urlImg={this.state.SavedUrlImg}
                    urlProject={window.env.RestApiProject}
                />
            )
        })
        if (this.state.currentProject.length === 0 ) {
            return (<p>Loading...</p>)
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
                                openOption={this.toggleVisibilityOption}
                                checkMode={this.handleMode}
                                checked={this.state.mode}
                                save={this.triggerSave}
                            />
                        </Menu.Item>
                        <Menu.Item className='navbar-icon' id='navbar-icon'>
                            <Popup
                                trigger={<Icon name='arrow left' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.child.mergeCard('left')}}/>}
                                content='Merge with left Card'
                            />
                            <Popup
                                trigger={<Icon name='arrow right' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.child.mergeCard('right')}}/>}
                                content='Merge with right Card'
                            />
                            <Popup
                                trigger={<Icon name='unlinkify' bordered inverted color="teal"
                                    size='large'
                                    onClick={() => {this.child.unlinkCard()}}/>}
                                content='Unlink Card when are linked'
                            />
                            <Icon
                                name='image'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.child.toggleVisibilityImg()}}
                                style={{cursor: 'pointer'}}
                            />
                            <Icon name={this.state.navbarCard.lock} bordered inverted
                                color="teal"
                                size='large'
                                onClick={() => {this.child.handleBlock()}}/>
                            <Popup
                                trigger={
                                    <Icon name='copy' bordered inverted color="teal"
                                        size='large'
                                        onClick={() => {this.child.copyCard()}}/>
                                }
                                content='Copy current Card'
                            />
                            <Icon
                                name='delete'
                                bordered
                                inverted
                                color='teal'
                                size='large'
                                onClick={() => {this.child.deleteCard()}}
                                style={{cursor: 'pointer'}}
                            />
                            <img src={this.state.SavedUrlImg + this.state.navbarCard.img}
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
                    style={this.state.SavedCardStyle}
                    icon={'save'}
                    header='Projet Saved'
                />
                {cardRow}
                <Modal open={this.state.visibleOption} size='fullscreen'>
                    <Modal.Header>{t("OPT_LBL_EDITOPTIONS")}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button.Group>
                            <Button onClick={this.toggleVisibilityOption}>{t("OPT_BTN_CANCELEXIT")}</Button>
                            <Button.Or />
                            <Button positive onClick={this.saveOption}>{t("OPT_BTN_SAVEEXIT")}</Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default translate('translations')(BasicProject)
