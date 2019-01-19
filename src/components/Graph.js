import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'


class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            finalGraphData: {
                labels: [],
                    datasets: [
                        {
                            label: 'Portfolio',
                            data: [],
                        }
                    ]
            },
        }
    }


    
    render() { 
        if(Object.keys(this.props.graphData !== undefined && this.props.graphData).length !== 0) {
    let portfolioData =  {
            labels: this.props.graphData.times,
                datasets: [
                    {
                        label: this.props.graphData.ticker,
                        data: this.props.graphData.prices,
                    }
                ]
        }
        return (
            <Line
                data={portfolioData}
                options={{
                    title: {
                        display: this.props.graphData.ticker,
                        text: this.props.graphData.ticker,
                        fontSize: 25
                    },
                    legend: {
                        display: 'display',
                        position: 'position'
                            }
                        }}
                    />
        )
    }
    else {
            return null
    }}
}

export default Graph