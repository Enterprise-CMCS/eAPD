import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ActivityList = ({ activities }) => {
  const buildActivityListItem = (activity, index) => {
    return (
      <li key={uuidv4()}>
        <h3>
          {index + 1}. {activity.name || "Untitled"}
          {activity.fundingSource ? ` | ${activity.fundingSource}` : ""}
        </h3>
      </li>
    );
  };

  return (
    <Fragment key={uuidv4()}>
      <h2>Activities</h2>
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
