import React from 'react';

import { Section, Subsection } from '../components/Section';
import BudgetSummary from './BudgetSummary';
import Waypoint from './ConnectedWaypoint';
import IncentivePayments from './IncentivePayments';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';

const ProposedBudget = () => (
  <Waypoint id="budget-overview">
    <Section isNumbered id="budget" resource="proposedBudget">
      <Waypoint id="budget-summary-table" />
      <Subsection
        id="budget-summary-table"
        resource="proposedBudget.summaryBudget"
      >
        <BudgetSummary />
      </Subsection>

      <Waypoint id="budget-federal-by-quarter" />
      <Subsection
        id="budget-federal-by-quarter"
        resource="proposedBudget.quarterlyBudget"
      >
        <QuarterlyBudgetSummary />
      </Subsection>

      <Waypoint id="budget-incentive-by-quarter" />
      <Subsection
        id="budget-incentive-by-quarter"
        resource="proposedBudget.paymentsByFFYQuarter"
      >
        <IncentivePayments />
      </Subsection>
    </Section>
  </Waypoint>
);

export default ProposedBudget;
