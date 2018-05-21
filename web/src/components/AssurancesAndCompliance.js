import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionDesc from './SectionDesc';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const AssurancesAndCompliance = () => (
  <Section id="assurances-compliance">
    <SectionTitle>{t('assurancesAndCompliance.title')}</SectionTitle>
    <SectionDesc>{t('assurancesAndCompliance.helpText')}</SectionDesc>
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
