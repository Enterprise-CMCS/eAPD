import ApdApplication from './components/ApdApplication';
import NoMatch from './components/NoMatch';
import Login from './containers/Login';

// temp pages for more targeted development & iteration
import Landing from './containers/Landing';
import ActivitiesPage from './components/temp/ActivitiesPage';
import MiscPage from './components/temp/MiscPage';

const routes = [
  { path: '/', component: Landing, exact: true, nonPrivate: false },
  { path: '/apd', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },

  { path: '/temp/activities', component: ActivitiesPage, nonPrivate: true },
  { path: '/temp/misc', component: MiscPage, nonPrivate: true },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
