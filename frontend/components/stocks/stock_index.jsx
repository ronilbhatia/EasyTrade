import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ currentUser }) => {
  return (
    <div>
      {
        Object.keys(currentUser.stocks).length > 0 ? (
          <ul>
            {
              currentUser.stocks.map((stock, idx) => {
                return (
                  <StockIndexItem stock={stock} key={idx} />
                );
              })
            }
          </ul>
        ) : (
            <div></div>
          )
      }
    </div>
  );
};

export default StockIndex;
