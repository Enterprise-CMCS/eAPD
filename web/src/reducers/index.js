import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import activities from './activities';
import apd from './apd';
import auth from './auth';
import state from './state';
import user from './user';

const rootReducer = combineReducers({
  activities,
  apd,
  auth,
  state,
  user,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
