import React from 'react';
import TransactionIndexItem from './transaction_index_item';

const TransactionIndex = ({ transactions }) => {
  return (
    <div className="transactions-index">
      <h2>History</h2>
      <ul>
        {
          transactions.map(transaction => 
            <TransactionIndexItem transaction={transaction} key={transaction.id} />
          )
        }
      </ul>
    </div>
  )
}

export default TransactionIndex;