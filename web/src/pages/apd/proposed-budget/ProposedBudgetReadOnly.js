import PropTypes from 'prop-types';
import React from 'react';
import { selectApdType } from '../../../redux/selectors/apd.selectors';
import { connect } from 'react-redux';

import CombinedActivityCosts from './CombinedActivityCosts';
import BudgetSummary from './BudgetSummary';
import IncentivePayments from './IncentivePayments';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';
import { APD_TYPE } from '@cms-eapd/common';

const ProposedBudget = ({ apdType }) => (
  <div>
    <h2>Proposed Budget</h2>

    <h3>Combined Activity Costs</h3>
    <CombinedActivityCosts isViewOnly apdType={apdType} />

    <h3>Summary Budget Table</h3>
    <BudgetSummary apdType={apdType} />

    {apdType === APD_TYPE.HITECH && (
      <div>
        <h3>Quarterly Federal Share</h3>
        <QuarterlyBudgetSummary />
        <h3>Estimated Quarterly Incentive Payments</h3>
        <IncentivePayments isViewOnly />
      </div>
    )}
  </div>
);

ProposedBudget.propTypes = {
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

export default connect(mapStateToProps)(ProposedBudget);

export { ProposedBudget as plain, mapStateToProps };
