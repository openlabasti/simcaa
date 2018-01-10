import React, { Component } from 'react'
import { Form, Dropdown, Grid, Divider } from 'semantic-ui-react'
import { ChromePicker } from 'react-color';
import CardLayout from './CardLayout'
import { translate, Trans } from 'react-i18next'

class CardOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            optionIndex: 0,
            labelItem: [{text: 'Aggettivo', value: 0},
                        {text: 'Articolo', value: 1},
                        {text: 'Avverbio', value: 2},
                        {text: 'Congiunzione', value: 3},
                        {text: 'Interiezione', value: 4},
                        {text: 'Pronome', value: 5},
                        {text: 'Preposizione', value: 6},
                        {text: 'Sostantivo', value: 7},
                        {text: 'Verbo', value: 8},
                        {text: 'Altro', value: 9}],
            borderSize: [{type: 'bordersize', value: '1', text: '1px'},
                        {type: 'bordersize', value: '2', text: '2px'},
                        {type: 'bordersize', value: '3', text: '3px'},
                        {type: 'bordersize', value: '4', text: '4px'},
                        {type: 'bordersize', value: '5', text: '5px'}],
            borderType: [{type: 'bordertype', value: 'dotted', text: props.t("OPT_FRM_DOTTED")},
                        {type: 'bordertype', value: 'dashed', text: props.t("OPT_FRM_DASHED")},
                        {type: 'bordertype', value: 'solid', text: props.t("OPT_FRM_SOLID")},
                        {type: 'bordertype', value: 'double', text: props.t("OPT_FRM_DOUBLE")}]
        }
    }

    onChangeCategory(event, data) {
        this.setState({optionIndex: data.value})
    }

    onChangeDropdown(item, event, data) {
        this.props.changeOtions(data, item)
    }

    onChangeColorBorder(item, color, event) {
        this.props.changeColorBorder(color, item)
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

        let labelItem = this.state.labelItem.map((item, index) => {
            let style = {border: this.props.borderCard[item.text].size + 'px '
                            + this.props.borderCard[item.text].type + ' '
                            + this.props.borderCard[item.text].color
                    }
            return (
                <Grid.Row key={index}>
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERCOLOR")} ({item.text})</label>
                                <ChromePicker disableAlpha
                                    color={this.props.borderCard[item.text].color}
                                    onChangeComplete={this.onChangeColorBorder.bind(this, item)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERTYPE")}</label>
                                <Dropdown placeholder='Select' fluid selection
                                    options={this.state.borderType}
                                    onChange={this.onChangeDropdown.bind(this, item)}
                                    defaultValue={this.props.borderCard[item.text].type}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t("OPT_LBL_BORDERSIZE")}</label>
                                <Dropdown placeholder='Select' fluid selection
                                    options={this.state.borderSize}
                                    onChange={this.onChangeDropdown.bind(this, item)}
                                    defaultValue={this.props.borderCard[item.text].size}
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
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
                            Style={style}
                            urlRest={this.props.urlRest}
                            urlImg={this.props.urlImg}
                        />
                    </Grid.Column>
                </Grid.Row>
            )
        })
        return (
            <div>
                <Dropdown
                    selection
                    options={this.state.labelItem}
                    placeholder='Select category type'
                    onChange={this.onChangeCategory.bind(this)}
                />
                <Divider hidden />
                <Grid>
                    {labelItem[this.state.optionIndex]}
                </Grid>
            </div>
        )
    }
}

export default translate('translations')(CardOptions)
