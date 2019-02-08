import NoMatch from './components/NoMatch';
import CreateUser from './containers/admin/CreateUser';
import ApdApplication from './containers/ApdApplication';
import Login from './containers/Login';

import StateDash from './containers/StateDashboard';

const routes = [
  { path: '/', component: StateDash, exact: true, nonPrivate: false },
  { path: '/apd', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },

  { path: '/admin/create-user', component: CreateUser, nonPrivate: false },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
