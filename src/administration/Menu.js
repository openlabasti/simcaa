import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'
import { Menu } from 'semantic-ui-react'
import {withCurrentUser} from '../withCurrentUser'
import { withRouter } from 'react-router-dom'

class AdminMenu extends Component{
  constructor(props){
    super(props)
  }
  triggerLoading(n){
      this.props.action(n)
  }
  Logout() {
      sessionStorage.removeItem('jwt')
      this.props.history.push('/')
  }
  render(){
    const { t, i18n } = this.props
console.log(this.props);
   return(
        <Menu id='navbar'>
            <Menu.Item name='header'>
                Pannello di Amministrazione
            </Menu.Item>
            <Menu.Item name='users' onClick={()=>this.triggerLoading(1)}>
                Utenti
            </Menu.Item>
            <Menu.Item name='groups' onClick={()=>this.triggerLoading(2)}>
                Gruppi
            </Menu.Item>
            <Menu.Item name='logout' onClick={()=>this.Logout()}>
                Logout
            </Menu.Item>

        </Menu>
    )
  }
}
export default translate('translations') (withRouter(withCurrentUser(AdminMenu)))
