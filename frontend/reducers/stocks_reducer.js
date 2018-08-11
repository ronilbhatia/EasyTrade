import {
  RECEIVE_STOCK,
  RECEIVE_STOCK_INFO
} from '../actions/stock_actions';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState[action.stock.ticker] = action.stock;
      return nextState;
    case RECEIVE_STOCK_INFO:
      nextState.shortDescription = action.stockInfo.short_description;
      nextState.ceo = action.stockInfo.ceo;
      nextState.employees = action.stockInfo.employees;
      nextState.hqCity = action.stockInfo.hq_address_city;
      nextState.hqState = action.stockInfo.hq_state;
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
