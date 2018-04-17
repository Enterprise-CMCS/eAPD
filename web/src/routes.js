import Hello from './components/Hello';
import NoMatch from './components/NoMatch';
import Login from './containers/Login';
import PoC from './components/PoC';

const routes = [
  { path: '/', component: PoC, exact: true, nonPrivate: true },
  { path: '/login', component: Login, nonPrivate: true },
  { path: '/hello', component: Hello, nonPrivate: true },
  { path: '/poc', component: PoC, nonPrivate: true },
  { component: NoMatch, nonPrivate: true }
];

export default routes;
