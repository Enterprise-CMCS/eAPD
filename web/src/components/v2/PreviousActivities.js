import React from 'react';

import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from '../Collapsible';

const PreviousActivities = () => (
  <Section>
    <SectionTitle>Results of Previous Activities</SectionTitle>
    <Collapsible title="Prior Activities Outline">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Approved Expenses">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Actual Expenses">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default PreviousActivities;
