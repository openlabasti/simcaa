import React, { Component } from 'react'
import { Header, Input, Grid } from 'semantic-ui-react'

class ProjectOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onChangeInput(event, input) {
        let data = 'http://' + input.value
        this.props.changeOtions(input.id, data)
    }

    render() {
        let valueRest = this.props.urlRest.substr(7)
        let valueImg = this.props.urlImg.substr(7)
        return (
            <div>
                <Grid>
                    <Grid.Column width={8}>
                        <Header as='H5'> Url REST API Server </Header>
                        <Input fluid label='http://' placeholder='myrest.com'
                            id='url_api'
                            value={valueRest}
                            onChange={this.onChangeInput.bind(this)}
                        />
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column width={8}>
                        <Header as='H5'> Url images location </Header>
                        <Input fluid label='http://' placeholder='myrest.com'
                            id='url_img'
                            value={valueImg}
                            onChange={this.onChangeInput.bind(this)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default ProjectOptions;
