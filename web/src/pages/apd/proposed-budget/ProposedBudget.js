import React from 'react';

import { Section, Subsection } from '../../../components/Section';
import CombinedActivityCosts from './CombinedActivityCosts';
import BudgetSummary from './BudgetSummary';
import Waypoint from '../../../components/ConnectedWaypoint';
import IncentivePayments from './IncentivePayments';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

const ProposedBudget = () => (
  <React.Fragment>
    <Waypoint />
    <AlertMissingFFY />
    <Section resource="proposedBudget">
      <Waypoint id="combined-activity-costs-table" />
      <Subsection
        id="combined-activity-costs-table"
        resource="proposedBudget.combinedActivityCosts"
      >
        <CombinedActivityCosts />
      </Subsection>

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
  </React.Fragment>
);

export default ProposedBudget;
