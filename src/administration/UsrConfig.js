import React, { Component } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Input, Modal} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'

class UsrConfig extends Component{
  constructor(props){
    super(props)
  }

  modData(which, value){
    switch(which){
      case 0:

    }
    let query = `
    mutation updateProfile {
        updateCaaProfile(id: cacca,
                        profile_name: blu,

    }
    `
    this.props.apolloFetch({ query })
        .then((data) => {
            this.componentWillMount()
        })
        .catch((error) => {
            console.log(error);
        })
  }
  render(){

    return(
      <Modal trigger={this.props.trigger}>
        <Modal.Header>Modifica Utente</Modal.Header>
        <Modal.Content>
          <Table celled padded textAlign='center'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Valore Attuale</Table.HeaderCell>
                <Table.HeaderCell>Nuovo Valore</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row key='0'>
                <Table.Cell>
                  Nome
                </Table.Cell>
                <Table.Cell>
                  {this.props.name}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....'/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content visible> Modifica </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='1'>
                <Table.Cell>
                  Email
                </Table.Cell>
                <Table.Cell>
                  {this.props.email}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....'/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content visible> Modifica </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='2'>
                <Table.Cell>
                  Organizzazione
                </Table.Cell>
                <Table.Cell>
                  {this.props.organization}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....'/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content visible> Modifica </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='3'>
                <Table.Cell>
                  Sito Web
                </Table.Cell>
                <Table.Cell>
                  {this.props.link_web}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....'/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content visible> Modifica </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    )
  }

}
export default translate('translations') (withRouter(withApolloFetch(UsrConfig)))
