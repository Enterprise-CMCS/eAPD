import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';
import { selectApdType } from '../../../redux/selectors/apd.selectors';

import HitechBudgetSummary from './HitechBudgetSummary';
import MmisBudgetSummary from './MmisBudgetSummary';
import { APD_TYPE } from '@cms-eapd/common';

const thId = (program, share) =>
  `program-budget-table-${program}${share ? `-${share}` : ''}`;
const tdHdrs = (program, share) =>
  `program-budget-table-${program} program-budget-table-${program}-${share}`;

const ExecutiveSummaryBudget = ({ apdType, budget }) => {
  const { years } = budget;

  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  function renderApdTypeSpecificFields(apdType) {
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
    <Fragment>
      {/* Show relevant fields based on APD type selected */}
      {renderApdTypeSpecificFields(apdType)}
    </Fragment>
  );
};

ExecutiveSummaryBudget.propTypes = {
  apdType: PropTypes.string,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { apdType: selectApdType(state), budget: state.budget };
};

export default connect(mapStateToProps)(ExecutiveSummaryBudget);

export { ExecutiveSummaryBudget as plain, mapStateToProps };
