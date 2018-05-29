import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Select, Message, Popup } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from '../../withApolloFetch'

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
        return null;
      });
      this.setState({groups: tmp})
      tmp = []
      data.data.team.data.map((team)=>{
        tmp.push({
          text: team.name,
          value: team.id
        });
        return null;
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
    if(this.state.newName === "" || this.state.newEmail === "" || this.state.newPassword === "" || this.state.newUsername === ""){
      this.setState({missingData: true})
    }else{
      let org="n.d."
      let link_web="n.d."
      if(this.state.newOrg !== ""){
        org = this.state.newOrg
      }
      if(this.state.newLinkWeb !== ""){
        link_web = this.state.newLinkWeb
      }
      this.setState({missingData: false, loading: true})
      let query = `
      mutation updateUser {
          createCaaUser(
                          name: "${this.state.newName}",
                          email: "${this.state.newEmail}",
                          password: "${this.state.newPassword}",
                          user: "${this.state.newUsername}",
                          organization: "${org}",
                          link_web: "${link_web}",
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
    const { t, i18n } = this.props
    if(this.state.interror){
      //messaggio di errore interno
      return(
        <Modal trigger={<Popup trigger={<Button circular floated="right" icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open} onClose={()=>this.setState({interror:false, open:false})}>
          <Modal.Content>
            <Message negative>
              <Message.Header>{t("INTERROR_HEADER")}</Message.Header>
              <p>{t("INTERROR_BODY")}</p>
            </Message>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={()=>this.setState({interror:false, open:false})}>{t("BTN_CONTINUE")}</Button>
          </Modal.Actions>
        </Modal>
      )
    }else if(this.state.added){
      //tutto ok, utente creato
      return(
        <Modal trigger={<Popup trigger={<Button circular floated="right" icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open} onClose={()=>this.setState({interror:false})}>
          <Modal.Content>
            <Message positive>
              <Message.Header>{t("CREATED_USR_H")}</Message.Header>
              <p>{t("CREATED_USR_C")}</p>
            </Message>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={()=>this.setState({open:false, added:false})}>{t("BTN_CONTINUE")}</Button>
          </Modal.Actions>
        </Modal>
      )
    }else{
      //form inserimento
      return(
        <Modal trigger={<Popup trigger={<Button circular floated="right" icon={<Icon circular name="add user" size="big"/>} onClick={()=>this.setState({open:true})}/>} content={t("POPUP_ADD")}/>} open={this.state.open}>
          <Modal.Header>{t("MODAL_HEADER")}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field required>
                <label>{t("TBL_NAME")}</label>
                <input placeholder={t("TBL_NAME")}
                       value={this.state.newName}
                       onChange={this.newNameChange.bind(this)}
                       />
              </Form.Field>
              <Form.Field required>
                <label>{t("TBL_EMAIL")}</label>
                <input placeholder={t("TBL_EMAIL")}
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
                <label>{t("TBL_USR")}</label>
                <input placeholder={t("TBL_USR")}
                       value={this.state.newUsername}
                       onChange={this.newUsernameChange.bind(this)}
                       />
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>{t("TBL_LWEB")}</label>
                  <input placeholder={t("TBL_LWEB")}
                         value={this.state.newLinkWeb}
                         onChange={this.newLinkWebChange.bind(this)}
                         />
                </Form.Field>
                <Form.Field>
                  <label>{t("TBL_ORG")}</label>
                  <input placeholder={t("TBL_ORG")}
                         value={this.state.newOrg}
                         onChange={this.newOrgChange.bind(this)}
                         />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>{t("TBL_GROUP")}</label>
                  <Select options={this.state.groups}
                          onChange={this.selectGroup.bind(this)}
                          />
                </Form.Field>
                <Form.Field>
                  <label>{t("TBL_TEAM")}</label>
                  <Select options={this.state.teams}
                          onChange={this.selectTeam.bind(this)}
                          />
                </Form.Field>
              </Form.Group>
            </Form>
            <Message negative hidden={!this.state.missingData} onDismiss={()=>{this.setState({missingData: false})}}>
              <Message.Header>{t("MISSING_DATA_H")}</Message.Header>
              <p>{t("MISSING_DATA_C")}</p>
            </Message>
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button primary onClick={this.handleSubmit.bind(this)} loading={this.state.loading}> {t("BTN_CONFIRM")} </Button>
              <Button.Or text='or'/>
              <Button negative onClick={()=>this.setState({open:false})}> {t("BTN_DENY")} </Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      );
    }
  }
}
export default translate('translations')(withApolloFetch(NewUserForm))
