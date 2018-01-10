import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import RootComponent from './RootComponent'
import BasicProject from './BasicProject'
import LayoutExport from './LayoutExport'

import './css/grid_styles.css'
import './css/resizable_styles.css'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={RootComponent}/>
                    <Route path="/basic/:view?/:projectid?" component={BasicProject} />
                    <Route path="/:projectid?/layout/" component={LayoutExport} />
                </div>
            </HashRouter>
        )
    }
}

export default App;
