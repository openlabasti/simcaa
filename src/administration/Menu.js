import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'
import { Menu } from 'semantic-ui-react'

class AdminMenu extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const { t, i18n } = this.props
console.log(this.props);
   return(
        <Menu id='navbar' style={{'marginBottom': '10px', 'width': '100%'}}
            fixed='top'>
            <Menu.Item className='header item' name='header'>
                Pannello di Amministrazione
            </Menu.Item>
            <Menu.Item className='item' name='users' onClick={this.props.action(1)}>
                Utenti
            </Menu.Item>
            <Menu.Item className='item' name='groups' onClick={this.props.action(2)}>
                Gruppi
            </Menu.Item>
        </Menu>
    )
  }
}
export default translate('translations') (AdminMenu)
