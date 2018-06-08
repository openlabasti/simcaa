import React, { Component } from 'react'
import { Modal, Button, Dropdown, Checkbox, Segment } from 'semantic-ui-react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { translate, Trans } from 'react-i18next'

class AddCustomText extends Component {
    constructor(props) {
        super(props)
        const html = ''
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState,
                optionsColor: [{value: 'red', text: 'red'}, {value: 'orange', text: 'orange'}, {value: 'yellow', text: 'yellow'},
                            {value: 'olive', text: 'olive'}, {value: 'green', text: 'green'}, {value: 'teal', text: 'teal'},
                            {value: 'blue', text: 'blue'}, {value: 'violet', text: 'violet'}, {value: 'purple', text: 'purple'},
                            {value: 'pink', text: 'pink'}, {value: 'brown', text: 'brown'}, {value: 'grey', text: 'grey'},
                            {value: 'black', text: 'black'}],
                segmentColor: null,
                inverted: false,
            }
        }
    }

    // Handle open and close of the modal
    openCloseModal() {
        const html = ''
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.setState({open: !this.state.open, editorState, segmentColor: null, inverted: false})
        } else {
            this.setState({open: !this.state.open, segmentColor: null, inverted: false})
        }
    }

    // handle Editor change
    onEditorStateChange(editorState) {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.setState({editorState})
    }

    // Dropdown change color
    onChangeDropdown(e, data) {
        this.setState({segmentColor: data.value})
    }

    // handle chackbox inverted color change
    onChangeCheckbox() {
        this.setState({inverted: !this.state.inverted})
    }

    // add the text to page
    addText() {
        let html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        this.props.addText(html, this.state.inverted, this.state.segmentColor)
        this.openCloseModal()
    }

    // MAIN RENDER
    render() {
        const { t, i18n } = this.props
        const { editorState } = this.state

        return (
            <Modal trigger={<Button color='yellow'
                            onClick={this.openCloseModal.bind(this)}
                            disabled={this.props.disabled}
                            style={this.props.style}>{t("TYPO_BTN_CUSTOMTEXT")}
                            </Button>}
                open={this.state.open}
                size='large'
            >
                <Modal.Header>{t("TYPO_HDR_CUSTOMTEXT")}</Modal.Header>
                <Modal.Content>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                        toolbar={{
                              options: ['inline',
                                  'blockType',
                                  'list',
                                  'textAlign',
                                  'colorPicker',
                                  'remove',
                                  'history'],
                        }}
                    />
                    <br />
                    {t("TYPO_LBL_COLORTEXT")}
                    <br />
                    <Dropdown selection
                        options={this.state.optionsColor} placeholder={t("TYPO_LBL_COLORTEXT")}
                        onChange={this.onChangeDropdown.bind(this)}
                    />
                    <br />
                    <br />
                    <Checkbox
                        onChange={this.onChangeCheckbox.bind(this)}
                        checked={this.state.inverted}
                        label={t("TYPO_LBL_INVERTEDTEXT")}
                    />
                    <br />
                    <Segment inverted={this.state.inverted} color={this.state.segmentColor}>
                        <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}} />
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
