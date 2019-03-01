import NoMatch from './components/NoMatch';
import CreateAccount from './containers/admin/CreateAccount';
import ApdApplication from './containers/ApdApplication';
import EditAccount from './containers/admin/EditAccount';
import Login from './containers/Login';
import Logout from './containers/Logout';

import StateDash from './containers/StateDashboard';

const routes = [
  { path: '/', component: StateDash, exact: true, nonPrivate: false },
  { path: '/apd', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },
  { path: '/logout', component: Logout, nonPrivate: false },

  {
    path: '/admin/create-account',
    component: CreateAccount,
    nonPrivate: false
  },
  { path: '/admin/edit-account', component: EditAccount, nonPrivate: false },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
