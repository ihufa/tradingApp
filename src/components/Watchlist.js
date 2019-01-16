import React, { Component } from 'react'
import Buy from './modals/buy'

class Watchlist extends Component {
    constructor(props) {
        super(props)
        this.state={
            ticker: '',
            volume: 0,
            showBuyModal: false,

        }
    }

deleteHandler = (e) => {
e.preventDefault()
this.props.deleteStock(e.target.id)
}
showGraphHandler = (e) => {
  e.preventDefault()
  this.props.showGraph(e.target.id)
}
buyHandler = (e) => {
  e.preventDefault()
  this.setState({
    ...this.state, showBuyModal: !this.state.showBuyModal, ticker: e.target.id
  })
}
modalOK = () => {
  this.setState({
    showBuyModal: false
  })
}

  render() {
    if (this.state.showBuyModal) { return <Buy modalMessage = "Enter Volume" stock = {this.state.ticker} 
        price = {this.props.watchlist[this.props.watchlist.findIndex(item => item.ticker === this.state.ticker)].prices[99]}
      time={this.props.watchlist[this.props.watchlist.findIndex(item => item.ticker === this.state.ticker)].times[99]} 
        handleBuy={this.props.handleBuy} modalOK={this.modalOK}
        />}

    if (Object.keys(this.props.watchlist[0]).length !== 0) {     // dont render if watchlist is empty object
      return (<div>
        <h2>Watchlist</h2>
        <table className="watchlist">
          <thead>
          <tr><th>Stock ticker:</th><th>Price:</th></tr>
          </thead>
          <tbody>{this.props.watchlist.map(asset => 
          (<tr key={asset.ticker}>
            <td className="ticker">{asset.ticker}</td> <td className="price">${asset.prices[asset.prices.length-1]}</td>
            <td><button className="btn" id={asset.ticker} onClick={this.showGraphHandler}>See Graph</button></td>
            <td><button className="btn" id={asset.ticker} onClick={this.buyHandler}>Buy</button></td>
            <td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Remove from list</button></td>
            </tr>)
          )}
          </tbody>
        </table>
      </div>
    )}
    else if(this.props.stocks.length > 0) {return (
      <div>
        <h2>Watchlist</h2>
      <table className="watchlist">
        <thead>
          <tr><th>Stock ticker:</th><th>Price:</th></tr>
        </thead>
      <tbody>{this.props.stocks.map(asset =>
        (<tr key={asset.ticker}>
          <td className="ticker">{asset.ticker}</td>
          <td></td><td></td><td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Remove from list</button></td>
        </tr>)
      )}
      </tbody>
      </table>
      </div >)
    }
    else { return null}
  }
}

export default Watchlist
