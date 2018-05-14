import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'
import { Menu } from 'semantic-ui-react'
import {withCurrentUser} from '../withCurrentUser'
import { withRouter, Link } from 'react-router-dom'
import LanguageSwitcher from '../LanguageSwitcher'

class AdminMenu extends Component{
  Logout() {
      sessionStorage.removeItem('jwt')
      this.props.history.push('/')
  }
  render(){
    const { t, i18n } = this.props
    const style={

    }
   return(
        <Menu id='navbar'>
            <Menu.Item name='header'>
                <h3><b>Pannello di Amministrazione</b></h3>
            </Menu.Item>
            <Menu.Item as={Link} to="/administration/home">
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/administration/allusers">
                {t("ADM_MNU_USRS")}
            </Menu.Item>
            <Menu.Item as={Link} to="/administration/allgroups">
                {t("ADM_MNU_GROUPS")}
            </Menu.Item>
            <Menu.Item name='goback' onClick={()=>this.props.history.push('/')}>
                {t("ADM_MNU_BACK")}
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='language-switch'>
                <LanguageSwitcher type='dropdown' />
              </Menu.Item>
              <Menu.Item name='logout' onClick={()=>this.Logout()}>
                  <b>Logout</b>
              </Menu.Item>
            </Menu.Menu>

        </Menu>
    )
  }
}
export default translate('translations') (withRouter(withCurrentUser(AdminMenu)))
