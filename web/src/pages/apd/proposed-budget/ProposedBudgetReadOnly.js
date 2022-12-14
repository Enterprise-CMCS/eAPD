import React from 'react';

import CombinedActivityCosts from './CombinedActivityCosts';
import BudgetSummary from './BudgetSummary';
import IncentivePayments from './IncentivePayments';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';

const ProposedBudget = () => (
  <div>
    <h2>Proposed Budget</h2>

    <h3>Combined Activity Costs</h3>
    <CombinedActivityCosts isViewOnly />

    <h3>Summary Budget Table</h3>
    <BudgetSummary />

    <h3>Quarterly Federal Share</h3>
    <QuarterlyBudgetSummary />

    <h3>Estimated Quarterly Incentive Payments</h3>
    <IncentivePayments isViewOnly />
  </div>
);

export default ProposedBudget;
