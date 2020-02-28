import { Dropdown } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Instruction from '../../components/Instruction';
import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';

import {
  setCostAllocationFFPFundingSplit,
  setCostAllocationFFPOtherFunding
} from '../../actions/editActivity';
import DollarField from '../../components/DollarField';
import Dollars from '../../components/Dollars';
import {
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivityByIndex
} from '../../reducers/activities.selectors';
import { getUserStateOrTerritory } from '../../reducers/user.selector';

const CostSummaryRows = ({ items }) =>
  items.map(({ description, totalCost, unitCost, units }) => (
    <tr key={description}>
      <td />
      <td>{description}</td>
      <td className="budget-table--number">
        {unitCost !== null && <Dollars long>{unitCost}</Dollars>}
      </td>
      <td className="budget-table--number">{unitCost !== null && '×'}</td>
      <td className="budget-table--number">{units}</td>
      <td className="budget-table--number">{unitCost !== null && '='}</td>
      <td className="budget-table--number">
        <Dollars long>{totalCost}</Dollars>
      </td>
    </tr>
  ));

CostSummaryRows.propTypes = {
  items: PropTypes.array.isRequired
};

const CostAllocateFFP = ({
  activityIndex,
  activityName,
  costAllocation,
  costSummary,
  aKey,
  isViewOnly,
  setFundingSplit,
  setOtherFunding,
  stateName
}) => {
  const setOther = year => e => {
    setOtherFunding(activityIndex, year, e.target.value);
  };

  const setFederalStateSplit = year => e => {
    const [federal, state] = e.target.value.split('-').map(Number);
    setFundingSplit(activityIndex, year, federal, state);
  };

  const { total, years } = costSummary;

  return (
    <Fragment>
      {Object.keys(years).map(ffy => (
        <Fragment key={ffy}>
          <h3 className="subsection--title ds-h3">
            Cost Allocation and Budget for FFY {ffy}
          </h3>

          <table className="budget-table">
            <tbody>
              <tr className="budget-table--row__header">
                <th colSpan="2">State Staff</th>
                <th>Cost</th>
                <td colSpan="4" />
              </tr>
              <CostSummaryRows items={years[ffy].keyPersonnel} />
              <CostSummaryRows items={years[ffy].statePersonnel} />
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td />
                <td>State Staff Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>{years[ffy].statePersonnelTotal}</Dollars>
                </td>
              </tr>
              <tr className="budget-table--row__header">
                <th colSpan="7">Other State Expenses</th>
              </tr>
              <CostSummaryRows items={years[ffy].nonPersonnel} />
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td />
                <td>Other State Expenses Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>{years[ffy].nonPersonnelTotal}</Dollars>
                </td>
              </tr>
              <tr className="budget-table--row__header">
                <th colSpan="7">Private Contractor</th>
              </tr>
              <CostSummaryRows items={years[ffy].contractorResources} />
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td />
                <td>Private Contractor Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>{years[ffy].contractorResourcesTotal}</Dollars>
                </td>
              </tr>
              <tr className="budget-table--subtotal">
                <td colSpan="6">Activity Total Cost</td>
                <td className="budget-table--number">
                  <Dollars long>{years[ffy].totalCost}</Dollars>
                </td>
              </tr>

              {/* in viewonly mode, we'll pull everything into a single table
                  table since there aren't form elements to fill in */}
              {isViewOnly && (
                <Fragment>
                  <tr>
                    <td />
                    <td>Other Funding</td>
                    <td colSpan="3" />
                    <td>-</td>
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].otherFunding}</Dollars>
                    </td>
                  </tr>
                  <tr className="budget-table--subtotal budget-table--row__highlight">
                    <td />
                    <td>Medicaid Share</td>
                    <td colSpan="4" />
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].medicaidShare}</Dollars>
                    </td>
                  </tr>
                  <CostSummaryRows
                    items={[
                      {
                        description: 'Federal Share',
                        totalCost: years[ffy].federalShare,
                        unitCost: years[ffy].medicaidShare,
                        units: '90%'
                      },
                      {
                        description: 'State Share',
                        totalCost: years[ffy].stateShare,
                        unitCost: years[ffy].medicaidShare,
                        units: '10%'
                      }
                    ]}
                  />
                </Fragment>
              )}
            </tbody>
          </table>

          {!isViewOnly && (
            <Fragment>
              <div className="data-entry-box ds-u-margin-bottom--5">
                <Instruction
                  source="activities.costAllocate.ffp.otherFundingInstruction"
                  headingDisplay={{
                    level: 'p',
                    className: 'ds-h4'
                  }}
                />
                <DollarField
                  label={`FFY ${ffy}`}
                  labelClassName="sr-only"
                  value={costAllocation[ffy].other || '0'}
                  onChange={setOther(ffy)}
                />
              </div>

              <table className="budget-table">
                <tbody>
                  <tr className="budget-table--subtotal budget-table--row__header">
                    <th colSpan="6">Activity Total Cost</th>
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].totalCost}</Dollars>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>Other Funding</td>
                    <td colSpan="3" />
                    <td>-</td>
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].otherFunding}</Dollars>
                    </td>
                  </tr>
                  <tr className="budget-table--subtotal budget-table--row__highlight">
                    <td />
                    <td>Medicaid Share</td>
                    <td colSpan="4" />
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].medicaidShare}</Dollars>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="data-entry-box ds-u-margin-bottom--5">
                <Instruction
                  source="activities.costAllocate.ffp.federalStateSplitInstruction"
                  headingDisplay={{
                    level: 'p',
                    className: 'ds-h4'
                  }}
                />
                <Dropdown
                  name={`ffp-${ffy}`}
                  label="federal-state split"
                  labelClassName="sr-only"
                  options={[
                    { label: '90-10', value: '90-10' },
                    { label: '75-25', value: '75-25' },
                    { label: '50-50', value: '50-50' }
                  ]}
                  value={`${costAllocation[ffy].ffp.federal}-${costAllocation[ffy].ffp.state}`}
                  onChange={setFederalStateSplit(ffy)}
                />
              </div>

              <table className="budget-table">
                <tbody>
                  <tr className="budget-table--subtotal budget-table--row__header">
                    <th colSpan="6">Medicaid Share</th>
                    <td className="budget-table--number">
                      <Dollars long>{years[ffy].medicaidShare}</Dollars>
                    </td>
                  </tr>
                  <CostSummaryRows
                    items={[
                      {
                        description: 'Federal Share',
                        totalCost: years[ffy].federalShare,
                        unitCost: years[ffy].medicaidShare,
                        units: '90%'
                      },
                      {
                        description: 'State Share',
                        totalCost: years[ffy].stateShare,
                        unitCost: years[ffy].medicaidShare,
                        units: '10%'
                      }
                    ]}
                  />
                </tbody>
              </table>
            </Fragment>
          )}

          <div className="data-entry-box ds-u-margin-bottom--5">
            <Instruction
              source="activities.costAllocate.ffp.quarterlyFFPInstruction"
              headingDisplay={{
                level: 'p',
                className: 'ds-h4'
              }}
            />

            <CostAllocateFFPQuarterly
              activityIndex={activityIndex}
              aKey={aKey}
              isViewOnly={isViewOnly}
              year={ffy}
            />
          </div>
        </Fragment>
      ))}

      <h3 className="subsection--title ds-h3">
        FFY {Object.keys(years)[0]}-{Object.keys(years).pop()} Totals
      </h3>
      <p>
        The total cost of the <strong>{activityName}</strong> activity is{' '}
        <strong>
          <Dollars long>{total.totalCost}</Dollars>
        </strong>
        . Because of other funding of{' '}
        <strong>
          <Dollars long>{total.otherFunding}</Dollars>
        </strong>
        , the total cost to Medicaid is{' '}
        <strong>
          <Dollars long>{total.medicaidShare}</Dollars>
        </strong>
        . This activity is using a <strong>90/10</strong> funding split,
        resulting in a federal share of{' '}
        <strong>
          <Dollars long>{total.federalShare}</Dollars>
        </strong>{' '}
        and a {stateName} share of{' '}
        <strong>
          <Dollars long>{total.stateShare}</Dollars>
        </strong>
        .
      </p>
    </Fragment>
  );
};

CostAllocateFFP.propTypes = {
  aKey: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  isViewOnly: PropTypes.bool,
  setFundingSplit: PropTypes.func.isRequired,
  setOtherFunding: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired
};

CostAllocateFFP.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostAllocation = selectCostAllocationForActivityByIndex,
    getCostSummary = selectActivityCostSummary,
    getState = getUserStateOrTerritory
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });

  return {
    aKey: activity.key,
    activityName: activity.name || `Activity ${activityIndex + 1}`,
    costAllocation: getCostAllocation(state, { activityIndex }),
    costSummary: getCostSummary(state, { activityIndex }),
    stateName: getState(state).name
  };
};

const mapDispatchToProps = {
  setFundingSplit: setCostAllocationFFPFundingSplit,
  setOtherFunding: setCostAllocationFFPOtherFunding
};

export default connect(mapStateToProps, mapDispatchToProps)(CostAllocateFFP);

export {
  CostAllocateFFP as plain,
  CostSummaryRows,
  mapStateToProps,
  mapDispatchToProps
};
