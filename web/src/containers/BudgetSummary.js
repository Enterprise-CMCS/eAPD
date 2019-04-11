import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { selectBudgetActivitiesByFundingSource } from '../reducers/budget.selectors';

const categoryLookup = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Subtotal'
};

const formatActivityName = a => `Activity ${a.name ? a.name : `#${a.id}`}`;
const formatYear = yr => (yr === 'total' ? 'All Years' : `${yr} Total`);

class DataRow extends Component {

  render() {
    const { category, data, entries, title, year } = this.props;
    const val = data[year];

    return (
      <Fragment>
        <tr>
          <td headers="summary-budget-null1 summary-budget-null2">
            {title}
          </td>
            <Fragment key={year}>
              <td
                className="mono right-align"
                headers={`summary-budget-fy-${year} summary-budget-fy-${year}-total`}
              >
                <Dollars>{val.medicaid}</Dollars>
              </td>
              <td
                className="mono right-align"
                headers={`summary-budget-fy-${year} summary-budget-fy-${year}-federal`}
              >
                <Dollars>{val.federal}</Dollars>
              </td>
              <td
                className="mono right-align"
                headers={`summary-budget-fy-${year} summary-budget-fy-${year}-state`}
              >
                <Dollars>{val.state}</Dollars>
              </td>
            </Fragment>
        </tr>
      </Fragment>
    );
  }
}

DataRow.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

const DataRowGroup = ({ data, entries, year }) => (
  <Fragment>
    {Object.keys(data).map(key => (
      <DataRow
        key={key}
        category={key}
        data={data[key]}
        entries={entries}
        title={categoryLookup[key]}
        year={year}
      />
    ))}
  </Fragment>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired
};

const BudgetSummary = ({ activities, data, years }) => (
  <div className="overflow-x">
    <h3 className="ds-h3">HIT activities</h3>
    {[...years, 'total'].map(yr => (
    <table className="table-cms">
      <thead>
        <tr>
          <Fragment key={yr}>
            <th
              key={yr}
              className="center"
              colSpan="3"
              id={`summary-budget-fy-${yr}`}
            >
              FFY {yr}
            </th>

            <th className="right-align" id={`summary-budget-fy-${yr}-total`}>
              Medicaid total
            </th>
            <th className="right-align" id={`summary-budget-fy-${yr}-federal`}>
              Federal
            </th>
            <th className="right-align" id={`summary-budget-fy-${yr}-state`}>
              State
            </th>
          </Fragment>
        </tr>
      </thead>
      <tbody>
        <DataRowGroup data={data.hit} entries={activities.hit} year={yr} />
      </tbody>
    </table>
    ))}

    <h3 className="ds-h3">HIE activities</h3>
    <table className="table-cms">
      <thead>
        <tr>
          <th id="summary-budget-null1" />
          {[...years, 'total'].map(yr => (
            <th
              key={yr}
              className="center"
              colSpan="3"
              id={`summary-budget-fy-${yr}`}
            >
              FFY {yr}
            </th>
          ))}
        </tr>
        <tr>
          <th id="summary-budget-null2" />
          {[...years, 'total'].map(y => (
            <Fragment key={y}>
              <th className="right-align" id={`summary-budget-fy-${y}-total`}>
                Medicaid total
              </th>
              <th className="right-align" id={`summary-budget-fy-${y}-federal`}>
                Federal
              </th>
              <th className="right-align" id={`summary-budget-fy-${y}-state`}>
                State
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        <DataRowGroup data={data.hie} entries={activities.hie} />
      </tbody>
    </table>

    <h3 className="ds-h3">MMIS activities</h3>
    <table className="table-cms">
      <thead>
        <tr>
          <th id="summary-budget-null1" />
          {[...years, 'total'].map(yr => (
            <th
              key={yr}
              className="center"
              colSpan="3"
              id={`summary-budget-fy-${yr}`}
            >
              FFY {yr}
            </th>
          ))}
        </tr>
        <tr>
          <th id="summary-budget-null2" />
          {[...years, 'total'].map(y => (
            <Fragment key={y}>
              <th className="right-align" id={`summary-budget-fy-${y}-total`}>
                Medicaid total
              </th>
              <th className="right-align" id={`summary-budget-fy-${y}-federal`}>
                Federal
              </th>
              <th className="right-align" id={`summary-budget-fy-${y}-state`}>
                State
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        <DataRowGroup data={data.mmis} entries={activities.mmis} />
      </tbody>
    </table>

    <h3 className="ds-h3">Project totals</h3>
    <table className="table-cms">
      <tbody>
        <tr className="bold">
          <td headers="summary-budget-null1 summary-budget-null2">
            Project total
          </td>
          {Object.keys(data.combined).map(ffy => {
            const combined = data.combined[ffy];
            return (
              <Fragment key={ffy}>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${ffy} summary-budget-fy-${ffy}-total`}
                >
                  <Dollars>{combined.medicaid}</Dollars>
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${ffy} summary-budget-fy-${ffy}-federal`}
                >
                  <Dollars>{combined.federal}</Dollars>
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${ffy} summary-budget-fy-${ffy}-state`}
                >
                  <Dollars>{combined.state}</Dollars>
                </td>
              </Fragment>
            );
          })}
        </tr>
      </tbody>
    </table>
  </div>
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
  DataRowGroup
};
