import React, { Component } from 'react'
import { Modal, Button, Form, Select, Message, Dimmer, Loader } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from '../withApolloFetch'
import { withRouter} from 'react-router-dom'

class NewUserForm extends Component{
  constructor(props){
    super(props)
    this.state={
      newName: '',
      newEmail: '',
      newOrg: '',
      newLinkWeb: '',
      newUsername: '',
      newPassword: '',
      group_id: 5,
      team_id: 1,
      groups: [],
      teams: [],
      loading: false,
      interror: false,
      missingData: false,
      added: false,
      open: false
    }
  }
  componentWillMount(){
    this.setState({loading: true});
    let query = `
    query{
        groups{
          data {
            id
            desc_group
          }
        }
        team{
          data {
            id
            name
          }
        }
    }`;
    this.props.apolloFetch({query}).then((data)=>{
      let tmp = []
      data.data.groups.data.map((group)=>{
        tmp.push({
          text: group.desc_group,
          value: group.id
        })
      });
      this.setState({groups: tmp})
      tmp = []
      data.data.team.data.map((team)=>{
        tmp.push({
          text: team.name,
          value: team.id
        });
      });
      this.setState({teams: tmp},()=>{
        this.setState({loading: false});
      });
    });
  }

  newNameChange(e){
    this.setState({newName: e.target.value})
  }
  newEmailChange(e){
    this.setState({newEmail: e.target.value})
  }
  newOrgChange(e){
    this.setState({newOrg: e.target.value})
  }
  newLinkWebChange(e){
    this.setState({newLinkWeb: e.target.value})
  }
  newUsernameChange(e){
    this.setState({newUsername: e.target.value})
  }
  newPassChange(e){
    this.setState({newPassword: e.target.value})
  }
  selectGroup(e,data){
    this.setState({group_id: data.value})
  }
  selectTeam(e,data){
    this.setState({team_id: data.value})
  }
  handleSubmit(){
    if(this.state.newName == "" || this.state.newEmail == "" || this.state.newPassword == "" || this.state.newUsername == ""){
      this.setState({missingData: true})
    }else{
      this.setState({missingData: false, loading: true})
      let query = `
      mutation updateUser {
          createCaaUser(
                          name: "${this.state.newName}",
                          email: "${this.state.newEmail}",
                          password: "${this.state.newPassword}",
                          user: "${this.state.newUsername}",
                          organization: "${this.state.newOrg}",
                          link_web: "${this.state.newLinkWeb}",
                          group_id: ${this.state.group_id},
                          team_id: ${this.state.team_id}
                        ){
                  id
          }
      }`
      this.props.apolloFetch({query}).then((data)=>{
        if(data.hasOwnProperty('errors')){
          this.setState({interror: true, loading:false})
        }else{
          this.setState({interror: false, loading:false, added: true, open:true})
          this.props.update()
        }
      })
    }
  }
  render(){
    if(this.state.loading){
      return(
        <Modal trigger={<Button primary onClick={()=>this.setState({open:true})}>Nuovo Utente</Button>}>
          <Modal.Content>
          <Dimmer active>
            <Loader />
          </Dimmer>
          </Modal.Content>
        </Modal>
      )
    }else{
      if(this.state.interror){
        //messaggio di errore interno
        return(
          <Modal trigger={<Button primary onClick={()=>this.setState({open:true})}>Nuovo Utente</Button>} open={this.state.open} onClose={()=>this.setState({interror:false, open:false})}>
            <Modal.Content>
              <Message negative>
                <Message.Header>Si è verificato un errore!</Message.Header>
                <p>Si è verificato un errore interno, riprovare più tardi</p>
              </Message>
              <Button primary onClick={()=>this.setState({interror:false, open:false})}>Continua</Button>
            </Modal.Content>
          </Modal>
        )
      }else if(this.state.missingData){
        //errore dato mancante in form
        return(
          <Modal trigger={<Button primary onClick={()=>this.setState({open:true})}>Nuovo Utente</Button>} open={this.state.open}>
            <Modal.Header>Nuovo utente</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field required>
                  <label>Nome</label>
                  <input placeholder='Nome e Cognome'
                         value={this.state.newName}
                         onChange={this.newNameChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Email</label>
                  <input placeholder='Email'
                         value={this.state.newEmail}
                         onChange={this.newEmailChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Password</label>
                  <input placeholder='Password'
                         type='password'
                         value={this.state.newPassword}
                         onChange={this.newPassChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Username</label>
                  <input placeholder='Username'
                         value={this.state.newUsername}
                         onChange={this.newUsernameChange.bind(this)}
                         />
                </Form.Field>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Sito Web</label>
                    <input placeholder='Sito web'
                           value={this.state.newLinkWeb}
                           onChange={this.newLinkWebChange.bind(this)}
                           />
                  </Form.Field>
                  <Form.Field>
                    <label>Organizzazione</label>
                    <input placeholder='Organizzazione'
                           value={this.state.newOrg}
                           onChange={this.newOrgChange.bind(this)}
                           />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Ruolo</label>
                    <Select options={this.state.groups}
                            onChange={this.selectGroup.bind(this)}
                            />
                  </Form.Field>
                  <Form.Field>
                    <label>Team</label>
                    <Select options={this.state.teams}
                            onChange={this.selectTeam.bind(this)}
                            />
                  </Form.Field>
                </Form.Group>
                <Message negative>
                  <Message.Header>Dati mancanti!</Message.Header>
                  <p>I campi segnati con * sono obbligatori</p>
                </Message>

                <div>
                  <Button primary onClick={this.handleSubmit.bind(this)}> Procedi </Button>
                  <Button negative onClick={()=>this.setState({open:false, missingData:false})}> Annulla </Button>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        );
      }else if(this.state.added){
        return(
          <Modal trigger={<Button primary onClick={()=>this.setState({open:true})}>Nuovo Utente</Button>} open={this.state.open} onClose={()=>this.setState({interror:false})}>
            <Modal.Content>
              <Message positive>
                <Message.Header>Tutto ok!</Message.Header>
                <p>Utente creato correttamente</p>
              </Message>
              <Button primary onClick={()=>this.setState({open:false, added:false})}>Continua</Button>
            </Modal.Content>
          </Modal>
        )
      }else{
        //form inserimento
        return(
          <Modal trigger={<Button primary onClick={()=>this.setState({open:true})}>Nuovo Utente</Button>} open={this.state.open}>
            <Modal.Header>Nuovo utente</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field required>
                  <label>Nome</label>
                  <input placeholder='Nome e Cognome'
                         value={this.state.newName}
                         onChange={this.newNameChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Email</label>
                  <input placeholder='Email'
                         value={this.state.newEmail}
                         onChange={this.newEmailChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Password</label>
                  <input placeholder='Password'
                         type='password'
                         value={this.state.newPassword}
                         onChange={this.newPassChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field required>
                  <label>Username</label>
                  <input placeholder='Username'
                         value={this.state.newUsername}
                         onChange={this.newUsernameChange.bind(this)}
                         />
                </Form.Field>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Sito Web</label>
                    <input placeholder='Sito web'
                           value={this.state.newLinkWeb}
                           onChange={this.newLinkWebChange.bind(this)}
                           />
                  </Form.Field>
                  <Form.Field>
                    <label>Organizzazione</label>
                    <input placeholder='Organizzazione'
                           value={this.state.newOrg}
                           onChange={this.newOrgChange.bind(this)}
                           />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Ruolo</label>
                    <Select options={this.state.groups}
                            onChange={this.selectGroup.bind(this)}
                            />
                  </Form.Field>
                  <Form.Field>
                    <label>Team</label>
                    <Select options={this.state.teams}
                            onChange={this.selectTeam.bind(this)}
                            />
                  </Form.Field>
                </Form.Group>
                <div>
                  <Button primary onClick={this.handleSubmit.bind(this)}> Procedi </Button>
                  <Button negative onClick={()=>this.setState({open:false})}>Annulla</Button>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        );
      }
    }
  }
}
export default translate('translations')(withApolloFetch(NewUserForm))
