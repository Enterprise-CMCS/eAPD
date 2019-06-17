import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { selectBudgetActivitiesByFundingSource } from '../reducers/budget.selectors';

const categoryLookup = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Subtotal'
};

function DataRow({ data, title, year }) {
  return (
    <tr>
      <th scope="row">{title}</th>
      <td
        className="budget-table--number"
      >
        <Dollars>{data.medicaid}</Dollars>
      </td>
      <td
        className="budget-table--number"
      >
        <Dollars>{data.federal}</Dollars>
      </td>
      <td
        className="budget-table--number"
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
        id={`summary-budget-fy-${yr}`}
      >
        FFY {yr}
      </th>
      <th
        className="ds-u-text-align--right"
        scope="col"
      >
        Medicaid total
      </th>
      <th
        className="ds-u-text-align--right"
        scope="col"
      >
        Federal total
      </th>
      <th
        className="ds-u-text-align--right"
        scope="col"
      >
        State total
      </th>
    </tr>
  );
};

HeaderRow.propTypes = {
  yr: PropTypes.string.isRequired
};

const BudgetSummary = ({ activities, data, years }) => (
  <Fragment>
    <h3 className="ds-h3">HIT activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="budget-table" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.hit} entries={activities.hit} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">HIE activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="budget-table" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.hie} entries={activities.hie} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">MMIS activities</h3>
    {[...years, 'total'].map(yr => (
      <table className="budget-table" key={yr}>
        <thead>
          <HeaderRow yr={yr} />
        </thead>
        <tbody>
          <DataRowGroup data={data.mmis} entries={activities.mmis} year={yr} />
        </tbody>
      </table>
    ))}

    <h3 className="ds-h3">Project activities totals</h3>
    <table className="budget-table">
      <thead>
        <tr>
          <th id="summary-budget-null1" />
          <th
            scope="col"
            className="ds-u-text-align--right"
          >
            Medicaid total
          </th>
          <th
            scope="col"
            className="ds-u-text-align--right"
          >
            Federal total
          </th>
          <th
            scope="col"
            className="ds-u-text-align--right"
          >
            State total
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.combined).map(ffy => {
          const combined = data.combined[ffy];
          return (
            <tr key={ffy}>
              <th scope="row">FFY {ffy}</th>
              <td className="budget-table--number">
                <Dollars>{combined.medicaid}</Dollars>
              </td>
              <td className="budget-table--number">
                <Dollars>{combined.federal}</Dollars>
              </td>
              <td className="budget-table--number">
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
