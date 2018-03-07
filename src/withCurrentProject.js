import React, { Component } from 'react'
import Loader from 'halogen/MoonLoader'

export const withCurrentProject = (WrappedComponent) => {
    return class withCurrentProject extends Component {
        constructor(props) {
            super(props)
            this.state= {
                currentProject: {},
                projectid: this.props.match.params.projectid
            }
        }

        render() {
            // Richiede il progetto corrente se non lo si ha già
            if (Object.keys(this.state.currentProject).length === 0) {
                let query = `
                query fetchCurrentProject {
                    projects(id: ${this.state.projectid}) {
                        data {
                            id
                            proj_profile
                            proj_name
                            proj_owner
                            proj_blocked
                            proj_share
                            proj_note
                        }
                    }
                }
                `
                this.props.apolloFetch({ query })
                    .then((data) => {
                        this.setState({currentProject: data.data.projects.data[0]})
                    })
                    .catch((error) => {
                        console.log(error);
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
                        <WrappedComponent {...this.props} project={this.state.currentProject} />
                    </div>
                )
            }
        }
    }
}
