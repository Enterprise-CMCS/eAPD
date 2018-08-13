import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import HelpText from '../../components/HelpText';
import { Textarea } from '../../components/Inputs';
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
            <h3>
              {t([`activities.standardsAndConditions`, std.id, 'header'])}
            </h3>
            <p className="preserve-line-breaks">
              {t([`activities.standardsAndConditions`, std.id, 'subheader'])}
            </p>
            <HelpText
              text={`activities.standardsAndConditions.${std.id}.helpText`}
              reminder={`activities.standardsAndConditions.${std.id}.reminder`}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(
  StandardsAndConditions
);
