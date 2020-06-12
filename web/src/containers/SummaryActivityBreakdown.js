import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  selectActivityCostSummary,
  selectActivityByIndex
} from '../reducers/activities.selectors';

import CostAllocationRows from './activity/CostAllocationRows';

const SummaryActivityBreakdownTable = ({
  ffy,
  activityIndex,
  costSummary,
  activityName,
  otherFunding
}) => {
  const { years } = costSummary;

  return (
    <table className="budget-table activity-budget-table">
      <tbody>
        <tr className="budget-table--row__primary-header">
          <th scope="col">
            Activity {activityIndex + 1}{' '}
            <span style={{ fontWeight: '100' }}>{activityName}</span>
          </th>
          <th scope="col" colSpan="4">
            Personnel Cost x FTE
          </th>
          <th className="ds-u-text-align--right" scope="col">
            Total cost
          </th>
        </tr>
        <CostAllocationRows
          years={years}
          ffy={ffy}
          otherFunding={otherFunding}
        />
      </tbody>
    </table>
  );
};

SummaryActivityBreakdownTable.propTypes = {
  ffy: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  costSummary: PropTypes.object.isRequired,
  otherFunding: PropTypes.object.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostSummary = selectActivityCostSummary
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });

  return {
    activityName: activity.name || `Activity ${activityIndex + 1}`,
    costSummary: getCostSummary(state, { activityIndex })
  };
};

export default connect(mapStateToProps)(SummaryActivityBreakdownTable);
