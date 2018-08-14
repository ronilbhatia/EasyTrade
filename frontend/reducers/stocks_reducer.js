import {
  RECEIVE_STOCK,
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
      if (nextState[action.stock.ticker]) {
        nextState[action.stock.ticker].id = action.stock.id;
        nextState[action.stock.ticker].ticker = action.stock.ticker;
        nextState[action.stock.ticker].name = action.stock.name;
      } else {
        nextState[action.stock.ticker] = action.stock;
      }
      return nextState;
    case RECEIVE_STOCK_INFO:
      if (nextState[action.ticker]) {
        nextState[action.ticker].shortDescription = action.stockInfo.short_description;
        nextState[action.ticker].ceo = action.stockInfo.ceo;
        nextState[action.ticker].employees = action.stockInfo.employees;
        nextState[action.ticker].hqCity = action.stockInfo.hq_address_city;
        nextState[action.ticker].hqState = action.stockInfo.hq_state;
      } else {
        nextState[action.ticker] = {
          shortDescription: action.stockInfo.short_description,
          ceo: action.stockInfo.ceo,
          employees: action.stockInfo.employees,
          hqCity: action.stockInfo.hq_address_city,
          hqState: action.stockInfo.hq_state
        };
      }
      return nextState;
    case RECEIVE_STOCK_INTRADAY_DATA:
      if (nextState[action.ticker]) {
        nextState[action.ticker].intradayData = action.data;
      } else {
        nextState[action.ticker] = {
          intradayData: action.data
        };
      }
      return nextState;
    case RECEIVE_STOCK_DAILY_DATA:
      if (nextState[action.ticker]) {
        nextState[action.ticker].dailyData = action.data;
      } else {
        nextState[action.ticker] = {
          dailyData: action.data
        };
      }
      return nextState;
    case RECEIVE_STOCK_NEWS:
      if (nextState[action.ticker]) {
        nextState[action.ticker].news = action.news;
      } else {
        nextState[action.ticker] = {
          news: action.news
        };
      }
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
