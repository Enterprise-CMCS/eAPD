import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionDesc from './SectionDesc';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const ExecutiveSummary = () => (
  <Section id="executive-summary">
    <SectionTitle>{t('executiveSummary.title')}</SectionTitle>
    <SectionDesc>{t('executiveSummary.helpText')}</SectionDesc>
    <Collapsible title="Executive Summary">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Program Budget Table">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ExecutiveSummary;
