import React, { Component } from 'react'
import { Form, Dropdown, Grid } from 'semantic-ui-react'
import CardLayout from './CardLayout'
import { translate, Trans } from 'react-i18next'

class ImageOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageSize: [{type: 'imgsize', value: 'mini', text: 'mini'},
                            {type: 'imgsize', value: 'tiny', text: 'tiny'},
                            {type: 'imgsize', value: 'small', text: 'small'},
                            {type: 'imgsize', value: 'medium', text: 'medium'},
                            {type: 'imgsize', value: 'large', text: 'large'},
                            {type: 'imgsize', value: 'big', text: 'big'},
                            {type: 'imgsize', value: 'huge', text: 'huge'},
                            {type: 'imgsize', value: 'massive', text: 'massive'}],
            imagePadding: [{type: 'imgpadding', value: 'imgpadding1', text: '1 em'},
                                {type: 'imgpadding', value: 'imgpadding2', text: '2 em'},
                                {type: 'imgpadding', value: 'imgpadding3', text: '3 em'},
                                {type: 'imgpadding', value: 'imgpadding4', text: '4 em'},
                                {type: 'imgpadding', value: 'imgpadding5', text: '5 em'},
                                {type: 'imgpadding', value: 'imgpadding6', text: '6 em'}]
        }

    }

    onChangeDropdown(event, data) {
        this.props.changeOtions(data)
    }

    render() {
        const { t, i18n } = this.props

        let card = {id:0 ,
                lemma: 'React',
                lemmaPrevious: 'React',
                img: 'react.png',
                sinonimi: 0,
                imgAlt: [{voice_human: 'react',voice_start: 'react', voice_last: 'react', img: 'react.png'}],
                lock: 'unlock',
                codClass: 'Altro',
                complex: 0,
            }

        return (
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label> {t("OPT_LBL_IMAGESIZE")} </label>
                            <Dropdown placeholder='Select' fluid selection
                                options={this.state.imageSize}
                                onChange={this.onChangeDropdown.bind(this)}
                                defaultValue={this.props.imgSize}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> {t("OPT_LBL_IMAGEPADDING")} </label>
                            <Dropdown placeholder='Select' fluid selection
                                options={this.state.imagePadding}
                                onChange={this.onChangeDropdown.bind(this)}
                                defaultValue={this.props.imgPadding}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <Grid centered style={{'margin': '0'}}>
                    <CardLayout
                        Card={card}
                        isTypo={false}
                        Style={this.props.Style}
                        disabledCard='disabled'
                        sizeInput={this.props.sizeInput}
                        mode={false}
                        posInput={this.props.posInput}
                        transparent={this.props.transparent}
                        formatInput={this.props.formatInput}
                        weightInput={this.props.weightInput}
                        decorationInput={this.props.decorationInput}
                        fontStyleInput={this.props.fontStyleInput}
                        colorTextInput={this.props.colorTextInput}
                        colorBackgroundInput={this.props.colorBackgroundInput}
                        imgSize={this.props.imgSize}
                        imgPadding={this.props.imgPadding}
                        urlRest={this.props.urlRest}
                        urlImg={this.props.urlImg}
                    />
                </Grid>
            </div>
        )
    }
}

export default translate('translations')(ImageOptions)
