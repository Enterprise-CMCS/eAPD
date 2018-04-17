import React from 'react';

import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from '../Collapsible';

const AssurancesAndCompliance = () => (
  <Section>
    <SectionTitle>Assurances and Compliance</SectionTitle>
    <Collapsible title="Procurement Standards">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Access to Records">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Software Rights">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Security">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default AssurancesAndCompliance;
