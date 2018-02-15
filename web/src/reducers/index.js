import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import counter from './counter';

const rootReducer = combineReducers({
  auth,
  counter,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;
