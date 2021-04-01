import NoMatch from './components/NoMatch';
import CreateAccount from './containers/admin/CreateAccount';
import Dashboard from './containers/Dashboard';
import ApdApplication from './containers/ApdApplication';
import ApdViewOnly from './containers/viewOnly/Apd';
import EditAccount from './containers/admin/EditAccount';
import LoginApplication from './containers/LoginApplication';
import StateAdmin from './containers/admin/StateAdmin';
import Logout from './containers/Logout';

const routes = [
  { path: '/', component: Dashboard, exact: true, isPublic: false },
  { path: '/apd', component: ApdApplication, exact: false, isPublic: false },
  { path: '/print', component: ApdViewOnly, exact: true, isPublic: false },

  {
    path: '/create-account',
    component: CreateAccount,
    isAdmin: true,
    isCard: true
  },
  {
    path: '/edit-account',
    component: EditAccount,
    isAdmin: true,
    isCard: true
  },

  { path: '/login', component: LoginApplication, isPublic: true, isCard: true },
  { path: '/state-admin', component: StateAdmin, isPublic: false },
  { path: '/logout', component: Logout, isPublic: true },
  { component: NoMatch, isPublic: true }
];

export default routes;
