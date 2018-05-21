import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionDesc from './SectionDesc';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const PreviousActivities = () => (
  <Section id="prev-activities">
    <SectionTitle>{t('previousActivities.title')}</SectionTitle>
    <SectionDesc>{t('previousActivities.helpText')}</SectionDesc>
    <Collapsible title={t('previousActivities.sections.outline')}>
      <div>...</div>
    </Collapsible>
    <Collapsible title={t('previousActivities.sections.approvedExpenses')}>
      <div>...</div>
    </Collapsible>
    <Collapsible title={t('previousActivities.sections.actualExpenses')}>
      <div>...</div>
    </Collapsible>
  </Section>
);

export default PreviousActivities;
