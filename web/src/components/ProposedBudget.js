import React from 'react';

import { Section, Subsection } from './Section';
import BudgetSummary from '../containers/BudgetSummary';

const ProposedBudget = () => (
  <Section id="budget" resource="proposedBudget">
    <Subsection resource="proposedBudget.summaryBudget">
      <BudgetSummary />
    </Subsection>
    <Subsection resource="proposedBudget.paymentsByFFYQuarter">
      <div>...</div>
    </Subsection>
  </Section>
);

export default ProposedBudget;
