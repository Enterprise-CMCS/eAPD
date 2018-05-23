import React from 'react';

import { Section, Subsection } from './Section';

const PreviousActivities = () => (
  <Section id="prev-activities" resource="previousActivities">
    <Subsection resource="previousActivities.outline">
      <div>...</div>
    </Subsection>
    <Subsection resource="previousActivities.approvedExpenses">
      <div>...</div>
    </Subsection>
    <Subsection resource="previousActivities.actualExpenses">
      <div>...</div>
    </Subsection>
  </Section>
);

export default PreviousActivities;
