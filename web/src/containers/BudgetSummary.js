import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getActivitiesCategoryTotals } from '../reducers/activities';
import { ACTIVITY_FUNDING_SOURCES, YEAR_OPTIONS } from '../util';
import { formatMoney } from '../util/formats';

const categoryLookup = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Subtotal'
};

const DataRowDetails = ({ colSpan, isVisible }) => (
  <tr className={`bg-white ${!isVisible ? 'display-none' : ''}`}>
    <td colSpan={colSpan}>
      <div className="py2">
        <div className="p2 h5 sm-col-6 alert">
          Details will go here! Could be words, numbers, tables, anything!
        </div>
      </div>
    </td>
  </tr>
);

DataRowDetails.propTypes = {
  colSpan: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

class DataRow extends Component {
  state = { detailsOpen: false };

  toggleDetails = () => {
    this.setState(prev => ({ detailsOpen: !prev.detailsOpen }));
  };

  render() {
    const { data, title } = this.props;
    const { detailsOpen } = this.state;
    const years = Object.keys(data);

    return (
      <Fragment>
        <tr>
          <td>
            <button
              type="button"
              className="right btn px-tiny py0"
              onClick={this.toggleDetails}
            >
              {detailsOpen ? '-' : '+'}
            </button>
            {title}
          </td>
          {years.map(yr => {
            const val = data[yr];
            return (
              <Fragment key={yr}>
                <td className="mono right-align">{formatMoney(val)}</td>
                <td className="mono right-align">{formatMoney(val * 0.9)}</td>
                <td className="mono right-align">{formatMoney(val * 0.1)}</td>
              </Fragment>
            );
          })}
        </tr>
        <DataRowDetails
          colSpan={years.length * 3 + 1}
          isVisible={detailsOpen}
        />
      </Fragment>
    );
  }
}

DataRow.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const DataRowGroup = ({ data }) => (
  <Fragment>
    {Object.keys(data).map(key => (
      <DataRow key={key} data={data[key]} title={categoryLookup[key]} />
    ))}
  </Fragment>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired
};

const HeaderRow = ({ title, numberCells }) => (
  <tr>
    <td className="bold">{title}</td>
    {[...Array(numberCells)].map((_, i) => <td key={i} />)}
  </tr>
);

HeaderRow.propTypes = {
  title: PropTypes.string.isRequired,
  numberCells: PropTypes.number
};

HeaderRow.defaultProps = {
  numberCells: 12
};

const BudgetSummary = ({ data }) => (
  <div className="py1 overflow-auto">
    <table
      className="h6 table-fixed table-bordered table-budget table-budget-summary"
      style={{ minWidth: 1000 }}
    >
      <thead>
        <tr>
          <th style={{ width: 200 }} />
          {YEAR_OPTIONS.map(yr => (
            <th key={yr} className="bg-black white center" colSpan="3">
              FFY {yr}
            </th>
          ))}
          <th className="bg-black white center" colSpan="3">
            Total
          </th>
        </tr>
        <tr>
          <th />
          {[...Array(YEAR_OPTIONS.length + 1)].map((_, i) => (
            <Fragment key={i}>
              <th className="col-4">Total</th>
              <th className="col-4">Federal share</th>
              <th className="col-4">State share</th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="bg-light-blue">
        <HeaderRow title="HIT activities" />
        <DataRowGroup data={data.HIT} />
      </tbody>
      <tbody className="bg-light-yellow">
        <HeaderRow title="HIE activities" />
        <DataRowGroup data={data.HIE} />
      </tbody>
      <tbody className="bg-light-green">
        <HeaderRow title="MMIS activities" />
        <DataRowGroup data={data.MMIS} />
      </tbody>
      <tbody>
        <tr className="bold">
          <td>Project total</td>
          {Object.keys(data.combined).map(key => {
            const val = data.combined[key];
            return (
              <Fragment key={key}>
                <td className="mono right-align">{formatMoney(val)}</td>
                <td className="mono right-align">{formatMoney(val * 0.9)}</td>
                <td className="mono right-align">{formatMoney(val * 0.1)}</td>
              </Fragment>
            );
          })}
        </tr>
      </tbody>
    </table>
  </div>
);

BudgetSummary.propTypes = {
  data: PropTypes.object.isRequired
};

// merge and aggregate an array of objects
// i.e., [{ a: 1, b: 2 }, { a: 3, b: 4 }] => { a: 4, b: 6 }
const aggregateObjectArrays = data =>
  data.reduce((obj, datum) => {
    Object.keys(datum).forEach(key => {
      obj[key] = (obj[key] || 0) + datum[key]; // eslint-disable-line no-param-reassign
    });
    return obj;
  }, {});

const getDataByActivityType = activities =>
  ACTIVITY_FUNDING_SOURCES.reduce((obj, id) => {
    // filter by funding source
    const filtered = activities.filter(a => a.fundingSource === id);

    // roll up amounts by category across activities
    const byCat = getActivitiesCategoryTotals(filtered);

    // aggregate across activity categories
    const byYear = {
      ...byCat,
      combined: aggregateObjectArrays(Object.values(byCat))
    };

    // add totals across years (by category)
    const dataAll = Object.entries(byYear).reduce((obj2, [cat, yearly]) => {
      const allYears = Object.values(yearly).reduce((a, b) => a + b, 0);
      obj2[cat] = { ...yearly, allYears }; // eslint-disable-line no-param-reassign
      return obj2;
    }, {});

    obj[id] = dataAll; // eslint-disable-line no-param-reassign
    return obj;
  }, {});

const mapStateToProps = ({ activities }) => {
  const { allIds, byId } = activities;

  const activityData = allIds.map(id => byId[id]);
  const dataByActivityType = getDataByActivityType(activityData);
  const combinedAcrossType = aggregateObjectArrays(
    Object.values(dataByActivityType).map(d => d.combined)
  );

  const data = {
    ...dataByActivityType,
    combined: combinedAcrossType
  };

  return { data };
};

export default connect(mapStateToProps)(BudgetSummary);
