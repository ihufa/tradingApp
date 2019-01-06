import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'


class Graph extends Component {
    render() { 
        return (
            <Line
                data={this.props.chartData}
                options={{
                    title: {
                        display: 'Portfolio',
                        text: 'Portfolio',
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
}

export default Graph