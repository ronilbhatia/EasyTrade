import React, { useEffect } from 'react';
import TransactionIndex from './transaction_index';
import NavBar from '../nav_bar/nav_bar';
import { css } from 'react-emotion';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const StockHistory = ({ transactions, stock, fetchTransactions, fetchStockBasic, currentUser, logout, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!stock) fetchStockBasic(match.params.ticker);
    if (!transactions.length) fetchTransactions();
  });
  
  if (!stock) return (
    <div className='stock-loading'>
      <BeatLoader
        className={override}
        sizeUnit={"px"}
        size={20}
        color={'#21ce99'}
        loading={true}
      />
    </div>
  );
  return (
    <div>
      <NavBar currentUser={currentUser} logout={logout} />
      <div className="stock-history">
        <h1>{stock.companyName} History</h1>
        <TransactionIndex transactions={transactions} />
      </div>
    </div>
  )
}

export default StockHistory;