import React from 'react';
import StockRechart from '../charts/stock_rechart';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ currentUser }) => {
  return (
    <ul>
      {
        currentUser.stocks.map((stock, idx) => {
          return (
            <StockIndexItem stock={stock} key={idx}/>
          );
        })
      }
    </ul>
  );
};

export default StockIndex;
