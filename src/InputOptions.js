import React, { Component } from 'react'
import { Form, Dropdown, Segment } from 'semantic-ui-react'
import { ChromePicker } from 'react-color';
import CardLayout from './CardLayout'
import { translate, Trans } from 'react-i18next'

class InputOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
             inputFormat: [{type: 'format', value: 'freeInput', text: props.t("OPT_FRM_FREE")},
                            {type: 'format', value: 'uppercaseInput', text: props.t("OPT_FRM_UPPERCASE")},
                            {type: 'format', value: 'lowercaseInput', text: props.t("OPT_FRM_LOWERCASE")}],
            inputPos: [{type: 'position', value: 'top', text: props.t("OPT_FRM_TOP")},
                            {type: 'position', value: 'bottom' ,text: props.t("OPT_FRM_BOTTOM")}],
            inputStyle: [{type: 'style', value: 'normal', text: props.t("OPT_FRM_NORMAL")},
                            {type: 'style', value: 'transparent',text: props.t("OPT_FRM_TRANSPARENT")}],
            inputSize: [{type: 'size', value: 'mini', text: props.t("OPT_FRM_MINI")},
                               {type: 'size', value: 'small', text: props.t("OPT_FRM_SMALL")},
                               {type: 'size', value: 'large', text: props.t("OPT_FRM_LARGE")},
                               {type: 'size', value: 'big', text: props.t("OPT_FRM_BIG")},
                               {type: 'size', value: 'huge', text: props.t("OPT_FRM_HUGE")},
                               {type: 'size', value: 'massive', text: props.t("OPT_FRM_MASSIVE")}],
            inputWeight: [{type: 'weight', value: 'weightNormalInput', text: props.t("OPT_FRM_NORMAL")},
                                {type: 'weight', value: 'weightThickInput', text: props.t("OPT_FRM_BOLD")}],
            inputDecoration: [{type: 'decoration', value: 'decorationNormalInput', text: props.t("OPT_FRM_NORMAL")},
                                    {type: 'decoration', value: 'decorationOverlineInput', text: props.t("OPT_FRM_OVERLINE")},
                                    {type: 'decoration', value: 'decorationUnderlineInput', text: props.t("OPT_FRM_UNDERLINE")}],
            inputFontStyle: [{type: 'font-style', value: 'styleNormalInput', text: props.t("OPT_FRM_NORMAL")},
                                    {type: 'font-style', value: 'styleItalicInput', text: props.t("OPT_FRM_ITALIC")},
                                    {type: 'font-style', value: 'styleObliqueInput', text: props.t("OPT_FRM_OBLIQUE")}]
        }

    }

    onChangeDropdown(event, data) {
        this.props.changeOtions(data)
    }

    onChangeColorText(color) {
        this.props.changeColorText(color)
    }

    onChangeColorBack(color) {
        this.props.changeColorBack(color)
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

        let InputOptions = [
            {options: this.state.inputFormat, default_value: this.props.formatInput, label: t("OPT_LBL_TEXTFORMAT")},
            {options: this.state.inputPos, default_value: this.props.posInput, label: t("OPT_LBL_INPUTPOSITION")},
            {options: this.state.inputStyle, default_value: this.props.transparent, label: t("OPT_LBL_INPUTSTYLE")},
            {options: this.state.inputSize, default_value: this.props.sizeInput, label: t("OPT_LBL_SIZEINPUT")},
            {options: this.state.inputWeight, default_value: this.props.weightInput, label: t("OPT_LBL_FONTWEIGHTINPUT")},
            {options: this.state.inputDecoration, default_value: this.props.decorationInput, label: t("OPT_LBL_FONTDECORATIONINPUT")},
            {options: this.state.inputFontStyle, default_value: this.props.fontStyleInput, label: t("OPT_LBL_FONTSTYLEINPUT")}
        ]

        InputOptions = InputOptions.map((item, index) => {
            return (
                <Form.Field key={index}>
                    <label> {item.label} </label>
                    <Dropdown placeholder='Select' fluid selection options={item.options}
                        onChange={this.onChangeDropdown.bind(this)}
                        defaultValue={item.default_value}
                    />
                </Form.Field>
            )
        })
        return (
            <Segment.Group horizontal>
                <Segment>
                    <Form>
                        {InputOptions}
                        <Form.Field>
                            <label> {t("OPT_LBL_TEXTCOLOR")} </label>
                            <ChromePicker disableAlpha color={this.props.colorTextInput}
                                onChangeComplete={this.onChangeColorText.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label> {t("OPT_LBL_TEXTBKGCOLOR")} </label>
                            <ChromePicker disableAlpha color={this.props.colorBackgroundInput}
                                onChangeComplete={this.onChangeColorBack.bind(this)}/>
                        </Form.Field>
                    </Form>
                </Segment>
                <Segment>
                    <CardLayout
                        Card={card}
                        isTypo={false}
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
                        imgSize={'small'}
                        imgPadding={'imgpadding1'}
                        urlRest={this.props.urlRest}
                        urlImg={this.props.urlImg}
                    />
                </Segment>
            </Segment.Group>
        )
    }
}

export default translate('translations')(InputOptions)
