import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  RECEIVE_USER_INFO
} from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullSession = { id: null };

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, { id: action.user.id });
    case RECEIVE_USER_INFO:
      let nextState = merge({}, state);
      nextState[action.info.id].buyingPower = action.info.buying_power;
      nextState[action.info.id].balance = action.info.balance;
      nextState[action.info.id].stocks = action.info.stocks;
      nextState[action.info.id].balanceData = action.info.balance_data;
      nextState[action.info.id].dailyData = action.info.daily_data;
      return nextState;
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;
