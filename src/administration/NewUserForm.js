import React, { Component } from 'react'
import { Modal, Icon, Button, Form, Dropdown, Message, TextArea, Checkbox } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class NewUserForm extends Component{
  constructor(props){
    super(props)
    this.state={
      newName: '',
      newEmail: '',
      newPwd: '',
      newOrg: '',
      newLinkWeb: '',
      newUsername: ''
    }
  }
  newNameChange(e){
    this.setState({newName: e})
  }
  newEmailChange(e){
    this.setState({newEmail: e})
  }
  newPwdChange(e){
    this.setState({newPwd: e})
  }
  newOrgChange(){
    this.setState({newOrg: e})
  }
  newLinkWebChange(){
    this.setState({newLinkWeb: e})
  }
  newUsernameChange(){
    this.setState({newUsername: e})
  }
  render(){
    return(
      <Modal trigger={<Button primary>Nuovo utente</Button>}>
        <Modal.Header>Nuovo utente</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.field required>
              <label>Nome e Cognome</label>
              <input value={this.state.newName} onChange={this.newNameChange.bind(this)}

            <Form.input label='Nome'/>
            <Form.input label='Email'/>
            <Form.input label='Username'/>
            <Form.input label='Organizazzione'/>
            <Form.input label='Sito Web'/>
          </Form>
        </Modal.Content>
      </Modal>

    )
  }
}
