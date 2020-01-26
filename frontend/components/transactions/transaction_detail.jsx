import React from 'react';
import { formatTransactionDate } from '../../util/date_util';

const TransactionDetail = ({ stock, transaction }) => {
  return (
    <div className="transaction-detail">
      <div className="transaction-detail-item">
        <h4>Stock Name</h4>
        <p>{stock.companyName}</p>
      </div>
      <div className="transaction-detail-item">
        <h4>Type</h4>
        <p>Market {transaction.orderType[0].toUpperCase() + transaction.orderType.slice(1)}</p>
      </div>
      <div className="transaction-detail-item">
        <h4>Submitted</h4>
        <p>{formatTransactionDate(transaction.transactionDate)}</p>
      </div>
      <div className="transaction-detail-item">
        <h4>Price</h4>
        <p>${transaction.price.formatMoney(2)}</p>
      </div>
      <div className="transaction-detail-item">
        <h4>Quantity</h4>
        <p>{transaction.numShares}</p>
      </div>
      <div className="transaction-detail-item">
        <h4>Total</h4>
        <p>${(transaction.numShares * transaction.price).formatMoney(2)}</p>
      </div>
    </div>
  );
}

export default TransactionDetail;