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
  console.log(e.target.name)
  this.props.showGraph(e.target.name)
}
buyHandler = (e) => {
  e.preventDefault()
  this.setState({
    ...this.state, showBuyModal: !this.state.showBuyModal, ticker: e.target.name
  })
}
modalOK = () => {
  this.setState({
    showBuyModal: false
  })
}


  render() {
    if (this.state.showBuyModal) { return <Buy modalMessage = "Enter Volume" ticker = {this.state.ticker} 
        price = {this.props.watchlist[this.props.watchlist.findIndex(item => item.ticker === this.state.ticker)].prices[99]}
      time={this.props.watchlist[this.props.watchlist.findIndex(item => item.ticker === this.state.ticker)].times[99]} 
        handleBuy={this.props.handleBuy} modalOK={this.modalOK}
        updatePortfolioData={this.props.updatePortfolioData}
        handleClose={this.modalOK}
        />}

    if (Object.keys(this.props.watchlist[0] !== undefined && this.props.watchlist[0]).length !== 0) {     // dont render if watchlist is empty object
      return (<div>
        <h2>Watchlist</h2>
        <table className="watchlist">
          <thead>
          <tr><th>Stock ticker:</th><th>Price:</th></tr>
          </thead>
          <tbody>{this.props.watchlist.map(asset => 
            (<tr key={asset.ticker} name={asset.ticker} onMouseOver={this.showGraphHandler}>
              <td name={asset.ticker} className="ticker">{asset.ticker}</td><td className="price" name={asset.ticker}>${asset.prices[asset.prices.length-1]}</td>
            <td><button className="Btn" name={asset.ticker} onClick={this.buyHandler}>Buy</button></td>
            </tr>)
          )}
          </tbody>
        </table>
      </div>
    )}
    else if(this.props.stocks.length > 0) {return (
      <div>
      <table className="watchlist">
      <tbody>{this.props.stocks.map(asset =>
        (<tr key={asset.ticker}>
          <td className="ticker">{asset.ticker}</td>
          <td><button className="Btn" id={asset.ticker} onClick={this.deleteHandler}>Remove from list</button></td>
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
