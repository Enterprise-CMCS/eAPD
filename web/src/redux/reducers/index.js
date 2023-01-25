import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import admin from './admin';
import aria from './aria';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import alerts from './alerts';
import nav from './nav';
import patch from './patch';
import saving from './saving';
import user from './user';
import working from './working';

const rootReducer = history =>
  combineReducers({
    admin,
    aria,
    apd,
    auth,
    budget,
    alerts,
    nav,
    patch,
    saving,
    user,
    working,
    router: connectRouter(history)
  });

export default rootReducer;
