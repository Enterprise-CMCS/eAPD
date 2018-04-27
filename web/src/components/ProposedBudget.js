import React from 'react';

import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const ProposedBudget = () => (
  <Section id="budget">
    <SectionTitle>Proposed Budget</SectionTitle>
    <Collapsible title="Short Activity Summary Budget">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Incentive Payments by FFY Quarter">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ProposedBudget;
