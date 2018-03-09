import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import { withApolloFetch } from './withApolloFetch'
import Dropzone from 'react-dropzone'
import Loader from 'halogen/MoonLoader'

class CustomImgsDnDUpload extends Component{
  constructor() {
    super()
    this.state = {
      message: "MODAL_IMGS_DND_HELPER",
      files: [],
      loading: false
   }
  }
  onDrop(file) {
    if(file.type==='image/jpeg' || 'image/png'){
        //incapsulo immagine in oggetto form-data
        let imgToSend = new FormData()
        imgToSend.append('img',file[0])

        let request = new Request('http://www.radis-svil.it/simcaa/laravel-imageupload/public/imageupload',{
            method : 'POST',
            mode: 'cors',
            mimeType: 'multipart/form-data',
            body: imgToSend
        })
        //comunico che sto caricando
        this.setState(state=>({
          message: "MODAL_IMGS_DND_UPLOADING",
          files: state.files,
          loading: true
        }))
        fetch(request).then(response => {
          console.log(response)
          //ricevo la risposta, tutto ok aggiungo il file alla lista
          this.setState(state=>({
            message: "MODAL_IMGS_DND_UPLOADED",
            files: state.files.concat(file),
            loading: false
          }))
          this.props.handler(this.state.files)
        }).catch((error)=>{
          //errore, lo comunico all'utente
          console.log('errore di upload ->'+error)
          this.setState(state=>({
            message: "MODAL_IMGS_DND_UPERROR",
            files: state.files,
            loading: false
          }))
        })

      }else{
        this.setState(state=>({
          message: "MODAL_IMGS_DND_WRONG_FILETYPE",
          files: state.files,
          loading: false
        }))
      }
  }
  render(){
      console.log(this.props);
    const { t, i18n } = this.props
    if(!this.state.loading){
    return(
      <Modal trigger={<Button color='yellow'>{t("HEAD_BTN_ADD_IMGS")}</Button>}>
        <Modal.Header>{t("MODAL_IMGS_DND_HEADER")}</Modal.Header>
        <Modal.Content>
          <div className="ui center grid">
            {t(this.state.message)}
            <section>
              <div className="dropzone">
                  <Dropzone onDrop={this.onDrop.bind(this)}>
                    {t("MODAL_IMGS_DND_DROPZONE_HELPER")}
                  </Dropzone>
              </div>
            </section>
            <section>
              {t("MODAL_IMGS_DND_UPLOADED_LIST")}
              <ul>
                  {

                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
              </ul>
            </section>
          </div>
        </Modal.Content>
      </Modal>
    )
  }else{
    //sto caricando l'immagine
    return(
      <Modal trigger={<Button color='yellow'>{t("HEAD_BTN_ADD_IMGS")}</Button>}>
        <Modal.Header>{t("MODAL_IMGS_DND_HEADER")}</Modal.Header>
        <Modal.Content>
          <div className="ui center grid">
            {t(this.state.message)}
            <section>
              <div className="dropzone">
                  <Loader color="#26A65B" size="16px" margin="4px"/>
              </div>
            </section>
            <section>
              {t("MODAL_IMGS_DND_UPLOADED_LIST")}
              <ul>
                  {

                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
              </ul>
            </section>
          </div>
        </Modal.Content>
      </Modal>
    )
  }
  }
}
export default translate('translations') (withApolloFetch(CustomImgsDnDUpload))
