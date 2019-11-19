import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ActivityList from './ActivityList.js';
import Activity from './Activity.js';

const Activities = ({activities}) => {
  return (
    <div>
      <ActivityList activities={activities} />
      <hr />
      {activities.map((activity, index) => (
        <Activity activity={activity} activityIndex={index} />
      ))}
    </div>
  )
}

export default Activities;