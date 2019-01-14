import { RECEIVE_CURRENT_USER, RECEIVE_USER_INFO, RECEIVE_USER_PORTFOLIO } from '../actions/session_actions';
import merge from 'lodash/merge';


export default(state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USER_INFO:
      return merge({}, state, { [action.info.id]: action.info });
    case RECEIVE_USER_PORTFOLIO:
      return merge({}, state, { [action.data.id]: action.data})
    default:
      return state;
  }
};
