import React, { Component } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'

class UsrConfig extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        {console.log(this.props)}
      </div>
    )
  }

}
export default translate('translations') (withRouter(withApolloFetch(UsrConfig)))
