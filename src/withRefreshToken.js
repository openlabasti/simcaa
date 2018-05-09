import React, { Component } from 'react'

export const withRefreshToken = (WrappedComponent) => {
    return class withRefreshToken extends Component {
        constructor(props) {
            super(props)
            this.state= {

            }
            this.refreshToken = this.refreshToken.bind(this)
        }

        // Funzione per il refresh del token
        refreshToken() {
            let self = this
            var myInit = {
                method: 'POST',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                })
            }

            fetch(window.env.GraphQLRefreshToken, myInit).then(function(response) {
                return response.json();
            }).then(function(data) {
                sessionStorage.setItem('jwt', 'Bearer ' + data)
            })
        }

        render() {
            return (
                <div>
                    <WrappedComponent {...this.props} refreshToken={this.refreshToken} />
                </div>
            )
        }
    }
}
