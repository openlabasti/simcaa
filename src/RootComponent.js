import React, { Component } from 'react';
import { Container, Grid, Segment, Button, Header, Table, Icon, Confirm, Loader, Menu, Dropdown, Dimmer, Pagination, Input } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import { withCurrentUser } from './withCurrentUser'
import LanguageSwitcher from './LanguageSwitcher'
import NewProjectForm from './NewProjectForm'
import NewProfileForm from './NewProfileForm'
import UploadSymbol from './UploadSymbol'

class RootComponent extends Component {
    constructor(props) {
        super(props)
        this.state= {
            projects: [{}],
            projectsSearch: [{}],
            profiles: [{}],
            layouts: [{}],
            openConfirmProject: false,
            openConfirmProfile: false,
            deleteProjectId: 0,
            deleteProfileId: 0,
            optionsProfiles: [{}],
            optionsLayouts: [{}],
            fetchFinished: false,
            valueSearch: '',

            // Pagination state variables
            currentPage: 1,
            totalPages: 5,
            total: 0,
            limit: 15,
            page: 1,

            // Sort Table variables
            direction: 'ascending',
            column: null,
        }
    }

    // Richiama i profili e i progetti pubblici o dell'utente
    componentWillMount() {
        let query = `
        query allProjects {
            projects(proj_owner: ${this.props.user.id}, is_public: ${true},
                    limit: ${this.state.limit}, page: ${this.state.page}) {
                total
                data {
                    id
                    proj_name
                    proj_share
                    proj_note
                    proj_owner
                    proj_layout
                    updated_at
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

                this.setState({projects: data.data.projects.data.sort((a, b) => {return new Date(b.updated_at) - new Date(a.updated_at)}),
                                projectsSearch: data.data.projects.data.sort((a, b) => {return new Date(b.updated_at) - new Date(a.updated_at)}),
                                profiles: data.data.profiles.data,
                                layouts: data.data.layouts.data,
                                optionsProfiles: localOptionsProfile,
                                optionsLayouts: localOptionsLayout,
                                total: data.data.projects.total,
                                totalPages: Math.ceil(data.data.projects.total / this.state.limit),
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

    // Change page on Project Table
    changePageProject(e, activePage) {
        this.setState({page: activePage.activePage}, () => {
            this.componentWillMount()
        })
    }

    // Sort the Project Table
    handleSort(column, e) {
        if (this.state.column !== column) {
            let localProject = this.state.projects.sort((a, b) => {
                return a[column] - b[column]
            })
            this.setState({column, direction: 'ascending', projects: localProject})
        } else {
            this.setState({
                projects: this.state.projects.reverse(),
                direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
            })
        }

    }

    // Search bar in table header
    projectSearch(e) {
        let localProjectSearch = this.state.projectsSearch
        let localProjectResult = []
        let re = new RegExp(e.target.value, "gi")
        for (let i = 0; i < localProjectSearch.length; i++) {
            let matchResult = localProjectSearch[i].proj_name.match(re)
            if (matchResult !== null && matchResult.length > 0) {
                localProjectResult.splice(i, 0, localProjectSearch[i])
            }
        }
        this.setState({valueSearch: e.target.value, projects: localProjectResult})
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
                    <Table.Cell collapsing>{item.id}</Table.Cell>
                    <Table.Cell collapsing>
                        <Link to={'/project/' + item.id}>
                            {item.proj_name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{item.updated_at}</Table.Cell>
                    <Table.Cell collapsing>{item.proj_share === 0 ? t("MAIN_TBL_PRIVATE") : t("MAIN_TBL_PUBLIC")}</Table.Cell>
                    <Table.Cell collapsing textAlign='center'>{item.proj_owner}</Table.Cell>
                    <Table.Cell collapsing textAlign='right' className='fix-display'>
                        <NewProjectForm
                            className='icon-pointer'
                            size='big'
                            edit='icon'
                            data={item}
                            updateProject={this.updateProject.bind(this)}
                            optionsProfiles={this.state.optionsProfiles}
                            optionsLayouts={this.state.optionsLayouts}
                            disabled={this.props.user.id !== item.proj_owner ? true : false}
                        />
                        <div style={{display: 'inline-block'}}>
                            <Icon name='trash' color='red' size='big'
                                className='icon-pointer'
                                disabled={this.props.user.id !== item.proj_owner ? true : false}
                                onClick={this.handleOpenConfirmProject.bind(this, item.id)}
                            />
                        </div>
                    </Table.Cell>
                </Table.Row>
            )
        })
        let allProfiles = this.state.profiles
        allProfiles = allProfiles.map((item, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell collapsing>{item.id}</Table.Cell>
                    <Table.Cell collapsing >
                        {item.profile_name}
                    </Table.Cell>
                    <Table.Cell>{item.profile_user_id}</Table.Cell>
                    <Table.Cell>{item.profile_system}</Table.Cell>
                    <Table.Cell collapsing textAlign='right' disabled={item.id === 1 ? true : false} className='fix-display'>
                        <NewProfileForm
                            className='icon-pointer'
                            size='big'
                            edit='icon'
                            data={item.profile_conf}
                            updateProfile={this.updateProfile.bind(this, item.id)}
                            disabled={item.id === 1 ? true : false}
                        />
                        <div style={{display: 'inline-block'}}>
                            <Icon name='trash' color='red' size='big'
                                className='icon-pointer'
                                disabled={item.id === 1 ? true : false}
                                onClick={this.handleOpenConfirmProfile.bind(this, item.id)}
                            />
                        </div>
                    </Table.Cell>
                </Table.Row>
            )
        })

        let dropdownOptions = ''
        if (this.props.user.group_id === 1) {
            dropdownOptions = <Dropdown.Item as={Link} to="/administration">Admin</Dropdown.Item>
        }

        // Renderizza il Loader se non ha ancora finito le chiamate al db
        if (!this.state.fetchFinished) {
            return (
                <Dimmer
                    active={!this.state.fetchFinished}
                    page
                >
                    <Loader active inline='centered' size='massive' />
                </Dimmer>
            )
        }
        return (
            <Container>
                <Menu>
                    <Menu.Menu position='right'>
                        <LanguageSwitcher type='dropdown' />
                        <Dropdown item text={t("HOME_NAVBAR_MANAGE")}>
                            <Dropdown.Menu>
                                <UploadSymbol type='dropdown' user={this.props.user} />
                                <NewProfileForm
                                    className='icon-pointer'
                                    size='big'
                                    type='dropdown'
                                    createProfile={this.createProfile.bind(this)}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text={t("HOME_NAVBAR_USER")}>
                            <Dropdown.Menu>
                                <Dropdown.Item>{t("HOME_NAVBAR_USER_PROFILE")}</Dropdown.Item>
                                {dropdownOptions}
                                <Dropdown.Item onClick={this.Logout.bind(this)}>{t("HOME_NAVBAR_USER_LOGOUT")}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <Grid columns='equal' style={{padding: '10px'}}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header size='large' className='fix-display'>
                                    <NewProjectForm
                                        className='icon-pointer'
                                        size='big'
                                        createProject={this.createProject.bind(this)}
                                        optionsProfiles={this.state.optionsProfiles}
                                        optionsLayouts={this.state.optionsLayouts}
                                    />
                                    <Header.Content>
                                        {t("MAIN_LBL_ALL")}
                                        <Header.Subheader>
                                            {t("MAIN_LBL_ALL")}
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Table celled striped color='blue' sortable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan={6}>
                                                <Input
                                                    icon={<Icon name='search' inverted circular />}
                                                    placeholder='Search...'
                                                    onChange={this.projectSearch.bind(this)}
                                                    value={this.valueSearch}
                                                />
                                            </Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.HeaderCell
                                                sorted={this.state.column === 'id' ? this.state.direction : null}
                                                onClick={this.handleSort.bind(this, 'id')}
                                            >
                                                ID
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                                sorted={this.state.column === 'proj_name' ? this.state.direction : null}
                                                onClick={this.handleSort.bind(this, 'proj_name')}
                                            >
                                                {t("MAIN_TBL_NAME")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                                sorted={this.state.column === 'updated_at' ? this.state.direction : null}
                                                onClick={this.handleSort.bind(this, 'updated_at')}
                                            >
                                                {t("MAIN_TBL_DATEUPDATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell
                                                sorted={this.state.column === 'proj_share' ? this.state.direction : null}
                                                onClick={this.handleSort.bind(this, 'proj_share')}
                                            >
                                                {t("MAIN_TBL_SHARE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_USEROWN")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_ACTIONS")}</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {allProjects}
                                    </Table.Body>

                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='6'>
                                                <Pagination
                                                    defaultActivePage={this.state.currentPage}
                                                    totalPages={this.state.totalPages}
                                                    onPageChange={this.changePageProject.bind(this)}
                                                />
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header size='large'>
                                    <Header.Content>
                                        {t("MAIN_LBL_ALLPROFILE")}
                                        <Header.Subheader>
                                            {t("MAIN_LBL_MANAGEPROFILE")}
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Table celled striped color='blue'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>ID</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_NAME")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_PROFILEOWN")}</Table.HeaderCell>
                                            <Table.HeaderCell>{t("MAIN_TBL_SHARE")}</Table.HeaderCell>
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
                </Grid>
                <Confirm
                    open={this.state.openConfirmProject}
                    header={t("DELETE_CNF_H")}
                    content={t("DELETE_CNF_P")}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirmProject.bind(this)}
                />
                <Confirm
                    open={this.state.openConfirmProfile}
                    header={t("DELETE_CNF_H")}
                    content={t("DELETE_CNF_C")}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirmProfile.bind(this)}
                />
            </Container>
        );
    }
}

export default withRouter(translate('translations')(withApolloFetch(withCurrentUser(RootComponent))))
