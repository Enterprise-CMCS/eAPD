import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { ACTIVITY_FUNDING_SOURCES } from '../util';
import { formatMoney } from '../util/formats';

const categoryLookup = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Subtotal'
};

class DataRow extends Component {
  state = { detailsOpen: false };

  toggleDetails = () => {
    this.setState(prev => ({ detailsOpen: !prev.detailsOpen }));
  };

  render() {
    const { category, data, entries, title } = this.props;
    const { detailsOpen } = this.state;

    const years = Object.keys(data);
    const hasData = data.total.total > 0;

    return (
      <Fragment>
        <tr>
          <td>
            {hasData && (
              <button
                type="button"
                className="right btn px-tiny py0"
                onClick={this.toggleDetails}
              >
                {detailsOpen ? '-' : '+'}
              </button>
            )}
            {title}
          </td>
          {years.map(yr => {
            const val = data[yr];
            return (
              <Fragment key={yr}>
                <td className="mono right-align">{formatMoney(val.total)}</td>
                <td className="mono right-align">{formatMoney(val.federal)}</td>
                <td className="mono right-align">{formatMoney(val.state)}</td>
              </Fragment>
            );
          })}
        </tr>
        {hasData &&
          detailsOpen && (
            <tr>
              <td colSpan={years.length * 3 + 1}>
                <div className="py2">
                  {entries.map(e => (
                    <div key={e.id} className="mono h6">
                      Activity #{e.id}: {JSON.stringify(e.data[category])}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          )}
      </Fragment>
    );
  }
}

DataRow.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const DataRowGroup = ({ data, entries }) => (
  <Fragment>
    {Object.keys(data).map(key => (
      <DataRow
        key={key}
        category={key}
        data={data[key]}
        entries={entries}
        title={categoryLookup[key]}
      />
    ))}
  </Fragment>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired
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

const BudgetSummary = ({ activities, data, years }) => (
  <div className="overflow-auto">
    <table className="table-cms table-fixed" style={{ minWidth: 1000 }}>
      <thead>
        <tr>
          <th style={{ width: 180 }} />
          {years.map(yr => (
            <th key={yr} className="center" colSpan="3">
              FFY {yr}
            </th>
          ))}
          <th className="center" colSpan="3">
            Total
          </th>
        </tr>
        <tr>
          <th />
          {[...Array(years.length + 1)].map((_, i) => (
            <Fragment key={i}>
              <th className="col-4 right-align">Total</th>
              <th className="col-4 right-align">Federal</th>
              <th className="col-4 right-align">State</th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="bg-blue-light">
        <HeaderRow
          title="HIT activities"
          numberCells={(years.length + 1) * 3}
        />
        <DataRowGroup data={data.hit} entries={activities.hit} />
      </tbody>
      <tbody className="bg-yellow-light">
        <HeaderRow
          title="HIE activities"
          numberCells={(years.length + 1) * 3}
        />
        <DataRowGroup data={data.hie} entries={activities.hie} />
      </tbody>
      <tbody className="bg-green-light">
        <HeaderRow
          title="MMIS activities"
          numberCells={(years.length + 1) * 3}
        />
        <DataRowGroup data={data.mmis} entries={activities.mmis} />
      </tbody>
      <tbody>
        <tr className="bold">
          <td>Project total</td>
          {Object.keys(data.combined).map(ffy => {
            const combined = data.combined[ffy];
            return (
              <Fragment key={ffy}>
                <td className="mono right-align">
                  {formatMoney(combined.total)}
                </td>
                <td className="mono right-align">
                  {formatMoney(combined.federal)}
                </td>
                <td className="mono right-align">
                  {formatMoney(combined.state)}
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

const mapStateToProps = ({ apd, budget }) => {
  const { activityTotals: aTots } = budget;
  const activities = ACTIVITY_FUNDING_SOURCES.reduce(
    (o, source) => ({
      ...o,
      [source.toLowerCase()]: aTots.filter(a => a.fundingSource === source)
    }),
    {}
  );

  return {
    activities,
    data: budget,
    years: apd.data.years
  };
};

export default connect(mapStateToProps)(BudgetSummary);
