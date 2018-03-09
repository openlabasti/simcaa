import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            push: false,
        }
    }

    triggerSaveProject() {
        this.props.save(true)
    }

    redirect() {
        this.setState({push: !this.state.push})
    }

    closeChapter() {
        let query = `
        mutation UnlockChapter {
            updateCaaChapter(id: ${this.props.match.params.chapterid}, chapt_user_block: 0) {
                id
            }
        }
        `
        this.props.apolloFetch({ query })
        .then((data) => {
            this.props.history.push('/project/' + this.props.match.params.projectid)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const { t, i18n } = this.props
        console.log(this.props);
        let mode = this.props.checked ? t("HEAD_BTN_EDIT") : t("HEAD_BTN_VIEW")
        if (this.state.push) {
            return (
                <Redirect to='/0/layout' push />
            )
        }
        let link = '/project/' + this.props.match.params.projectid
        return (
            <Segment basic>
                <Button disabled onClick={this.props.openOption}>{t("HEAD_BTN_OPTIONS")}</Button>
                <Button color='orange' disabled>{t("HEAD_BTN_EXPORT")}</Button>
                <Button color='green' onClick={this.triggerSaveProject.bind(this)}>{t("HEAD_BTN_SAVE")}</Button>
                <Button color='red' onClick={this.closeChapter.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                <Button color='blue' onClick={this.props.checkMode}>{mode}</Button>
                <Button color='violet' as={Link} to={'/layout/' + this.props.match.params.chapterid}>{t("HEAD_BTN_TYPO")}</Button>
            </Segment>
        )
    }
}

export default translate('translations')(withRouter(withApolloFetch(NavBar)))
