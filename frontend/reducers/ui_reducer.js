import { 
  START_DAILY_LOADING, 
  RECEIVE_STOCK_DAILY_DATA,
  START_STOCK_LOADING,
  STOP_STOCK_LOADING
} from '../actions/stock_actions';

const uiReducer = (state = { dailyLoading: false, stockLoading: false }, action) => {
  switch (action.type) {
    case START_DAILY_LOADING:
      return Object.assign({}, state, { dailyLoading: true });
    case RECEIVE_STOCK_DAILY_DATA:
      return Object.assign({}, state, { dailyLoading: false });
    case START_STOCK_LOADING:
      return Object.assign({}, state, { stockLoading: true });
    case STOP_STOCK_LOADING:
      return Object.assign({}, state, { stockLoading: false });
    default:
      return state;
  }
}

export default uiReducer;