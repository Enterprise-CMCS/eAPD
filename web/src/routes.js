import NoMatch from './components/NoMatch';
import Dashboard from './containers/Dashboard';
import ApdApplication from './containers/ApdApplication';
import ApdViewOnly from './containers/viewOnly/Apd';
import LoginApplication from './containers/LoginApplication';
import StateAdmin from './containers/admin/StateAdmin';
import Logout from './containers/Logout';

const routes = [
  { path: '/', component: Dashboard, exact: true, isPublic: false },
  { path: '/apd', component: ApdApplication, exact: false, isPublic: false },
  { path: '/print', component: ApdViewOnly, exact: true, isPublic: false },
  { path: '/login', component: LoginApplication, isPublic: true, isCard: true },
  { path: '/logout', component: Logout, isPublic: true },
  { path: '/state-admin', component: StateAdmin, isPublic: false },
  { component: NoMatch, isPublic: true }
];

export default routes;
