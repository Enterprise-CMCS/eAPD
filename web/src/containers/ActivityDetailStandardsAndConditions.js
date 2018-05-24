import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STANDARDS } from '../util';

import { t } from '../i18n';
import { updateActivity as updateActivityAction } from '../actions/activities';
import { Subsection } from '../components/Section';
import { Textarea } from '../components/Inputs';

class ActivityDetailStandardsAndConditions extends Component {
  handleChange = key => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { standardsAndConditions: { [key]: value } };
    updateActivity(activity.id, updates);
  };

  render() {
    const { activity } = this.props;

    return (
      <Subsection resource="activities.standardsAndConditions">
        {STANDARDS.map(std => (
          <div key={std.id}>
            <h3>
              {t([`activities.standardsAndConditions`, std.id, 'header'])}
            </h3>
            <p>
              {t([`activities.standardsAndConditions`, std.id, 'subheader'])}
            </p>
            <Textarea
              name={`activity-${activity.id}-condition-${std.id}`}
              label={t([`activities.standardsAndConditions`, std.id, 'title'])}
              rows="3"
              value={activity.standardsAndConditions[std.id]}
              onChange={this.handleChange(std.id)}
            />
          </div>
        ))}
      </Subsection>
    );
  }
}

ActivityDetailStandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailStandardsAndConditions
);
