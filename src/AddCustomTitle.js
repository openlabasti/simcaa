import React, { Component } from 'react'
import { Modal, Button, Segment, Card, Icon, Input, Accordion, Image, Form, Dropdown } from 'semantic-ui-react'
import { ChromePicker } from 'react-color';
import { withApolloFetchNoAuth } from './withApolloFetchNoAuth'
import { translate, Trans } from 'react-i18next'
import CardLayout from './CardLayout'

class AddCustomTitle extends Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colorIcon: 'black',
            openCloseAccordionImage: false,
            openCloseAccordionForm: false,
            inputValue: '',
            titleCard: [],
            indexImage: 0,
            borderSize: [{type: 'bordersize', value: '1', text: '1px'},
                        {type: 'bordersize', value: '2', text: '2px'},
                        {type: 'bordersize', value: '3', text: '3px'},
                        {type: 'bordersize', value: '4', text: '4px'},
                        {type: 'bordersize', value: '5', text: '5px'}],
            borderType: [{type: 'bordertype', value: 'dotted', text: props.t("OPT_FRM_DOTTED")},
                        {type: 'bordertype', value: 'dashed', text: props.t("OPT_FRM_DASHED")},
                        {type: 'bordertype', value: 'solid', text: props.t("OPT_FRM_SOLID")},
                        {type: 'bordertype', value: 'double', text: props.t("OPT_FRM_DOUBLE")}],
            color: '#000',
            titleBorderSize: '3',
            titleBorderType: 'solid',
        }
    }

    // Add a new card to title
    addNewCardTitle() {
        let lemma = this.state.inputValue.toLowerCase().trim()
        let query = `
        query FatchLemma {
            query_view (voice_master: "${lemma}", limit: 100){
                data {
                    voice_master
                    voice_human
                    symbol_sign
                }
            }
            preload_headword(voice_master: "${lemma}") {
                data {
                    voice_master
                    headword
                    symbol_sign
                }
            }
        }
        `
        this.props.apolloFetchNoAuth({ query })
            .then((data) => {
                let localTitleCard = this.state.titleCard
                let completeData = data.data.query_view.data.concat(data.data.preload_headword.data)
                let custom = completeData[0].voice_human ? false : true
                let newElementArray = {id: localTitleCard.length, lemma: lemma, img: completeData[0].symbol_sign, imgAlt: [], custom}

                localTitleCard.splice(localTitleCard.length, 0, newElementArray)
                for (let i = 0; i < completeData.length; i++) {
                    custom = completeData[i].voice_human ? false : true
                    localTitleCard[localTitleCard.length - 1].imgAlt.splice(i, 0, {img: completeData[i].symbol_sign, custom})
                }

                this.setState({titleCard: localTitleCard, inputValue: ''})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Handle open and close of the modal
    openCloseModal() {
        if (this.state.open === true) {
            this.setState({open: !this.state.open, indexImage: 0, titleCard: [], inputValue: '', openCloseAccordionImage: false})
        } else {
            this.setState({open: !this.state.open})
        }
    }

    // Handle onHover change color of the Icon
    changeIconColor() {
        let color = this.state.colorIcon === 'black' ? 'green' : 'black'
        this.setState({colorIcon: color})
    }

    // Toggle open/close of the Accordion Image
    handleOpenCloseAccordionImage() {
        this.setState({openCloseAccordionImage: !this.state.openCloseAccordionImage})
    }

    // Toggle open/close of the Accordion Form
    handleOpenCloseAccordionForm() {
        this.setState({openCloseAccordionForm: !this.state.openCloseAccordionForm})
    }

    // change input value
    handleInputChange(e) {
        this.setState({inputValue: e.target.value})
    }

    // Change the focused card and set the index to get the new custom images
    handleChangeFocus(index, e) {
        this.setState({indexImage: index})
    }

    // Change image of title card
    handleChangeImage(item, e) {
        let localTitleCard = this.state.titleCard
        localTitleCard[this.state.indexImage].img = item.img
        localTitleCard[this.state.indexImage].custom = item.custom

        this.setState({titleCard: localTitleCard})
    }

    // Change color of the title border
    onChangeColorBorder(color, e) {
        this.setState({color: color.hex})
    }

    // Dropdown handler form border
    onChangeDropdown(dropdown, e, data) {
        if (dropdown === 'type') {
            this.setState({titleBorderType: data.value})
        } else if (dropdown === 'size') {
            this.setState({titleBorderSize: data.value})
        }
    }

    // Call the function in the parent component to add the title in the page
    addTitle() {
        console.log(this.state.titleCard);
        this.props.addTitle(this.state.titleCard, this.state.titleBorderSize, this.state.titleBorderType, this.state.color)
        this.openCloseModal()
    }

    render() {
        const { t, i18n } = this.props

        let localTitleCard = this.state.titleCard
        localTitleCard = localTitleCard.map((item, index) => {
            return (
                <CardLayout
                    key={index}
                    Card={item}
                    isTypo={true}
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
                    imgType= '2'
                    urlRest= {window.env.GraphQLServer}
                    urlImg= {window.env.PathImages}
                    Style={{'width': 'auto', 'transform': 'none'}}
                    onClick={this.handleChangeFocus.bind(this, index)}
                />
            )
        })

        let imageAltAccordion = this.state.titleCard.length > 0 ? this.state.titleCard[this.state.indexImage].imgAlt : []
        imageAltAccordion = imageAltAccordion.map((item, index) => {
            let urlSrc = item.custom === true ? window.env.CustomImage + item.img : window.env.PathImages + item.img
            return (
                <div onClick={this.handleChangeImage.bind(this, item)} style={{display: 'inline-block'}} key={index}>
                    <Image src={urlSrc} size='small' />
                </div>
            )
        })

        return(
            <Modal trigger={<Button color='yellow' onClick={this.openCloseModal.bind(this)} disabled={this.props.disabled} style={this.props.style}>{t("TYPO_BTN_CUSTOMTITLE")}</Button>}
                open={this.state.open}
                size='fullscreen'
            >
                <Modal.Header>{t("TYPO_HDR_CUSTOMTITLE")}</Modal.Header>
                <Modal.Content>
                <Accordion styled fluid>
                    <Accordion.Title
                        active={this.state.openCloseAccordionForm}
                        onClick={this.handleOpenCloseAccordionForm.bind(this)}
                        index={0}
                    >
                        <Icon name='dropdown' />
                        Border Options
                    </Accordion.Title>
                    <Accordion.Content active={this.state.openCloseAccordionForm}>
                        <Form>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERCOLOR")}</label>
                                <ChromePicker disableAlpha
                                    color={this.state.color}
                                    onChangeComplete={this.onChangeColorBorder.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERTYPE")}</label>
                                <Dropdown placeholder='Select' fluid selection
                                    options={this.state.borderType}
                                    onChange={this.onChangeDropdown.bind(this, 'type')}
                                    defaultValue={this.state.borderType[0].value}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERSIZE")}</label>
                                <Dropdown placeholder='Select' fluid selection
                                    options={this.state.borderSize}
                                    onChange={this.onChangeDropdown.bind(this, 'size')}
                                    defaultValue={this.state.borderSize[0].value}
                                />
                            </Form.Field>
                        </Form>
                    </Accordion.Content>
                </Accordion>
                <Segment>
                    <Card.Group style={{border: this.state.titleBorderSize + 'px ' + this.state.color + ' ' + this.state.titleBorderType,
                                        width: 'fit-content'
                                        }}
                    >
                        {localTitleCard}
                        <Card style={{width: 'auto'}}>
                            <Card.Content textAlign='center'>
                                <Icon name='add square' size='huge'
                                    className='icon-pointer'
                                    color={this.state.colorIcon}
                                    onMouseOver={this.changeIconColor.bind(this)}
                                    onMouseOut={this.changeIconColor.bind(this)}
                                    onClick={this.addNewCardTitle.bind(this)}
                                />
                            </Card.Content>
                            <Card.Content extra>
                                <Input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
                <Segment>
                <Accordion styled fluid>
                    <Accordion.Title
                        active={this.state.openCloseAccordionImage}
                        onClick={this.handleOpenCloseAccordionImage.bind(this)}
                        index={0}
                    >
                        <Icon name='dropdown' />
                        Alternative images
                    </Accordion.Title>
                    <Accordion.Content active={this.state.openCloseAccordionImage}>
                        <Image.Group>
                            {imageAltAccordion}
                        </Image.Group>
                    </Accordion.Content>
                </Accordion>
                </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button negative onClick={this.openCloseModal.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                    <Button.Or />
                        <Button positive onClick={this.addTitle.bind(this)}>{t("TYPO_BTN_CUSTOMTITLE")}</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default translate('translations')(withApolloFetchNoAuth(AddCustomTitle, {display: 'inline-block'}))
