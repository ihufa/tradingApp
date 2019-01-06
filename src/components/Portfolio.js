import React, { Component } from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state={
            ticker: '',
            volume: 0
        }
    }

deleteHandler = (e) => {
e.preventDefault()
this.props.deleteStock(e.target.id)
}

  render() {
      return (
        <table>
          <thead>
          <tr><th>Stock ticker</th><th>Volume</th><th>$</th><th>yield</th><th>yield %</th></tr>
          </thead>
          <tbody>{this.props.portfolio.map(asset => 
            (<tr key={asset.ticker}>
            <td>{asset.ticker}</td><td className="volumeright">{asset.volume}</td><td></td><td></td><td></td><td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Sell</button></td>
            </tr>)
          )}
          </tbody>
        </table>
    )}
}

export default Portfolio
