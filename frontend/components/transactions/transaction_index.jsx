import React from 'react';
import TransactionIndexItem from './transaction_index_item';

const TransactionIndex = ({ transactions }) => {
  return (
    <ul>
      {
        transactions.map(transaction => 
          <TransactionIndexItem transaction={transaction} key={transaction.id} />
        )
      }
    </ul>
  );
}

export default TransactionIndex;