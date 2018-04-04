import React, { Component } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Input, Modal} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'

class UsrConfig extends Component{
  constructor(props){
    super(props)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handleOrgInput = this.handleOrgInput.bind(this)
    this.handleWebInput = this.handleWebInput.bind(this)
    this.state={
      newName: '',
      newEmail: '',
      newOrganization: '',
      newWeb: ''
    }
  }

  modData(which){
    let paramToUpdate = "";
    let value = "";
    switch(which){
      case 0:
        paramToUpdate = "profile_name"
        value = this.state.newName
        break;
      case 1:
        paramToUpdate = "profile_email"
        value = this.state.newEmail
        break;
      case 2:
        paramToUpdate = "profile_organization"
        value = this.state.newOrganization
        break;
      case 3:
        paramToUpdate = "profile_link_web"
        value = this.state.newWeb
        break;
      default:
        paramToUpdate = ""
        break;
    }
    let query = `
    mutation updateProfile {
        updateCaaProfile(id: ${this.props.id},
                        ${paramToUpdate}: ${value}){
            id
        }
    }
    `
    console.log(this.state);
    this.props.apolloFetch({ query })
        .then((data) => {
            this.render()
        })
        .catch((error) => {
            console.log(error);
        })
  }


  handleNameInput(e){
    console.log(e);
    this.setState({
      newName: e.target.value
    })
  }
  handleEmailInput(e){
    this.setState({
      newEmail: e.target.value
    })
  }
  handleOrgInput(e){
    this.setState({
      newOrganization: e.target.value
    })
  }
  handleWebInput(e){
    this.setState({
      newWeb: e.target.value
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
                  <Input placeholder='....' onChange={()=>this.handleNameInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated onClick={()=>this.modData(0)}>
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
                  <Input placeholder='....' onChange={()=>this.handleEmailInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated onClick={()=>this.modData(1)}>
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
                  <Input placeholder='....' onChange={()=>this.handleOrgInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated onClick={()=>this.modData(2)}>
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
                  <Input placeholder='....' onChange={()=>this.handleWebInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button animated onClick={()=>this.modData(3)}>
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
