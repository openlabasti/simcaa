import React, { Component } from 'react';
import { Container,Grid, Segment, Button, Header, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'

class RootComponent extends Component {
  render() {
    const { t, i18n } = this.props
    return (
        <Container>
        <Grid columns='equal' style={{padding: '10px'}}>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Header size='large'>{t("MAIN_LBL_CREATE")}</Header>
                        <Button.Group>
                            <Button color='blue' as={Link} to='/basic/edit/new/'>{t("MAIN_BTN_BASIC")}</Button>
                            <Button color='green' icon='help'></Button>
                        </Button.Group>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Header size='large'>{t("MAIN_LBL_LAST")}</Header>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header size='large'>{t("MAIN_LBL_ALL")}</Header>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Header size='large'>{t("MAIN_LBL_NEWS")}</Header>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Message
                            color='purple'
                            size='massive'
                        >
                        <Message.Header>OpenLab Asti</Message.Header>
                            Stiamo sviluppando l'applicazione (nome provvisorio SIMCAA) <br />
                            "Scrittura Inclusiva Multimodale Comunicazione Aumentativa Aperta" <br /><br />
                            Questo sito è un ambiente di demo/sviluppo di
                            <a href='http://openlabasti.it'> OpenLab Asti </a>, serve principalmente
                            per testare l'applicazione in ambiente web puro. <br />
                            SIMCAA è in corso di sviluppo, quindi soggetta ad aggiornamenti e modifiche
                            continue, le funzionalità sono incomplete e non sono garantite. <br />
                            I simboli usati da SIMCAA sono proprietà di
                            <a href='http://www.arasaac.org/'> CATEDU </a> sotto licenza
                            <a href='https://it.wikipedia.org/wiki/Creative_Commons'> Creative Common</a> e sono
                            stati creati da Sergio Palao.
                        </Message>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
    );
  }
}

export default translate('translations')(RootComponent)
