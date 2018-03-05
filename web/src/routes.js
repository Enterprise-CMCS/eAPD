import Hello from './components/Hello';
import NoMatch from './components/NoMatch';
import SubmissionSuccess from './components/SubmissionSuccess';
import ActivitiesStart from './containers/ActivitiesStart';
import ActivitiesList from './containers/ActivitiesList';
import ActivityApproach from './containers/ActivityApproach';
import ActivityExpensesDetails from './containers/ActivityExpensesDetails';
import ActivityExpensesList from './containers/ActivityExpensesList';
import ActivityExpensesStart from './containers/ActivityExpensesStart';
import ActivityGoals from './containers/ActivityGoals';
import ActivityOverview from './containers/ActivityOverview';
import ActivitySchedule from './containers/ActivitySchedule';
import ApdOverview from './containers/ApdOverview';
import Login from './containers/Login';
import ReviewAndSubmit from './containers/ReviewAndSubmit';
import StateContacts from './containers/StateContacts';
import StateStart from './containers/StateStart';
import StatePersonnel from './containers/StatePersonnel';

const routes = [
  { path: '/', component: Hello, exact: true, nonPrivate: true },
  { path: '/login', component: Login, nonPrivate: true },
  { path: '/activities-list', component: ActivitiesList },
  { path: '/activities-start', component: ActivitiesStart },
  { path: '/activity-approach', component: ActivityApproach },
  { path: '/activity-goals', component: ActivityGoals },
  { path: '/activity-overview', component: ActivityOverview },
  { path: '/activity-schedule', component: ActivitySchedule },
  { path: '/apd-overview', component: ApdOverview },
  { path: '/expenses-start', component: ActivityExpensesStart },
  { path: '/expenses-list', component: ActivityExpensesList },
  { path: '/expenses-details', component: ActivityExpensesDetails },
  { path: '/review-and-submit', component: ReviewAndSubmit },
  { path: '/state-contacts', component: StateContacts },
  { path: '/state-personnel', component: StatePersonnel },
  { path: '/state-start', component: StateStart },
  { path: '/submission-success', component: SubmissionSuccess },
  { component: NoMatch, nonPrivate: true }
];

export default routes;
