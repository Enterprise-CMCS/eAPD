import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Section, Subsection } from '../../../components/Section';
import CombinedActivityCosts from './CombinedActivityCosts';
import BudgetSummary from './BudgetSummary';
import Waypoint from '../../../components/ConnectedWaypoint';
import IncentivePayments from './IncentivePayments';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';
import AlertMissingFFY from '../../../components/AlertMissingFFY';
import { selectApdType } from '../../../redux/selectors/apd.selectors';
import { connect } from 'react-redux';

const ProposedBudget = ({ apdType }) => (
  <React.Fragment>
    <Waypoint />
    <AlertMissingFFY />
    <Section resource="proposedBudget">
      <Waypoint id="combined-activity-costs-table" />
      <Subsection
        id="combined-activity-costs-table"
        resource="proposedBudget.combinedActivityCosts"
      >
        <CombinedActivityCosts apdType={apdType} />
      </Subsection>

      <Waypoint id="budget-summary-table" />
      <Subsection
        id="budget-summary-table"
        resource="proposedBudget.summaryBudget"
      >
        <BudgetSummary apdType={apdType} />
      </Subsection>
      {apdType === 'HITECH' && (
        <Fragment>
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
        </Fragment>
      )}
    </Section>
  </React.Fragment>
);

ProposedBudget.propTypes = {
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

export default connect(mapStateToProps)(ProposedBudget);

export { ProposedBudget as plain, mapStateToProps };
