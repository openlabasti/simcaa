import React, { Component } from 'react'
import Loader from 'halogen/MoonLoader'

export const withCurrentUser = (WrappedComponent) => {
    return class withCurrentUser extends Component {
        constructor(props) {
            super(props)
            this.state= {
                currentUser: {}
            }
        }

        render() {
            let self = this

            // Richiede l'utente corrente se non lo si ha già
            if (Object.keys(this.state.currentUser).length === 0) {
                var myInit = {
                        method: 'POST',
                        mode: 'cors',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                        })
                    }

                fetch(window.env.GraphQLCurrentUser, myInit).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    if (data[0] === 'token_expired') {
                        self.props.history.push('/login')
                    } else {
                        self.setState({currentUser: data})
                    }
                })

                return (
                    <div>
                        <Loader color="#26A65B" size="16px" margin="4px">
                            Loading the user...
                        </Loader>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <WrappedComponent {...this.props} user={this.state.currentUser} />
                    </div>
                )
            }
        }
    }
}
