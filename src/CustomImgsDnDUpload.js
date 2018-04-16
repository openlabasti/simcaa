import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Loader from 'halogen/MoonLoader'

class CustomImgsDnDUpload extends Component{
    constructor() {
        super()
        this.state = {
            message: "MODAL_IMGS_DND_HELPER",
            files: [],
            loading: false,
            openModal: false,
        }
    }

    onDrop(file) {
        //incapsulo immagine in oggetto form-data
        let imgToSend = new FormData()
        for (let i = 0; i < file.length; i++) {
            imgToSend.append('img' + i,file[i])
        }
        imgToSend.append('nImgs', file.length)
        imgToSend.append('projectid', this.props.match.params.projectid)
        imgToSend.append('chapterid', this.props.match.params.chapterid)

        let request = new Request(window.env.ApiImageUpload,{
            method : 'POST',
            mode: 'cors',
            mimeType: 'multipart/form-data',
            body: imgToSend
        })
        //comunico che sto caricando
        this.setState({message: "MODAL_IMGS_DND_UPLOADING", loading: true})

        fetch(request).then((response) => {
            //ricevo la risposta, tutto ok aggiungo il file alla lista
            this.setState({message: "MODAL_IMGS_DND_UPLOADED", files: this.state.files.concat(file), loading: false})
            this.props.handler(file)
            this.handleOpenCloseModal()
        }).catch((error) => {
            //errore, lo comunico all'utente
            console.log('errore di upload ->' + error)
            this.setState({message: "MODAL_IMGS_DND_UPERROR", loading: false})
        })
    }

    // Toggle open/close of the modal
    handleOpenCloseModal() {
        this.setState({openModal: !this.state.openModal})
    }

    render(){
        const { t, i18n } = this.props

        let contentSection = !this.state.loading ?
            <Dropzone className='dropzone-beautify'
                onDrop={this.onDrop.bind(this)}
                accept="image/jpeg, image/png"
            >
                {t("MODAL_IMGS_DND_DROPZONE_HELPER")}
                <p><b>{t("MODAL_WARNING_TYPE")}</b></p>
            </Dropzone>
            :
            //sto caricando l'immagine
            <div className="dropzone">
                <Loader color="#26A65B" size="16px" margin="4px"/>
            </div>

        return(
            <Modal trigger={<Button onClick={this.handleOpenCloseModal.bind(this)} color='yellow'>{t("HEAD_BTN_ADD_IMGS")}</Button>} open={this.state.openModal}>
                <Modal.Header>{t("MODAL_IMGS_DND_HEADER")}</Modal.Header>
                <Modal.Content>
                    <div className="ui center grid">
                        {t(this.state.message)}
                        <section>
                            {contentSection}
                        </section>
                        <section>
                            {t("MODAL_IMGS_DND_UPLOADED_LIST")}
                            <ul>
                            {
                                this.state.files.map((f,index) => <li key={index}>{f.name} - {f.size} bytes</li>)
                            }
                            </ul>
                        </section>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.handleOpenCloseModal.bind(this)}>{t("HEAD_BTN_CLOSE")}</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default translate('translations')(withApolloFetch(withRouter(CustomImgsDnDUpload)))
