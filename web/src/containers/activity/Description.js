import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import { RichText, Textarea } from '../../components/Inputs';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';

const Description = props => {
  const { activity, updateActivity } = props;
  const { alternatives, description, summary } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.overview" nested>
      <div className="mb3">
        <Textarea
          name={`activity-summary-${activity.key}`}
          label="activity summary"
          hideLabel
          className="m0 textarea textarea-sm"
          rows="3"
          maxLength="280"
          spellCheck="true"
          value={summary}
          onChange={e =>
            updateActivity(activity.key, { summary: e.target.value })
          }
        />
      </div>

      <Instruction
        source={`activities.overview.detail.${
          activity.fundingSource === 'HIE' ? 'hie' : 'standard'
        }.instruction`}
      />
      <div className="mb3">
        <RichText
          content={description}
          onSync={sync('description')}
          editorClassName="rte-textarea-l"
        />
      </div>

      <Instruction source="activities.overview.alternatives.instruction" />
      <div className="mb3">
        <RichText
          content={alternatives}
          onSync={sync('alternatives')}
          editorClassName="rte-textarea-l"
        />
      </div>
    </Subsection>
  );
};

Description.propTypes = {
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
)(Description);
