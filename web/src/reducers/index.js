import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import counter from './counter';
import state from './state';
import user from './user';

const rootReducer = combineReducers({
  auth,
  counter,
  state,
  user,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
