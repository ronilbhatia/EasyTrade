import * as TransactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';

const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction
});

const receiveErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
});

export const createTransaction = formTransaction => dispatch => (
  TransactionApiUtil.createTransaction(formTransaction)
    .then(transaction => {
      dispatch(receiveTransaction(transaction));
      window.location.reload();
    },
          errors => dispatch(receiveErrors(errors.responseJSON)))
);
