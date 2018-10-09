import { RECEIVE_CURRENT_USER, RECEIVE_USER_INFO } from '../actions/session_actions';
import merge from 'lodash/merge';


export default(state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USER_INFO:
      return merge({}, state, { [action.info.id]: action.info });
    default:
      return state;
  }
};
