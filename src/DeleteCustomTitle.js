import React, { Component } from 'react'
import { Modal, Button, Table, Icon } from 'semantic-ui-react'
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

    render() {
        const { t, i18n } = this.props

        let dataTable = this.props.title
        dataTable = dataTable.map((item, index) => {
            let title = item.card.map(x => x.lemma).join(' ').toString()
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>
                        {index}
                    </Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell collapsing>
                        <Icon name='trash' color='red' size='big' className='icon-pointer'
                            onClick={this.deleteCurrentTitle.bind(this, item)}
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
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {dataTable}
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
