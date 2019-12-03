import PropTypes from 'prop-types';
import React from 'react';

import ActivityList from './ActivityList';
import Activity from './Activity';

const Activities = ({ activities }) => {
  return (
    <div>
      <ActivityList activities={activities} />
      <hr />
      {activities.map((activity, index) => (
        <Activity activity={activity} activityIndex={index} />
      ))}
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.object.isRequired
};

export default Activities;
