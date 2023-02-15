import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import Instruction from '../../../../components/Instruction';
import CostAllocateFFPQuarterly from '../cost-allocation/CostAllocateFFPQuarterly';
import FedStateSelector from './FedStateSelector';
import MatchRateSelector from './MatchRateSelector';

import {
  setCostAllocationFFPFundingSplit,
  setCostAllocationMatchRate
} from '../../../../redux/actions/editActivity';
import Dollars from '../../../../components/Dollars';
import {
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivityByIndex,
  selectActivityTotalForBudgetByActivityIndex
} from '../../../../redux/selectors/activities.selectors';
import { getAPDYearRange } from '../../../../redux/reducers/apd';
import { getUserStateOrTerritory } from '../../../../redux/selectors/user.selector';
import {
  selectAdminCheckEnabled,
  selectApdType
} from '../../../../redux/selectors/apd.selectors';
import CostAllocationRows, {
  CostSummaryRows
} from '../cost-allocation/CostAllocationRows';
import { t } from '../../../../i18n';

import {
  hitechCostAllocationSchema,
  mmisCostAllocationSchema,
  APD_TYPE,
  FUNDING_CATEGORY_TYPE
} from '@cms-eapd/common';

const AllFFYsSummaryNarrative = ({
  apdType,
  activityName,
  costAllocation,
  costSummary: { total },
  stateName
}) => {
  let lastSplit = '';
  let fundingSplitBits = [];

  Object.keys(costAllocation).forEach(ffy => {
    let split = `${costAllocation[ffy].ffp.federal}/${costAllocation[ffy].ffp.state}`;
    if (apdType === APD_TYPE.MMIS) {
      let matchRate = '';
      const fundingCategory = costAllocation[ffy].ffp.fundingCategory;
      if (fundingCategory === FUNDING_CATEGORY_TYPE.ddi) matchRate = ' DDI';
      if (fundingCategory === FUNDING_CATEGORY_TYPE.mando) matchRate = ' M&O';

      split += `${matchRate}`;
    }

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
  apdType: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  stateName: PropTypes.string.isRequired
};

const CostAllocateFFP = ({
  activityIndex,
  activityName,
  apdType,
  costAllocation,
  costSummary,
  otherFunding,
  activityId,
  isViewOnly,
  setFundingSplit,
  setFundingMatchRate,
  stateName,
  adminCheck,
  year
}) => {
  const schema =
    apdType === APD_TYPE.HITECH
      ? hitechCostAllocationSchema
      : mmisCostAllocationSchema;
  const methods = useForm({
    defaultValues: {
      ...costAllocation
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });
  const { clearErrors, trigger } = methods;

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFederalStateSplit = (year, federal, state) => {
    setFundingSplit(activityIndex, year, federal, state);
    if (adminCheck) {
      trigger();
    }
  };

  const setMatchRate = (year, federal, state, fundingCategory) => {
    setFundingMatchRate(activityIndex, year, federal, state, fundingCategory);
    if (adminCheck) {
      trigger();
    }
  };

  const { years } = costSummary;

  return (
    <FormProvider {...methods}>
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
              {apdType === APD_TYPE.HITECH && (
                <FedStateSelector
                  ffp={costAllocation[ffy].ffp}
                  ffy={ffy}
                  setFederalStateSplit={setFederalStateSplit}
                />
              )}
              {apdType === APD_TYPE.MMIS && (
                <MatchRateSelector
                  ffp={costAllocation[ffy].ffp}
                  ffy={ffy}
                  setMatchRate={setMatchRate}
                />
              )}
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

          {apdType === APD_TYPE.HITECH && (
            <div className="data-entry-box ds-u-margin-bottom--5">
              {!isViewOnly && (
                <Instruction
                  labelFor="ffp-quarterly-table"
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
                id="ffp-quarterly-table"
                activityIndex={activityIndex}
                activityId={activityId}
                isViewOnly={isViewOnly}
                year={ffy}
              />
            </div>
          )}
        </div>
      ))}

      <h3 className="subsection--title ds-h3">FFY {year} Totals</h3>
      <AllFFYsSummaryNarrative
        apdType={apdType}
        activityName={activityName}
        costAllocation={costAllocation}
        costSummary={costSummary}
        stateName={stateName}
      />
    </FormProvider>
  );
};

CostAllocateFFP.propTypes = {
  activityId: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  apdType: PropTypes.string,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  otherFunding: PropTypes.object.isRequired,
  isViewOnly: PropTypes.bool,
  setFundingSplit: PropTypes.func.isRequired,
  setFundingMatchRate: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
  apdType: PropTypes.string.isRequired,
  adminCheck: PropTypes.bool.isRequired,
  year: PropTypes.string.isRequired
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
    getState = getUserStateOrTerritory,
    getApdType = selectApdType,
    getActivityTotal = selectActivityTotalForBudgetByActivityIndex
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });
  const activityTotal = getActivityTotal(state, { activityIndex });

  return {
    activityId: activity.activityId,
    activityName: activity.name || 'Untitled',
    costAllocation: getCostAllocation(state, { activityIndex }),
    costSummary: getCostSummary(state, { activityIndex }),
    stateName: getState(state).name,
    apdType: getApdType(state),
    otherFunding: activityTotal.data.otherFunding,
    adminCheck: selectAdminCheckEnabled(state),
    year: getAPDYearRange(state)
  };
};

const mapDispatchToProps = {
  setFundingSplit: setCostAllocationFFPFundingSplit,
  setFundingMatchRate: setCostAllocationMatchRate
};

export default connect(mapStateToProps, mapDispatchToProps)(CostAllocateFFP);

export {
  CostAllocateFFP as plain,
  AllFFYsSummaryNarrative,
  mapStateToProps,
  mapDispatchToProps
};
