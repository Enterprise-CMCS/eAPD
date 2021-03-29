import NoMatch from './components/NoMatch';
import CreateAccount from './containers/admin/CreateAccount';
import Dashboard from './containers/Dashboard';
import ApdApplication from './containers/ApdApplication';
import ApdViewOnly from './containers/viewOnly/Apd';
import EditAccount from './containers/admin/EditAccount';
import StateAdmin from './containers/admin/StateAdmin';
import Login from './containers/Login';
import Logout from './containers/Logout';
import CreateAPDForm from './containers/prototypes/CreateAPDForm';

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

  // Prototype routes
  { path: '/create-apd-prototype', component: CreateAPDForm, isPublic: true },

  { path: '/state-admin', component: StateAdmin, isPublic: false },
  { path: '/login', component: Login, isPublic: true, isCard: true },
  { path: '/logout', component: Logout, isPublic: false },
  { component: NoMatch, isPublic: true }
];

export default routes;
