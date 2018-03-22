import React, { Component } from 'react'
import { withApolloFetch } from '../withApolloFetch'
import { withRouter } from 'react-router-dom'
import { withCurrentUser} from '../withCurrentUser'
import { translate, Trans } from 'react-i18next'
import { Container, Menu, Segment } from 'semantic-ui-react'
import AdminMenu from './Menu'
import AllUsers from './AllUsers'
import AllGroups from './AllGroups'
import Helper from './Helper'
import UsrConfig from './UsrConfig'
class Admin extends Component{
  constructor(props){
    super(props)
    this.state = {
      action: 0
    }
    this.handleSelection = this.handleSelection.bind(this)
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
      case 12:
        this.setState({action:12})
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
             <Segment>
              <Helper/>
             </Segment>
           </div>
         )
         break
      case 1:
        return(
           <div>
             <AdminMenu action={this.handleSelection}/>
             <AllUsers action={this.handleSelection}/>
           </div>
         )
         break
      case 12:
        return(
          <div>
            <AdminMenu action={this.handleSelection}/>
            <UsrConfig id={this.state.usrConfigId}/>
          </div>
        )
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
export default withRouter(translate('translations')(withRouter(withApolloFetch(withCurrentUser(Admin)))))
