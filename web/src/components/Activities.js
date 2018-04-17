import PropTypes from 'prop-types';
import React from 'react';

import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';
import Section from './Section';
import SectionTitle from './SectionTitle';

const Activities = props => (
  <Section>
    <SectionTitle>Program Activities</SectionTitle>
    <ActivityList {...props} />
    <ActivityDetails {...props} />
  </Section>
);

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

export default Activities;
