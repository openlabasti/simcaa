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
            profile: this.props.edit ? '' : this.props.optionsProfiles[0].value,
            layout: this.props.edit ? '' : this.props.optionsLayouts[0].value,
            newProjectTitle: '',
            newProjectNote: '',
            iconColor: 'black',
        }
    }

    componentWillMount() {
        if(this.props.edit && this.props.data) {
            let projectTitle = this.props.data.proj_name
            let projectNote = this.props.data.proj_note
            let share = this.props.data.proj_share === 1 ? true : false
            this.setState({newProjectTitle: projectTitle, newProjectNote: projectNote, share})
        }
    }

    handleOpenCloseModal(action) {
        let title, note
        if (action === 'open') {
            if (this.props.edit && this.props.data) {
                title = this.state.newProjectTitle
                note = this.state.newProjectNote
            } else {
                title = ''
                note = ''
            }
        } else {
            if (this.props.edit && this.props.data) {
                title = this.props.data.proj_name
                note = this.props.data.proj_note
                let share = this.props.data.proj_share === 1 ? true : false
                this.setState({share})
            } else {
                title = ''
                note = ''
            }
        }
        this.setState({modalVisible: !this.state.modalVisible, newProjectTitle: title, newProjectNote: note})
    }

    handleFormChange(e) {
        this.setState({newProjectTitle: e.target.value})
    }

    handleDropdownChange(dropdownType, e, data) {
        if(dropdownType === 'profile') {
            this.setState({profile: data.value})
        } else {
            this.setState({layout: data.value})
        }
    }

    handleCheckboxChange(e) {
        this.setState({share: !this.state.share})
    }

    handleTextAreaChange(e) {
        this.setState({newProjectNote: e.target.value})
    }

    // Call the create function from props
    createNewProject() {
        if(this.state.newProjectTitle === '') {
            this.setState({errorMessage: false})
        }
        else {
            this.props.createProject(this.state.newProjectTitle, this.state.newProjectNote,
                                        this.state.share, this.state.profile, this.state.layout)
            this.setState({errorMessage: true, modalVisible: !this.state.modalVisible})
        }
    }

    // Call the create function from props
    updateProject() {
        if(this.state.newProjectTitle === '') {
            this.setState({errorMessage: false})
        }
        else {
            this.props.updateProject(this.props.data.id, this.state.newProjectTitle, this.state.newProjectNote,
                                        this.state.share, this.state.layout)
            this.setState({errorMessage: true, modalVisible: !this.state.modalVisible})
        }
    }

    onMouseOverIcon() {
        let newColor = this.state.iconColor === 'black' ? 'green' : 'black'
        this.setState({iconColor: newColor})
    }

    render() {
        const { t, i18n } = this.props

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

        return (
                <Modal trigger={iconModal} closeOnDimmerClick={false} open={this.state.modalVisible}>
                    <Modal.Header>{this.props.edit ? t("MAIN_BTN_UPDATE") : t("MAIN_LBL_CREATE")}</Modal.Header>
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
                                <Dropdown placeholder='Profile' selection options={this.props.optionsProfiles}
                                    placeholder='Cannot change profile now'
                                    disabled={this.props.edit ? true : false}
                                    defaultValue={this.props.edit ? '' : this.props.optionsProfiles[0].value}
                                    onChange={this.handleDropdownChange.bind(this, 'profile')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("MAIN_FRM_LAYOUT")}</label>
                                <Dropdown placeholder='Layout' selection options={this.props.optionsLayouts}
                                    placeholder='Cannot change layout now'
                                    defaultValue={this.props.edit ? this.props.data.proj_layout : this.props.optionsLayouts[0].value}
                                    onChange={this.handleDropdownChange.bind(this, 'layout')}
                                />
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
                            <Button color='green'
                                onClick={this.props.edit ? this.updateProject.bind(this) : this.createNewProject.bind(this)}
                            >
                                {this.props.edit ? t("MAIN_BTN_UPDATE") : t("MAIN_BTN_CREATE")}
                            </Button>
                            <Button.Or />
                            <Button color='red' onClick={this.handleOpenCloseModal.bind(this, 'close')}>
                                {t("MAIN_BTN_CLOSE")}
                            </Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
        )
    }
}

export default withApolloFetch(translate('translations')(NewProjectForm))
