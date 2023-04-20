import PropTypes from 'prop-types';
import React from 'react';
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

  if (years && years.length > 0) {
    const rowKeys = [
      ...years.map(year => ({ year, display: t('ffy', { year }) })),
      { year: 'total', display: 'Total' }
    ];

    // Returns the correct budget summary component based on APD type
    function renderBudgetSummary() {
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

    return renderBudgetSummary();
  } else return null;
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
