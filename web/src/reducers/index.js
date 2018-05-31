import { routerReducer } from 'react-router-redux';

import activities from './activities';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import state from './state';
import user from './user';

export default (oldState = {}, action) => {
  const newState = {
    activities: activities(oldState.activities, action),
    apd: apd(oldState.apd, action),
    auth: auth(oldState.auth, action),
    budget: {},
    state: state(oldState.state, action),
    user: user(oldState.user, action),
    router: routerReducer(oldState.router, action)
  };
  newState.budget = budget(oldState.budget, action, newState);
  return newState;
};
