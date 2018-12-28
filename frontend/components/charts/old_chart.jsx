/*
This file is no longer in use. Originally I tried to make my charts
using Chart.js but I later realized that it didn't have the functionality
I wanted and switched to recharts
*/

import React from 'react';
import {Bar, Line} from 'react-chartjs-2';

class PortfolioChart extends React.Component {
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
        <h3>${this.props.balance.toString()}</h3>
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
      </div>
    );
  }
}

export default PortfolioChart;

// const data = [
//   { time: '9:00 AM ET', price: 5200 },
//   { time: '9:05 AM ET', price: 5300 },
//   { time: '9:10 AM ET', price: 5325 },
//   { time: '9:15 AM ET', price: 5275 },
//   { time: '9:20 AM ET', price: 5200 },
//   { time: '9:25 AM ET', price: 5225 },
//   { time: '9:30 AM ET', price: 5225 },
//   { time: '9:35 AM ET', price: 5250 },
//   { time: '9:40 AM ET', price: 5300 },
//   { time: '9:45 AM ET', price: 5400 },
//   { time: '9:50 AM ET', price: 5500 },
//   { time: '9:55 AM ET', price: 5430 },
//   { time: '10:00 AM ET', price: 5450 },
//   { time: '10:05 AM ET', price: 5500 },
//   { time: '10:10 AM ET', price: 5400 },
//   { time: '10:15 AM ET', price: 5250 },
//   { time: '10:20 AM ET', price: 5300 },
//   { time: '10:25 AM ET', price: 5400 },
//   { time: '10:30 AM ET', price: 5300 },
//   { time: '10:35 AM ET', price: 5250 },
//   { time: '10:40 AM ET', price: 5350 },
//   { time: '10:45 AM ET', price: 5400 },
//   { time: '10:50 AM ET', price: 5500 },
//   { time: '10:55 AM ET', price: 5550 },
//   { time: '11:00 AM ET', price: 5600 },
//   { time: '11:05 AM ET', price: 5500 },
//   { time: '11:10 AM ET', price: 5520 },
//   { time: '11:15 AM ET', price: 5450 },
//   { time: '11:20 AM ET', price: 5400 },
//   { time: '11:25 AM ET', price: 5400 },
//   { time: '11:30 AM ET', price: 5350 },
//   { time: '11:35 AM ET', price: 5450 },
//   { time: '11:40 AM ET', price: 5350 },
//   { time: '11:45 AM ET', price: 5250 },
//   { time: '11:50 AM ET', price: 5300 },
//   { time: '11:55 AM ET', price: 5330 },
//   { time: '12:00 PM ET', price: 5350 },
//   { time: '12:05 PM ET', price: 5250 },
//   { time: '12:10 PM PT', price: 5220 },
//   { time: '12:15 PM ET', price: 5280 },
//   { time: '12:20 PM ET', price: 5330 },
//   { time: '12:25 PM ET', price: 5400 },
//   { time: '12:30 PM ET', price: 5300 },
//   { time: '12:35 PM ET', price: 5250 },
//   { time: '12:40 PM ET', price: 5350 },
//   { time: '12:45 PM ET', price: 5400 },
//   { time: '12:50 PM ET', price: 5500 },
//   { time: '12:55 PM ET', price: 5400 },
//   { time: '1:00 PM ET', price: 5150 },
//   { time: '1:05 PM ET', price: 5050 },
//   { time: '1:10 PM PT', price: 5000 },
//   { time: '1:15 PM ET', price: 4950 },
//   { time: '1:20 PM ET', price: 4975 },
//   { time: '1:25 PM ET', price: 5050 },
//   { time: '1:30 PM ET', price: 5025 },
//   { time: '1:35 PM ET', price: 5000 },
//   { time: '1:40 PM ET', price: 5025 },
//   { time: '1:45 PM ET', price: 5015 },
//   { time: '1:50 PM ET', price: 5060 },
//   { time: '1:55 PM ET', price: 5080 },
//   { time: '2:00 PM ET', price: 5150 },
//   { time: '2:05 PM ET', price: 5100 },
//   { time: '2:10 PM PT', price: 5125 },
//   { time: '2:15 PM ET', price: 5075 },
//   { time: '2:20 PM ET', price: 5000 },
//   { time: '2:25 PM ET', price: 4950 },
//   { time: '2:30 PM ET', price: 5000 },
//   { time: '2:35 PM ET', price: 5050 },
//   { time: '2:40 PM ET', price: 5075 },
//   { time: '2:45 PM ET', price: 5025 },
//   { time: '2:50 PM ET', price: 5090 },
//   { time: '2:55 PM ET', price: 5120 },
//   { time: '3:00 PM ET', price: 5110 },
//   { time: '3:05 PM ET', price: 5080 },
//   { time: '3:10 PM PT', price: 5130 },
//   { time: '3:15 PM ET', price: 5150 },
//   { time: '3:20 PM ET', price: 5200 },
//   { time: '3:25 PM ET', price: 5220 },
//   { time: '3:30 PM ET', price: 5170 },
//   { time: '3:35 PM ET', price: 5150 },
//   { time: '3:40 PM ET', price: 5180 },
//   { time: '3:45 PM ET', price: 5200 },
//   { time: '3:50 PM ET', price: 5230 },
//   { time: '3:55 PM ET', price: 5250 },
//   { time: '4:00 PM ET', price: 5150 },
//   { time: '4:05 PM ET', price: 5050 },
//   { time: '4:10 PM PT', price: 5000 },
//   { time: '4:15 PM ET', price: 5150 },
//   { time: '4:20 PM ET', price: 5200 },
//   { time: '4:25 PM ET', price: 5400 },
//   { time: '4:30 PM ET', price: 5300 },
//   { time: '4:35 PM ET', price: 5250 },
//   { time: '4:40 PM ET', price: 5350 },
//   { time: '4:45 PM ET', price: 5400 },
//   { time: '4:50 PM ET', price: 5500 },
//   { time: '4:55 PM ET', price: 5400 },
//   { time: '5:00 PM ET', price: 5150 },
//   { time: '5:05 PM ET', price: 5050 },
//   { time: '5:10 PM PT', price: 5000 },
//   { time: '5:15 PM ET', price: 5150 },
//   { time: '5:20 PM ET', price: 5200 },
//   { time: '5:25 PM ET', price: 5400 },
//   { time: '5:30 PM ET', price: 5300 },
//   { time: '5:35 PM ET', price: 5250 },
//   { time: '5:40 PM ET', price: 5350 },
//   { time: '5:45 PM ET', price: 5400 },
//   { time: '5:50 PM ET', price: 5500 },
//   { time: '5:55 PM ET', price: 5400 }
// ];
