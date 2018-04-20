import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STANDARDS } from '../util';

import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Textarea } from '../components/Inputs2';

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
      <Collapsible title="Standards & Conditions">
        <p>Tell us how you’ll meet the Medicaid standards and conditions.</p>
        {STANDARDS.map(std => {
          const inputId = `a-${activity.id}-standards-${std.id}`;
          return (
            <div key={std.id}>
              <h3>{std.title}</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto...
              </p>
              <div>
                <label htmlFor={inputId}>
                  Describe how you’ll meet this condition
                </label>
                <Textarea
                  id={inputId}
                  name={`condition-${std.id}`}
                  label={`Describe how you'll meet the ${std.title} condition`}
                  rows="3"
                  spellCheck="true"
                  value={activity.standardsAndConditions[std.id]}
                  onChange={this.handleChange(std.id)}
                />
              </div>
            </div>
          );
        })}
      </Collapsible>
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
