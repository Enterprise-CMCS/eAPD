import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import withSidebar from '../components/withSidebar';

// [Activity name, Link text, Link href]
// TODO(bren): update href for "Administration" entry once
// that page is created
const activities = [
  ['Administration', 'Start', '/activity-overview'],
  ['Designing and Building HIE System', 'Edit', '#!'],
  ['Technical Assistance', 'Start', '#!'],
  ['Outreach', 'Start', '#!']
];

const ActivitiesList = ({ goTo }) => (
  <div>
    <h1>Activities</h1>
    <div className="mb3">
      {activities.map(([name, status, href]) => (
        <div key={name} className="py1 relative border-bottom border-silver">
          <div className="absolute right-0">
            {href === '#!' ? (
              <div className="gray">{status}</div>
            ) : (
              <Link to={href}>{status}</Link>
            )}
          </div>
          {name}
        </div>
      ))}
    </div>
    <button
      type="button"
      className="btn btn-outline blue mr1"
      onClick={() => goTo('/activities-start')}
    >
      Back
    </button>
    <button type="button" className="btn btn-primary">
      Add another activity
    </button>
  </div>
);

ActivitiesList.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ goTo: (path) => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivitiesList));
