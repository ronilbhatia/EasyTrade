import React from 'react';
import { Line } from 'react-chartjs-2';
import StockRechart from './stock_rechart';

class StockChart extends React.Component {

  render() {
    return (
      <div className="chart">
        <h1>{this.props.stock.name}</h1>
        <h2>${this.props.balance.toString()}</h2>
        <h3>+$121.78 ({Math.round(1217800/5400)/100}%)</h3>
        <h3>+$121.78 ({Math.round(1217800/5400)/100}%)</h3>
        <div className="stock-chart">
        <StockRechart />
        <ul className="chart-range">
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
