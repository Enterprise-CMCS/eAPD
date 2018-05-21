import React from 'react';

import BudgetSummary from './BudgetSummary';
import Collapsible from './Collapsible';
import Section from './Section';
import SectionDesc from './SectionDesc';
import SectionTitle from './SectionTitle';
import { t } from '../i18n';

const ProposedBudget = () => (
  <Section id="budget">
    <SectionTitle>{t('proposedBudget.title')}</SectionTitle>
    <SectionDesc>{t('proposedBudget.helpText')}</SectionDesc>
    <Collapsible title="Short Activity Summary Budget">
      <BudgetSummary />
    </Collapsible>
    <Collapsible title="Incentive Payments by FFY Quarter">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default ProposedBudget;
