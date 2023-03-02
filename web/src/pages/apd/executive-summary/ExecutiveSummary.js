import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';
import { selectApdType } from '../../../redux/selectors/apd.selectors';
import { useParams } from 'react-router-dom';

import Waypoint from '../../../components/ConnectedWaypoint';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { Section, Subsection } from '../../../components/Section';

import HitechActivitySummary from './HitechActivitySummary';
import HitechBudgetSummary from './HitechBudgetSummary';
import MmisActivitySummary from './MmisActivitySummary';
import MmisSpecificFields from './MmisSpecificFields';
import MmisBudgetSummary from './MmisBudgetSummary';
import { APD_TYPE } from '@cms-eapd/common';

import { selectApdYears } from '../../../redux/selectors/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../../../redux/selectors/budget.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

import { ffyList } from '../../../util/apd';

const ExecutiveSummary = ({ apdType, budget, data, total, years }) => {
  if (years.length === 0) {
    return (
      <React.Fragment>
        <Waypoint />
        <AlertMissingFFY />
      </React.Fragment>
    );
  }

  const { apdId } = useParams();
  const { ffys } = total;

  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  function renderMmisSpecificFields() {
    if (apdType === APD_TYPE.MMIS) {
      return <MmisSpecificFields />;
    }
    return null;
  }

  function renderApdTypeSpecificActivities(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return <HitechActivitySummary apdId={apdId} data={data} ffys={ffys} />;
      case APD_TYPE.MMIS:
        return <MmisActivitySummary apdId={apdId} data={data} ffys={ffys} />;
      default:
        null;
    }
  }

  function renderApdTypeSpecificBudgets(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return <HitechBudgetSummary budget={budget} rowKeys={rowKeys} />;
      case APD_TYPE.MMIS:
        return <MmisBudgetSummary budget={budget} rowKeys={rowKeys} />;
      default:
        null;
    }
  }

  return (
    <React.Fragment>
      <Waypoint />
      <Section resource="executiveSummary">
        {renderMmisSpecificFields()}
        <Waypoint id="executive-activities-summary" />
        <Subsection
          id="executive-activities-summary"
          resource="executiveSummary.activitiesSummary"
        >
          {/* Show relevant activities fields based on APD type selected */}
          {renderApdTypeSpecificActivities(apdType)}

          <hr className="ds-u-margin--0" />
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
              {ffyList(total.ffys)}
            </ul>
          </Review>
        </Subsection>

        <Waypoint id="executive-summary-budget-table" />
        {/* Show relevant budgets based on APD type selected */}
        {renderApdTypeSpecificBudgets(apdType)}
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
