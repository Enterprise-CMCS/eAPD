import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ActivityList from './ActivityListReadOnly';
import Activity from './ActivityReadOnly';

const Activities = ({ activities }) => {
  return (
    <div>
      <ActivityList activities={activities} />

      {activities.map((activity, index) => (
        <Activity key={uuidv4()} activity={activity} activityIndex={index} />
      ))}
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired
};

export default Activities;
