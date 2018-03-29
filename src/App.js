import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import RootComponent from './RootComponent'
import BasicProject from './BasicProject'
import LayoutExport from './LayoutExport'
import Project from './Project'
import Login from './Login'

// Import CSS files
import './css/grid_styles.css'
import './css/resizable_styles.css'

class App extends Component {

    login(token) {
        sessionStorage.setItem('jwt', token)
    }

    isLogged(Component) {
        let jwt = sessionStorage.getItem('jwt')
        return !jwt ? (
            <Redirect to="/login"/>
        ) : (
            <Component />
        )
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" render={() => (
                        <Redirect to="/home" />
                    )}/>
                    <Route path="/home" render={this.isLogged.bind(this, RootComponent)}/>
                    <Route path="/basic/:mode?/:projectid?/:chapterid?" render={this.isLogged.bind(this, BasicProject)} />
                    <Route path="/project/:projectid?" render={this.isLogged.bind(this, Project)} />
                    <Route path="/layout/:projectid?/:chapterid?" render={this.isLogged.bind(this, LayoutExport)} />
                    <Route path="/login" render={() => (
                        <Login checkLogin={this.login} />
                    )}/>
                </div>
            </HashRouter>
        )
    }
}

export default App;
