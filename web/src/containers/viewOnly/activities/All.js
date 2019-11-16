import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ActivityList from './ActivityList.js';
import Activity from './Activity.js';

const Activities = ({activities}) => {
  return (
    <div>
      <ActivityList activities={activities} />
      <h2>Activity Details</h2>
      {activities.map((activity) => (
        <Activity activity={activity} />
      ))}
    </div>
  )
}

export default Activities;