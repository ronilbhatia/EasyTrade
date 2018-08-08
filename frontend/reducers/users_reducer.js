import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';


export default(state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};
