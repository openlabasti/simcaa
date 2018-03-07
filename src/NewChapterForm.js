import React, { Component } from 'react'
import { Modal, Icon, Button, Form, Dropdown, Message } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class NewChapterForm extends Component {
    constructor(props) {
        super(props)
        this.state= {
            modalVisible: false,
            errorMessage: true,
            newChaptherTitle: '',
            iconColor: 'black',
        }
    }

    handleOpenCloseModal() {
        this.setState({modalVisible: !this.state.modalVisible, newChaptherTitle: ''})
    }

    handleFormChange(e) {
        this.setState({newChaptherTitle: e.target.value})
    }

    handleForm() {
        if(this.state.newChaptherTitle === '') {
            this.setState({errorMessage: false})
        }
        else {
            this.props.createChapter(this.state.newChaptherTitle)
            this.setState({errorMessage: true, modalVisible: !this.state.modalVisible})
        }
    }

    onMouseOverIcon() {
        let newColor = this.state.iconColor === 'black' ? 'green' : 'black'
        this.setState({iconColor: newColor})
    }

    render() {
        const { t, i18n } = this.props

        let options = [{value: 'default', text: 'Default'}]

        let iconModal = <Icon name='add square'
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
                    <Modal.Header>{t("PRJ_FRM_HEADER")}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field required>
                                <label>{t("PRJ_FRM_TITLE")}</label>
                                <input placeholder={t("PRJ_FRM_TITLE")}
                                    value={this.state.newChaptherTitle}
                                    onChange={this.handleFormChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("PRJ_FRM_LAYOUT")}</label>
                                <Dropdown placeholder='Layout' selection options={options}
                                    defaultValue='default' />
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
                                {t("PRJ_BTN_CREATE")}
                            </Button>
                            <Button.Or />
                            <Button color='red' onClick={this.handleOpenCloseModal.bind(this)}>
                                {t("PRJ_BTN_CLOSE")}
                            </Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default withApolloFetch(translate('translations')(NewChapterForm))
