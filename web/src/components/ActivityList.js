import PropTypes from 'prop-types';
import React from 'react';

import Collapsible from './Collapsible';

const ListEntry = ({ activity, idx, editActivityChecks, editActivityText }) => (
  <div className="flex items-center mb1">
    <div className="mr1 bold mono">{idx}.</div>
    <div className="mr1 col-4">
      <input
        type="text"
        className="col-12 input m0"
        name={`${activity.id}.name`}
        value={activity.name}
        onChange={editActivityText}
      />
    </div>
    <div>
      {['HIT', 'HIE', 'MMIS'].map(val => (
        <label key={val} className="mr1">
          <input
            type="checkbox"
            name={`${activity.id}.type`}
            value={val}
            checked={activity.type.includes(val)}
            onChange={editActivityChecks}
          />
          {val}
        </label>
      ))}
    </div>
  </div>
);

ListEntry.propTypes = {
  activity: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

const ActivityList = ({ activities, addActivity, ...rest }) => (
  <Collapsible title="Activity List">
    <div className="mb2">
      {activities.map((activity, idx) => (
        <ListEntry
          key={activity.id}
          activity={activity}
          idx={idx + 1}
          {...rest}
        />
      ))}
    </div>
    <button type="button" className="mt2 btn btn-primary" onClick={addActivity}>
      Add activity
    </button>
  </Collapsible>
);

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

export default ActivityList;
