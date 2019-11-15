import React from "react";

import BudgetSummary from "../BudgetSummary";
import IncentivePayments from "../IncentivePayments";
import QuarterlyBudgetSummary from "../QuarterlyBudgetSummary";

const ProposedBudget = () => (
  <div>
    <h2>Proposed Budget</h2>

    <h3>Summary Budget Table</h3>
    <BudgetSummary viewOnly />

    <h3>Quarterly Federal Share</h3>
    <QuarterlyBudgetSummary viewOnly />

    <h3>Incentive Payments</h3>
    <IncentivePayments viewOnly />
  </div>
);

export default ProposedBudget;
