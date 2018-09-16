import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import transactionErrorsReducer from './transaction_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  transaction: transactionErrorsReducer
});

export default errorsReducer;
