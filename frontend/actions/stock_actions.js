import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_STOCK_INFO = 'RECEIVE_STOCK_INFO';
export const RECEIVE_STOCK_INTRADAY_DATA = 'RECEIVE_STOCK_INTRADAY_DATA';
export const RECEIVE_STOCK_DAILY_DATA = 'RECEIVE_STOCK_DAILY_DATA';
export const RECEIVE_STOCK_NEWS = 'RECEIVE_STOCK_NEWS';
export const RECEIVE_USER_STOCKS = 'RECEIVE_USER_STOCKS';

const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

const receiveStocks = allStocks => ({
  type: RECEIVE_STOCKS,
  allStocks
});

const receiveStockInfo = (ticker, stockInfo) => ({
  type: RECEIVE_STOCK_INFO,
  ticker,
  stockInfo
});

const receiveStockIntradayData = (ticker, data) => ({
  type: RECEIVE_STOCK_INTRADAY_DATA,
  ticker,
  data
});

const receiveStockDailyData = (ticker, data) => ({
  type: RECEIVE_STOCK_DAILY_DATA,
  ticker,
  data
});

const receiveStockNews = (ticker, news) => ({
  type: RECEIVE_STOCK_NEWS,
  ticker,
  news
});

const receiveUserStocks = stocks => ({
  type: RECEIVE_USER_STOCKS,
  stocks
});

export const fetchStock = ticker => dispatch => (
  StockApiUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
    .then(() => Promise.all([
      dispatch(fetchStockInfo(ticker)),
      dispatch(fetchStockIntradayData(ticker)),
      dispatch(fetchStockDailyData(ticker)),
      dispatch(fetchStockNews(ticker))
    ]))
    // .then(() => dispatch(fetchStockInfo(ticker)))
    // .then(() => dispatch(fetchStockIntradayData(ticker)))
    // .then(() => dispatch(fetchStockDailyData(ticker)))
    // .then(() => dispatch(fetchStockNews(ticker)))
);

export const fetchStocks = () => dispatch => (
  StockApiUtil.fetchStocks()
    .then(allStocks => dispatch(receiveStocks(allStocks)))
);

export const fetchStockInfo = ticker => dispatch => (
  StockApiUtil.fetchStockInfo(ticker)
    .then(stockInfo => dispatch(receiveStockInfo(ticker, stockInfo[ticker])))
);

export const fetchStockIntradayData = ticker => dispatch => (
  StockApiUtil.fetchStockIntradayData(ticker)
    .then(data => dispatch(receiveStockIntradayData(ticker, data)))
);

export const fetchStockDailyData = ticker => dispatch => (
  StockApiUtil.fetchStockDailyData(ticker)
    .then(data => dispatch(receiveStockDailyData(ticker, data)))
);

export const fetchStockNews = ticker => dispatch => (
  StockApiUtil.fetchStockNews(ticker)
    .then(news => dispatch(receiveStockNews(ticker, news.articles)))
);

export const fetchUserStocks = tickers => dispatch => (
  StockApiUtil.fetchUserStocks(tickers)
    .then(stocks => dispatch(receiveUserStocks(stocks)))
);
