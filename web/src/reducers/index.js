import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import activities from './activities';
import admin from './admin';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import dirty from './dirty';
import notification from './notification';
import sidebar from './sidebar';
import user from './user';

const rootReducer = combineReducers({
  activities,
  admin,
  apd,
  auth,
  budget,
  dirty,
  notification,
  sidebar,
  user,
  router: routerReducer
});

export default rootReducer;
