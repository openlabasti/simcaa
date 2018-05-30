import React, { Component } from 'react'
import { Button, Segment, Dropdown, Modal, Header, Image, Form, Checkbox, Grid, Message, Confirm, Icon, Popup } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { translate, Trans } from 'react-i18next'
import { withApolloFetchNoAuth } from './withApolloFetchNoAuth'
import { withApolloFetch } from './withApolloFetch'
import CardLayout from './CardLayout'


class UploadSymbol extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            confirmOpen: false,
            classOptions: [],
            styleOptions: [],
            colorOptions: [{value: 1, text: props.t("UPSY_IMGCOLOR_BW")}, {value: 2, text: props.t("UPSY_IMGCOLOR_COL")}],
            file: [{preview: '', size: 0}],
            card: {id: 0, lemma: 'Custom Images', img: 'react.png'},
            urlImg: window.env.PathImages,
            imgStat: {width: 0, height: 0, size: 0},
            word: '',
            style: 0,
            color: 0,
            class: 0,
            privatePhoto: false,
            error: {hidden: true, text: ''}
        }
    }

    componentWillMount() {
        let query = `
        query FetchClass {
            class {
                data {
                    id
                    descclass
                }
            }
            style {
                data {
                    id
                    descstyle
                }
            }
        }
        `
        this.props.apolloFetchNoAuth({ query })
            .then((data) => {
                // Fetch delle classi
                let localOptionsClass = this.state.classOptions
                for (let i = 0; i < data.data.class.data.length; i++) {
                    localOptionsClass[i] = {value: data.data.class.data[i].id, text: data.data.class.data[i].descclass}
                }

                // Fetch degli stili
                let localOptionsStyle = this.state.styleOptions
                for (let i = 0; i < data.data.style.data.length; i++) {
                    localOptionsStyle[i] = {value: data.data.style.data[i].id, text: data.data.style.data[i].descstyle}
                }

                this.setState({classOptions: localOptionsClass, styleOptions: localOptionsStyle})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        let localStat = this.state.imgStat
        let testImg = document.getElementById('imgTmp')
        let self = this
        let imgName = testImg !== null ? testImg.src.split("/").pop() : ''
        if (testImg !== null && imgName !== prevState.card.img) {
            setTimeout(() => {
                // Riprendo i dati dalla div perchè in caso di reupload
                testImg = document.getElementById('imgTmp')

                // Aggiorno in tempo reale le info sull'immagine
                localStat.width = testImg.width
                localStat.height = testImg.height
                localStat.size = this.state.file[0].size
                self.setState({imgStat: localStat})
            }, 0)
        }
    }

    onDrop(files) {
        // Prendo il nome dell'immagine dalla preview
        let newImgName = files[0].preview
        newImgName = newImgName.substring(0, (newImgName.indexOf("#") === -1) ? newImgName.length : newImgName.indexOf("#"))
        newImgName = newImgName.substring(0, (newImgName.indexOf("?") === -1) ? newImgName.length : newImgName.indexOf("?"))
        newImgName = newImgName.substring(newImgName.lastIndexOf("/") + 1, newImgName.length)

        // Prendo il nuovo path dell'immagine dalla preview
        let newUrlImg = files[0].preview.substring(0, files[0].preview.lastIndexOf("/") + 1)

        // Unisco i 2 nuovi valori per formare la nuova card
        let localCard = this.state.card
        let localUrl = this.state.urlImg
        localCard.img = newImgName
        localUrl = newUrlImg

        this.setState({file: files, card: localCard, urlImg: localUrl})
    }

    openCloseModal() {
        if (this.state.modalOpen === true) {
            this.setState({modalOpen: !this.state.modalOpen,
                        file: [{preview: '', size: 0}],
                        imgStat: {width: 0, height: 0, size: 0},
                        word: '',
                        style: 0,
                        color: 0,
                        class: 0,
                        privatePhoto: false,
                        error: {hidden: true, text: ''}
            })
        } else {
            this.setState({modalOpen: !this.state.modalOpen, confirmOpen: false})
        }

    }

    openCloseConfirm() {
        this.setState({confirmOpen: !this.state.confirmOpen})
    }

    wordChange(e) {
        this.setState({word: e.target.value})
    }

    checkboxPrivate() {
        this.setState({privatePhoto: !this.state.privatePhoto})
    }

    dropdownChange(type, e, data) {
        if(type === 'style') {
            this.setState({style: data.value})
        } else if (type === 'color') {
            this.setState({color: data.value})
        } else if (type === 'class') {
            this.setState({class: data.value})
        }
    }

    upload() {
        if (this.state.file[0].name && this.state.word !== '') {
            //  IMAGE UPLOAD
            let imgToSend = new FormData()
            imgToSend.append('img',this.state.file[0])
            imgToSend.append('custom', true)

            let request = new Request(window.env.ApiImageUpload,{
                method : 'POST',
                mode: 'cors',
                mimeType: 'multipart/form-data',
                body: imgToSend
            })

            fetch(request)
                .then((response) => {
                    // Variables GraphQL
                    //  TODO: Change idlang and idcateg in future
                    let idlang = 4
                    let headword = this.state.word.trim().toLowerCase()
                    let voice_master = headword.replace(/ .*/,'')
                    let lexical_expr = headword.indexOf(' ') >= 0 ? 1 : 0
                    let idclass = this.state.class
                    let idcateg = 0
                    let type_img = this.state.privatePhoto === true ? 1 : 0
                    let symbol_sign = this.state.file[0].name
                    let imgcolor = this.state.color
                    let idstyle = this.state.style
                    let created_by = this.props.user.id

                    let query = `
                    mutation InsertNewPreloadHeardword {
                        createCaaPreloadHeadword(idlang: ${idlang}, voice_master: "${voice_master}",
                                                headword: "${headword}", lexical_expr: ${lexical_expr},
                                                idclass: ${idclass}, idcateg: ${idcateg}, type_img: ${type_img},
                                                idstyle: ${idstyle}, symbol_sign: "${symbol_sign}",
                                                imgcolor: "${imgcolor}", created_by: ${created_by}) {
                            id
                        }
                    }
                    `
                    this.props.apolloFetch({ query })
                        .then((data) => {
                            this.openCloseModal()
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                this.setState({error: {hidden: false, text: 'Error in image or word'}})
            }
    }

    render() {
        const { t, i18n } = this.props

        // Render trigger modal based on props.type
        let triggerModal
        if (this.props.type === 'dropdown') {
            triggerModal = <Dropdown.Item
                            style={this.props.style}
                            className='icon-pointer dropdown-item-hover'
                            onClick={this.openCloseModal.bind(this)}>
                                {t("HOME_NAVBAR_MANAGE_SYMBOL")}
                        </Dropdown.Item>
        } else if (this.props.type === 'button') {
            triggerModal = <Button
                            style={this.props.style}
                            className='icon-pointer'
                            onClick={this.openCloseModal.bind(this)}>
                                {t("HOME_NAVBAR_MANAGE_SYMBOL")}
                        </Button>
        } else if (this.props.type === 'icon') {
            triggerModal =  <Popup
                                trigger={<Icon name='upload' bordered inverted color="teal"
                                size='large'
                                className={'icon-pointer ' + this.props.className}
                                style={this.props.style}
                                onClick={() => {this.openCloseModal.bind(this)}}/>}
                                content={t("POPUP_IMPORT")}
                            />

        }

        let defaultClass = this.state.classOptions.length === 0 ? '' : this.state.classOptions[this.state.classOptions.length - 1].value
        let defaultStyle = this.state.styleOptions.length === 0 ? '' : this.state.styleOptions[0].value

        let dropzoneRef

        return (
            <Modal trigger={triggerModal} open={this.state.modalOpen}>
                <Modal.Header>{t("UPSY_SELECTIMG")}</Modal.Header>
                <Modal.Content>
                    <Message negative hidden={this.state.error.hidden}>
                        <Message.Header>Error detected</Message.Header>
                        <p>{this.state.error.text}</p>
                    </Message>
                    <Form>
                        <Form.Field>
                            <label>{t("UPSY_WORD")}</label>
                            <input placeholder={t("UPSY_CLASS")} value={this.state.word} onChange={this.wordChange.bind(this)} />
                        </Form.Field>
                        <Form.Field width={6}>
                            <label>{t("UPSY_CLASS")}</label>
                            <Dropdown placeholder='Select Class' selection
                                options={this.state.classOptions}
                                defaultValue={defaultClass}
                                onChange={this.dropdownChange.bind(this, 'class')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{t("UPSY_IMGTYPE")}</label>
                            <Checkbox label={t("UPSY_PRIVATEIMG")}
                                checked={this.state.privatePhoto}
                                onChange={this.checkboxPrivate.bind(this)}
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <label>{t("UPSY_IMGCOLOR")}</label>
                            <Dropdown placeholder='Image Color' selection
                                options={this.state.colorOptions}
                                defaultValue={1}
                                onChange={this.dropdownChange.bind(this, 'color')}
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <label>{t("UPSY_IMGSTYLE")}</label>
                            <Dropdown placeholder={t("UPSY_IMGCOLOR")} selection
                                options={this.state.styleOptions}
                                defaultValue={defaultStyle}
                                onChange={this.dropdownChange.bind(this, 'style')}
                            />
                        </Form.Field>
                        <Dropzone ref={(node) => { dropzoneRef = node; }}
                            accept="image/jpeg, image/png"
                            style={{'display': 'none'}}
                            onDrop={this.onDrop.bind(this)}
                        />
                        <Button onClick={() => { dropzoneRef.open() }}>
                            {t("UPSY_OPENDIALOG")}
                        </Button>
                        <Image hidden src={this.state.urlImg + this.state.card.img} id='imgTmp' />
                        <br />
                        <Segment vertical>{t("UPSY_WIDTH")} {this.state.imgStat.width} px</Segment>
                        <Segment vertical>{t("UPSY_HEIGHT")} {this.state.imgStat.height} px</Segment>
                        <Segment vertical>{t("UPSY_SIZE")} {this.state.imgStat.size} byte</Segment>
                        <Grid padded>
                            <Grid.Row columns='equal'>
                                <Grid.Column>
                                    <CardLayout
                                        Card={this.state.card}
                                        isTypo={false}
                                        imgFullWidth={false}
                                        mode={true}
                                        posInput= 'bottom'
                                        sizeInput= 'small'
                                        styleInput= 'normal'
                                        formatInput= 'freeInput'
                                        colorTextInput= '#000000'
                                        colorBackgroundInput= '#FFFFFF'
                                        weightInput= 'weightNormalInput'
                                        decorationInput= 'decorationNormalInput'
                                        fontStyleInput= 'styleNormalInput'
                                        imgSize= 'small'
                                        imgPadding= 'imgpadding1'
                                        urlImg= {this.state.urlImg}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <CardLayout
                                        Card={this.state.card}
                                        isTypo={false}
                                        imgFullWidth={false}
                                        mode={true}
                                        posInput= 'bottom'
                                        sizeInput= 'small'
                                        styleInput= 'normal'
                                        formatInput= 'freeInput'
                                        colorTextInput= '#000000'
                                        colorBackgroundInput= '#FFFFFF'
                                        weightInput= 'weightNormalInput'
                                        decorationInput= 'decorationNormalInput'
                                        fontStyleInput= 'styleNormalInput'
                                        imgSize= 'tiny'
                                        imgPadding= 'imgpadding1'
                                        urlImg= {this.state.urlImg}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                    <Confirm
                        open={this.state.confirmOpen}
                        header='This is a custom header'
                        content='ERROR HANDLING, RECAP AND GUIDE UPLOAD'
                        onConfirm={this.upload.bind(this)}
                        onCancel={this.openCloseConfirm.bind(this)}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button positive onClick={this.openCloseConfirm.bind(this)}>Upload</Button>
                        <Button.Or />
                        <Button negative onClick={this.openCloseModal.bind(this)}>Cancel</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default translate('translations')(withApolloFetchNoAuth(withApolloFetch(UploadSymbol)))
