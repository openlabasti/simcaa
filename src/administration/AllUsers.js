import React, { Component, Link } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'

class AllUsers extends Component{
  constructor(props){
    super(props)
    this.redirect = this.redirect.bind(this)
    this.state={
      lock: 0,
      users: []
    }
  }
  componentWillMount(){
    let query = `
      query getAllUsers {
        caa_users {
          data{
            id
            name
            email
            organization
            link_web
          }
        }
      }
    `
    this.props.apolloFetch({query})
    .then((data)=>{
      this.setState({lock:1, users: data.data.caa_users.data})
    })
  }
  redirect(path){
    console.log(path);
    this.props.history.push(path)
  }
  render(){
    if(this.state.lock===1){
      let tableLayout = this.state.users.map((item)=>{
        return(
          <Table.Row key={item.id}>
            <Table.Cell>
              {item.id}
            </Table.Cell>
            <Table.Cell>
              {item.name}
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
              <Popup
                trigger={<Button circular icon={<Icon name='remove user' size='large'/>} />}
                content= 'Elimina utente'
                />
              <Popup
                trigger={<Button circular icon={<Icon name='configure' size='large'/>} onClick={()=>this.redirect('/administration/usrconfig/'+item.id)}/>}
                content= 'Configura utente'

                />

            </Table.Cell>
          </Table.Row>
        )
      })
      return(
        <Container>
          <Table celled padded textAlign='center'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Organizzazione</Table.HeaderCell>
                <Table.HeaderCell>Sito web</Table.HeaderCell>
                <Table.HeaderCell>Azione</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableLayout}
            </Table.Body>
          </Table>
        </Container>
        )
    }else{
      return(
          <Dimmer active>
            <Loader size='massive'>Sto caricando....</Loader>
          </Dimmer>
      )
    }
  }
}
  export default translate('translations') (withRouter(withApolloFetch(AllUsers)))
