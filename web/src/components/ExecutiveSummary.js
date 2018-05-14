import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const ExecutiveSummary = () => (
  <Section id="executive-summary">
    <SectionTitle>{t('executiveSummary.title')}</SectionTitle>

    <h3>{t('executiveSummary.helpText')}</h3>

    <Collapsible title="Executive Summary">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Program Budget Table">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ExecutiveSummary;
