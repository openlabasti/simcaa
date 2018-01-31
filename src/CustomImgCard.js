import React, { Component } from 'react'
import Card from 'semantic-ui-react'

class CustomImgCard extends Component{
  componentDidMount(){
    let request = new Request(this.props.imgUrl),{
      method: 'GET',
      mode: 'cors'
    }
    fetch(request).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }
  render(){
    return({
      <Card image={this.state.img}>
    })
  }
}
