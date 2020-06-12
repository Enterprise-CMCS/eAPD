import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Instruction from '../components/Instruction';
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
      <th scope="row" className="title indent-title">
        {title === categoryLookup.combined ? `${groupTitle} ${title}` : title}
      </th>
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

const SummaryScheduleByActivityTotals = ({ data, ffy }) => {
  return (
    <table className="budget-table">
      <caption className="ds-u-visibility--screen-reader">
        Combined Activity Costs FFY {ffy} (total Computable Medicaid Cost)
      </caption>
      <thead>
        <tr className="budget-table--row__primary-header">
          <th scope="col">
            Combined Activity Costs FFY {ffy} (total Computable Medicaid Cost)
          </th>
          <th scope="col" className="ds-u-text-align--right">
            Total
          </th>
        </tr>
      </thead>
      <thead>
        <tr className="budget-table--row__header">
          <th scope="row" colSpan="2">
            HIT
          </th>
        </tr>
      </thead>
      <DataRowGroup data={data.hit} year={ffy} groupTitle="HIT" />
      <thead>
        <tr className="budget-table--row__header">
          <th scope="row" colSpan="2">
            HIE
          </th>
        </tr>
      </thead>
      <DataRowGroup data={data.hie} year={ffy} groupTitle="HIE" />
      <thead>
        <tr className="budget-table--row__header">
          <th scope="row" colSpan="2">
            MMIS
          </th>
        </tr>
      </thead>
      <DataRowGroup data={data.mmis} year={ffy} groupTitle="MMIS" />
      <thead>
        <tr key={ffy} className="budget-table--row__header">
          <th scope="row">FFY {ffy} total Computable Medicaid Cost</th>
          <td className="budget-table--number">
            <Dollars>{data.combined[ffy].medicaid}</Dollars>
          </td>
        </tr>
      </thead>
    </table>
  );
};

SummaryScheduleByActivityTotals.propTypes = {
  data: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired
};

const SummaryScheduleByActivityBreakdown = ({ data, ffy }) => {
  return data.activityTotals.map((item, index) => (
    <SummaryActivityBreakdownTable
      ffy={ffy}
      activityIndex={index}
      otherFunding={item.data.otherFunding}
    />
  ));
};

SummaryScheduleByActivityBreakdown.propTypes = {
  data: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired
};

const SummaryScheduleByActivity = ({ data, years, exportView }) => {
  return years.map(ffy => (
    <Fragment key={ffy}>
      <h4 className="ds-h4" aria-hidden="true">
        FFY {ffy}
      </h4>
      {!exportView && (
        <Instruction source="proposedBudget.summaryScheduleByActivity.totalMedicaidCost" />
      )}
      <SummaryScheduleByActivityTotals data={data} ffy={ffy} />

      <h4 className="ds-h4" aria-hidden="true">
        Activity Breakdown
      </h4>
      {!exportView && (
        <Instruction source="proposedBudget.summaryScheduleByActivity.activityBreakdown" />
      )}
      <SummaryScheduleByActivityBreakdown data={data} ffy={ffy} />
    </Fragment>
  ));
};

SummaryScheduleByActivity.propTypes = {
  data: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  exportView: PropTypes.bool
};

SummaryScheduleByActivity.defaultProps = {
  exportView: false
};

const mapStateToProps = state => {
  return {
    data: state.budget,
    years: state.apd.data.years
  };
};

export default connect(mapStateToProps)(SummaryScheduleByActivity);
