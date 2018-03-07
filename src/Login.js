import React, { Component } from 'react'
import { Button, Form, Segment, Grid, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: { code: 0, text: 'Fill the form to Login into the App', view: false, header: 'Welcome to SimCAA'}
        }
    }

    changeFormEmail(event, input) {
        this.setState({email: input.value})
    }

    changeFormPassword(event, input) {
        this.setState({password: input.value})
    }

    login() {
        let data = JSON.stringify({email: this.state.email, password: this.state.password})
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
                                    placeholder='E-mail address'
                                    value={this.state.email}
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

            </div>
        )
    }

}

export default withRouter(Login);
