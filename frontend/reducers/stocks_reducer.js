import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS,
  RECEIVE_STOCK_INFO,
  RECEIVE_STOCK_INTRADAY_DATA,
  RECEIVE_STOCK_DAILY_DATA,
  RECEIVE_STOCK_NEWS
} from '../actions/stock_actions';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState[action.stock.ticker] = action.stock;
      return nextState;
    case RECEIVE_STOCKS:
      nextState.allStocks = action.allStocks;
      return nextState;
    case RECEIVE_STOCK_INFO:
        nextState[action.ticker].shortDescription = action.stockInfo.short_description;
        nextState[action.ticker].ceo = action.stockInfo.ceo;
        nextState[action.ticker].employees = action.stockInfo.employees;
        nextState[action.ticker].hqCity = action.stockInfo.hq_address_city;
        nextState[action.ticker].hqState = action.stockInfo.hq_state;
      return nextState;
    case RECEIVE_STOCK_INTRADAY_DATA:
        nextState[action.ticker].intradayData = action.data;
      return nextState;
    case RECEIVE_STOCK_DAILY_DATA:
        nextState[action.ticker].dailyData = action.data;
      return nextState;
    case RECEIVE_STOCK_NEWS:
        nextState[action.ticker].news = action.news;
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
