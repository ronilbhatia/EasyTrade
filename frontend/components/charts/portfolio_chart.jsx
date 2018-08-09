import React from 'react';
import {Bar, Line} from 'react-chartjs-2';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['9:00 AM ET', '9:05 AM ET', '9:10 AM ET', '9:15 AM ET', '9:20 AM ET', '9:25 AM ET Bedford'],
        datasets: [
          {
            label: 'Balance',
            data: [5200, 5500, 5000, 5150, 5200, 5400],
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
      }
    };
  }

  render() {
    return (
      <div className="chart">
        <h3>$5,400.00</h3>
        <Line

          data={this.state.chartData}
          options={{
            legend: {
              display: false,
            },
          }}
        />
      </div>
    );
  }
}

export default PortfolioChart;
