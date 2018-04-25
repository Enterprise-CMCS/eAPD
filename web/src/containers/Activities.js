import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../i18n';

import ActivityDetailAll from './ActivityDetailAll';
import ActivityListEntry from './ActivityListEntry';
import { addActivity as addActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import Container from '../components/Container';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

const Activities = ({ activityIds, addActivity }) => (
  <Container>
    <Section>
      <SectionTitle>{t('activities.title')}</SectionTitle>
      <Collapsible title={t('activities.listTitle')} open>
        <div className="mb2">
          {activityIds.map((aId, idx) => (
            <ActivityListEntry key={aId} aId={aId} num={idx + 1} />
          ))}
        </div>
        <button
          type="button"
          className="mt2 btn btn-primary"
          onClick={addActivity}
        >
          {t('activities.addActivityButtonText')}
        </button>
      </Collapsible>
      {activityIds.map((aId, idx) => (
        <ActivityDetailAll key={aId} aId={aId} num={idx + 1} />
      ))}
    </Section>
  </Container>
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
