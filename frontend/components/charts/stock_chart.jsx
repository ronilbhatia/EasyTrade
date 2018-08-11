import React from 'react';
import { Line } from 'react-chartjs-2';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['9:00 AM ET', '9:05 AM ET', '9:10 AM ET', '9:15 AM ET', '9:20 AM ET', '9:25 AM ET', '9:30 AM ET', '9:35 AM ET', '9:40 AM ET', '9:45 AM ET', '9:50 AM ET', '9:55 AM ET', '10:00 AM ET', '10:05 AM ET', '10:10 AM ET', '10:15 AM ET', '10:20 AM ET', '10:25 AM ET', '10:30 AM ET', '10:35 AM ET', '10:40 AM ET', '10:45 AM ET', '10:50 AM ET', '10:55 AM ET', '11:00 AM ET', '11:05 AM ET', '11:10 AM ET', '11:15 AM ET', '11:20 AM ET', '11:25 AM ET', '11:30 AM ET', '11:35 AM ET', '11:40 AM ET', '11:45 AM ET', '11:50 AM ET', '11:55 AM ET', '12:00 PM ET', '12:05 PM ET', '12:10 PM PT', '12:15 PM ET', '12:20 PM ET', '12:25 PM ET', '12:30 PM ET', '12:35 PM ET', '12:40 PM ET', '12:45 PM ET', '12:50 PM ET', '12:55 PM ET', '1:00 PM ET', '1:05 PM ET', '1:10 PM PT', '1:15 PM ET', '1:20 PM ET', '1:25 PM ET', '1:30 PM ET', '1:35 PM ET', '1:40 PM ET', '1:45 PM ET', '1:50 PM ET', '1:55 PM ET', '2:00 PM ET', '2:05 PM ET', '2:10 PM PT', '2:15 PM ET', '2:20 PM ET', '2:25 PM ET', '2:30 PM ET', '2:35 PM ET', '2:40 PM ET', '2:45 PM ET', '2:50 PM ET', '2:55 PM ET', '3:00 PM ET', '3:05 PM ET', '3:10 PM PT', '3:15 PM ET', '3:20 PM ET', '3:25 PM ET', '3:30 PM ET', '3:35 PM ET', '3:40 PM ET', '3:45 PM ET', '3:50 PM ET', '3:55 PM ET', '4:00 PM ET', '4:05 PM ET', '4:10 PM PT', '4:15 PM ET', '4:20 PM ET', '4:25 PM ET', '4:30 PM ET', '4:35 PM ET', '4:40 PM ET', '4:45 PM ET', '4:50 PM ET', '4:55 PM ET', '5:00 PM ET', '5:05 PM ET', '5:10 PM PT', '5:15 PM ET', '5:20 PM ET', '5:25 PM ET', '5:30 PM ET', '5:35 PM ET', '5:40 PM ET', '5:45 PM ET', '5:50 PM ET', '5:55 PM ET'],
        datasets: [
          {
            label: 'Balance',
            data: [5200, 5300, 5325, 5275, 5200, 5225, 5225, 5250, 5300, 5400, 5500, 5430, 5450, 5500, 5400, 5250, 5300, 5400, 5300, 5250, 5350, 5400, 5500, 5550, 5600, 5500, 5520, 5450, 5400, 5400, 5350, 5450, 5350, 5250, 5300, 5330, 5350, 5250, 5220, 5280, 5330, 5400, 5300, 5250, 5350, 5400, 5500, 5400, 5150, 5050, 5000, 4950, 4975, 5050, 5025, 5000, 5025, 5015, 5060, 5080, 5150, 5100, 5125, 5075, 5000, 4950, 5000, 5050, 5075, 5025, 5090, 5120, 5110, 5080, 5130, 5150, 5200, 5220, 5170, 5150, 5180, 5200, 5230, 5250, 5150, 5050, 5000, 5150, 5200, 5400, 5300, 5250, 5350, 5400, 5500, 5400, 5150, 5050, 5000, 5150, 5200, 5400, 5300, 5250, 5350, 5400, 5500, 5400],
            borderColor: [
              'rgba(0, 153, 0, 1)',
            ],
            borderWidth: 2.5,
            fill: false,
            lineTension: 0,
            steppedLine: false,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(0, 153, 0, 1)',
            pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
            pointHoverBorderWidth: 2
          }
        ]
      },
    };
  }

  render() {
    return (
      <div className="chart">
        <h1>{this.props.stock.name}</h1>
        <h2>${this.props.balance.toString()}</h2>
        <h3>+$121.78 ({Math.round(1217800/5400)/100}%)</h3>
        <h3>+$121.78 ({Math.round(1217800/5400)/100}%)</h3>
        <div className="stock-chart">
          <Line
            data={this.state.chartData}
            options={{
              legend: {
                display: false,
              },
              scales: {
                xAxes: [{
                  display: false
                }],
                yAxes: [{
                  display: false
                }]
              },
              responsive: true,
              maintainAspectRatio: false,
              tooltips: {
                mode: "index",
                intersect: "false"
              },
              hover: {
                mode: "nearest",
                intersect: true
              }
            }}
          />
        <ul class="chart-range">
            <li>1D</li>
            <li>1W</li>
            <li>1M</li>
            <li>3M</li>
            <li>1Y</li>
            <li>5Y</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockChart;
