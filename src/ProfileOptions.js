import React, { Component } from 'react'
import { Form, Dropdown, Segment, Icon } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class ImageOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageType: [{type: 'imgtype', value: 0, text: 'random'},
                        {type: 'imgtype', value: 1, text: props.t("OPT_FRM_BLACKANDWHITE")},
                        {type: 'imgtype', value: 2, text: props.t("OPT_FRM_COLOR")}],
            imageStyle: [{type: 'imgstyle', value: 0, text: 'random'}],
            order: [{}],
        }

    }

    componentWillMount() {
        let localImgStyle = this.state.imageStyle
        let query = `
        query FetchStyle {
            simcaa_symstyle {
                data {
                    id
                    paramstyle
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                let arrayData = data.data.simcaa_symstyle.data
                for (let i=0; i<arrayData.length; i++) {
                    localImgStyle.splice(i+1, 0, {type: 'imgstyle',
                                            value: arrayData[i].id,
                                            text: arrayData[i].paramstyle,
                                    })
                }
                this.setState({imageStyle: localImgStyle, order: this.props.order})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    changePriority(item, direction, event) {
        let localOrder = this.state.order
        let currentIndex = localOrder.findIndex(index => index === item)
        let tmp
        if (direction === 'up' && currentIndex !== 0) {
            tmp = localOrder[currentIndex-1]
            localOrder[currentIndex-1] = localOrder[currentIndex]
            localOrder[currentIndex] = tmp
        } else if (direction === 'down' && currentIndex !== localOrder.length-1) {
            tmp = localOrder[currentIndex+1]
            localOrder[currentIndex+1] = localOrder[currentIndex]
            localOrder[currentIndex] = tmp
        }
        this.setState({order: localOrder})
        this.props.changeOrder(localOrder)
    }

    onChangeDropdown(event, data) {
        this.props.changeOtions(data)
    }

    render() {
        const { t, i18n } = this.props

        let priorityList = this.state.order
        priorityList = priorityList.map((item, index) => {
            return (
                <Segment key={index}>
                    <Icon name='arrow circle down' size='large' className='icon-pointer'
                        onClick={this.changePriority.bind(this, item, 'down')}/>
                    <Icon name='arrow circle up' size='large'  className='icon-pointer'
                        onClick={this.changePriority.bind(this, item, 'up')}/>
                    {item.text}
                </Segment>
            )
        })
        return (
            <div>
                <Segment.Group horizontal>
                    <Segment>
                        <Form>
                            <Form.Field width={4}>
                                <label> {t("OPT_LBL_IMAGECOLORPREF")} </label>
                                <Dropdown placeholder='Select' selection
                                    options={this.state.imageType}
                                    onChange={this.onChangeDropdown.bind(this)}
                                    defaultValue={this.props.imgType}
                                />
                            </Form.Field>
                            <Form.Field width={4}>
                                <label> {t("OPT_LBL_IMAGETYPEPREF")} </label>
                                <Dropdown placeholder='Select' selection
                                    options={this.state.imageStyle}
                                    onChange={this.onChangeDropdown.bind(this)}
                                    defaultValue={this.props.imgStyle}
                                />
                            </Form.Field>
                        </Form>
                    </Segment>
                    <Segment>
                        <Segment.Group piled>
                            {priorityList}
                        </Segment.Group>
                    </Segment>
                </Segment.Group>
            </div>
        )
    }
}

export default translate('translations')(withApolloFetch(ImageOptions))
