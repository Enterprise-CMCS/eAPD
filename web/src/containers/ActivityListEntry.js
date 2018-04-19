import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';

const ACTIVITY_TYPES = ['HIT', 'HIE', 'MMIS'];

class ActivityListEntry extends Component {
  handleTypes = id => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;
    const { types } = activity;

    const newValue = types.includes(value)
      ? types.filter(t => t !== value)
      : [...types, value].sort();

    const data = { id, name: 'types', value: newValue };

    updateActivity(data);
  };

  handleName = id => e => {
    const { value } = e.target;
    const { updateActivity } = this.props;
    const name = 'name';
    const data = { id, name, value };

    updateActivity(data);
  };

  render() {
    const { activity, num } = this.props;
    const { id } = activity;

    return (
      <div className="flex items-center mb1">
        <div className="mr1 bold mono">{num}.</div>
        <div className="mr1 col-4">
          <input
            type="text"
            className="col-12 input m0"
            value={activity.name}
            onChange={this.handleName(id)}
          />
        </div>
        <div>
          {ACTIVITY_TYPES.map(option => (
            <label key={option} className="mr1">
              <input
                type="checkbox"
                value={option}
                checked={activity.types.includes(option)}
                onChange={this.handleTypes(id)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

ActivityListEntry.propTypes = {
  activity: PropTypes.object.isRequired,
  num: PropTypes.number.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, props) => ({
  activity: byId[props.aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListEntry);
