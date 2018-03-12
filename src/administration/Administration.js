import React, { Component } from 'react'
import { withApolloFetch } from '../withApolloFetch'
import { withRouter } from 'react-router-dom'
import { withCurrentUser} from '../withCurrentUser'
import { translate, Trans } from 'react-i18next'
import { Container, Menu } from 'semantic-ui-react'
import AdminMenu from './Menu'
import AllUsers from './AllUsers'
import AllGroups from './AllGroups'
import Helper from './Helper'
class Admin extends Component{
  constructor(props){
    super(props)
    this.state = {
      action: 0
    }
  }
  handleSelection(n){
    switch(n){
      case 1:
        //usr ha selezionato l'item 'Utenti'
        this.setState({action:1})
        break
      case 2:
        //usr ha selezionato l'item 'Gruppi'
        this.setState({action:2})
        break
    }
  }
  render(){
    const { t, i18n } = this.props
    switch(this.state.action){
      case 0:
        return(
           <div>
             <AdminMenu action={this.handleSelection}/>
             <AllUsers/>
           </div>
         )
         break
      case 1:
        return(
           <div>
             <AdminMenu action={this.handleSelection}/>
             <AllUsers/>
           </div>
         )
         break
      case 2:
      return(
         <div>
           <AdminMenu action={this.handleSelection}/>
           <AllGroups/>
         </div>
       )
       break
    }
  }
}
export default withRouter(translate('translations')(withApolloFetch(withCurrentUser(Admin))))
