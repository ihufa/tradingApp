import React, { Component } from 'react'

class Buy extends Component {
    constructor(props){
        super(props)
        this.state = {
            volume: 0,
            stock: null,
            timeOfPurchase: 0,
            price: 0,
            currentPrice: 0
        }
    }
handleChange = (e) => {
    this.setState({
        volume: e.target.value,
        stock: this.props.stock,
        timeOfPurchase: this.props.time,
        price: this.props.price,
        currentPrice: this.props.price
    })
}

handleBuy = (e) => {
    e.preventDefault()
    this.props.handleBuy(this.state)
    this.props.modalOK()
}
    
  render() {
      const backgroundStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
      const modalStyle = {
        backgroundColor: '#fff',
        width: '70%'    ,
        height: 150,
        margin: 'auto',
        position: 'relative'
      }
      const formStyle = {
        
      }


    return (
      <div style={backgroundStyle}>
        <div style={modalStyle}>
        <h3>{this.props.modalMessage}</h3>
            <form style={formStyle}>
                <input onChange={this.handleChange} type="number" placeholder="Volume"></input> <span>{Math.round(this.props.price*this.state.volume)}$</span>
                <button onClick={this.handleBuy}>Buy</button>
            </form>
        </div>
      </div>
    )
  }
}

export default Buy
