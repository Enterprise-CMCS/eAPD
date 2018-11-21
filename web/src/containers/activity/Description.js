import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import { RichText, Textarea } from '../../components/Inputs';
import { Subsection, SubsectionChunk } from '../../components/Section';

const Description = props => {
  const { activity, updateActivity } = props;
  const { alternatives, description, summary } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.overview" nested>
      <SubsectionChunk resource="activities.overview.summary">
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
      </SubsectionChunk>
      <SubsectionChunk
        resource={
          activity.fundingSource === 'HIE'
            ? 'activities.overview.detail.hie'
            : 'activities.overview.detail.standard'
        }
      >
        <div className="mb3">
          <RichText
            content={description}
            onSync={sync('description')}
            editorClassName="rte-textarea-l"
          />
        </div>
      </SubsectionChunk>
      <SubsectionChunk resource="activities.overview.alternatives">
        <div className="mb3">
          <RichText
            content={alternatives}
            onSync={sync('alternatives')}
            editorClassName="rte-textarea-l"
          />
        </div>
      </SubsectionChunk>
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

export default connect(mapStateToProps, mapDispatchToProps)(Description);
