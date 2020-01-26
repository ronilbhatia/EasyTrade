import React from 'react';
import { Link } from 'react-router-dom';
import TransactionIndex from './transaction_index';

const StockShowHistory = ({ transactions, stock }) => {
  return (
    <div className="transactions-index">
      <div className="header">
        <h2>History</h2>
        <Link to={`/history/${stock.ticker}`}>Show More</Link>
      </div>
      <TransactionIndex transactions={transactions.slice(0, 2)} />
    </div>
  );
}

export default StockShowHistory;