import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateActivity } from '../actions/activities';
import { PercentInput } from '../components/Inputs';
import { t } from '../i18n';
import { formatMoney, formatPerc } from '../util/formats';

const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];
const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

const color = idx => `bg-${COLORS[idx] || 'gray'}`;

class ActivityQuarterlyBudgetSummary extends Component {
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
    this.props.update(this.props.aId, change, true);
  };

  render() {
    const { aId, quarterlyFFP, years } = this.props;

    // Wait until the budget is ready
    if (!quarterlyFFP) return null;

    return (
      <div>
        <div className="mb3">
          <div className="overflow-auto">
            <table className="table-cms table-fixed" style={{ minWidth: 1200 }}>
              <thead>
                <tr>
                  <th style={{ width: 160 }} />
                  {years.map((year, i) => (
                    <th key={year} className={`center ${color(i)}`} colSpan="5">
                      {t('ffy', { year })}
                    </th>
                  ))}
                  <th className="center">{t('table.total')}</th>
                </tr>
                <tr>
                  <th />
                  {years.map((year, i) => (
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <th key={q} className="center">
                          {t('table.quarter', { q })}
                        </th>
                      ))}
                      <th className={`right-align ${color(i)}-light`}>
                        {t('table.subtotal')}
                      </th>
                    </Fragment>
                  ))}
                  <th className="bg-gray-light" />
                </tr>
              </thead>
              <tbody>
                {['state', 'contractors'].map(name => (
                  <Fragment key={name}>
                    <tr
                      key={name}
                      className={`${name === 'combined' ? 'bold' : ''}`}
                    >
                      <td rowSpan="2">{EXPENSE_NAME_DISPLAY[name]}</td>
                      {years.map((year, i) => (
                        <Fragment key={year}>
                          {QUARTERS.map(q => (
                            <td
                              className={`mono right-align ${
                                name === 'combined' ? `${color(i)}-light` : ''
                              }`}
                              key={q}
                            >
                              <PercentInput
                                name={`ffp-${aId}-${year}-${q}-${name}`}
                                hideLabel
                                label={`federal share for ffy ${year}, quarter ${q}, ${name}`}
                                onChange={this.handleChange(year, q, name)}
                                value={
                                  quarterlyFFP[year][q][name].percent * 100
                                }
                              />
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align ${color(
                              i
                            )}-light`}
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
                            >
                              {formatMoney(quarterlyFFP[year][q][name].dollars)}
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align ${color(
                              i
                            )}-light`}
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
                        >
                          {formatMoney(quarterlyFFP[year][q].combined.dollars)}
                        </td>
                      ))}
                      <td className={`bold mono right-align ${color(i)}-light`}>
                        {formatMoney(
                          quarterlyFFP[year].subtotal.combined.dollars
                        )}
                      </td>
                    </Fragment>
                  ))}
                  <td className="bold mono right-align bg-gray-light">
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

ActivityQuarterlyBudgetSummary.propTypes = {
  aId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd, budget: { activities } }, { aId }) => {
  const budget = activities[aId];

  return {
    quarterlyFFP: budget ? budget.quarterlyFFP : null,
    years: apd.data.years
  };
};
const mapDispatchToProps = { update: updateActivity };

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityQuarterlyBudgetSummary
);
