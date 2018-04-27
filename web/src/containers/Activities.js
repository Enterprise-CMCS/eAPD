import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../i18n';

import ActivityDetailAll from './ActivityDetailAll';
import ActivityListEntry from './ActivityListEntry';
import { addActivity as addActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

const Activities = ({ activityIds, addActivity }) => (
  <Section id="activities">
    <SectionTitle>{t('activities.title')}</SectionTitle>
    <Collapsible title={t('activities.listTitle')} open>
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
    </Collapsible>
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
