import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

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
      <SectionTitle>Program Activities</SectionTitle>
      <Collapsible title="Activity List" open>
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
          Add activity
        </button>
      </Collapsible>
      {activityIds.map((aId, idx) => (
        <Fragment key={aId}>
          <ActivityDetailAll aId={aId} num={idx + 1} />
        </Fragment>
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
