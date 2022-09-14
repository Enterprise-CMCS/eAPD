import { Dropdown } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import Instruction from '../../../../components/Instruction';
import CostAllocateFFPQuarterly from '../cost-allocation/CostAllocateFFPQuarterly';

import { setCostAllocationFFPFundingSplit } from '../../../../redux/actions/editActivity';
import Dollars from '../../../../components/Dollars';
import {
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivityByIndex,
  selectActivityTotalForBudgetByActivityIndex
} from '../../../../redux/selectors/activities.selectors';
import { getUserStateOrTerritory } from '../../../../redux/selectors/user.selector';
import CostAllocationRows, {
  CostSummaryRows
} from '../cost-allocation/CostAllocationRows';
import { t } from '../../../../i18n';

import costAllocateFFPSchema from '@cms-eapd/common/schemas/costAllocateFFP';

const AllFFYsSummaryNarrative = ({
  activityName,
  costAllocation,
  costSummary: { total },
  stateName
}) => {
  let lastSplit = '';
  let fundingSplitBits = [];

  Object.keys(costAllocation).forEach(ffy => {
    const split = `${costAllocation[ffy].ffp.federal}/${costAllocation[ffy].ffp.state}`;

    if (split !== lastSplit) {
      fundingSplitBits.push({ split, ffys: [] });
    }

    fundingSplitBits[fundingSplitBits.length - 1].ffys.push(`FFY ${ffy}`);
    lastSplit = split;
  });

  fundingSplitBits = fundingSplitBits.map(split => {
    if (split.ffys.length > 2) {
      split.ffys[split.ffys.length - 1] = `and ${
        split.ffys[split.ffys.length - 1]
      }`;
      split.ffys = split.ffys.join(', ');
    } else {
      split.ffys = split.ffys.join(' and ');
    }
    return `${split.split} (${split.ffys})`;
  });

  let fundingSplitNarrative = fundingSplitBits.join(' and ');
  if (fundingSplitBits.length > 2) {
    fundingSplitBits[fundingSplitBits.length - 1] = `and ${
      fundingSplitBits[fundingSplitBits.length - 1]
    }`;
    fundingSplitNarrative = fundingSplitBits.join(', ');
  }

  return (
    <p>
      The total cost of the <strong>{activityName}</strong> activity is{' '}
      <strong>
        <Dollars>{total.totalCost}</Dollars>
      </strong>
      . Because of other funding of{' '}
      <strong>
        <Dollars>{total.otherFunding}</Dollars>
      </strong>
      , the total computable Medicaid cost is{' '}
      <strong>
        <Dollars>{total.medicaidShare}</Dollars>
      </strong>
      . This activity is using a <strong>{fundingSplitNarrative}</strong>{' '}
      funding split, resulting in a federal share of{' '}
      <strong>
        <Dollars>{total.federalShare}</Dollars>
      </strong>{' '}
      and a {stateName} share of{' '}
      <strong>
        <Dollars>{total.stateShare}</Dollars>
      </strong>
      .
    </p>
  );
};

AllFFYsSummaryNarrative.propTypes = {
  activityName: PropTypes.string.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  stateName: PropTypes.string.isRequired
};

const CostAllocateFFP = ({
  activityIndex,
  activityName,
  costAllocation,
  costSummary,
  otherFunding,
  aKey,
  isViewOnly,
  setFundingSplit,
  stateName,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue
  } = useForm({
    defaultValues: {
      ...costAllocation
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(costAllocateFFPSchema)
  });

  useEffect(() => {
    Object.keys(costAllocation).forEach(year => {
      setValue(`${year}`, costAllocation[year]);
    });
    if (adminCheck) {
      trigger();
    }
  }, [costAllocation]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFederalStateSplit = year => e => {
    const [federal, state] = e.target.value.split('-').map(Number);
    setFundingSplit(activityIndex, year, federal, state);
  };

  const { years } = costSummary;

  return (
    <Fragment>
      {isViewOnly ? (
        <hr className="custom-hr" />
      ) : (
        <h2 className="subsection--title ds-h2">Budget and FFP</h2>
      )}
      {Object.keys(years).map(ffy => (
        <div key={ffy}>
          <table
            className="budget-table activity-budget-table"
            id={`activity${activityIndex}-ffy${ffy}`}
            data-cy="FFPActivityTable"
          >
            <caption className="ds-h3">
              Activity {activityIndex + 1} Budget for FFY {ffy}
            </caption>
            <tbody>
              <CostAllocationRows
                years={years}
                ffy={ffy}
                activityIndex={activityIndex}
                otherFunding={otherFunding}
              />
            </tbody>
          </table>

          {/* in viewonly mode, we'll pull everything into a single table
              table since there aren't form elements to fill in */}
          {isViewOnly && (
            <table
              className="budget-table activity-budget-table"
              data-cy="FFPActivityTotalCostTable"
            >
              <tbody>
                <tr className="budget-table--subtotal budget-table--row__header">
                  <th colSpan="5">Activity Total Cost</th>
                  <td className="budget-table--number">
                    <Dollars>{years[ffy].totalCost}</Dollars>
                  </td>
                </tr>
                <tr className="title">
                  <td>Other Funding</td>
                  <td colSpan="3" />
                  <td>-</td>
                  <td className="budget-table--number">
                    <Dollars>{years[ffy].otherFunding}</Dollars>
                  </td>
                </tr>
                <tr className="budget-table--subtotal budget-table--row__highlight">
                  <td>Activity Total Computable Medicaid Cost</td>
                  <td colSpan="4" />
                  <td className="budget-table--number">
                    <Dollars>{years[ffy].medicaidShare}</Dollars>
                  </td>
                </tr>
                <CostSummaryRows
                  items={[
                    {
                      description: 'Federal Share',
                      totalCost: years[ffy].federalShare,
                      unitCost: years[ffy].medicaidShare,
                      units: `${costAllocation[ffy].ffp.federal}%`
                    },
                    {
                      description: 'State Share',
                      totalCost: years[ffy].stateShare,
                      unitCost: years[ffy].medicaidShare,
                      units: `${costAllocation[ffy].ffp.state}%`
                    }
                  ]}
                />
              </tbody>
            </table>
          )}

          {!isViewOnly && (
            <Fragment>
              <table
                className="budget-table activity-budget-table"
                data-cy="FFPActivityTotalCostTable"
              >
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
                    <td className="title">
                      Activity Total Computable Medicaid Cost
                    </td>
                    <td colSpan="2" className="budget-table--number">
                      <Dollars>{years[ffy].medicaidShare}</Dollars>
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
                <Controller
                  name={`${ffy}`}
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Dropdown
                      {...props}
                      label="federal-state split"
                      labelClassName="sr-only"
                      options={[
                        { label: 'Select an option', value: '0-100' },
                        { label: '90-10', value: '90-10' },
                        { label: '75-25', value: '75-25' },
                        { label: '50-50', value: '50-50' }
                      ]}
                      value={`${costAllocation[ffy].ffp.federal}-${costAllocation[ffy].ffp.state}`}
                      onChange={setFederalStateSplit(ffy)}
                      errorMessage={errors[ffy]?.ffp?.state?.message}
                      errorPlacement="bottom"
                      data-cy="cost-allocation-dropdown"
                    />
                  )}
                />
              </div>
              <table
                className="budget-table activity-budget-table"
                data-cy="FFPFedStateSplitTable"
              >
                <tbody>
                  <tr className="budget-table--subtotal budget-table--row__header">
                    <th colSpan="5">Total Computable Medicaid Cost</th>
                    <td className="budget-table--number">
                      <Dollars>{years[ffy].medicaidShare}</Dollars>
                    </td>
                  </tr>
                  <CostSummaryRows
                    items={[
                      {
                        description: 'Federal Share',
                        totalCost: years[ffy].federalShare,
                        unitCost: years[ffy].medicaidShare,
                        units: `${costAllocation[ffy].ffp.federal}%`
                      },
                      {
                        description: 'State Share',
                        totalCost: years[ffy].stateShare,
                        unitCost: years[ffy].medicaidShare,
                        units: `${costAllocation[ffy].ffp.state}%`
                      }
                    ]}
                  />
                </tbody>
              </table>
            </Fragment>
          )}

          <div className="data-entry-box ds-u-margin-bottom--5">
            {!isViewOnly && (
              <Instruction
                source="activities.costAllocate.ffp.quarterlyFFPInstruction"
                headingDisplay={{
                  level: 'p',
                  className: 'ds-h4'
                }}
              />
            )}

            {isViewOnly && (
              <h4>
                {titleCase(
                  t(
                    'activities.costAllocate.ffp.quarterlyFFPInstruction.heading'
                  )
                )}
              </h4>
            )}

            <CostAllocateFFPQuarterly
              activityIndex={activityIndex}
              aKey={aKey}
              isViewOnly={isViewOnly}
              year={ffy}
            />
          </div>
        </div>
      ))}

      <h3 className="subsection--title ds-h3">
        FFY {Object.keys(years)[0]}-{Object.keys(years).pop()} Totals
      </h3>
      <AllFFYsSummaryNarrative
        activityName={activityName}
        costAllocation={costAllocation}
        costSummary={costSummary}
        stateName={stateName}
      />
    </Fragment>
  );
};

CostAllocateFFP.propTypes = {
  aKey: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  otherFunding: PropTypes.object.isRequired,
  isViewOnly: PropTypes.bool,
  setFundingSplit: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
  adminCheck: PropTypes.bool
};

CostAllocateFFP.defaultProps = {
  isViewOnly: false,
  adminCheck: false
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostAllocation = selectCostAllocationForActivityByIndex,
    getCostSummary = selectActivityCostSummary,
    getState = getUserStateOrTerritory,
    getActivityTotal = selectActivityTotalForBudgetByActivityIndex
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });
  const activityTotal = getActivityTotal(state, { activityIndex });

  return {
    aKey: activity.key,
    activityName: activity.name || 'Untitled',
    costAllocation: getCostAllocation(state, { activityIndex }),
    costSummary: getCostSummary(state, { activityIndex }),
    stateName: getState(state).name,
    otherFunding: activityTotal.data.otherFunding,
    adminCheck: state.apd.adminCheck
  };
};

const mapDispatchToProps = {
  setFundingSplit: setCostAllocationFFPFundingSplit
};

export default connect(mapStateToProps, mapDispatchToProps)(CostAllocateFFP);

export {
  CostAllocateFFP as plain,
  AllFFYsSummaryNarrative,
  mapStateToProps,
  mapDispatchToProps
};
