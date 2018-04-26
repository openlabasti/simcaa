import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'

class NavBar extends Component {
    // Triggera il salvataggio del progetto
    triggerSaveProject(page, e) {
        this.props.save(page)
    }

    // Sblocca il capitolo alla sua chiusura
    closeChapter() {
        if (this.props.match.params.mode === 'edit') {
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
        } else {
            this.props.history.push('/project/' + this.props.match.params.projectid)

        }
    }

    render() {
        const { t, i18n } = this.props
        let mode = this.props.checked ? t("HEAD_BTN_EDIT") : t("HEAD_BTN_VIEW")

        if (this.props.match.params.mode === 'view') {
            return (
                <Segment basic>
                    <Button color='red' onClick={this.closeChapter.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                </Segment>
            )
        } else {
            return (
                <Segment basic>
                    <Button color='green'
                        loading={this.props.loadingButton}
                        disabled={this.props.loadingButton}
                        onClick={this.triggerSaveProject.bind(this)}
                    >
                            {t("HEAD_BTN_SAVE")}
                    </Button>
                    <Button color='red' onClick={this.closeChapter.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                    <Button color='blue' onClick={this.props.checkMode}>{mode}</Button>
                    <Button color='blue'
                        loading={this.props.loadingButton}
                        disabled={this.props.loadingButton}
                        onClick={this.triggerSaveProject.bind(this, 'preview')}
                    >
                            A4 Preview
                    </Button>
                    <Button color='violet'
                        loading={this.props.loadingButton}
                        disabled={this.props.loadingButton}
                        onClick={this.triggerSaveProject.bind(this, 'typo')}
                    >
                        {t("HEAD_BTN_TYPO")}
                    </Button>
                </Segment>
            )
        }
    }
}

export default translate('translations')(withRouter(withApolloFetch(NavBar)))
