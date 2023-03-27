import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  selectActivityCostSummary,
  selectActivityByIndex
} from '../../../redux/selectors/activities.selectors';
import { selectApdType } from '../../../redux/selectors/apd.selectors';
import CostAllocationRows from '../activities/cost-allocation/CostAllocationRows';

const SummaryActivityBreakdownTable = ({
  ffy,
  apdType,
  activityIndex,
  costSummary,
  activityName,
  otherFunding, // prop
  fundingSource
}) => {
  const { years } = costSummary;

  return (
    <table
      className="budget-table activity-budget-table"
      id={`activity-${activityIndex + 1}-${ffy}`}
    >
      <thead>
        <tr className="budget-table--row__primary-header">
          <th scope="col" colSpan={6}>
            Activity {activityIndex + 1}{' '}
            <span style={{ fontWeight: '100' }}>
              {activityName || 'Untitled'}
              {fundingSource ? ` (${fundingSource})` : ''}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <CostAllocationRows
          years={years}
          ffy={ffy}
          otherFunding={otherFunding}
          activityIndex={activityIndex}
          apdType={apdType}
          highlightSubtotals={true}
          showUnitCostHeader={true}
          highlightTotal={true}
        />
      </tbody>
    </table>
  );
};

SummaryActivityBreakdownTable.propTypes = {
  ffy: PropTypes.string.isRequired,
  apdType: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  costSummary: PropTypes.object.isRequired,
  otherFunding: PropTypes.object.isRequired,
  fundingSource: PropTypes.string.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostSummary = selectActivityCostSummary,
    getApdType = selectApdType
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });

  return {
    activityName: activity.name,
    fundingSource: activity.fundingSource,
    costSummary: getCostSummary(state, { activityIndex }),
    apdType: getApdType(state)
  };
};

export default connect(mapStateToProps)(SummaryActivityBreakdownTable);

export { SummaryActivityBreakdownTable as plain, mapStateToProps };
