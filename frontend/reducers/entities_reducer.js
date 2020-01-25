import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';
import newsReducer from './news_reducer';
import transactionsReducer from './transactions_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer,
  news: newsReducer,
  transactions: transactionsReducer
});

export default entitiesReducer;
