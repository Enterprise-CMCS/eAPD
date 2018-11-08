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

const formatActivityName = a => `Activity ${a.name ? a.name : `#${a.id}`}`;
const formatYear = yr => (yr === 'total' ? 'All Years' : `${yr} Total`);

const DataRowDetails = ({ category, entries, years }) => (
  <tr>
    <td colSpan={years.length * 3 + 1}>
      <div className="py2">
        {entries.map(e => (
          <div key={e.id} className="mono h6">
            <span className="bold">{formatActivityName(e)}:</span>{' '}
            {years.map(yr => (
              <span key={yr} className="mr2">
                {formatYear(yr)}: {formatMoney(e.data[category][yr])}
              </span>
            ))}
          </div>
        ))}
      </div>
    </td>
  </tr>
);

DataRowDetails.propTypes = {
  category: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired
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
          <td headers="summary-budget-null1 summary-budget-null2">
            {hasData && (
              <button
                type="button"
                className="btn right px-tiny py0"
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
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-total`}
                >
                  {formatMoney(val.total)}
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-federal`}
                >
                  {formatMoney(val.federal)}
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-state`}
                >
                  {formatMoney(val.state)}
                </td>
              </Fragment>
            );
          })}
        </tr>
        {hasData &&
          detailsOpen && (
            <DataRowDetails
              category={category}
              entries={entries}
              years={years}
            />
          )}
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

const FrozenDataCol = ({ data }) => (
  <Fragment>
    {Object.keys(data).map(key => (
      <tr>
        <td key={key}>
          {categoryLookup[key]}
        </td>
      </tr>
    ))}
  </Fragment>
);

FrozenDataCol.propTypes = {
  data: PropTypes.object.isRequired
};


const HeaderRow = ({ title, years }) => (
  <tr>
    <td className="bold" headers="summary-budget-null1 summary-budget-null2">
      {title}
    </td>
    {[...years, 'total'].map(yr => (
      <Fragment key={yr}>
        <td headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-total`} />
        <td
          headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-federal`}
        />
        <td headers={`summary-budget-fy-${yr} summary-budget-fy-${yr}-state`} />
      </Fragment>
    ))}
  </tr>
);

HeaderRow.propTypes = {
  title: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired
};

const FrozenHeaderCol = ({title}) => (
  <tr>
      <td className="bold">
        {title}
      </td>
  </tr>
);

FrozenHeaderCol.propTypes = {
  title: PropTypes.string.isRequired
};

const BudgetSummary = ({ activities, data, years }) => (
  <div className="table-frozen-col-wrapper">
    <div className="table-frozen-col-scroll-window">
      <table className="table-cms table-frozen-col-pane" aria-hidden="true">
        <thead>
          <tr>
            <th className="table-frozen-null-cell">
              " "
            </th>
          </tr>
          <tr>
            <th className="table-frozen-null-cell">
              " "
            </th>
          </tr>
        </thead>
        <tbody>
          <FrozenHeaderCol title="HIT activities" />
          <FrozenDataCol data={data.hit} />
        </tbody>
        <tbody>
          <FrozenHeaderCol title="HIE activities" />
          <FrozenDataCol data={data.hie} />
        </tbody>
        <tbody>
          <FrozenHeaderCol title="MMIS activities" />
          <FrozenDataCol data={data.mmis} />
        </tbody>
        <tbody>
          <tr className="bold">
            <td>
              Project total
            </td>
          </tr>
        </tbody>
      </table>
    <table className="table-cms table-frozen-col">
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
              <th
                className="right-align"
                id={`summary-budget-fy-${y}-total`}
              >
                Total
              </th>
              <th
                className="right-align"
                id={`summary-budget-fy-${y}-federal`}
              >
                Federal
              </th>
              <th
                className="right-align"
                id={`summary-budget-fy-${y}-state`}
              >
                State
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="bg-blue-light">
        <HeaderRow title="HIT activities" years={years} />
        <DataRowGroup data={data.hit} entries={activities.hit} />
      </tbody>
      <tbody className="bg-yellow-light">
        <HeaderRow title="HIE activities" years={years} />
        <DataRowGroup data={data.hie} entries={activities.hie} />
      </tbody>
      <tbody className="bg-green-light">
        <HeaderRow title="MMIS activities" years={years} />
        <DataRowGroup data={data.mmis} entries={activities.mmis} />
      </tbody>
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
                  {formatMoney(combined.total)}
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${ffy} summary-budget-fy-${ffy}-federal`}
                >
                  {formatMoney(combined.federal)}
                </td>
                <td
                  className="mono right-align"
                  headers={`summary-budget-fy-${ffy} summary-budget-fy-${ffy}-state`}
                >
                  {formatMoney(combined.state)}
                </td>
              </Fragment>
            );
          })}
        </tr>
      </tbody>
    </table>
    </div>
  </div>
);

BudgetSummary.propTypes = {
  activities: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({ apd, budget }) => {
  const activities = ACTIVITY_FUNDING_SOURCES.reduce(
    (obj, source) => ({
      ...obj,
      [source.toLowerCase()]: budget.activityTotals.filter(
        a => a.fundingSource === source
      )
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

export {
  BudgetSummary as plain,
  mapStateToProps,
  DataRow,
  DataRowDetails,
  DataRowGroup,
  HeaderRow
};
