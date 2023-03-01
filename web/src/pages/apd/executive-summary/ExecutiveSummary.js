import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';
import { selectApdType } from '../../../redux/selectors/apd.selectors';

import Waypoint from '../../../components/ConnectedWaypoint';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { Section, Subsection } from '../../../components/Section';

import HitechActivitySummary from './HitechActivitySummary';
import HitechBudgetSummary from './HitechBudgetSummary';
import MmisActivitySummary from './MmisActivitySummary';
import MmisBudgetSummary from './MmisBudgetSummary';
import { APD_TYPE } from '@cms-eapd/common';

import { selectApdYears } from '../../../redux/selectors/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../../../redux/selectors/budget.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

const thId = (program, share) =>
  `program-budget-table-${program}${share ? `-${share}` : ''}`;
const tdHdrs = (program, share) =>
  `program-budget-table-${program} program-budget-table-${program}-${share}`;

const ExecutiveSummary = ({ apdType, budget, data, total, years }) => {
  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  function renderApdTypeSpecificActivities(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return <HitechActivitySummary data={data} />;
      case APD_TYPE.MMIS:
        return <MmisActivitySummary data={data} />;
      default:
        null;
    }
  }

  function renderApdTypeSpecificBudgets(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return (
          <HitechBudgetSummary
            budget={budget}
            rowKeys={rowKeys}
            tdHdrs={tdHdrs}
            thId={thId}
          />
        );
      case APD_TYPE.MMIS:
        return (
          <MmisBudgetSummary
            budget={budget}
            rowKeys={rowKeys}
            tdHdrs={tdHdrs}
            thId={thId}
          />
        );
      default:
        null;
    }
  }

  return (
    <React.Fragment>
      <Waypoint />
      <AlertMissingFFY />
      <Section resource="executiveSummary">
        <Waypoint id="executive-summary-summary" />
        <Subsection
          id="executive-summary-summary"
          resource="executiveSummary.summary"
        >
          {/* Show relevant fields based on APD type selected */}
          {renderApdTypeSpecificActivities(apdType)}

          <hr className="ds-u-border--dark ds-u-margin--0" />
          <Review
            heading="Total Cost"
            headingLevel="4"
            className="ds-u-border--0"
          >
            <p>
              Verify that this information is correct. Edit activities above to
              make changes.
            </p>
            <ul className="ds-c-list--bare">
              <li>
                <strong>Federal Fiscal Years Requested:</strong> FFY{' '}
                {years.join(', ')}
              </li>
              <li>
                <strong>Total Computable Medicaid Cost:</strong>{' '}
                <Dollars>{total.medicaid}</Dollars> (
                <Dollars>{total.federal}</Dollars> Federal share)
              </li>
              <li>
                <strong>Total Funding Request:</strong>{' '}
                <Dollars>{total.combined}</Dollars>
              </li>
              {Object.entries(total.ffys).map(
                ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
                  <li key={ffy} className={i === 0 ? 'ds-u-margin-top--2' : ''}>
                    <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                    <Dollars>{medicaid}</Dollars> Total Computable Medicaid Cost
                    | <Dollars>{federal}</Dollars> Federal share
                  </li>
                )
              )}
            </ul>
          </Review>
        </Subsection>

        <Waypoint id="executive-summary-budget-table" />
        <Subsection
          id="executive-summary-budget-table"
          resource="executiveSummary.budgetTable"
        >
          {/* Show relevant fields based on APD type selected */}
          {renderApdTypeSpecificBudgets(apdType)}
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

ExecutiveSummary.propTypes = {
  apdType: PropTypes.string,
  budget: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  budget: state.budget,
  data: selectBudgetExecutiveSummary(state),
  total: selectBudgetGrandTotal(state),
  years: selectApdYears(state)
});

export default connect(mapStateToProps)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps };
