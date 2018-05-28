import React, { Component } from 'react'
import { Modal, Icon, Button, Form, Message, Dropdown } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import InputOptions from './InputOptions'
import ImageOptions from './ImageOptions'
import CardOptions from './CardOptions'
import ProfileOptions from './ProfileOptions'
import ProjectOptions from './ProjectOptions'

class NewProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state= {
            // If something changes here check the save and update profile functions
            modalVisible: false,
            errorMessage: true,
            share: false,
            indexForm: 0,
            newProfileName: '',
            iconColor: 'black',
            // Card Variables for the Form
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
                Altro: {color: '',size: '1',type: ''},
                Tutti: {color: '',size: '1',type: ''}
            },
            urlRest: window.env.GraphQLServer,
            urlImg: window.env.PathImages,
        }
        // Handle Form Options
        this.handleChangeOption = this.handleChangeOption.bind(this)
        this.handleChangeColorTextInput = this.handleChangeColorTextInput.bind(this)
        this.handleChangeColorBackgroundInput = this.handleChangeColorBackgroundInput.bind(this)
        this.handleChangeColorBorder = this.handleChangeColorBorder.bind(this)
        this.handleChangeBorder = this.handleChangeBorder.bind(this)
        this.handleChangeUrl = this.handleChangeUrl.bind(this)
        this.handleChangeOrder = this.handleChangeOrder.bind(this)
    }

    componentWillMount() {
        if(this.props.edit && this.props.data) {
            let data = JSON.parse(this.props.data)
            this.setState({...data})
        }
    }

    handleOpenCloseModal(action) {
        let name
        if (action === 'open') {
            if (this.props.edit && this.props.data) {
                name = this.state.newProfileName.replace(/\"/g, "")
            } else {
                name = ''
            }
        } else {
            if (this.props.edit && this.props.data) {
                name = JSON.parse(this.props.data).newProfileName
                let data = JSON.parse(this.props.data)
                this.setState({...data})
            } else {
                name = ''
            }
        }
        this.setState({modalVisible: !this.state.modalVisible, newProfileName: name, indexForm: 0})
    }

    handleFormChange(e) {
        this.setState({newProfileName: e.target.value})
    }

    handleCheckboxChange(e) {
        this.setState({share: !this.state.share})
    }

    handleForwardForm() {
        this.setState({indexForm: this.state.indexForm + 1})
    }

    handleBackForm() {
        this.setState({indexForm: this.state.indexForm - 1})
    }

    onMouseOverIcon() {
        let newColor = this.state.iconColor === 'black' ? 'green' : 'black'
        this.setState({iconColor: newColor})
    }

    // Handle Card Form
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
                    localStyle.width = '50%'
                    // localStyle.width = 'auto'
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
            case 'imgstyle':
                this.setState({ imgStyle: data.value })
                break
            default:
                break
        }

    }

    handleChangeOrder(order) {
        this.setState({priorityOrder: order})
    }

    handleChangeBorder(data, item) {
        let localBorderCard = this.state.borderCard
        if (item.text === 'Tutti') {
            for (let index in localBorderCard) {
                data.options[0].type === 'bordertype' ?
                localBorderCard[index].type = data.value :
                localBorderCard[index].size = data.value
            }
        } else {
            data.options[0].type === 'bordertype' ?
            localBorderCard[item.text].type = data.value :
            localBorderCard[item.text].size = data.value
        }
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
        if (item.text === 'Tutti') {
            for (let index in localBorderCard) {
                localBorderCard[index].color = color.hex
            }
        } else {
            localBorderCard[item.text].color = color.hex
        }
        this.setState({ borderCard: localBorderCard })
    }

    handleChangeUrl(id, data) {
        id === 'url_api' ?
        this.setState({ urlRest: data }) :
        this.setState({ urlImg: data })
    }

    saveNewProfile() {
        let {modalVisible, errorMessage, share, indexForm, iconColor, ...formData} = this.state
        this.props.createProfile(formData)
        this.setState({modalVisible: !this.state.modalVisible})
    }

    updateProfile() {
        let {modalVisible, errorMessage, share, indexForm, iconColor, ...formData} = this.state
        this.props.updateProfile(formData)
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render() {
        const { t, i18n } = this.props
        let FormContent = []
        let FormButton = []
        let iconModal

        if (this.props.edit && this.props.edit === 'icon') {
            iconModal = <Icon name='edit'
                style={this.props.style}
                className={this.props.className}
                size={this.props.size}
                onClick={this.handleOpenCloseModal.bind(this, 'open')}
                disabled={this.props.disabled}
            />
        } else if (this.props.edit && this.props.edit === 'button') {
            iconModal = <Button onClick={this.handleOpenCloseModal.bind(this, 'open')} disabled={this.props.disabled}>
                            {t("PRJ_MNU_OPTIONS")}
                        </Button>
        } else if (this.props.type && this.props.type === 'dropdown') {
            iconModal = <Dropdown.Item
                            style={this.props.style}
                            className='icon-pointer dropdown-item-hover'
                            onClick={this.handleOpenCloseModal.bind(this, 'open')}
                            disabled={this.props.disabled}
                        >
                                Add Profile
                        </Dropdown.Item>
        } else {
            iconModal = <Icon name='add square'
                style={this.props.style}
                className={this.props.className}
                size={this.props.size}
                color={this.state.iconColor}
                onMouseOver={this.onMouseOverIcon.bind(this)}
                onMouseOut={this.onMouseOverIcon.bind(this)}
                onClick={this.handleOpenCloseModal.bind(this, 'open')}
                disabled={this.props.disabled}
            />
        }

        FormContent[0] = <div>
            <Form>
                <Form.Field required>
                    <label>{t("MAIN_FRM_PROFILENAME")}</label>
                    <input placeholder={t("MAIN_FRM_PROFILENAME")}
                        value={this.state.newProfileName}
                        onChange={this.handleFormChange.bind(this)}
                    />
                </Form.Field>
            </Form>
            <Message
                hidden={this.state.errorMessage}
                error
                header='Error'
                content='Chapter title cannot be empty'
            />
        </div>

        FormContent[1] = <ProfileOptions
            changeOtions={this.handleChangeOption}
            changeOrder={this.handleChangeOrder}
            order={this.state.priorityOrder}
            imgType={this.state.imgType}
            imgStyle={this.state.imgStyle}
        />

        FormContent[2] = <InputOptions
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
            urlRest={this.state.urlRest}
            urlImg={this.state.urlImg}
            Style={this.state.cardStyle}
        />

        FormContent[3] = <ImageOptions
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

        FormContent[4] = <CardOptions
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

        FormContent[5] = <ProjectOptions
            changeOtions={this.handleChangeUrl}
            urlRest={this.state.urlRest}
            urlImg={this.state.urlImg}
        />


        FormButton[0] = <Button.Group>
            <Button color='blue' onClick={this.handleForwardForm.bind(this)}>
                {t("MAIN_BTN_FORWARD")}
            </Button>
            <Button.Or />
            <Button color='red' onClick={this.handleOpenCloseModal.bind(this, 'close')}>
                {t("MAIN_BTN_CLOSE")}
            </Button>
        </Button.Group>

        FormButton[1] = FormButton[2] = FormButton[3] = FormButton[4] = <Button.Group>
            <Button onClick={this.handleBackForm.bind(this)}>
                {t("MAIN_BTN_BACK")}
            </Button>
            <Button.Or />
            <Button color='blue' onClick={this.handleForwardForm.bind(this)}>
                {t("MAIN_BTN_FORWARD")}
            </Button>
            <Button.Or />
            <Button color='red' onClick={this.handleOpenCloseModal.bind(this, 'close')}>
                {t("MAIN_BTN_CLOSE")}
            </Button>
        </Button.Group>

        FormButton[5] = <Button.Group>
            <Button onClick={this.handleBackForm.bind(this)}>
                {t("MAIN_BTN_BACK")}
            </Button>
            <Button.Or />
            <Button color='green' onClick={this.props.edit ? this.updateProfile.bind(this) : this.saveNewProfile.bind(this)}>
                {this.props.edit ? t("MAIN_BTN_UPDATEPROFILE") : t("MAIN_BTN_CREATEPROFILE")}
            </Button>
            <Button.Or />
            <Button color='red' onClick={this.handleOpenCloseModal.bind(this, 'close')}>
                {t("MAIN_BTN_CLOSE")}
            </Button>
        </Button.Group>

        return (
            <div>
                <Modal trigger={iconModal} closeOnDimmerClick={false} open={this.state.modalVisible} size='fullscreen'>
                    <Modal.Header>{this.props.edit ? t("MAIN_LBL_UPDATEPROFILE") : t("MAIN_LBL_CREATEPROFILE")}</Modal.Header>
                    <Modal.Content>
                        {FormContent[this.state.indexForm]}
                    </Modal.Content>
                    <Modal.Actions>
                        {FormButton[this.state.indexForm]}
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default withApolloFetch(translate('translations')(NewProfileForm))
