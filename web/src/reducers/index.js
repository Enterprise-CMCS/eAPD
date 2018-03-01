import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import counter from './counter';
import user from './user';

const rootReducer = combineReducers({
  auth,
  counter,
  user,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
