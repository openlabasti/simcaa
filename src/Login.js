import React, { Component } from 'react'
import { Button, Form, Segment, Grid, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            error: { code: 0, text: 'Fill the form to Login into the App', view: false, header: 'Welcome to SimCAA'}
        }
    }

    changeFormEmail(event, input) {
        this.setState({user: input.value})
    }

    changeFormPassword(event, input) {
        this.setState({password: input.value})
    }

    login() {
        let data = JSON.stringify({user: this.state.user, password: this.state.password})
        let url = window.env.GraphQLLogin
        let xhr = new XMLHttpRequest();
        let self = this
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let jsonRes = JSON.parse(this.responseText)
                    let token = jsonRes.token
                    self.props.checkLogin(token)
                    let init = self
                    setTimeout(function() {
                        init.props.history.push('/')
                    }, 500)
                }
                if (this.status !== 200) {
                    let textError = JSON.parse(this.responseText)
                    let stringError = textError.error;
                    let newError = {code: this.status, text: stringError, view: true, header: 'Error Detected'}
                    self.setState({error: newError})
                }
            }
        })
        xhr.open("POST", url)
        xhr.setRequestHeader("content-type", "application/json")
        xhr.send(data)
    }

    render() {
        return (
            <div>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large' id='login' error={this.state.error.view}>
                            <Segment raised color='green'>
                                <Message
                                    error={this.state.error.view}
                                    header={this.state.error.header}
                                    content={this.state.error.text}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    value={this.state.user}
                                    onChange={this.changeFormEmail.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.changeFormPassword.bind(this)}
                                />
                                <Button type='submit' fluid color='blue' onClick={this.login.bind(this)}>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>

                <Segment style={{'maxWidth': '50%', 'left': '50%', 'transform': 'translateX(-50%)'}}>
                <Message
                    color='blue'
                    size='massive'
                >
                <Message.Header>To test this Demo</Message.Header>
                    <p>Username: user</p>
                    Password: user
                </Message>
                    <Message
                        color='purple'
                        size='massive'
                    >
                    <Message.Header>OpenLab Asti</Message.Header>
                        Stiamo sviluppando l&#39;applicazione SIMCAA
                        "Scrittura Inclusiva Multimodale Comunicazione Aumentativa Aperta"
                        Questo sito è un ambiente di demo/test di <a href='http://openlabasti.it'> OpenLab Asti </a>.
                        SIMCAA è in corso di sviluppo, quindi soggetta ad aggiornamenti e
                        modifiche continue, le funzionalità sono incomplete e non sono garantite,
                        è possibile l&#39;interruzione temporanea del servizio.
                        Non si assicura la persistenza dei documenti caricati.
                        I simboli usati sono di proprietà del Governo di Aragona,
                        creati da Sergio Palao per <a href='http://arasaac.org'> ARASAAC</a> e distribuiti con Licenza
                        <a href='https://it.wikipedia.org/wiki/Creative_Commons'> Creative Common</a> (BY-NC-SA)
                    </Message>
                </Segment>

            </div>
        )
    }

}

export default withRouter(Login);
