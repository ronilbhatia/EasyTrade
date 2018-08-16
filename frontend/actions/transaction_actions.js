import * as TransactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction
});

export const createTransaction = formTransaction => dispatch => (
  TransactionApiUtil.createTransaction(formTransaction)
    .then(transaction => dispatch(receiveTransaction(transaction)))
);
