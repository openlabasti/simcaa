import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import Dropzone from 'react-dropzone'

class CustomImgsDnDUpload extends Component{
  constructor() {
    super()
    this.state = {
      message: "MODAL_IMGS_DND_HELPER",
      files: []
   }
  }
  onDrop(file) {
    if(file.type==='image/jpeg' || 'image/png'){
        this.setState((state)=>{
          message: "MODAL_IMGS_DND_UPLOADED",
          files: state.files.push(files)
        })
        //qua mando l'immagine al server GESTIONE ASYNC!!!
      }else{
        this.setState((state)=>{
          message: "MODAL_IMGS_DND_WRONG_FILETYPE",
          files: state.files
        })
      }
  }
  render(){
    const { t, i18n } = this.props
    return(
      <Modal trigger={<Button color='yellow'>{t("HEAD_BTN_ADD_IMGS")}</Button>}>
        <Modal.Header>{t("MODAL_IMGS_DND_HEADER")}</Modal.Header>
        <Modal.Content>
          <div className="ui center grid">
            {t(this.state.message)}
            <section>
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                  <p>{t("MODAL_IMGS_DND_DROPZONE_HELPER")}</p>
                </Dropzone>
              </div>
            </section>
            <section>
              {t("MODAL_IMGS_DND_UPLOADED_LIST")}
                  {console.log(this.state.files)}
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
export default translate('translations') (CustomImgsDnDUpload)
