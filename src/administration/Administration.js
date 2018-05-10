import React, { Component } from 'react'
import { withApolloFetch } from '../withApolloFetch'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { withCurrentUser} from '../withCurrentUser'
import { translate, Trans } from 'react-i18next'
import { Container, Menu, Segment } from 'semantic-ui-react'
import AdminMenu from './Menu'
import AllUsers from './AllUsers'
import AllGroups from './AllGroups'
import Helper from './Helper'
class Admin extends Component{
  isLogged(Component) {
      let jwt = sessionStorage.getItem('jwt')
      return !jwt ? (
          <Redirect to="/login"/>
      ) : (
          <Component />
      )
  }
  render(){
    return (
            <div>
                <AdminMenu/>
                <Route exact path="/administration" render={() => (
                    <Redirect to="/administration/home" />
                )}/>
                <Route path="/administration/home" render={this.isLogged.bind(this, Helper)}/>
                <Route path="/administration/allusers" render={this.isLogged.bind(this, AllUsers)} />
                <Route path="/administration/allgroups" render={this.isLogged.bind(this, AllGroups)} />
            </div>
    );
  }
}
export default withRouter(translate('translations')(withRouter(withApolloFetch(withCurrentUser(Admin)))))
