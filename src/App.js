import React from 'react'
import Stockadder from './components/Stockadder'
import Portfolio from './components/Portfolio'
import Graph from './components/Graph'
import axios from 'axios'
import './css/main.css'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            apiData: [],
            graphData: [],
            isLoaded: false,
            stocks: [],
            finalGraphData: []
            
        }
    }
    
    deleteStock = (stock) => {
        this.setState({
            stocks: this.state.stocks.filter(item => item.ticker !== stock)
        })
        }
    addStock = (stock) => {    
        this.setState({
            stocks: this.state.stocks.concat(stock)
        })
    }

    updatePortfolio = async() => {
        const API_KEY = 'RNMW9AOG5O5M2LRV' //alphavantage.co
        for( let i = 0; i < this.state.stocks.length; i++ ) {
            await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.stocks[i].ticker}&interval=5min&apikey=${API_KEY}`).then(res => {
                let keys = Object.keys(res.data['Time Series (5min)']).reverse()
                let prices = []
                for (let u = 0; u < keys.length; u++) {
                    prices = prices.concat(parseFloat((res.data['Time Series (5min)'][keys[u]]['4. close'])))
                }
                this.setState({
                    apiData: this.state.apiData.concat({
                        
                        labels: keys,
                        datasets: [
                            {
                                label: this.state.stocks[i].ticker,
                                data: prices,
                                volume: this.state.stocks[i].volume
                            }
                        ]
                    })
                })
            })
        }
        this.createGraphData()  
    }
    
    createGraphData = () => {
        let portfolioProduct = []
        let portfolioSum = []
        let finalGraphData = []

        for (let i = 0; i < this.state.stocks.length; i++) {    // multiply prices by volume
            portfolioProduct = this.state.apiData[i].datasets[0].data.map(price => price * parseFloat(this.state.apiData[i].datasets[0].volume))
            
            this.setState({
                graphData: this.state.graphData.concat({

                    labels: this.state.apiData[0].labels,
                    datasets: [
                        {
                            label: 'Portfolio',
                            data: portfolioProduct,
                            volume: this.state.stocks[i].volume
                        }
                    ]
                })
            })
        }   

        for(let i = 0; i < this.state.stocks.length; i++) {     // add portfolio prices together in one array
            for (let u = 0; u < this.state.apiData[0].datasets[0].data.length; u++) {
                if (portfolioSum[u]) { portfolioSum[u] = portfolioSum[u] + this.state.graphData[i].datasets[0].data[u] }
                else portfolioSum[u] = this.state.graphData[i].datasets[0].data[u]
            }
        }
    
        finalGraphData = this.state.graphData[0]
        finalGraphData.datasets[0].data = portfolioSum
       this.setState({
           finalGraphData
       })
    }
    

        render() { 
            return (
                    <div className="wrap">
                    <Stockadder addStock={this.addStock} updatePortfolio={this.updatePortfolio}/>
                    <Portfolio portfolio={this.state.stocks} deleteStock={this.deleteStock}/>
                    <div className="chart">
                    <Graph chartData={this.state.finalGraphData} />
                    </div>
                </div>)
        } }
export default App
