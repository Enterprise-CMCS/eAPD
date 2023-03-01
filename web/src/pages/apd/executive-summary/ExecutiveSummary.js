import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { t } from '../../../i18n';
import { selectApdType } from '../../../redux/selectors/apd.selectors';

import Waypoint from '../../../components/ConnectedWaypoint';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { Section, Subsection } from '../../../components/Section';

import HitechBudgetSummary from './HitechBudgetSummary';
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
  const { apdId } = useParams();
  const { years } = budget;

  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  function renderApdTypeSpecificFields(apdType) {
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
          {data.map((activity, i) => (
            <Review
              key={activity.activityId}
              heading={
                <Fragment>
                  Activity {i + 1}: {activity.name || 'Untitled'}
                </Fragment>
              }
              headingLevel="4"
              editHref={`/apd/${apdId}/activity/${i}/overview`}
              className={i === data.length - 1 ? 'ds-u-border-bottom--0' : ''}
            >
              {activity.summary && (
                /* eslint-disable react/no-danger */
                <p dangerouslySetInnerHTML={{ __html: activity.summary }} />
              )}
              <ul className="ds-c-list--bare">
                <li>
                  <strong>Start Date - End Date:</strong> {activity.dateRange}
                </li>
                <li>
                  <strong>Total Cost of Activity:</strong>{' '}
                  <Dollars>{activity.combined}</Dollars>
                </li>
                <li>
                  <strong>Total Computable Medicaid Cost:</strong>{' '}
                  <Dollars>{activity.medicaid}</Dollars> (
                  <Dollars>{activity.federal}</Dollars> Federal share)
                </li>
                {Object.entries(activity.ffys).map(
                  ([ffy, { medicaid, federal, total: ffyTotal }], j) => (
                    <li
                      key={ffy}
                      className={j === 0 ? 'ds-u-margin-top--2' : ''}
                    >
                      <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars>{' '}
                      | <strong>Total Computable Medicaid Cost:</strong>{' '}
                      <Dollars>{medicaid}</Dollars> (
                      <Dollars>{federal}</Dollars> Federal share)
                    </li>
                  )
                )}
              </ul>
            </Review>
          ))}

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
          {renderApdTypeSpecificFields(apdType)}
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
