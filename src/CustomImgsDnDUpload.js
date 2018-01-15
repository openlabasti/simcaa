import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { translate, Trans } from 'react-i18next'
import Dropzone from 'react-dropzone'

class CustomImgsDnDUpload extends Component{
  constructor() {
    super()
    this.state = { files: [] }
  }
  onDrop(files) {
    this.setState({
      files
    });
  }
  render(){
    const { t, i18n } = this.props
    return(
      <Modal trigger={<Button color='yellow'>{t("HEAD_BTN_ADD_IMGS")}</Button>}>
        <Modal.Header>{t("MODAL_IMGS_DND_HEADER")}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {t("MODAL_IMGS_DND_HELPER")}
            <section>
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
              </div>
              <aside>
                <h2>Dropped files</h2>
                <ul>
                  {
                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
                </ul>
              </aside>
            </section>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default translate('translations') (CustomImgsDnDUpload)
