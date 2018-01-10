import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            push: false
        }
    }

    triggerSaveProject() {
        this.props.save(true)
    }

    redirect() {
        this.setState({push: !this.state.push})
    }

    render() {
        const { t, i18n } = this.props
        let mode = this.props.checked ? t("HEAD_BTN_EDIT") : t("HEAD_BTN_VIEW")
        if (this.state.push) {
            return (
                <Redirect to='/0/layout' push />
            )
        }
        return (
            <Segment basic>
                <Button onClick={this.props.openOption}>{t("HEAD_BTN_OPTIONS")}</Button>
                <Button color='orange' disabled>{t("HEAD_BTN_EXPORT")}</Button>
                <Button color='green' onClick={this.triggerSaveProject.bind(this)}>{t("HEAD_BTN_SAVE")}</Button>
                <Button color='red' as={Link} to='/'>{t("HEAD_BTN_CLOSE")}</Button>
                <Button color='blue' onClick={this.props.checkMode}>{mode}</Button>
                <Button color='violet' onClick={this.redirect.bind(this)}>{t("HEAD_BTN_TYPO")}</Button>
            </Segment>
        )
    }
}

export default translate('translations')(NavBar)
