import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import apd from './apd';
import auth from './auth';
import counter from './counter';
import state from './state';
import user from './user';

const rootReducer = combineReducers({
  apd,
  auth,
  counter,
  state,
  user,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
