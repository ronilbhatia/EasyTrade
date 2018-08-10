import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

export const fetchStock = ticker => dispatch => (
  StockApiUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
);
