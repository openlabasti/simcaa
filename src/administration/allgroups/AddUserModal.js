import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Message, Popup, Transition } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from '../../withApolloFetch'
import { withRouter} from 'react-router-dom'

import UsrTable from './UsrTable'

class AddUserModal extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      email: '',
      username: '',
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
  emailChange(e){
    this.setState({email: e.target.value});
  }
  userChange(e){
    this.setState({username: e.target.value});
  }
  toggleReveal(){
    let search = '';
    let last = true;
    if(this.state.name !== ''){
      search += `name: "${this.state.name}"`;
      last=false
    }
    if(this.state.username !== ''){
      if(last)
        search += `user: "${this.state.username}"`;
      else {
        search += ` , user: "${this.state.username}"`;
      }
      last = false
    }
    if(this.state.email !== ''){
      if(last)
        search += ` email: "${this.state.email}"`;
      else {
        search += ` , email: "${this.state.email}"`;
      }
      last = false
    }
    if(search !== ''){
      let query=`
      query getUsers {
        caa_users (${search}){
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
      }
      `
      this.setState({loading: true});
      this.props.apolloFetch({query}).then((data)=>{
        if(data.hasOwnProperty('errors')){
          this.setState({interror: true, loading: false})
        }else{
          this.setState({
            loading: false,
            result: true,
            usrsFound: data.data.caa_users.data
          });
        }
      })
      .catch(error=>{console.log(error);})
    }else{
      //ERRORE NESSUN PARAMETRO DI RICERCA INSERITO
      this.setState({missingData: true});
    }
  }
  close(){
    this.setState({
      interror: false,
      result: false,
      open: false
     });
  }
  closeMissingError(){
    this.setState({missingData: false});
  }
  render(){
    const { t, i18n } = this.props
      return(
        <Modal trigger={<Popup trigger={<Button circular floated="right" onClick={()=>this.setState({open:true})} icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open} onClose={()=>this.close()}>
          <Modal.Header>{t("ALLGROUPS_ADDUSR_H")}</Modal.Header>
          <Modal.Content>
                  <p>{t("ADDUSR_HELPER")}</p>
                  <Form>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>{t("ADDUSR_SEARCH_NAME")}</label>
                        <input placeholder={t("TBL_NAME")}
                               value={this.state.name}
                               onChange={this.nameChange.bind(this)}
                               />
                      </Form.Field>
                      <Form.Field>
                        <label>{t("ADDUSR_SEARCH_EMAIL")}</label>
                        <input placeholder='email'
                               value={this.state.email}
                               onChange={this.emailChange.bind(this)}
                               />
                      </Form.Field>
                      <Form.Field>
                        <label>{t("ADDUSR_SEARCH_USER")}</label>
                        <input placeholder={t("TBL_USR")}
                               value={this.state.username}
                               onChange={this.userChange.bind(this)}
                               />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                  <Message negative compact style={{position: 'absolute', left:'50%', transform: 'translate(-50%)'}} hidden={!this.state.missingData} onDismiss={()=>this.closeMissingError()}>
                    <Message.Header> {t("INTERROR_HEADER")} </Message.Header>
                   <p>{t("ADDUSR_MISSING_DATA")}</p>
                  </Message>
                  <Transition visible={this.state.result} animation='scale' duration={700}>
                    <UsrTable action='add' users={this.state.usrsFound} team={this.props.team} groups={this.state.groups} update={this.props.update} showError={this.props.showError}/>
                  </Transition>
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button primary loading={this.state.loading} onClick={this.toggleReveal.bind(this)}>{t("ADDUSR_SEARCH_BTN")}</Button>
              <Button.Or text='or'/>
              <Button negative onClick={this.close.bind(this)}>{t("BTN_DENY")}</Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      )
    }
}
export default translate('translations') (withRouter(withApolloFetch(AddUserModal)))
