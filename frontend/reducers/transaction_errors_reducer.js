import { RECEIVE_TRANSACTION_ERRORS } from '../actions/transaction_actions';

const transactionErrorsReducers = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRANSACTION_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default transactionErrorsReducers;
