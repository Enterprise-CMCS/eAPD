import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeleteActivity from './DeleteActivity';
import { updateActivity as updateActivityAction } from '../actions/activities';
import { ACTIVITY_FUNDING_SOURCES } from '../util';

class ActivityListEntry extends Component {
  handleChange = field => e => {
    const { activity, updateActivity } = this.props;
    updateActivity(
      activity.id,
      { [field]: e.target.value },
      field === 'fundingSource'
    );
  };

  render() {
    const { activity, num } = this.props;
    const { id, name, fundingSource } = activity;

    return (
      <div className="flex items-center mb1">
        <div className="mr1 bold mono">{num}.</div>
        <div className="mr1 col-4">
          <input
            type="text"
            className="col-12 input m0"
            value={name}
            onChange={this.handleChange('name')}
            disabled={num === 1}
          />
        </div>
        <div className="mr1">
          {ACTIVITY_FUNDING_SOURCES.map(option => (
            <label key={option} className="mr1">
              <input
                type="radio"
                value={option}
                checked={fundingSource === option}
                onChange={this.handleChange('fundingSource')}
                disabled={num === 1}
              />
              {option}
            </label>
          ))}
        </div>
        {num > 1 && <DeleteActivity aId={id} />}
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
