import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateBudgetQuarterlyShare } from '../actions/apd';
import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const FUNDING_SOURCES = [['hitAndHie', 'HIT and HIE'], ['mmis', 'MMIS']];
const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];
const EXPENSE_NAME_DISPLAY = {
  state: t('proposedBudget.quarterlyBudget.expenseNames.state'),
  contractors: t('proposedBudget.quarterlyBudget.expenseNames.contractor'),
  combined: t('proposedBudget.quarterlyBudget.expenseNames.combined')
};

const color = idx => `bg-${COLORS[idx] || 'gray'}`;

class QuarterlyBudgetSummary extends Component {
  handleChange = (source, year, q) => e => {
    const change = { [source]: { [year]: { [q]: +e.target.value } } };
    this.props.update(change);
  };

  render() {
    const { budget, years } = this.props;

    // wait until budget is loaded
    if (!years.length) return null;

    return (
      <div>
        {FUNDING_SOURCES.map(([source, sourceDisplay]) => {
          const data = budget[source];
          return (
            <div key={source} className="mb3">
              <h3 className="mt0">{sourceDisplay}</h3>
              <div className="overflow-auto">
                <table
                  className="table-cms table-fixed"
                  style={{ minWidth: 1200 }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: 160 }} />
                      {years.map((year, i) => (
                        <th
                          key={year}
                          className={`center ${color(i)}`}
                          colSpan="5"
                        >
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
                    {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                      <tr
                        key={name}
                        className={`${name === 'combined' ? 'bold' : ''}`}
                      >
                        <td>{EXPENSE_NAME_DISPLAY[name]}</td>
                        {years.map((year, i) => (
                          <Fragment key={year}>
                            {QUARTERS.map(q => (
                              <td
                                className={`mono right-align ${
                                  name === 'combined' ? `${color(i)}-light` : ''
                                }`}
                                key={q}
                              >
                                {formatMoney(data[year][q][name])}
                              </td>
                            ))}
                            <td
                              className={`bold mono right-align ${color(
                                i
                              )}-light`}
                            >
                              {formatMoney(data[year].subtotal[name])}
                            </td>
                          </Fragment>
                        ))}
                        <td className="bold mono right-align bg-gray-light">
                          {formatMoney(data.total[name])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

QuarterlyBudgetSummary.propTypes = {
  budget: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired
};

const mapStateToProps = ({ budget, apd }) => ({
  budget: budget.federalShareByFFYQuarter,
  years: apd.data.years
});
const mapDispatchToProps = { update: updateBudgetQuarterlyShare };

export default connect(mapStateToProps, mapDispatchToProps)(
  QuarterlyBudgetSummary
);
