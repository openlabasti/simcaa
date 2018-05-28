import React, { Component } from 'react'
import { createApolloFetch } from 'apollo-fetch'
import { Redirect } from 'react-router-dom'

export const withApolloFetchNoAuth = (WrappedComponent, styleDiv) => {
    return class withApolloFetchNoAuth extends Component {
        constructor(props) {
            super(props)
            this.state= {
                toLogin: false,
                apolloFetchNoAuth: null,
            }
        }

        componentWillMount() {
            const uri = window.env.GraphQLServerNoAuth
            const apolloFetchNoAuth = createApolloFetch({uri})

            apolloFetchNoAuth.use(({ request, options }, next) => {
                // Put here the middleware
                next()
            })

            apolloFetchNoAuth.useAfter(({ response }, next) => {
                // Put here the Afterware
                next()
            })
            this.setState({apolloFetchNoAuth: apolloFetchNoAuth})
        }

        render() {

            if (this.state.toLogin === true) {
                return (
                    <Redirect to="/login"/>
                )
            } else {
                return (
                    <div style={styleDiv}>
                        <WrappedComponent {...this.props} apolloFetchNoAuth={this.state.apolloFetchNoAuth} />
                    </div>
                )
            }
        }
    }
}
