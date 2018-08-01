import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { Chunk, Subsection } from '../components/Section';
import { RichText } from '../components/Inputs';

const ActivityDetailDescription = props => {
  const { activity, updateActivity } = props;
  const { descLong, altApproach } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.description">
      <Chunk resource="activities.description.summary">
        <div className="mb3">
          <textarea
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
      </Chunk>

      <Chunk
        resource={
          activity.fundingSource === 'HIE'
            ? 'activities.description.detail.hie'
            : 'activities.description.detail.standard'
        }
      >
        <div className="mb3">
          <RichText content={descLong} onSync={sync('descLong')} />
        </div>
      </Chunk>

      <Chunk resource="activities.description.alternatives">
        <div className="mb3">
          <RichText content={altApproach} onSync={sync('altApproach')} />
        </div>
      </Chunk>
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
