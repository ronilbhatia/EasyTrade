import { RECEIVE_NEWS } from '../actions/news_actions';

const newsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEWS:
      return action.news;
    default:
      return state;
  }
};

export default newsReducer;
