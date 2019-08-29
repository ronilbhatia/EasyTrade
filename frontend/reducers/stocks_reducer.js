import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS,
  RECEIVE_STOCK_INFO,
  RECEIVE_STOCK_INFO2,
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
      action.stock.name = action.stock.companyName
      action.stock.ticker = action.stock.symbol
      debugger
      nextState[action.stock.symbol] = action.stock;
      return nextState;
    case RECEIVE_STOCKS:
      nextState.allStocks = action.allStocks;
      return nextState;
    case RECEIVE_STOCK_INFO:
      nextState[action.ticker].marketCap = action.stockInfo.marketcap;
      nextState[action.ticker].peRatio = action.stockInfo.peRatio;
      nextState[action.ticker].employees = action.stockInfo.employees;
      nextState[action.ticker].averageVolume = action.stockInfo.avg30Volume;
      nextState[action.ticker].dividendYield = action.stockInfo.dividendYield;
      nextState[action.ticker].yearHigh = action.stockInfo.week52high;
      nextState[action.ticker].yearLow = action.stockInfo.week52low;
      return nextState;
    case RECEIVE_STOCK_INFO2:
      nextState[action.ticker].openPrice = action.stockInfo.quote.open || action.stockInfo.quote.previousClose;
      nextState[action.ticker].high = action.stockInfo.quote.high || action.stockInfo.quote.previousClose;
      nextState[action.ticker].low = action.stockInfo.quote.low || action.stockInfo.quote.previousClose;
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
