import React, { Component } from 'react';
import { Container, Grid, Segment, Button, Header, Table, Icon, Confirm, Loader } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import { withCurrentUser } from './withCurrentUser'
import LanguageSwitcher from './LanguageSwitcher'
import NewProjectForm from './NewProjectForm'
import NewProfileForm from './NewProfileForm'

class RootComponent extends Component {
    constructor(props) {
        super(props)
        this.state= {
            projects: [{}],
            profiles: [{}],
            layouts: [{}],
            openConfirmProject: false,
            openConfirmProfile: false,
            deleteProjectId: 0,
            deleteProfileId: 0,
            optionsProfiles: [{}],
            optionsLayouts: [{}],
            fetchFinished: false,
        }
    }

    // Richiama i profili e i progetti pubblici o dell'utente
    componentWillMount() {
        let query = `
        query allProjects {
            projects(proj_owner: ${this.props.user.id}, is_public: ${true}) {
                data {
                    id
                    proj_name
                    proj_share
                    proj_note
                    proj_owner
                    proj_layout
                }
            }
            profiles(profile_user_id: ${this.props.user.id}) {
                data {
                    id
                    profile_name
                    profile_system
                    profile_conf
                    profile_user_id
                }
            }
            layouts {
                data {
                    id
                    layout_name
                    layout_mode
                    layout_margins
                    width
                    height
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                // Set Profile for Modal
                let localOptionsProfile = this.state.optionsProfiles
                for (var i = 0; i < data.data.profiles.data.length; i++) {
                    localOptionsProfile[i] = {value: data.data.profiles.data[i].profile_conf,
                                                text: data.data.profiles.data[i].profile_name}
                }

                // Set Layout for Modal
                let localOptionsLayout = this.state.optionsLayouts
                for (var i = 0; i < data.data.layouts.data.length; i++) {
                    localOptionsLayout[i] = {value: JSON.stringify(data.data.layouts.data[i]),
                                                text: data.data.layouts.data[i].layout_name}
                }

                this.setState({projects: data.data.projects.data,
                                profiles: data.data.profiles.data,
                                layouts: data.data.layouts.data,
                                optionsProfiles: localOptionsProfile,
                                optionsLayouts: localOptionsLayout,
                                fetchFinished: true})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Apre il popup per confermare l'eliminazione del progetto
    handleOpenConfirmProject(id, event) {
        // Controlla se l'utente è effetivamente il proprietario del progetto
        if (this.state.projects.find(x => x.id === id).proj_owner === this.props.user.id) {
            this.setState({openConfirmProject: true, deleteProjectId: id})
        }
    }

    // Apre il popup per confermare l'eliminazione del profilo
    handleOpenConfirmProfile(id, event) {
        // Controlla se l'utente è effetivamente il proprietario del profilo
        if (this.state.profiles.find(x => x.id === id).profile_user_id === this.props.user.id) {
            this.setState({openConfirmProfile: true, deleteProfileId: id})
        }
    }

    // Chiude il popup se si preme il tasto cancella
    handleCancel() {
        this.setState({openConfirmProject: false, openConfirmProfile: false})
    }

    // Conferma ed elimina il progetto
    handleConfirmProject() {
        this.setState({openConfirmProject: false})
        this.deleteProject()
    }

    // Conferma ed elimina il profilo
    handleConfirmProfile() {
        this.setState({openConfirmProfile: false})
        this.deleteProfile()
    }

    // Crea un nuovo progetto
    createProject(title, notes, share, profile, layout) {
        let proj_name = this.escapeQuotes(title)
        let proj_note = this.escapeQuotes(notes)
        let proj_owner = this.props.user.id
        let proj_share = share === false ? 0 : 1
        let proj_profile = this.escapeQuotes(profile)
        let proj_layout = this.escapeQuotes(layout)
        let proj_blocked = 0
        let query = `
        mutation createProject {
            createCaaProject(proj_name: "${proj_name}",
                            proj_owner: ${proj_owner},
                            proj_share: ${proj_share},
                            proj_profile: "${proj_profile}",
                            proj_layout: "${proj_layout}",
                            proj_blocked: ${proj_blocked},
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

    // Aggiorna un progetto preesistente
    updateProject(id, title, notes, share, layout) {
        let escapedNotes = this.escapeQuotes(notes)
        let escapedTitle = this.escapeQuotes(title)
        let proj_share = share === false ? 0 : 1
        let proj_layout = this.escapeQuotes(layout)
        let query = `
        mutation updateProject {
            updateCaaProject(id: ${id},
                            proj_name: "${escapedTitle}",
                            proj_share: ${proj_share},
                            proj_note: "${escapedNotes}",
                            proj_layout: "${proj_layout}"){
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

    // Elimina il progetto e tutti i capitoli ad esso correlati
    deleteProject() {
        let query = `
        query chaptersToDelete {
            chapters(caa_project_id: ${this.state.deleteProjectId}) {
                data {
                    id
                }
            }
        }
        `
        this.props.apolloFetch({ query })
            .then((data) => {
                let idList = ''
                for (let i = 0; i < data.data.chapters.data.length; i++) {
                    idList += data.data.chapters.data[i].id + ' '
                }
                query = `
                mutation chapterToDelete {
                    deleteCaaChapter(idToDelete: "${idList}") {
                        id
                    }
                }`
                this.props.apolloFetch({ query })
                .then((data) => {
                    query = `
                        mutation deleteProject {
                            deleteCaaProject(id: ${this.state.deleteProjectId}) {
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
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Crea un nuovo profilo
    createProfile(data) {
        let newData = data
        newData.newProfileName = data.newProfileName.replace(/"/g, '')
        let profile_name = data.newProfileName
        let profile_conf = this.escapeQuotes(newData)
        let query = `
        mutation createNewProfile {
            createCaaProfile(profile_name: "${profile_name}",
                            profile_system: 0,
                            profile_conf: "${profile_conf}",
                            profile_user_id: ${this.props.user.id}) {
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

    // Aggiorna un profilo preesistente
    updateProfile(id, data) {
        let newData = data
        newData.newProfileName = data.newProfileName.replace(/"/g, '')
        let profile_name = data.newProfileName
        let profile_conf = this.escapeQuotes(newData)
        let query = `
        mutation updateProfile {
            updateCaaProfile(id: ${id},
                            profile_name: "${profile_name}",
                            profile_system: 0,
                            profile_conf: "${profile_conf}",
                            profile_user_id: ${this.props.user.id}) {
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

    // Deleta il profilo
    deleteProfile() {
        let query = `
            mutation deleteProfile {
                deleteCaaProfile(id: ${this.state.deleteProfileId}) {
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

    //  Logout...cancella il jwt dal session storage e redirige sulla login
    Logout() {
        sessionStorage.removeItem('jwt')
        this.props.history.push('/')
    }

    render() {
        const { t, i18n } = this.props

        let allProjects = this.state.projects
        allProjects = allProjects.map((item, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>
                        <Link to={'/project/' + item.id}>
                            {item.proj_name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{item.proj_note}</Table.Cell>
                    <Table.Cell collapsing>{item.proj_share === 0 ? t("MAIN_TBL_PRIVATE") : t("MAIN_TBL_PUBLIC")}</Table.Cell>
                    <Table.Cell collapsing textAlign='right'>
                        <NewProjectForm
                            className='icon-pointer'
                            size='big'
                            edit='icon'
                            data={item}
                            updateProject={this.updateProject.bind(this)}
                            optionsProfiles={this.state.optionsProfiles}
                            optionsLayouts={this.state.optionsLayouts}
                        />
                        <Icon name='trash' color='red' size='big'
                            className='icon-pointer'
                            disabled={this.props.user.id !== item.proj_owner ? true : false}
                            onClick={this.handleOpenConfirmProject.bind(this, item.id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
        let allProfiles = this.state.profiles
        allProfiles = allProfiles.map((item, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>
                        {item.profile_name}
                    </Table.Cell>
                    <Table.Cell>{item.profile_system}</Table.Cell>
                    <Table.Cell collapsing textAlign='right' disabled={item.id === 1 ? true : false}>
                        <NewProfileForm
                            className='icon-pointer'
                            size='big'
                            edit='icon'
                            data={item.profile_conf}
                            updateProfile={this.updateProfile.bind(this, item.id)}
                        />
                        <Icon name='trash' color='red' size='big'
                            className='icon-pointer'
                            disabled={item.id === 1 ? true : false}
                            onClick={this.handleOpenConfirmProfile.bind(this, item.id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })

        // Renderizza il Loader se non ha ancora finito le chiamate al db
        if (!this.state.fetchFinished) {
            return (
                <div>
                    <Loader active inline='centered' size='massive'/>
                </div>
            )
        }
        return (
            <Container>
                <Grid columns='equal' style={{padding: '10px'}}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header size='large'>
                                    {t("MAIN_LBL_ALL")}
                                    <NewProjectForm
                                        className='icon-pointer'
                                        size='big'
                                        createProject={this.createProject.bind(this)}
                                        optionsProfiles={this.state.optionsProfiles}
                                        optionsLayouts={this.state.optionsLayouts}
                                    />
                                </Header>
                                <Table celled striped>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>{t("MAIN_TBL_NAME")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_NOTES")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_SHARE")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_ACTIONS")}</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {allProjects}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header size='large'>
                                    {t("MAIN_LBL_ALLPROFILE")}
                                    <NewProfileForm
                                        className='icon-pointer'
                                        size='big'
                                        createProfile={this.createProfile.bind(this)}
                                    />
                                </Header>
                                <Table celled striped>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>{t("MAIN_TBL_NAME")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_NOTES")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_ACTIONS")}</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {allProfiles}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Button color='red' onClick={this.Logout.bind(this)}>Logout</Button>
                            </Segment>
                            <Segment>
                                <Header>Cambia lingua / Change language</Header>
                                <LanguageSwitcher />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header size='large'>{t("MAIN_LBL_NEWS")}</Header>
                                <Button color='red' onClick={this.Logout.bind(this)}>Logout</Button>
                                <Button color='blue' as={Link} to="/administration">Admin</Button>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Confirm
                    open={this.state.openConfirmProject}
                    header='This action cannot be reversed'
                    content='Are you sure to want to delete this chapter?'
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirmProject.bind(this)}
                />
                <Confirm
                    open={this.state.openConfirmProfile}
                    header='This action cannot be reversed'
                    content='Are you sure to want to delete this profile?'
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirmProfile.bind(this)}
                />
            </Container>
        );
    }
}

export default withRouter(translate('translations')(withApolloFetch(withCurrentUser(RootComponent))))
