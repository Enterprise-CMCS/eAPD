import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const PreviousActivities = () => (
  <Section id="prev-activities">
    <SectionTitle>{t('previousActivities.title')}</SectionTitle>

    <h3>{t('previousActivities.helpText')}</h3>

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
