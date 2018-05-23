import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../i18n';

import ActivityDetailAll from './ActivityDetailAll';
import ActivityListEntry from './ActivityListEntry';
import { addActivity as addActivityAction } from '../actions/activities';
import { Section, Subsection } from '../components/Section';

const Activities = ({ activityIds, addActivity }) => (
  <Section id="activities" resource="activities">
    <Subsection resource="activities.list" open>
      {activityIds.length === 0 ? (
        <div className="mb2 p1 h6 alert">
          {t('activities.noActivityMessage')}
        </div>
      ) : (
        <div className="mb3">
          {activityIds.map((aId, idx) => (
            <ActivityListEntry key={aId} aId={aId} num={idx + 1} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary" onClick={addActivity}>
        {t('activities.addActivityButtonText')}
      </button>
    </Subsection>
    {activityIds.map((aId, idx) => (
      <ActivityDetailAll key={aId} aId={aId} num={idx + 1} />
    ))}
  </Section>
);

Activities.propTypes = {
  activityIds: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities }) => ({
  activityIds: activities.allIds
});

const mapDispatchToProps = {
  addActivity: addActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
