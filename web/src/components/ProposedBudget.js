import React from 'react';

import { Section, Subsection } from './Section';
import BudgetSummary from '../containers/BudgetSummary';
import IncentivePayments from '../containers/IncentivePayments';
import QuarterlyBudgetSummary from '../containers/QuarterlyBudgetSummary';

const ProposedBudget = () => (
  <Section id="budget" resource="proposedBudget">
    <Subsection resource="proposedBudget.summaryBudget">
      <BudgetSummary />
    </Subsection>
    <Subsection resource="proposedBudget.quarterlyBudget">
      <QuarterlyBudgetSummary />
    </Subsection>
    <Subsection resource="proposedBudget.paymentsByFFYQuarter">
      <IncentivePayments />
    </Subsection>
  </Section>
);

export default ProposedBudget;
