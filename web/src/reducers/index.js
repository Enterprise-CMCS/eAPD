import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';

const rootReducer = combineReducers({
  counter,
  router: routerReducer
});

export default rootReducer;
