import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../i18n';

import ActivityDetailAll from './ActivityDetailAll';
import ActivityListEntry from './ActivityListEntry';
import { addActivity as addActivityAction } from '../actions/activities';
import { Section, Subsection } from '../components/Section';

const Activities = ({ activityKeys, addActivity }) => (
  <Section id="activities" resource="activities">
    <Subsection id="activities-list" resource="activities.list" open>
      {activityKeys.length === 0 ? (
        <div className="mb2 p1 h6 alert">
          {t('activities.noActivityMessage')}
        </div>
      ) : (
        <div className="mb3">
          {activityKeys.map((key, idx) => (
            <ActivityListEntry key={key} aKey={key} num={idx + 1} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary" onClick={addActivity}>
        {t('activities.addActivityButtonText')}
      </button>
    </Subsection>
    {activityKeys.map((key, idx) => (
      <ActivityDetailAll key={key} aKey={key} num={idx + 1} />
    ))}
  </Section>
);

Activities.propTypes = {
  activityKeys: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities }) => ({
  activityKeys: activities.allKeys
});

export const mapDispatchToProps = {
  addActivity: addActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);

export const raw = Activities;
