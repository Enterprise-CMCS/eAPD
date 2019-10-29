import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import admin from './admin';
import aria from './aria';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import errors from './errors';
import navigation from './navigation';
import patch from './patch';
import user from './user';
import working from './working';

const rootReducer = history =>
  combineReducers({
    admin,
    aria,
    apd,
    auth,
    budget,
    errors,
    navigation,
    patch,
    user,
    working,
    router: connectRouter(history)
  });

export default rootReducer;
