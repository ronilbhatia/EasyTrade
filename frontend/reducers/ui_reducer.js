import { START_LOADING, RECEIVE_STOCK_DAILY_DATA } from '../actions/stock_actions';

const uiReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { loading: true };
    case RECEIVE_STOCK_DAILY_DATA:
      return { loading: false };
    default:
      return state;
  }
}

export default uiReducer;