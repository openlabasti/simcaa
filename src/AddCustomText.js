import React, { Component } from 'react'
import { Modal, Button, Segment, Input, Form, TextArea, Dropdown, Checkbox } from 'semantic-ui-react'
import { ChromePicker } from 'react-color';
import { translate, Trans } from 'react-i18next'

class AddCustomText extends Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            valueTextArea: '',
            optionsSize: [{value: 'mini', text: 'mini'}, {value: 'tiny', text: 'tiny'},
                        {value: 'small', text: 'small'}, {value: 'large', text: 'large'},
                        {value: 'big', text: 'big'}, {value: 'huge', text: 'huge'}, {value: 'massive', text: 'massive'}],
            optionsColor: [{value: 'red', text: 'red'}, {value: 'orange', text: 'orange'}, {value: 'yellow', text: 'yellow'},
                        {value: 'olive', text: 'olive'}, {value: 'green', text: 'green'}, {value: 'teal', text: 'teal'},
                        {value: 'blue', text: 'blue'}, {value: 'violet', text: 'violet'}, {value: 'purple', text: 'purple'},
                        {value: 'pink', text: 'pink'}, {value: 'brown', text: 'brown'}, {value: 'grey', text: 'grey'},
                        {value: 'black', text: 'black'}],
            segmentSize: 'small',
            segmentColor: null,
            inverted: false,
        }
    }

    // Handle open and close of the modal
    openCloseModal() {
        if (this.state.open === true) {
            this.setState({open: !this.state.open, valueTextArea: '', segmentColor: null, segmentSize: 'small', inverted: false})
        } else {
            this.setState({open: !this.state.open})
        }
    }

    // Handle change of the textarea text
    handleTextAreaChange(e, data) {
        this.setState({valueTextArea: data.value})
    }

    // Dropdown change size
    onChangeDropdown(type, e, data) {
        if (type === 'color') {
            this.setState({segmentColor: data.value})
        } else {
            this.setState({segmentSize: data.value})
        }
    }

    onChangeCheckbox() {
        this.setState({inverted: !this.state.inverted})
    }

    // Call the props to add text
    addText() {
        let text = this.state.valueTextArea.trim()
        this.props.addText(text, this.state.segmentSize, this.state.segmentColor, this.state.inverted)
        this.openCloseModal()
    }

    render() {
        const { t, i18n } = this.props

        return(
            <Modal trigger={<Button color='yellow' onClick={this.openCloseModal.bind(this)} disabled={this.props.disabled} style={this.props.style}>{t("TYPO_BTN_CUSTOMTEXT")}</Button>}
                open={this.state.open}
                size='fullscreen'
            >
                <Modal.Header>{t("TYPO_HDR_CUSTOMTEXT")}</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Group width='equal'>
                        <Form.Field control={Dropdown} label={t("TYPO_LBL_SIZETEXT")} selection
                            options={this.state.optionsSize} placeholder={t("TYPO_LBL_SIZETEXT")}
                            onChange={this.onChangeDropdown.bind(this, 'textsize')}
                        />
                        <Form.Field control={Dropdown} label={t("TYPO_LBL_COLORTEXT")} selection
                            options={this.state.optionsColor} placeholder={t("TYPO_LBL_COLORTEXT")}
                            onChange={this.onChangeDropdown.bind(this, 'color')}
                        />
                    </Form.Group>
                    <Form.Field control={Checkbox} label={t("TYPO_LBL_INVERTEDTEXT")}
                        onChange={this.onChangeCheckbox.bind(this)}
                        checked={this.state.inverted}
                    />
                    <Form.Field>
                        <label>{t("TYPO_LBL_TEXT")}</label>
                        <TextArea onChange={this.handleTextAreaChange.bind(this)} value={this.state.valueTextArea}/>
                    </Form.Field>
                </Form>
                <br />
                {t("TYPO_LBL_PREVIEW")}:
                <Segment compact size={this.state.segmentSize} color={this.state.segmentColor} inverted={this.state.inverted}>
                    {this.state.valueTextArea}
                </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button negative onClick={this.openCloseModal.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                    <Button.Or />
                        <Button positive onClick={this.addText.bind(this)}>{t("TYPO_BTN_CUSTOMTEXT")}</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default translate('translations')(AddCustomText)
