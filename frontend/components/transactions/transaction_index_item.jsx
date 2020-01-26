import React, { useState } from 'react';
import { formatTransactionDate } from '../../util/date_util';
import TransactionDetailContainer from './transaction_detail_container';

const TransactionIndexItem = ({ transaction }) => {
  const [detail, setDetail] = useState(false);

  return (
    <div 
      className={detail ? 'transaction-display detail' : 'transaction-display'}
      onClick={() => setDetail(!detail)}
    >
      <li className='transaction-index-item' >
        <div>
          <h3>Market {transaction.orderType[0].toUpperCase() + transaction.orderType.slice(1)}</h3>
          <p>{formatTransactionDate(transaction.transactionDate)}</p>
        </div>
        <div className="transaction-index-item-right">
          <h3>${transaction.amount.formatMoney(2)}</h3>
          <p>{transaction.numShares} {transaction.numShares === 1 ? 'share' : 'shares'} at ${transaction.price.formatMoney(2)}</p>
        </div>
      </li>
      {detail ? <TransactionDetailContainer transaction={transaction} /> : '' }
    </div>
  )
}

export default TransactionIndexItem;