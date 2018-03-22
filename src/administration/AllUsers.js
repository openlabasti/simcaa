import React, { Component, Link } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Confirm} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'
import UsrConfig from './UsrConfig'

class AllUsers extends Component{
  constructor(props){
    super(props)
    this.state={
      lock: 0,
      users: [],
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

  openConfirm(){
    this.setState({openConfirmDelete: true})
  }
  handleDelete(){
    console.log('confermato, parte delete!');
  }
  handleCancel(){
    this.setState({openConfirmDelete: false})
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
                trigger={<Button circular icon={<Icon name='remove user' size='large'/>} onClick={()=>this.openConfirm()}/>}
                content= 'Elimina utente'
                />
              <Popup
                trigger={<UsrConfig trigger={<Button circular icon={<Icon name='configure' size='large'/>} />}
                id={item.id}
                name={item.name}
                email={item.email}
                organization = {item.organization}
                link_web = {item.link_web} />}
                content= 'Configura utente'

                />

            </Table.Cell>
          </Table.Row>
        )
      })
      return(
        <div>
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
        <Confirm
            open={this.state.openConfirmDelete}
            header='This action cannot be reversed'
            content="Sei sicuro di  voler eliminare l'utente?"
            onCancel={this.handleCancel.bind(this)}
            onConfirm={this.handleDelete.bind(this)}
        />
        </div>
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
