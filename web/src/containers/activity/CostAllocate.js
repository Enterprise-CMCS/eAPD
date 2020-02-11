import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import CostAllocateFFP from './CostAllocateFFP';
import {
  setCostAllocationMethodology,
  setCostAllocationOtherFunding
} from '../../actions/editActivity';
import Instruction from '../../components/Instruction';
import RichText from '../../components/RichText';
import { Subsection } from '../../components/Section';
import {
  selectActivityByIndex,
  selectActivityCostSummary
} from '../../reducers/activities.selectors';
import Dollars from '../../components/Dollars';
import DollarField from '../../components/DollarField';

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

const CostAllocate = ({
  activity,
  activityIndex,
  costSummary,
  setMethodology,
  setOtherFunding
}) => {
  const {
    costAllocationNarrative: { methodology, otherSources }
  } = activity;
  const syncMethodology = html => setMethodology(activityIndex, html);
  const syncOtherFunding = html => setOtherFunding(activityIndex, html);

  const stateStaffExpanded = {};
  const otherExpensesExpanded = {};
  const contractorExpanded = {};
  Object.keys(costSummary).forEach(ffy => {
    const [staffValue, staffSet] = useState(false);
    stateStaffExpanded[ffy] = { value: staffValue, set: staffSet };

    const [otherValue, otherSet] = useState(false);
    otherExpensesExpanded[ffy] = { value: otherValue, set: otherSet };

    const [contractorValue, contractorSet] = useState(false);
    contractorExpanded[ffy] = { value: contractorValue, set: contractorSet };
  });

  return (
    <Subsection
      resource="activities.costAllocate"
      id={`activity-cost-allocation-${activityIndex}`}
    >
      <div className="data-entry-box">
        <Instruction
          source="activities.costAllocate.methodology.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={methodology}
          onSync={syncMethodology}
          editorClassName="rte-textarea-l"
        />
      </div>
      <div className="data-entry-box">
        <Instruction
          source="activities.costAllocate.otherFunding.instruction"
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
      <div className="data-entry-box">
        <h6 className="ds-h5">Other funding amount</h6>
        <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
          <DollarField
            className="ds-u-padding-y--2"
            label={`FFY ${'2020'}`}
            value="35"
          />
          <DollarField
            className="ds-u-padding-y--2"
            label={`FFY ${'2021'}`}
            value="55"
          />
        </div>
      </div>
      <hr />
      {true && (
        <CostAllocateFFP aKey={activity.key} activityIndex={activityIndex} />
      )}
      <h5 className="ds-h2">
        FFY {Object.keys(costSummary)[0]}-{Object.keys(costSummary).pop()}{' '}
        Totals
      </h5>
      <p>
        The total cost of the <strong>{activity.name}</strong> activity is{' '}
        <strong>
          <Dollars long>50000032</Dollars>
        </strong>
        . Because of other funding of{' '}
        <strong>
          <Dollars long>23423</Dollars>
        </strong>
        , the total cost to Medicaid is{' '}
        <strong>
          <Dollars long>234235236</Dollars>
        </strong>
        . This activity is using a <strong>90/10</strong> funding split,
        resulting in a federal share of{' '}
        <strong>
          <Dollars long>234234234</Dollars>
        </strong>{' '}
        and a STATE_NAME share of{' '}
        <strong>
          <Dollars long>73734</Dollars>
        </strong>
        .
      </p>
      {Object.keys(costSummary).map(ffy => (
        <Fragment key={ffy}>
          <h5 className="ds-h2">FFY {ffy}</h5>
          <table className="budget-table">
            <tbody>
              <tr>
                <th colSpan="7" style={{ backgroundColor: '#d6d7d9' }}>
                  State Staff
                </th>
              </tr>
              {stateStaffExpanded[ffy].value && (
                <Fragment>
                  <CostSummaryRows items={costSummary[ffy].keyPersonnel} />
                  <CostSummaryRows items={costSummary[ffy].statePersonnel} />
                </Fragment>
              )}
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      stateStaffExpanded[ffy].set(
                        !stateStaffExpanded[ffy].value
                      )
                    }
                  >
                    {stateStaffExpanded[ffy].value ? '-' : '+'}
                  </button>
                </td>
                <td>State Staff Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>5</Dollars>
                </td>
              </tr>
              <tr>
                <th colSpan="7" style={{ backgroundColor: '#d6d7d9' }}>
                  Other State Expenses
                </th>
              </tr>
              {otherExpensesExpanded[ffy].value && (
                <CostSummaryRows items={costSummary[ffy].nonPersonnel} />
              )}
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      otherExpensesExpanded[ffy].set(
                        !otherExpensesExpanded[ffy].value
                      )
                    }
                  >
                    {otherExpensesExpanded[ffy].value ? '-' : '+'}
                  </button>
                </td>
                <td>Other State Expenses Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>5</Dollars>
                </td>
              </tr>
              <tr>
                <th colSpan="7" style={{ backgroundColor: '#d6d7d9' }}>
                  Private Contractor
                </th>
              </tr>
              {contractorExpanded[ffy].value && (
                <CostSummaryRows items={costSummary[ffy].contractorResources} />
              )}
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      contractorExpanded[ffy].set(
                        !contractorExpanded[ffy].value
                      )
                    }
                  >
                    {contractorExpanded[ffy].value ? '-' : '+'}
                  </button>
                </td>
                <td>Private Contractor Subtotal</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>5</Dollars>
                </td>
              </tr>
              <tr className="budget-table--subtotal">
                <td colSpan="6">Activity Total Cost</td>
                <td className="budget-table--number">
                  <Dollars long>{costSummary[ffy].totalCost}</Dollars>
                </td>
              </tr>
              <tr>
                <td />
                <td>Other Funding</td>
                <td colSpan="3" />
                <td>-</td>
                <td className="budget-table--number">
                  <Dollars long>{costSummary[ffy].otherFunding}</Dollars>
                </td>
              </tr>
              <tr className="budget-table--subtotal budget-table--row__highlight">
                <td />
                <td>Medicaid Share</td>
                <td colSpan="4" />
                <td className="budget-table--number">
                  <Dollars long>{costSummary[ffy].medicaidShare}</Dollars>
                </td>
              </tr>
              <CostSummaryRows
                items={[
                  {
                    description: 'Federal Share',
                    totalCost: costSummary[ffy].federalShare,
                    unitCost: costSummary[ffy].medicaidShare,
                    units: '90%'
                  },
                  {
                    description: 'State Share',
                    totalCost: costSummary[ffy].stateShare,
                    unitCost: costSummary[ffy].medicaidShare,
                    units: '10%'
                  }
                ]}
              />
            </tbody>
          </table>
        </Fragment>
      ))}
    </Subsection>
  );
};

CostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  costSummary: PropTypes.array.isRequired,
  setMethodology: PropTypes.func.isRequired,
  setOtherFunding: PropTypes.func.isRequired
};

export const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex }),
  costSummary: selectActivityCostSummary(state, { activityIndex })
});

export const mapDispatchToProps = {
  setMethodology: setCostAllocationMethodology,
  setOtherFunding: setCostAllocationOtherFunding
};

export { CostAllocate as CostAllocateRaw };
export default connect(mapStateToProps, mapDispatchToProps)(CostAllocate);
