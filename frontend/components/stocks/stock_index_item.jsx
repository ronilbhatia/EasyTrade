import React from 'react';
import { Link } from 'react-router-dom';

const StockIndexItem = ({ stock }) => {
  return (stock.shares > 0) ? (
    <Link to={`/stocks/${stock.symbol}`}>
      <li className='stock-index-item'>
        <div>
          <h5>{stock.symbol}</h5>
          <p>{stock.shares} shares</p>
        </div>
        <div>
          <h6>${parseFloat(stock.price).formatMoney()}</h6>
        </div>
      </li>
    </Link>
  ) : null;
};

export default StockIndexItem;
