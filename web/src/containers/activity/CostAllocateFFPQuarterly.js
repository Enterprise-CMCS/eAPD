import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateActivity } from '../../actions/activities';
import { PercentInput } from '../../components/Inputs';
import { t } from '../../i18n';
import { formatMoney, formatPerc } from '../../util/formats';

const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];
const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

const color = idx => `bg-${COLORS[idx] || 'gray'}`;

class CostAllocateFFPQuarterly extends Component {
  handleChange = (year, q, name) => e => {
    // Keep percent as 0-100 here because the activity state
    // uses Big Percents, and this action updates the
    // activity state.  The budget state update is triggered
    // afterwards.
    const change = {
      quarterlyFFP: {
        [year]: { [q]: { [name]: +e.target.value } }
      }
    };
    this.props.update(this.props.aKey, change, true);
  };

  render() {
    const { aKey, quarterlyFFP, years } = this.props;

    // Wait until the budget is ready
    if (!quarterlyFFP) return null;

    return (
      <div>
        <div className="mb3 table-frozen-wrapper">
          <div className="table-frozen-scroller">
            <table className="table-cms table-fixed table-frozen-left-pane" aria-hidden="true">
              <thead>
                <tr>
                  <th
                    className="table-frozen-null-cell"
                  >
                    " "
                  </th>
                </tr>
                <tr>
                  <th
                    className="table-frozen-null-cell"
                  >
                    " "
                  </th>
                </tr>
              </thead>
              <tbody>
                {['state', 'contractors'].map(name => (
                  <Fragment key={name}>
                    <tr
                      key={name}
                      className={`align-middle ${
                        name === 'combined' ? 'bold' : ''
                      }`}
                    >
                      <td
                        rowSpan="2"
                        headers="act_qbudget_null1"
                      >
                        {EXPENSE_NAME_DISPLAY[name]}
                      </td>
                      <td
                          key={`{name}-null-input-cell`}
                          className="mono right-align"
                        >
                        <PercentInput
                          label="fake-input"
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          hideLabel
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        key={`{name}-null-computed-cell`}
                        className="nowrap table-frozen-spacer-cell"
                      >
                        --
                      </td>
                    </tr>
                  </Fragment>
                ))}
                <tr className="bold">
                  <td>
                    {EXPENSE_NAME_DISPLAY.combined}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-cms table-fixed" style={{ minWidth: 1200 }}>
              <thead>
                <tr>
                  <th
                    rowSpan="2"
                    style={{ width: 140 }}
                    id="act_qbudget_null1"
                  />
                  {years.map((year, i) => (
                    <th
                      key={year}
                      className={`center ${color(i)}`}
                      colSpan="5"
                      id={`act_qbudget_fy${year}`}
                    >
                      {t('ffy', { year })}
                    </th>
                  ))}
                  <th rowSpan="2" className="center" id="act_qbudget_total">
                    {t('table.total')}
                  </th>
                </tr>
                <tr>
                  {years.map((year, i) => (
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <th
                          key={q}
                          className="center"
                          id={`act_qbudget_fy${year}_q${q}`}
                        >
                          {t('table.quarter', { q })}
                        </th>
                      ))}
                      <th
                        className={`right-align ${color(i)}-light`}
                        id={`act_qbudget_fy${year}_subtotal`}
                      >
                        {t('table.subtotal')}
                      </th>
                    </Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['state', 'contractors'].map(name => (
                  <Fragment key={name}>
                    <tr
                      key={name}
                      className={`align-middle ${
                        name === 'combined' ? 'bold' : ''
                      }`}
                    >
                      <td rowSpan="2" headers="act_qbudget_null1">
                        {EXPENSE_NAME_DISPLAY[name]}
                      </td>
                      {years.map((year, i) => (
                        <Fragment key={year}>
                          {QUARTERS.map(q => (
                            <td
                              key={q}
                              className="mono right-align"
                              headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                            >
                              <PercentInput
                                name={`ffp-${aKey}-${year}-${q}-${name}`}
                                label={`federal share for ffy ${year}, quarter ${q}, ${name}`}
                                wrapperClass="m0"
                                className="m0 input input-condensed mono right-align"
                                onChange={this.handleChange(year, q, name)}
                                value={
                                  quarterlyFFP[year][q][name].percent * 100
                                }
                                hideLabel
                              />
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align ${color(
                              i
                            )}-light`}
                            headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                          >
                            {formatPerc(
                              quarterlyFFP[year].subtotal[name].percent
                            )}
                          </td>
                        </Fragment>
                      ))}
                      <td
                        rowSpan="2"
                        className="bold mono right-align bg-gray-light"
                        headers="act_qbudget_total"
                      >
                        {formatMoney(quarterlyFFP.total[name])}
                      </td>
                    </tr>
                    <tr>
                      {years.map((year, i) => (
                        <Fragment key={year}>
                          {QUARTERS.map(q => (
                            <td
                              className={`mono right-align ${
                                name === 'combined' ? `${color(i)}-light` : ''
                              }`}
                              key={q}
                              headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                            >
                              {formatMoney(quarterlyFFP[year][q][name].dollars)}
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align ${color(
                              i
                            )}-light`}
                            headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                          >
                            {formatMoney(
                              quarterlyFFP[year].subtotal[name].dollars
                            )}
                          </td>
                        </Fragment>
                      ))}
                    </tr>
                  </Fragment>
                ))}
                <tr className="bold">
                  <td>{EXPENSE_NAME_DISPLAY.combined}</td>
                  {years.map((year, i) => (
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <td
                          className={`mono right-align ${color(i)}-light`}
                          key={q}
                          headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                        >
                          {formatMoney(quarterlyFFP[year][q].combined.dollars)}
                        </td>
                      ))}
                      <td
                        className={`bold mono right-align ${color(i)}-light`}
                        headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                      >
                        {formatMoney(
                          quarterlyFFP[year].subtotal.combined.dollars
                        )}
                      </td>
                    </Fragment>
                  ))}
                  <td
                    className="bold mono right-align bg-gray-light"
                    headers="act_qbudget_total"
                  >
                    {formatMoney(quarterlyFFP.total.combined)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

CostAllocateFFPQuarterly.propTypes = {
  aKey: PropTypes.string.isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd, budget: { activities } }, { aKey }) => {
  const budget = activities[aKey];

  return {
    quarterlyFFP: budget ? budget.quarterlyFFP : null,
    years: apd.data.years
  };
};

const mapDispatchToProps = { update: updateActivity };

export default connect(mapStateToProps, mapDispatchToProps)(
  CostAllocateFFPQuarterly
);
