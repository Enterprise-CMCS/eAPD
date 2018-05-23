import React from 'react';

import BudgetSummary from './BudgetSummary';
import { Section, Subsection } from './Section';

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
