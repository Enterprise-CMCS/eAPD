import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import counter from './counter';

const rootReducer = combineReducers({
  counter,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
