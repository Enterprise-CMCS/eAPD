import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import RichText from '../../components/RichText';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import { selectActivityByKey } from '../../reducers/activities.selectors';
import { STANDARDS } from '../../util';

class StandardsAndConditions extends Component {
  sync = name => html => {
    const { activity, updateActivity } = this.props;
    const updates = { standardsAndConditions: { [name]: html } };
    updateActivity(activity.key, updates);
  };

  render() {
    const { activity } = this.props;

    return (
      <Subsection resource="activities.standardsAndConditions" nested>
        {STANDARDS.map(std => (
          <div key={std.id} className="ds-u-margin-bottom--6">
            <Instruction
              source={`activities.standardsAndConditions.${std.id}.instruction`}
              headingDisplay={{
                level: 'h6',
                className: 'ds-h5'
              }}
            />

            <RichText
              content={activity.standardsAndConditions[std.id]}
              onSync={this.sync(std.id)}
              editorClassName="rte-textarea-l"
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

const mapStateToProps = (state, props) => ({
  activity: selectActivityByKey(state, props)
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardsAndConditions);
