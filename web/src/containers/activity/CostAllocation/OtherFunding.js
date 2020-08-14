import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Instruction from 'components/Instruction';

import { setCostAllocationFFPOtherFunding } from 'actions/editActivity';
import DollarField from 'components/DollarField';
import Dollars from 'components/Dollars';
import {
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivityByIndex
} from 'reducers/activities.selectors';

import { t } from 'i18n';
import RichText from 'components/RichText'

const OtherFunding = ({
  activityIndex,
  activity,
  costAllocation,
  costSummary,
  setOtherFunding,
}) => {
  const {
    costAllocationNarrative: { otherSources }
  } = activity;

  const setOther = year => e => {
    setOtherFunding(activityIndex, year, e.target.value);
  };
  const syncOtherFunding = html => setOtherFunding(activityIndex, html);

  const { years } = costSummary;

  return (
    <Fragment>
      <h2>{t('activities.otherFunding.title')}</h2>
      {Object.keys(years).map(ffy => (
        <Fragment key={ffy}>
          <div className="data-entry-box">
            <Instruction
              source="activities.otherFunding.description.instruction"
              headingDisplay={{
                level: 'h6',
                className: 'ds-h5'
              }}
            />
            <RichText
              content={otherSources}
              onSync={syncOtherFunding}
              editorClassName="rte-textarea-l"
            />
          </div>

          <div className="data-entry-box ds-u-margin-bottom--5">
            <Instruction source="activities.otherFunding.amount.instruction"
              headingDisplay={{
                level: 'h6',
                className: 'ds-h5'
              }}
            />
            <DollarField
              name={`ffy-${ffy}`}
              label={`FFY ${ffy}`}
              labelClassName="sr-only"
              value={costAllocation[ffy].other || '0'}
              onChange={setOther(ffy)}
            />
          </div>

          <table className="budget-table activity-budget-table">
            <tbody>
              <tr className="budget-table--subtotal budget-table--row__header">
                <th colSpan="2">Activity Total Cost</th>
                <td className="budget-table--number">
                  <Dollars>{years[ffy].totalCost}</Dollars>
                </td>
              </tr>
              <tr>
                <td className="title">Other Funding</td>
                <td>-</td>
                <td className="budget-table--number">
                  <Dollars>{years[ffy].otherFunding}</Dollars>
                </td>
              </tr>
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td className="title">Medicaid Share</td>
                <td colSpan="2" className="budget-table--number">
                  <Dollars>{years[ffy].medicaidShare}</Dollars>
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ))}
    </Fragment>
  );
};

OtherFunding.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  setOtherFunding: PropTypes.func.isRequired,
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostAllocation = selectCostAllocationForActivityByIndex,
    getCostSummary = selectActivityCostSummary,
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });
  return {
    activity: activity,
    costAllocation: getCostAllocation(state, { activityIndex }),
    costSummary: getCostSummary(state, { activityIndex }),
  };
};

const mapDispatchToProps = {
  setOtherFunding: setCostAllocationFFPOtherFunding
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherFunding);

export {
  OtherFunding as plain,
  mapStateToProps,
  mapDispatchToProps
};
