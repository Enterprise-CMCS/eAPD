import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import activities from './activities';
import admin from './admin';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import dirty from './dirty';
import errors from './errors';
import navigation from './navigation';
import user from './user';
import working from './working';

const rootReducer = history =>
  combineReducers({
    activities,
    admin,
    apd,
    auth,
    budget,
    dirty,
    errors,
    navigation,
    user,
    working,
    router: connectRouter(history)
  });

export default rootReducer;
