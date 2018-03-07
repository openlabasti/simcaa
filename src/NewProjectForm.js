import React, { Component } from 'react'
import { Modal, Icon, Button, Form, Dropdown, Message, TextArea, Checkbox } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class NewProjectForm extends Component {
    constructor(props) {
        super(props)
        this.state= {
            modalVisible: false,
            errorMessage: true,
            share: false,
            profile: '',
            newProjectTitle: '',
            newProjectNote: '',
            iconColor: 'black',
        }
    }

    handleOpenCloseModal() {
        this.setState({modalVisible: !this.state.modalVisible, newProjectTitle: '', newProjectNote: ''})
    }

    handleFormChange(e) {
        this.setState({newProjectTitle: e.target.value})
    }

    handleDropdownChange(e, data) {
        this.setState({profile: data.value})
    }

    handleCheckboxChange(e) {
        this.setState({share: !this.state.share})
    }

    handleTextAreaChange(e) {
        this.setState({newProjectNote: e.target.value})
    }

    handleForm() {
        if(this.state.newProjectTitle === '') {
            this.setState({errorMessage: false})
        }
        else {
            this.props.createProject(this.state.newProjectTitle, this.state.newProjectNote,
                                        this.state.share, this.state.profile)
            this.setState({errorMessage: true, modalVisible: !this.state.modalVisible})
        }
    }

    onMouseOverIcon() {
        let newColor = this.state.iconColor === 'black' ? 'green' : 'black'
        this.setState({iconColor: newColor})
    }

    render() {
        const { t, i18n } = this.props

        let iconModal = <Icon name='add square'
            style={this.props.style}
            className={this.props.className}
            size={this.props.size}
            color={this.state.iconColor}
            onMouseOver={this.onMouseOverIcon.bind(this)}
            onMouseOut={this.onMouseOverIcon.bind(this)}
            onClick={this.handleOpenCloseModal.bind(this)}
            />

        return (
            <div>
                <Modal trigger={iconModal} closeOnDimmerClick={false} open={this.state.modalVisible}>
                    <Modal.Header>{t("MAIN_LBL_CREATE")}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field required>
                                <label>{t("MAIN_FRM_TITLE")}</label>
                                <input placeholder={t("MAIN_FRM_TITLE")}
                                    value={this.state.newProjectTitle}
                                    onChange={this.handleFormChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("MAIN_FRM_PROFILE")}</label>
                                <Dropdown placeholder='Layout' selection options={this.props.optionsProfiles}
                                    defaultValue={this.props.optionsProfiles[0].value}
                                    onChange={this.handleDropdownChange.bind(this)} />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("MAIN_FRM_SHARE")}</label>
                                <Checkbox label={t("MAIN_FRM_PUBLIC")}
                                    checked={this.state.share}
                                    onClick={this.handleCheckboxChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("MAIN_FRM_NOTES")}</label>
                                <TextArea placeholder={t("MAIN_FRM_NOTES")}
                                    value={this.state.newProjectNote}
                                    onChange={this.handleTextAreaChange.bind(this)}
                                />
                            </Form.Field>
                        </Form>
                        <Message
                            hidden={this.state.errorMessage}
                            error
                            header='Error'
                            content='Chapter title cannot be empty'
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button.Group>
                            <Button color='green' onClick={this.handleForm.bind(this)}>
                                {t("MAIN_BTN_CREATE")}
                            </Button>
                            <Button.Or />
                            <Button color='red' onClick={this.handleOpenCloseModal.bind(this)}>
                                {t("MAIN_BTN_CLOSE")}
                            </Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default withApolloFetch(translate('translations')(NewProjectForm))
