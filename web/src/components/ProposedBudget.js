import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const ProposedBudget = () => (
  <Section id="budget">
    <SectionTitle>{t('proposedBudget.title')}</SectionTitle>

    <h3>{t('proposedBudget.helpText')}</h3>

    <Collapsible title="Short Activity Summary Budget">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Incentive Payments by FFY Quarter">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ProposedBudget;
