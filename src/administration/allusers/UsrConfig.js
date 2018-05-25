import React, { Component } from 'react'
import {Table, Dimmer, Loader, Button, Icon, Input, Modal, Message} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../../withApolloFetch'
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
      newWeb: '',
      name: this.props.name,
      email: this.props.email,
      organization: this.props.organization,
      web: this.props.link_web,
      interror: false,
      loading: false,
      missingData: false
    }
  }

  modData(which){
    let paramToUpdate = "";
    let value = "";
    switch(which){
      case 0:
        paramToUpdate = "name"
        value = ((this.state.newName != '') ? this.state.newName : '-1')
        break;
      case 1:
        paramToUpdate = "email"
        value = ((this.state.newEmail != '') ? this.state.newEmail : '-1')
        break;
      case 2:
        paramToUpdate = "organization"
        value = ((this.state.newOrganization != '') ? this.state.newOrganization : '-1')
        break;
      case 3:
        paramToUpdate = "link_web"
        value = ((this.state.newWeb != '') ? this.state.newWeb : '-1')
        break;
      default:
        break;
    }
    //faccio query solo se il valore da inserire non è vuoto
    if(value != '-1'){
      let query = `
      mutation updateUser {
          updateCaaUser(id: ${this.props.id},
                          ${paramToUpdate}: "${value}"){
              id
          }
      }
      `
      this.setState({loading: true})
      this.props.apolloFetch({ query })
          .then((data) => {
              if(data.hasOwnProperty('errors')){
                this.setState({interror: true, loading: false})
              }else{
                switch(which){
                  case 0:
                    this.setState({
                      name: value
                    })
                    break;
                  case 1:
                    this.setState({
                      email: value
                    })
                    break;
                  case 2:
                    this.setState({
                      organization: value
                    })
                    break;
                  case 3:
                    this.setState({
                      web: value
                    })
                    break;
                  default:
                    break;
              }
              this.setState({loading: false})
              this.props.update();
            }
          })
          .catch((error) => {
              this.setState({loading: false, interror: true})
          })
      }else{
        //errore dati mancanti
        this.setState({missingData: true});
      }
  }


  handleNameInput(e){
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
    const { t, i18n } = this.props
    return(
      <Modal trigger={this.props.trigger} onClose={()=>{this.setState({interror: false, missingData: false})}}>
        <Modal.Header>{t("USR_CNFG_H")}</Modal.Header>
        <Modal.Content>
          <Table celled padded textAlign='center'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>{t("USR_CNFG_CUR_VAL")}</Table.HeaderCell>
                <Table.HeaderCell>{t("USR_CNFG_NEW_VAL")}</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row key='0'>
                <Table.Cell>
                  {t("TBL_NAME")}
                </Table.Cell>
                <Table.Cell>
                  {this.state.name}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....' onChange={this.handleNameInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button positive animated onClick={()=>this.modData(0)} loading={this.state.loading}>
                    <Button.Content visible> {t("BTN_MOD")} </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='1'>
                <Table.Cell>
                  {t("TBL_EMAIL")}
                </Table.Cell>
                <Table.Cell>
                  {this.state.email}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....' onChange={this.handleEmailInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button positive animated onClick={()=>this.modData(1)} loading={this.state.loading}>
                    <Button.Content visible> {t("BTN_MOD")} </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='2'>
                <Table.Cell>
                  {t("TBL_ORG")}
                </Table.Cell>
                <Table.Cell>
                  {this.state.organization}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....' onChange={this.handleOrgInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button positive animated onClick={()=>this.modData(2)} loading={this.state.loading}>
                    <Button.Content visible> {t("BTN_MOD")} </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row key='3'>
                <Table.Cell>
                  {t("TBL_LWEB")}
                </Table.Cell>
                <Table.Cell>
                  {this.state.web}
                </Table.Cell>
                <Table.Cell>
                  <Input placeholder='....' onChange={this.handleWebInput.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                  <Button positive animated onClick={()=>this.modData(3)} loading={this.state.loading}>
                    <Button.Content visible> {t("BTN_MOD")} </Button.Content>
                    <Button.Content hidden> <Icon name='checkmark'/> </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Message negative hidden={!this.state.interror} onDismiss={()=>{this.setState({interror: false})}}>
            <Message.Header>{t("INTERROR_HEADER")}</Message.Header>
            <p>{t("INTERROR_BODY")}</p>
          </Message>
          <Message negative hidden={!this.state.missingData} onDismiss={()=>{this.setState({missingData: false})}}>
            <Message.Header>{t("USR_CNFG_MISSING_DATA_H")}</Message.Header>
            <p>{t("USR_CNFG_MISSING_DATA_B")}</p>
          </Message>
        </Modal.Content>
      </Modal>
    )
  }

}
export default translate('translations') (withRouter(withApolloFetch(UsrConfig)))
