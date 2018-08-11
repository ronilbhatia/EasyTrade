import React from 'react';
import StockRechart from '../charts/stock_rechart';

class StockIndex extends React.Component {
  render() {
    return (
      <div>
        <h1>Stocks on stocks on stocks</h1>
        <StockRechart />
      </div>
    );
  }
}

export default StockIndex;
