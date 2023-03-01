import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { t } from '../../../i18n';
import { selectApdType } from '../../../redux/selectors/apd.selectors';

import Waypoint from '../../../components/ConnectedWaypoint';
import { Section } from '../../../components/Section';

import HitechBudgetSummary from './HitechBudgetSummary';
import HitechExecutiveSummary from './HitechExecutiveSummary';
import MmisBudgetSummary from './MmisBudgetSummary';
import MmisExecutiveSummary from './MmisExecutiveSummary';
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

  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  function renderApdTypeSpecificFields(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return (
          <Section resource="executiveSummary">
            <Waypoint id="executive-summary-summary" />
            <HitechExecutiveSummary
              apdId={apdId}
              data={data}
              total={total}
              years={years}
            />
            <Waypoint id="executive-summary-budget-table" />
            <HitechBudgetSummary
              budget={budget}
              rowKeys={rowKeys}
              tdHdrs={tdHdrs}
              thId={thId}
            />
          </Section>
        );
      case APD_TYPE.MMIS:
        return (
          <Section resource="executiveSummary">
            <Waypoint id="executive-summary-summary" />
            <MmisExecutiveSummary
              apdId={apdId}
              data={data}
              total={total}
              years={years}
            />
            <Waypoint id="executive-summary-budget-table" />
            <MmisBudgetSummary
              budget={budget}
              rowKeys={rowKeys}
              tdHdrs={tdHdrs}
              thId={thId}
            />
          </Section>
        );
      default:
        null;
    }
  }

  return (
    <React.Fragment>
      <Waypoint />
      <AlertMissingFFY />
      {/* Show relevant fields based on APD type selected */}
      {renderApdTypeSpecificFields(apdType)}
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
