import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'

class ImageOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageType: [{type: 'imgtype', value: 'color', text: props.t("OPT_FRM_COLOR")},
                            {type: 'imgtype', value: 'white', text: props.t("OPT_FRM_BLACKANDWHITE")}],
        }

    }

    onChangeDropdown(event, data) {
        this.props.changeOtions(data)
    }

    render() {
        const { t, i18n } = this.props
        return (
            <Form>
                    <Form.Field>
                        <label> {t("OPT_LBL_IMAGEPREF")} </label>
                        <Dropdown placeholder='Select' fluid selection
                            options={this.state.imageType}
                            onChange={this.onChangeDropdown.bind(this)}
                            defaultValue={this.props.imgType}
                        />
                    </Form.Field>
            </Form>
        )
    }
}

export default translate('translations')(ImageOptions)
