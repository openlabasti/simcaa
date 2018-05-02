import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Card, Confirm, Loader, Icon } from 'semantic-ui-react'
import { withApolloFetch } from './withApolloFetch'
import { translate, Trans } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { withCurrentProject } from './withCurrentProject'
import { withCurrentUser } from './withCurrentUser'

import NewProfileForm from './NewProfileForm'
import NewChapterForm from './NewChapterForm'

class Project extends Component {
    constructor(props) {
        super(props)
        this.state= {
            openConfirm: false,
            deleteChaptId: 0,
            chapters: [{}],
            fetchFinished: false
        }
    }

    componentWillMount() {
        let currentProjectId = this.props.match.params.projectid
        let query = `
        query currentChapthers {
            chapters(caa_project_id: ${currentProjectId}) {
                data {
                    id
                    chapt_title
                    chapt_user_block
                }
            }
        }
        `
        let self = this
        this.props.apolloFetch({ query })
            .then((data) => {
                self.setState({chapters: data.data.chapters.data, fetchFinished: true})
            })
    }

    handleOpenConfirm(id, event) {
        this.setState({openConfirm: true, deleteChaptId: id})
    }

    handleCancel() {
        this.setState({openConfirm: false})
    }

    handleConfirm() {
        this.setState({openConfirm: false})
        this.deleteChapter()
    }

    createNewChapter(title) {
        let currentProjectId = this.props.match.params.projectid
        let escapedTitle = this.escapeQuotes(title)
        let query = `
        mutation NewChapter {
            createCaaChapter(caa_project_id: ${currentProjectId},
                            chapt_title: "${escapedTitle}",
                            chapt_content: "",
                            chapt_user_block: 0) {
                id
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                this.componentWillMount()
            })
    }

    deleteChapter(id, event) {
        let query = `
        mutation DeleteChapter {
            deleteCaaChapter(id: ${this.state.deleteChaptId}) {
                id
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                this.componentWillMount()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateProjectProfile(data) {
        let proj_profile = this.escapeQuotes(data)
        let proj_name = this.escapeQuotes(this.props.project.proj_name)
        let proj_note = this.escapeQuotes(this.props.project.proj_note)
        let query = `
        mutation updateProject {
            updateCaaProject(id: ${this.props.project.id},
                            proj_name: "${proj_name}",
                            proj_owner: ${this.props.project.proj_owner},
                            proj_share: ${this.props.project.proj_share},
                            proj_profile: "${proj_profile}",
                            proj_blocked: ${this.props.project.proj_blocked},
                            proj_note: "${proj_note}"){
                id
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                this.componentWillMount()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Forza l'unlock del capitolo se si è il proprietario o l'admin
    forceUnlockChapter(id, event) {
        let query = `
        mutation BlockChapter {
            updateCaaChapter(id: ${id}, chapt_user_block: 0) {
                id
            }
        }
        `
        this.props.apolloFetch({ query })
        .then((data) => {
            this.componentWillMount()
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Escape quotes if needed
    escapeQuotes(item) {
        if (typeof item === 'string' || item instanceof String) {
            return item.replace(/\\([\s\S])|(")/g,"\\$1$2")
        } else {
            return JSON.stringify(item).replace(/\\([\s\S])|(")/g,"\\$1$2")
        }
    }

    render() {
        const { t, i18n } = this.props

        let localChapters = this.state.chapters
        localChapters = localChapters.map((item, index) => {
            let ifBlocked = item.chapt_user_block === 0 ? false : true
            let contentButton
            if (ifBlocked === true && (item.chapt_user_block === this.props.user.id || this.props.user.group_id === 1)) {
                ifBlocked = false
                contentButton = <Button color='green'
                    disabled={ifBlocked}
                    onClick={this.forceUnlockChapter.bind(this, item.id)}
                >
                    <Icon name='lock' /> Unlock
                </Button>
            } else {
                contentButton = <Button color='green'
                    as={Link}
                    disabled={ifBlocked}
                    to={'/basic/edit/' + this.props.match.params.projectid + '/' + item.id}
                >
                    {t("PRJ_BTN_EDIT")}
                </Button>
            }

            return (
                <Card style={{'textAlign': 'center', 'width': 'auto'}} key={index}>
                    <Card.Content header={'Chapt id: ' + item.id}/>
                    <Card.Content>
                        {item.chapt_title}
                    </Card.Content>
                    <Card.Content extra>
                        <Button.Group>
                            {contentButton}
                            <Button.Or />
                            <Button color='blue'
                                as={Link}
                                to={'/basic/view/' + this.props.match.params.projectid + '/' + item.id}
                            >
                                {t("PRJ_BTN_VIEW")}
                            </Button>
                            <Button.Or />
                            <Button color='red'
                                disabled={ifBlocked}
                                onClick={this.handleOpenConfirm.bind(this, item.id)}
                            >
                                {t("PRJ_BTN_DELETE")}
                            </Button>
                        </Button.Group>
                    </Card.Content>
                </Card>
            )
        })

        if (!this.state.fetchFinished) {
            return (
                <div>
                    <Loader active inline='centered' size='massive'/>
                </div>
            )
        } else {
            return (
                <div>
                    <Menu>
                        <Menu.Item>
                            <Button color='red' as={Link} to='/home'>{t("PRJ_MNU_BACK")}</Button>
                        </Menu.Item>

                        <Menu.Item>
                            <NewProfileForm
                                className='icon-pointer'
                                size='big'
                                edit='button'
                                data={this.props.project.proj_profile}
                                updateProfile={this.updateProjectProfile.bind(this)}
                            />
                        </Menu.Item>
                    </Menu>

                    <Card.Group>
                        {localChapters}
                        <Card style={{'textAlign': 'center'}}>
                            <Card.Content header={t("PRJ_LBL_NEWCHAPT")}/>
                            <Card.Content>
                                <NewChapterForm
                                    className='icon-pointer'
                                    name='add square'
                                    size='huge'
                                    createChapter={this.createNewChapter.bind(this)}
                                />
                            </Card.Content>
                            <Card.Content extra>
                                {t("PRJ_LBL_INFO")}
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    <Confirm
                        open={this.state.openConfirm}
                        header='This action cannot be reversed'
                        content='Are you sure to want to delete this chapter?'
                        onCancel={this.handleCancel.bind(this)}
                        onConfirm={this.handleConfirm.bind(this)}
                    />
                </div>
            )
        }
    }
}

export default withRouter(withApolloFetch(translate('translations')(withCurrentProject(withCurrentUser(Project)))))
