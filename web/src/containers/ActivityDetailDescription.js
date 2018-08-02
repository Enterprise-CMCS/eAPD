import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { Subsection, SubsectionChunk } from '../components/Section';
import { Textarea, RichText } from '../components/Inputs';

const ActivityDetailDescription = props => {
  const { activity, updateActivity } = props;
  const { descLong, altApproach } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.description">
      <SubsectionChunk resource="activities.description.summary">
        <div className="mb3">
          <Textarea
            name={`activity-summary-${activity.key}`}
            label="activity summary"
            hideLabel
            className="m0 textarea"
            rows="5"
            maxLength="280"
            spellCheck="true"
            value={activity.descShort}
            onChange={e =>
              updateActivity(activity.key, { descShort: e.target.value })
            }
          />
        </div>
      </SubsectionChunk>
      <SubsectionChunk
        resource={
          activity.fundingSource === 'HIE'
            ? 'activities.description.detail.hie'
            : 'activities.description.detail.standard'
        }
      >
        <div className="mb3">
          <RichText content={descLong} onSync={sync('descLong')} />
        </div>
      </SubsectionChunk>
      <SubsectionChunk resource="activities.description.alternatives">
        <div className="mb3">
          <RichText content={altApproach} onSync={sync('altApproach')} />
        </div>
      </SubsectionChunk>
    </Subsection>
  );
};
// }

ActivityDetailDescription.propTypes = {
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
  ActivityDetailDescription
);
