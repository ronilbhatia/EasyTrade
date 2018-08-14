import React from 'react';

const StockIndexItem = ({ stock }) => {
  return (
    <li className='stock-index-item'>
      <div>
        <h5>{stock.symbol}</h5>
        <p>{stock.shares} shares</p>
      </div>
      <div>
        <h6>${stock.price}</h6>
      </div>
    </li>
  );
};

export default StockIndexItem;
