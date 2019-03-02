import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import { Textarea } from '../../components/Inputs';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { STANDARDS } from '../../util';

class StandardsAndConditions extends Component {
  handleChange = field => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { standardsAndConditions: { [field]: value } };
    updateActivity(activity.key, updates);
  };

  render() {
    const { activity } = this.props;

    return (
      <Subsection resource="activities.standardsAndConditions" nested>
        {STANDARDS.map(std => (
          <div key={std.id}>
            <Instruction
              source={`activities.standardsAndConditions.${std.id}.instruction`}
            />

            <Textarea
              name={`activity-${activity.id}-condition-${std.id}`}
              label={t(
                `activities.standardsAndConditions.${std.id}.instruction.short`
              )}
              hideLabel
              rows="7"
              className="m0 textarea textarea-m"
              value={activity.standardsAndConditions[std.id]}
              onChange={this.handleChange(std.id)}
            />
          </div>
        ))}
      </Subsection>
    );
  }
}

StandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activity: byKey[aKey]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardsAndConditions);
