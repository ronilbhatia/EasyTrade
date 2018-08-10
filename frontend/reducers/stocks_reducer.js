import {
  RECEIVE_STOCK
} from '../actions/stock_actions';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState[action.stock.ticker] = action.stock;
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
