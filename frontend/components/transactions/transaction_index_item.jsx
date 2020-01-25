import React from 'react';

const TransactionIndexItem = ({ transaction }) => {
  return (
    <li>
      {transaction.orderType}
      {transaction.numShares}
      {transaction.price}
    </li>
  )
}

export default TransactionIndexItem;