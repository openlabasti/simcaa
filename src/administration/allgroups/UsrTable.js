import React, { Component } from 'react'
import {Table, Button, Popup, Icon, Confirm} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../../withApolloFetch'

class UsrTable extends Component{
  constructor(props){
    super(props)
    this.state={
      openConfirmDelete: false
    }
  }

  openConfirm(id){
    this.setState({openConfirmDelete: true, idToDelete: id, loading: true});
  }

  handleCancel(){
    this.setState({openConfirmDelete: false});
  }

  handleDelete(){
    //QUERY DELETE DA GRUPPO

    let query = `
      mutation removeFromTeam{
        updateCaaUser(id: ${this.state.idToDelete}, team_id: 1){
          id
        }
      }`
      this.props.apolloFetch({ query })
          .then((data) => {
            if(data.hasOwnProperty('errors')){
              this.props.showError();
            }else{
              this.setState({openConfirmDelete: false, loading:false})
              this.props.update();
            }
          })
          .catch((error) => {
              console.log(error);
          })
  }

  addUser(id){
    let query = `
      mutation addToTeam{
        updateCaaUser(id: ${id}, team_id: ${this.props.team}){
            id
            team_id
        }
      }`
      this.setState({loading: true})
      this.props.apolloFetch({ query })
          .then((data) => {
            if(data.hasOwnProperty('errors')){
              this.props.showError();
            }else{
              this.setState({loading: false});
              this.props.update();
            }
          })
          .catch((error) => {
              console.log(error);
          })
  }
  render(){
    const { t, i18n } = this.props
    let tableLayout = this.props.users.map((item)=>{
      let actionLayout= <div/>
      if(this.props.action==='add'){
        actionLayout = <Popup
          trigger={<Button circular icon={<Icon name='add user' size='large'/>} onClick={()=>this.addUser(item.id)}/>}
          content= {t("POPUP_ADD")}
          />
      }else if(this.props.action==='delete'){
        actionLayout = <Popup
          trigger={<Button circular icon={<Icon name='remove user' size='large'/>} onClick={()=>this.openConfirm(item.id)}/>}
          content= {t("POPUP_DEL")}
          />
      }
      let group=<div/>
      for(let i=0; i<this.props.groups.length; i++){
        if(this.props.groups[i].id === item.group_id){
          group=this.props.groups[i].desc_group
          break;
        }
      }
      return(
        <Table.Row key={item.id}>
          <Table.Cell>
            {item.id}
          </Table.Cell>
          <Table.Cell>
            {item.name}
          </Table.Cell>
          <Table.Cell>
            {item.user}
          </Table.Cell>
          <Table.Cell>
            {item.email}
          </Table.Cell>
          <Table.Cell>
            {item.organization}
          </Table.Cell>
          <Table.Cell>
            {item.link_web}
          </Table.Cell>
          <Table.Cell>
            {group}
          </Table.Cell>
          <Table.Cell>
            {actionLayout}
          </Table.Cell>
        </Table.Row>
      )
    });
    //ho costruito le righe della tabella, ora ritorno la tabella
    if(this.props.action==='delete'){
      return(
        <div>
          <Table celled padded textAlign='center' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_NAME")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_USR")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_EMAIL")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_ORG")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_LWEB")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_GROUP")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_ACTION")}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableLayout}
            </Table.Body>
          </Table>
          <Confirm
              open={this.state.openConfirmDelete}
              header={t("DELETE_CNF_H")}
              content={t("ALLGROUPS_REMOVE")}
              onCancel={this.handleCancel.bind(this)}
              onConfirm={this.handleDelete.bind(this)}
          />
        </div>
      )
    }else if(this.props.action === 'add'){
      return(
        <Table celled padded textAlign='center' >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_NAME")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_USR")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_EMAIL")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_ORG")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_LWEB")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_GROUP")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_ACTION")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableLayout}
          </Table.Body>
        </Table>
      )
    }
  }

}
export default withApolloFetch(translate('translations')(UsrTable))
