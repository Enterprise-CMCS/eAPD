import NoMatch from './components/NoMatch';
import ApdApplication from './containers/ApdApplication';
import Login from './containers/Login';

import StateDash from './components/StateDashboard';

const routes = [
  { path: '/', component: StateDash, exact: true, nonPrivate: false },
  { path: '/apd', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
