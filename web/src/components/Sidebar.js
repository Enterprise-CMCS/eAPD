import PropTypes from 'prop-types'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const routes = [
  { path: '/state-start', name: 'State set-up' },
  { path: '/state-contacts', name: 'State set-up 2' },
  { path: '/apd-overview', name: 'Program overview' },
  { path: '/activities-start', name: 'Select activities' },
  { path: '/activities-list', name: 'Activity list' },
  { path: '/activity-overview', name: 'Activity overview' },
  { path: '/activity-goals', name: 'Activity goals' },
  { path: '/activity-approach', name: 'Activity approach' },
  { path: '/activity-schedule', name: 'Activity schedule' },
  { path: '/state-personnel', name: 'Personnel' },
  { path: '/expenses-start', name: 'Select expenses' },
  { path: '/expenses-list', name: 'Expense list' },
  { path: '/expenses-details', name: 'Expense details' },
  { path: '/review-and-submit', name: 'Program summary' }
]

const Sidebar = ({ match }) => (
  <div className="p2">
    <ul className="list-reset">
      {routes.map(({ path, name }) => (
        <li key={path}>
          <Link to={path} className={match.path === path ? 'bold' : ''}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Sidebar.propTypes = {
  match: PropTypes.object.isRequired
}

export { Sidebar as SidebarPure }
export default withRouter(Sidebar)
