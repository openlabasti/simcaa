import React, { Component } from 'react'
import { Modal, Button, Table, Icon, Image } from 'semantic-ui-react'
import { withApolloFetchNoAuth } from './withApolloFetchNoAuth'
import { translate, Trans } from 'react-i18next'

class DeleteCustomTitle extends Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    // Handle open and close of the modal
    openCloseModal() {
        this.setState({open: !this.state.open})
    }

    // Call the props function to delete the selected title
    deleteCurrentTitle(title, e) {
        this.props.deleteTitle(title)
        this.openCloseModal()
    }

    // Call the props function to delete the selected text
    deleteCurrentText(text, e) {
        this.props.deleteText(text)
        this.openCloseModal()
    }

    // Call the props function to delete the selected image
    deleteCurrentImage(image, e) {
        this.props.deleteImage(image)
        this.openCloseModal()
    }

    render() {
        const { t, i18n } = this.props

        let dataTableTitle = this.props.title
        dataTableTitle = dataTableTitle.map((item, index) => {
            let title = item.card.map(x => x.lemma).join(' ').toString()
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>Title</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell collapsing>
                        <Icon name='trash' color='red' size='big' className='icon-pointer'
                            onClick={this.deleteCurrentTitle.bind(this, item)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })

        let dataTableText = this.props.text
        dataTableText = dataTableText.map((item, index) => {
            let text = item.text.length > 50 ? item.text.substring(0,50) + '...' : item.text
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>Text</Table.Cell>
                    <Table.Cell>{text}</Table.Cell>
                    <Table.Cell collapsing>
                        <Icon name='trash' color='red' size='big' className='icon-pointer'
                            onClick={this.deleteCurrentText.bind(this, item)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })

        let dataTableImage = this.props.image
        dataTableImage = dataTableImage.map((item, index) => {
            let src = window.env.MediaImage + this.props.projectid + '/' + item.name
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>Image</Table.Cell>
                    <Table.Cell><Image src={src} size='tiny'/></Table.Cell>
                    <Table.Cell collapsing>
                        <Icon name='trash' color='red' size='big' className='icon-pointer'
                            onClick={this.deleteCurrentImage.bind(this, item)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })

        return(
            <Modal trigger={<Button color='yellow' onClick={this.openCloseModal.bind(this)} disabled={this.props.disabled} style={this.props.style}>Delete Title</Button>}
                open={this.state.open}
            >
                <Modal.Header>Delete Custom Title</Modal.Header>
                <Modal.Content>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {dataTableTitle}
                            {dataTableText}
                            {dataTableImage}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.openCloseModal.bind(this)}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default translate('translations')(withApolloFetchNoAuth(DeleteCustomTitle, {display: 'inline-block'}))
