import React, { Component } from 'react'
import {Container, Header} from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'

class Helper extends Component{
  render(){
    return(
      <Container text>
        <Header as='h2'>Benvenuto!</Header>
        <p>
          Hai fatto accesso all'area di amministrazione di SIMCAA,
        </p>
        <p>
          Nella sezione "Utenti" puoi gestire gli utenti del gruppo di cui sei amministratore, assegnando permessi oppure eliminando componenti del gruppo.
        </p>
        <p>
          Nella sezione "Gruppi" puoi esaminare la lista dei gruppi di cui sei amministratore, in modo da selezionare quale gruppo amministrare.
        </p>
        <p>
          Ricorda, da grandi poteri derivano grandi responsabilità!
        </p>
      </Container>
    )
  }
}
export default translate('translations') (Helper)
