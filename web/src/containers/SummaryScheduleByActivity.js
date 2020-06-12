import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Instruction from '../components/Instruction';
import { selectBudgetActivitiesByFundingSource } from '../reducers/budget.selectors';
import SummaryActivityBreakdownTable from './SummaryActivityBreakdown';
import Dollars from '../components/Dollars';

const categoryLookup = {
  statePersonnel: 'State Staff Total',
  expenses: 'Other State Expenses Total',
  contractors: 'Private Contractor Total',
  combined: 'Total'
};

function DataRow({ data, title, groupTitle }) {
  return (
    <tr
      className={
        title === categoryLookup.combined
          ? 'budget-table--subtotal budget-table--row__highlight'
          : ''
      }
    >
      <td scope="row" className="title">
        {title === categoryLookup.combined ? `${groupTitle} ${title}` : title}
      </td>
      <td className="budget-table--number">
        <Dollars>{data.medicaid}</Dollars>
      </td>
    </tr>
  );
}

DataRow.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired
};

const DataRowGroup = ({ data, year, groupTitle }) => (
  <tbody>
    {Object.keys(data).map(key => (
      <DataRow
        key={key}
        category={key}
        data={data[key][year]}
        title={categoryLookup[key]}
        groupTitle={groupTitle}
        year={year}
      />
    ))}
  </tbody>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired
};

const TOTAL_MEDICAID_COST_DISPLAY =
  'proposedBudget.summaryScheduleByActivity.totalMedicaidCost';
const ACTIVITY_BREAKDOWN_DISPLAY =
  'proposedBudget.summaryScheduleByActivity.activityBreakdown';

const SummaryScheduleByActivity = ({ data, years, activities }) => {
  return years.map(ffy => {
    const combined = data.combined[ffy];
    return (
      <Fragment key={ffy}>
        <h4 className="ds-h4" aria-hidden="true">
          FFY {ffy}
        </h4>
        <Instruction source={TOTAL_MEDICAID_COST_DISPLAY} />

        <table className="budget-table">
          <thead>
            <tr className="budget-table--row__primary-header">
              <th scope="col">
                Combined Activity Costs FFY {ffy} (total Computable Medicaid
                Cost)
              </th>
              <th className="ds-u-text-align--right" scope="col">
                Total
              </th>
            </tr>
          </thead>
          <thead>
            <tr className="budget-table--row__header">
              <th scope="col" colSpan="2">
                HIT
              </th>
            </tr>
          </thead>
          <DataRowGroup data={data.hit} year={ffy} groupTitle="HIT" />
          <thead>
            <tr className="budget-table--row__header">
              <th scope="col" colSpan="2">
                HIE
              </th>
            </tr>
          </thead>
          <DataRowGroup data={data.hie} year={ffy} groupTitle="HIE" />
          <thead>
            <tr className="budget-table--row__header">
              <th scope="col" colSpan="2">
                MMIS
              </th>
            </tr>
          </thead>
          <DataRowGroup data={data.mmis} year={ffy} groupTitle="MMIS" />
          <thead>
            <tr key={ffy} className="budget-table--row__header">
              <th scope="row">FFY {ffy} total Computable Medicaid Cost</th>
              <td className="budget-table--number">
                <Dollars>{combined.medicaid}</Dollars>
              </td>
            </tr>
          </thead>
        </table>

        <h4 className="ds-h4" aria-hidden="true">
          Activity Breakdown
        </h4>

        <Instruction source={ACTIVITY_BREAKDOWN_DISPLAY} />
        {data.activityTotals.map((item, index) => {
          return (
            <Fragment key={index}>
              <SummaryActivityBreakdownTable
                ffy={ffy}
                activityIndex={index}
                otherFunding={item.data.otherFunding}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  });
};

SummaryScheduleByActivity.propTypes = {
  activities: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    activities: selectBudgetActivitiesByFundingSource(state),
    data: state.budget,
    years: state.apd.data.years
  };
};

export default connect(mapStateToProps)(SummaryScheduleByActivity);
