import React from 'react';

import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const ExecutiveSummary = () => (
  <Section>
    <SectionTitle>Executive/Overall Summary</SectionTitle>
    <Collapsible title="Executive Summary">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Program Budget Table">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ExecutiveSummary;
