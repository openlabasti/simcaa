import React, { Component } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'

class LanguageSwitcher extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { t, i18n } = this.props
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
        }
        return (
            <Segment basic>
                <Button onClick={() => changeLanguage('it')}>Italiano</Button>
                <Button onClick={() => changeLanguage('en')}>English</Button>
            </Segment>
        )
    }
}

export default translate('translations')(LanguageSwitcher)
