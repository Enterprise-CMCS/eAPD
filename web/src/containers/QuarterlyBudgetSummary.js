import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateBudgetQuarterlyShare } from '../actions/apd';
import { t } from '../i18n';
import { expenseTypeNames } from '../reducers/budget';
import { addObjVals } from '../util';
import { formatMoney } from '../util/formats';

const FUNDING_SOURCES = [['hitAndHie', 'HIT and HIE'], ['mmis', 'MMIS']];
const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];
const EXPENSE_NAME_DISPLAY = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Total Enhanced FFP'
};

const color = idx => `bg-${COLORS[idx] || 'gray'}`;

class QuarterlyBudgetSummary extends Component {
  handleChange = (source, year, q) => e => {
    const change = { [source]: { [year]: { [q]: +e.target.value } } };
    this.props.update(change);
  };

  render() {
    const { budget } = this.props;
    const { quarterly, years } = budget;

    // wait until budget is loaded
    if (!years.length) return null;

    return (
      <div>
        {FUNDING_SOURCES.map(([source, sourceDisplay]) => {
          const data = budget[source];
          return (
            <div key={source} className="mb3">
              <h4 className="mt0">{sourceDisplay}</h4>
              <div className="overflow-auto">
                <table
                  className="h6 table-fixed table-condensed table-bordered table-budget"
                  style={{ minWidth: 1200 }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: 160 }} />
                      {years.map((year, i) => (
                        <th
                          key={year}
                          className={`white center ${color(i)}`}
                          colSpan="5"
                        >
                          {t('ffy', { year })}
                        </th>
                      ))}
                      <th className="bg-black white center">
                        {t('table.total')}
                      </th>
                    </tr>
                    <tr>
                      <th />
                      {years.map((year, i) => {
                        const incomplete =
                          addObjVals(quarterly[source][year]) !== 100;
                        return (
                          <Fragment key={year}>
                            {QUARTERS.map(q => (
                              <th key={q} className="center">
                                <div className="mb1 h4">
                                  {t('table.quarter', { q })}
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="range"
                                    className="flex-auto input-range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={quarterly[source][year][q]}
                                    onChange={this.handleChange(
                                      source,
                                      year,
                                      q
                                    )}
                                  />
                                  <div
                                    className={`ml-tiny flex-none mono right-align ${
                                      incomplete ? 'red' : ''
                                    }`}
                                  >
                                    {quarterly[source][year][q]}%
                                  </div>
                                </div>
                              </th>
                            ))}
                            <th className={`right-align ${color(i)}-light`}>
                              {t('table.subtotal')}
                            </th>
                          </Fragment>
                        );
                      })}
                      <th className="bg-gray-light" />
                    </tr>
                  </thead>
                  <tbody>
                    {expenseTypeNames.map(name => (
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
                                {formatMoney(
                                  quarterly[source][year][q] *
                                    data[name][year].federal /
                                    100
                                )}
                              </td>
                            ))}
                            <td
                              className={`bold mono right-align ${color(
                                i
                              )}-light`}
                            >
                              {formatMoney(data[name][year].federal)}
                            </td>
                          </Fragment>
                        ))}
                        <td className="bold mono right-align bg-gray-light">
                          {formatMoney(data[name].total.federal)}
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
  update: PropTypes.func.isRequired
};

const mapStateToProps = ({ budget }) => ({ budget });
const mapDispatchToProps = { update: updateBudgetQuarterlyShare };

export default connect(mapStateToProps, mapDispatchToProps)(
  QuarterlyBudgetSummary
);
