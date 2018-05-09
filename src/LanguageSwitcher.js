import React, { Component } from 'react'
import { Button, Segment, Dropdown } from 'semantic-ui-react'
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
        if (this.props.type === 'dropdown') {
            return (
                <Dropdown item text={t("HOME_NAVBAR_LANGUAGE")}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => changeLanguage('it')}>Italiano</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
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
