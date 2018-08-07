import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer
});

export default rootReducer;
