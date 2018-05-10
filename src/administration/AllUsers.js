import React, { Component, Link } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Confirm, Modal, Form} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'
import UsrConfig from './UsrConfig'
import NewUserForm from './NewUserForm'

class AllUsers extends Component{
  constructor(props){
    console.log('asd');
    super(props)
    this.update = this.update.bind(this)
    this.state={
      lock: 0,
      users: [],
      groups: [],
      teams: [],
      openConfirmDelete: false
    }
  }
  componentWillMount(){
    let query = `
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
    this.props.apolloFetch({query})
    .then((data)=>{
      this.setState({
        lock:1,
        users: data.data.caa_users.data,
        groups: data.data.groups.data,
        teams: data.data.team.data
      })
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  openConfirm(id){
    this.setState({idToDelete: id},()=>{
      this.setState({openConfirmDelete: true})
    })
  }

  handleDelete(){
    let query = `
    mutation delUser {
        deleteCaaUser(id: ${this.state.idToDelete}){
          id
        }
    }
    `
    this.props.apolloFetch({ query })
        .then((data) => {
            this.setState({openConfirmDelete: false});
            this.componentWillMount()
        })
        .catch((error) => {
            console.log(error);
        })
  }

  handleCancel(){
    this.setState({openConfirmDelete: false})
  }

  update(){
    this.componentWillMount();
  }

  render(){
    const { t, i18n } = this.props

    if(this.state.lock===1){
      let tableLayout = this.state.users.map((item)=>{
      let team=""
      let group=""
      for(let i=0; i<this.state.teams.length; i++){
        if(this.state.teams[i].id === item.team_id){
          team=this.state.teams[i].name
        }
      }
      for(let i=0; i<this.state.groups.length; i++){
        if(this.state.groups[i].id === item.group_id){
          group=this.state.groups[i].desc_group
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
            {team}
          </Table.Cell>
          <Table.Cell style={{display: "flex"}}>
            <Popup
              trigger={<Button circular icon={<Icon name='remove user' size='large'/>} onClick={()=>this.openConfirm(item.id)}/>}
              content= {t("POPUP_DEL")}
              />
            <Popup
              trigger={
                <UsrConfig trigger={<Button circular icon={<Icon name='configure' size='large'/>} />}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  organization = {item.organization}
                  link_web = {item.link_web}
                  update = {()=>{this.update()}}
                />
              }
              content= {t("POPUP_MOD")}
              />

          </Table.Cell>
        </Table.Row>

        )
      });
      const tableStyle={
        marginTop: '15px'
      }
      return(
        <div>
        <Segment style={tableStyle}>
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
                <Table.HeaderCell>{t("TBL_TEAM")}</Table.HeaderCell>
                <Table.HeaderCell>{t("TBL_ACTION")}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableLayout}
            </Table.Body>
          </Table>

          <NewUserForm
            update = {()=>{this.update()}}/>
        </Segment>
        <Confirm
            open={this.state.openConfirmDelete}
            header={t("DELETE_CNF_H")}
            content={t("DELETE_CNF_C")}
            onCancel={this.handleCancel.bind(this)}
            onConfirm={this.handleDelete.bind(this)}
        />
        </div>
        )
    }else{
      return(
          <Dimmer active>
            <Loader size='massive'>{t("LOADING")}</Loader>
          </Dimmer>
      )
    }
  }
}
  export default withApolloFetch(withRouter(translate('translations')(AllUsers)))
