import React, { Component } from 'react'
import { createApolloFetch } from 'apollo-fetch'
import { Redirect } from 'react-router-dom'

export const withApolloFetch = (WrappedComponent) => {
    return class withApolloFetch extends Component {
        constructor(props) {
            super(props)
            this.state= {
                toLogin: false,
                apolloFetch: null,
            }
        }

        componentWillMount() {
            const uri = window.env.GraphQLServer
            const apolloFetch = createApolloFetch({uri})

            apolloFetch.use(({ request, options }, next) => {
                const token = sessionStorage.getItem('jwt')
                if (!options.headers) {
                    options.headers = {}; // Create the headers object if needed.
                }
                options.headers['authorization'] = `Bearer ${token}`
                next()
            })

            apolloFetch.useAfter(({ response }, next) => {
                if (response.headers.get('Authorization') !== null) {
                    sessionStorage.setItem('jwt', response.headers.get('Authorization'))
                } else if (response.parsed.error === 'token_expired' || response.parsed.error === 'token_invalid') {
                        sessionStorage.removeItem('jwt')
                        this.setState({toLogin: true})
                }
                next()
            })
            this.setState({apolloFetch: apolloFetch})
        }

        render() {

            if (this.state.toLogin === true) {
                return (
                    <Redirect to="/login"/>
                )
            } else {
                return (
                    <div>
                        <WrappedComponent {...this.props} apolloFetch={this.state.apolloFetch} />
                    </div>
                )
            }
        }
    }
}
