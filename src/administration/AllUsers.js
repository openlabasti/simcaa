import React, { Component, Link } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Confirm, Modal, Form} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import {withApolloFetch} from '../withApolloFetch'
import { withRouter } from 'react-router-dom'
import UsrConfig from './UsrConfig'
import NewUserForm from './NewUserForm'

class AllUsers extends Component{
  constructor(props){
    super(props)
    this.update = this.update.bind(this)
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
    console.log('sto facendo query')
    this.props.apolloFetch({query})
    .then((data)=>{
      this.setState({lock:1, users: data.data.caa_users.data})
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  openConfirm(id){
    this.setState({idToDelete: id},()=>{
      this.setState({openConfirmDelete: true})
    })
  }

  handleDelete(){
    console.log(this.state.idToDelete);
    let query = `
    mutation delUser {
        deleteCaaUser(id: ${this.state.idToDelete}){
          id
        }
    }
    `
    this.props.apolloFetch({ query })
        .then((data) => {
            this.setState({openConfirmDelete: false});
            this.componentWillMount()
        })
        .catch((error) => {
            console.log(error);
        })
  }
  handleCancel(){
    this.setState({openConfirmDelete: false})
  }
  update(){
    this.componentWillMount();
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
            <Table.Cell style={{display: "flex"}}>
              <Popup
                trigger={<Button circular icon={<Icon name='remove user' size='large'/>} onClick={()=>this.openConfirm(item.id)}/>}
                content= 'Elimina utente'
                />
              <Popup
                trigger={
                  <UsrConfig trigger={<Button circular icon={<Icon name='configure' size='large'/>} />}
                    id={item.id}
                    name={item.name}
                    email={item.email}
                    organization = {item.organization}
                    link_web = {item.link_web}
                    update = {()=>{this.update()}}
                  />
                }
                content= 'Configura utente'
                />

            </Table.Cell>
          </Table.Row>

        )
      })
      const tableStyle={
        marginTop: '15px'
      }
      return(
        <div>
        <Segment style={tableStyle}>
          <Table celled padded textAlign='center' >
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

          <NewUserForm
            update = {()=>{this.update()}}/>
        </Segment>
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
  export default withApolloFetch(translate('translations')(AllUsers))
