import React, { Component } from 'react'
import {Header, Dimmer, Segment, Loader} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import {withApolloFetch} from '../../withApolloFetch'

import UsrTable from './UsrTable'
import AddUserModal from './AddUserModal'

class AllGroups extends Component{
  constructor(props){
    super(props)
    this.update = this.update.bind(this)
    this.state={
      lock: 0,
      users: [],
      teams: []
    }
  }
  update(){
    this.componentWillMount();
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
  render(){
    const { t, i18n } = this.props
    if(this.state.lock===0){
      return(
          <Dimmer active>
            <Loader size='massive'>{t("LOADING")}</Loader>
          </Dimmer>
      )
    }else{
      let teamTables = this.state.teams.map((team, idx)=>{
          let usrs = []
          //creo lista di utenti appartenenti a quel gruppo
          for(let i=0; i<this.state.users.length; i++){
            if(this.state.users[i].team_id === team.id){
              usrs.push(this.state.users[i])
            }
          }
          let margin = ((idx===0) ? '10px' : '65px')
          //aggiungo tabella di questo team
          return(
            <Segment style={{marginTop: margin}} key={idx}>
              <Header as="h4">{team.name}</Header>
              <UsrTable users={usrs} teams={this.state.teams} groups={this.state.groups}/>
              <AddUserModal/>
            </Segment>
          )
          });
      //renderizzo tutte le tabelle
      return(
        <div>
          {teamTables}
        </div>
      )
    }
  }
}
export default withApolloFetch(translate('translations') (AllGroups))
