import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer
});

export default entitiesReducer;
