import NoMatch from './components/NoMatch';
import ApdApplication from './containers/ApdApplication';
import EditAccount from './containers/admin/EditAccount';
import Login from './containers/Login';

import StateDash from './containers/StateDashboard';

const routes = [
  { path: '/', component: StateDash, exact: true, nonPrivate: false },
  { path: '/apd', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },

  { path: '/admin/edit-account', component: EditAccount, nonPrivate: false },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
