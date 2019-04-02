import NoMatch from './components/NoMatch';
import CreateAccount from './containers/admin/CreateAccount';
import ApdApplication from './containers/ApdApplication';
import AdminDashboard from './containers/admin/AdminDashboard';
import EditAccount from './containers/admin/EditAccount';
import MyAccount from './containers/admin/MyAccount';
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
  { path: '/admin', component: AdminDashboard, nonPrivate: false },
  { path: '/me', component: MyAccount, nonPrivate: false },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
