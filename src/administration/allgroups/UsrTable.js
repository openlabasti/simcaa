import React, { Component } from 'react'
import {Container, Header, Table, Dimmer, Segment, Loader, Button, Popup, Icon, Confirm, Modal, Form} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'

class UsrTable extends Component{
  render(){
    const { t, i18n } = this.props

      let tableLayout = this.props.users.map((item)=>{
        let team=""
        let group=""
        for(let i=0; i<this.props.teams.length; i++){
          if(this.props.teams[i].id === item.team_id){
            team=this.props.teams[i].name
          }
        }
        for(let i=0; i<this.props.groups.length; i++){
          if(this.props.groups[i].id === item.group_id){
            group=this.props.groups[i].desc_group
          }
        }
        return(
          <Table.Row key={item.id}>
            <Table.Cell>
              {item.id}
            </Table.Cell>
            <Table.Cell>
              {item.name}
            </Table.Cell>
            <Table.Cell>
              {item.user}
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
              {group}
            </Table.Cell>
            <Table.Cell>
              Azioni
            </Table.Cell>
          </Table.Row>
        )
      });
      //ho costruito le righe della tabella, ora ritorno la tabella
      return(
        <Table celled padded textAlign='center' >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_NAME")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_USR")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_EMAIL")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_ORG")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_LWEB")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_GROUP")}</Table.HeaderCell>
              <Table.HeaderCell>{t("TBL_ACTION")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableLayout}
          </Table.Body>
        </Table>
      )
  }

}
export default translate('translations')(UsrTable)
