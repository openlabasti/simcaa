import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Message, Popup, Reveal } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from '../../withApolloFetch'
import { withRouter} from 'react-router-dom'
import Zoom from 'react-reveal/Zoom'
import UsrTable from './UsrTable'

class AddUserModal extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      id: -1,
      user: '',
      result: false,
      open: false,
      usrsFound: [],
      groups: [],
      teams: [],
      loading: false,
      interror: false,
      missingData: false

    }
  }
  nameChange(e){
    this.setState({name: e.target.value});
  }
  idChange(e){
    this.setState({id: e.target.value});
  }
  userChange(e){
    this.setState({username: e.target.value});
  }
  toggleReveal(){
    let search = '';
    console.log(this.state);
    if(this.state.name !== ''){
      search += `name: "${this.state.name}"`;
    }
    if(this.state.user !== ''){
      search += ` user: "${this.state.user}"`;
    }
    if(this.state.id !== -1){
      search += `name: ${this.state.id}`;
    }
    console.log(search);
    if(search !== ''){
    let query=`
    query getAllUsers {
      caa_users {
        data{
          id
          name
          user
          email
          organization
          link_web
          group_id
          team_id
        }
      }
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

    }
    `
    this.setState({loading: true});
    this.props.apolloFetch({query}).then((data)=>{
      console.log(data);
      if(data.hasOwnProperty('errors')){
        this.setState({interror: true, loading: false})
      }else{
        console.log(data.data.caa_users.data);
        this.setState({
          loading: false,
          result: true,
          usrsFound: data.data.caa_users.data,
          groups: data.data.groups.data,
          teams: data.data.team.data
        });
      }
    })
  }else{
    //ERRORE NESSUN PARAMETRO DI RICERCA INSERITO
    this.setState({missingData: true});
  }
  }
  close(){
    this.setState({
      result: false,
      open: false
     });

  }
  render(){
    const { t, i18n } = this.props
    if(this.state.result){
      return(
        <Modal trigger={<Popup trigger={<Button circular floated="right" onClick={()=>this.setState({open:true})} icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open} onClose={()=>this.setState({interror:false, open:false})}>
          <Modal.Header>Aggiunta Utente</Modal.Header>
          <Modal.Content>
            <Zoom left>
              <UsrTable users={this.state.usrsFound} teams={this.state.teams} groups={this.state.groups}/>
            </Zoom>
            <Button onClick={this.close.bind(this)}>Continua</Button>
          </Modal.Content>
        </Modal>
      )
    }else{
    return(
      <Modal trigger={<Popup trigger={<Button circular floated="right" onClick={()=>this.setState({open:true})} icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open} onClose={()=>this.setState({interror:false, open:false})}>
        <Modal.Header>Aggiunta Utente</Modal.Header>
        <Modal.Content>
                <p>Cerca utente da inserire nel team:</p>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <label>Per nome e cognome</label>
                      <input placeholder={t("TBL_NAME")}
                             value={this.state.name}
                             onChange={this.nameChange.bind(this)}
                             />
                    </Form.Field>
                    <Form.Field>
                      <label>Per id</label>
                      <input placeholder={t("TBL_NAME")}
                             value={this.state.id}
                             onChange={this.idChange.bind(this)}
                             />
                    </Form.Field>
                    <Form.Field>
                      <label>Per username</label>
                      <input placeholder={t("TBL_NAME")}
                             value={this.state.username}
                             onChange={this.userChange.bind(this)}
                             />
                    </Form.Field>
                  </Form.Group>
                  <Button onClick={this.toggleReveal.bind(this)}>Cerca</Button>
                </Form>
        </Modal.Content>
      </Modal>
    )
  }
  }
}
export default translate('translations') (withRouter(withApolloFetch(AddUserModal)))
