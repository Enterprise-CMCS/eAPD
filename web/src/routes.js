import ApdApplication from './components/ApdApplication';
import NoMatch from './components/NoMatch';
import Login from './containers/Login';

// temp pages for more targeted development & iteration
import ActivitiesPage from './components/temp/ActivitiesPage';
import BudgetPage from './components/temp/BudgetPage';

const routes = [
  { path: '/', component: ApdApplication, exact: true, nonPrivate: false },
  { path: '/login', component: Login, nonPrivate: true },

  { path: '/temp/activities', component: ActivitiesPage, nonPrivate: true },
  { path: '/temp/budget', component: BudgetPage, nonPrivate: true },

  { component: NoMatch, nonPrivate: true }
];

export default routes;
