import React from 'react';
import { Line } from 'react-chartjs-2';
import StockRechart from './stock_rechart';

class StockChart extends React.Component {

  render() {
    const { stock } = this.props;
    return (
      <div>
        {
          (Object.keys(stock).length > 8) ? (
            <StockRechart stock={stock}/>
          ) : (
            <div>LOADING</div>
          )
        }
      </div>
    );
  }
}

export default StockChart;
