import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const ActivityList = ({ activities }) => {
  const buildActivityListItem = (activity, index) => {
    return (
      <li>
        <h3>
          {index + 1}. {activity.name} | {activity.fundingSource}
        </h3>
      </li>
    );
  };

  return (
    <Fragment>
      <h2>List of Planned Activities</h2>
      <ul className="ds-c-list--bare">
        {activities.map((activity, index) =>
          buildActivityListItem(activity, index)
        )}
      </ul>
    </Fragment>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired
};

export default ActivityList;
