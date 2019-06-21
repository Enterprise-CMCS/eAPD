import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { selectBudgetActivitiesByFundingSource } from '../reducers/budget.selectors';

const categoryLookup = {
  statePersonnel: 'Project State Staff',
  expenses: 'Non-Personnel',
  contractors: 'Contracted Resources',
  combined: 'Subtotal'
};

function DataRow({ data, title, year }) {
  return (
    <tr>
      <th headers="summary-budget-null1 summary-budget-null2">{title}</th>
      <td
        className="font-family--mono right-align"
        headers={`summary-budget-fy-${year} summary-budget-fy-${year}-total`}
      >
        <Dollars>{data.medicaid}</Dollars>
      </td>
      <td
        className="font-family--mono right-align"
        headers={`summary-budget-fy-${year} summary-budget-fy-${year}-federal`}
      >
        <Dollars>{data.federal}</Dollars>
      </td>
      <td
        className="font-family--mono right-align"
        headers={`summary-budget-fy-${year} summary-budget-fy-${year}-state`}
      >
        <Dollars>{data.state}</Dollars>
      </td>
    </tr>
  );
}

DataRow.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired
};

const DataRowGroup = ({ data, entries, year }) => (
  <Fragment>
    {Object.keys(data).map(key => (
      <DataRow
        key={key}
        category={key}
        data={data[key][year]}
        entries={entries}
        title={categoryLookup[key]}
        year={year}
      />
    ))}
  </Fragment>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired
};

const HeaderRow = ({ yr }) => {
  return (
    <tr>
      <th
        key={yr}
        className="ds-u-font-weight--bold"
        id={`summary-budget-fy-${yr}`}
      >
        FFY {yr}
      </th>
      <th
        className="ds-u-text-align--center"
        id={`summary-budget-fy-${yr}-total`}
      >
        Medicaid Total
      </th>
      <th
        className="ds-u-text-align--center"
        id={`summary-budget-fy-${yr}-federal`}
      >
        Federal Total
      </th>
      <th
        className="ds-u-text-align--center"
        id={`summary-budget-fy-${yr}-state`}
      >
        State Total
      </th>
    </tr>
  );
};

HeaderRow.propTypes = {
  yr: PropTypes.string.isRequired
};

const BudgetSummary = ({ activities, data, years }) => (
  <Fragment>
    <h3 className="ds-h3">HIT Activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="table-cms" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.hit} entries={activities.hit} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">HIE Activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="table-cms" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.hie} entries={activities.hie} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">MMIS Activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="table-cms" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.mmis} entries={activities.mmis} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">Project Activities Totals</h3>
    <table className="table-cms">
      <thead>
        <tr>
          <th id="summary-budget-null1" />
          <th
            className="ds-u-text-align--center"
            id="summary-budget-total-medicaid"
          >
            Medicaid Total
          </th>
          <th
            className="ds-u-text-align--center"
            id="summary-budget-total-federal"
          >
            Federal Total
          </th>
          <th
            className="ds-u-text-align--center"
            id="summary-budget-total-state"
          >
            State Total
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.combined).map(ffy => {
          const combined = data.combined[ffy];
          return (
            <tr key={ffy}>
              <th headers="summary-budget-null1">FFY {ffy}</th>
              <td
                className="font-family--mono right-align"
                headers="summary-budget-total-medicaid"
              >
                <Dollars>{combined.medicaid}</Dollars>
              </td>
              <td
                className="font-family--mono right-align"
                headers="summary-budget-total-federal"
              >
                <Dollars>{combined.federal}</Dollars>
              </td>
              <td
                className="font-family--mono right-align"
                headers="summary-budget-total-state"
              >
                <Dollars>{combined.state}</Dollars>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Fragment>
);

BudgetSummary.propTypes = {
  activities: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: selectBudgetActivitiesByFundingSource(state),
  data: state.budget,
  years: state.apd.data.years
});

export default connect(mapStateToProps)(BudgetSummary);

export {
  BudgetSummary as plain,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  HeaderRow
};
