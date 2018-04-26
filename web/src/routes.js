import ActivitiesPage from './components/ActivitiesPage';
import Hello from './components/Hello';
import NoMatch from './components/NoMatch';
import PoC from './components/PoC';
import Login from './containers/Login';

const routes = [
  { path: '/', component: PoC, exact: true, nonPrivate: true },
  { path: '/login', component: Login, nonPrivate: true },
  { path: '/hello', component: Hello, nonPrivate: true },
  { path: '/poc', component: PoC, nonPrivate: true },
  { path: '/activities', component: ActivitiesPage, nonPrivate: true },
  { component: NoMatch, nonPrivate: true }
];

export default routes;
