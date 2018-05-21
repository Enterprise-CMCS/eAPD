import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { formatMoney } from '../util/formats';

const fakeData = {
  hit: {
    stateStaff: {
      '2018': 1000,
      '2019': 1200
    },
    nonPersonnel: {
      '2018': 1000,
      '2019': 1200
    },
    contractors: {
      '2018': 1000,
      '2019': 1200
    }
  },
  hie: {
    stateStaff: {
      '2018': 5000,
      '2019': 6000
    },
    nonPersonnel: {
      '2018': 4000,
      '2019': 4000
    },
    contractors: {
      '2018': 10000,
      '2019': 12000
    }
  },
  mmis: {
    stateStaff: {
      '2018': 2000,
      '2019': 3000
    },
    nonPersonnel: {
      '2018': 500,
      '2019': 500
    },
    contractors: {
      '2018': 0,
      '2019': 0
    }
  }
};

const categoryLookup = {
  stateStaff: 'Project state staff',
  nonPersonnel: 'Non-personnel',
  contractors: 'Contracted resources',
  totals: 'Subtotal'
};

const add = (a, b) => a + b;

const toObj = (arr, initVal = 0) =>
  Object.assign({}, ...arr.map(a => ({ [a]: initVal })));

// TODO: this is gross, but it will all be deleted soon
// (just a PoC for data-driven component)
const enrichData = data => {
  let dataNew = JSON.parse(JSON.stringify(data)); // (hacky) deep copy of data

  const cats = ['hit', 'hie', 'mmis'];
  const subCats = ['stateStaff', 'nonPersonnel', 'contractors'];
  const yearFields = ['2018', '2019', 'total'];
  const allTotals = toObj(yearFields);

  /* eslint-disable no-restricted-syntax */
  for (const cat of cats) {
    const catTotals = toObj(yearFields);
    for (const subCat of subCats) {
      // cross-year total
      const byYear = dataNew[cat][subCat];
      const total = Object.values(byYear).reduce(add, 0);
      dataNew[cat][subCat] = { ...byYear, total };

      // cross-category totals
      const byYearEntries = Object.entries(dataNew[cat][subCat]);
      for (const [year, value] of byYearEntries) {
        allTotals[year] += value;
        catTotals[year] += value;
      }
    }

    dataNew[cat] = { ...dataNew[cat], totals: catTotals };
  }

  dataNew = { ...dataNew, totals: allTotals };

  return dataNew;
};

const enrichedFakedData = enrichData(fakeData);

const DataRowDetails = ({ colSpan, isVisible }) => (
  <tr className={`bg-white ${!isVisible ? 'display-none' : ''}`}>
    <td colSpan={colSpan}>
      <div className="p1">
        <p className="bold">
          Details will go here! Could be words or another table:
        </p>
        <table className="table-bordered col-6">
          <tbody>
            <tr>
              <td>abc</td>
              <td>123</td>
            </tr>
            <tr>
              <td>def</td>
              <td>456</td>
            </tr>
          </tbody>
        </table>
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

const HeaderRow = ({ title }) => (
  <tr>
    <td className="bold">{title}</td>
    {[...Array(9)].map((_, i) => <td key={i} />)}
  </tr>
);

HeaderRow.propTypes = {
  title: PropTypes.string.isRequired
};

const BudgetSummary = () => {
  const { hit, hie, mmis, totals } = enrichedFakedData;

  return (
    <div className="py1 overflow-auto">
      <table
        className="h6 table-fixed table-bordered table-budget table-budget-summary"
        style={{ minWidth: 1000 }}
      >
        <thead>
          <tr>
            <th style={{ width: 200 }} />
            <th className="bg-black white center" colSpan="3">
              FFY 2018
            </th>
            <th className="bg-black white center" colSpan="3">
              FFY 2019
            </th>
            <th className="bg-black white center" colSpan="3">
              Total
            </th>
          </tr>
          <tr>
            <th />
            {[...Array(3)].map((_, i) => (
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
          <DataRowGroup data={hit} />
        </tbody>
        <tbody className="bg-light-yellow">
          <HeaderRow title="HIE activities" />
          <DataRowGroup data={hie} />
        </tbody>
        <tbody className="bg-light-green">
          <HeaderRow title="MMIS activities" />
          <DataRowGroup data={mmis} />
        </tbody>
        <tbody>
          <tr className="bold">
            <td>Project total</td>
            {Object.keys(totals).map(yr => {
              const val = totals[yr];
              return (
                <Fragment key={yr}>
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
};

export default BudgetSummary;
