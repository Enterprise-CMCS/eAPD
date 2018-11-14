import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

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

const QuarterlyBudgetSummary = ({ budget, years }) => {
  // wait until budget is loaded
  if (!years.length) return null;

  return (
    <div>
      {FUNDING_SOURCES.map(([source, sourceDisplay]) => {
        const data = budget[source];
        return (
          <div key={source} className="mb3 table-frozen-wrapper table-frozen-wide-header">
            <h3 className="mt0">{sourceDisplay}</h3>
            <div className="overflow-x table-frozen-scroller">
              <table className="table-cms table-frozen-left-pane" aria-hidden="true">
                <thead>
                  <tr>
                    <th className="table-frozen-null-cell">
                      --
                    </th>
                  </tr>
                  <tr>
                    <th className="table-frozen-null-cell">
                      --
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                    <tr
                      key={name}
                      className={`${name === 'combined' ? 'bold' : ''}`}
                    >
                      <td>
                        {EXPENSE_NAME_DISPLAY[name]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="table-cms table-frozen-data">
                <thead>
                  <tr>
                    <th
                      id={`quarterly-budget-summary-${source}-null1`}
                    />
                    {years.map((year, i) => (
                      <th
                        key={year}
                        className={`center ${color(i)}`}
                        colSpan="5"
                        id={`quarterly-budget-summary-${source}-fy-${year}`}
                      >
                        {t('ffy', { year })}
                      </th>
                    ))}
                    <th
                      className="center"
                      id={`quarterly-budget-summary-${source}-total`}
                    >
                      {t('table.total')}
                    </th>
                  </tr>
                  <tr>
                    <th id={`quarterly-budget-summary-${source}-null2`} />
                    {years.map((year, i) => (
                      <Fragment key={year}>
                        {QUARTERS.map(q => (
                          <th
                            key={q}
                            className="center"
                            id={`quarterly-budget-summary-${source}-fy-${year}-q${q}`}
                          >
                            {t('table.quarter', { q })}
                          </th>
                        ))}
                        <th
                          className={`right-align ${color(i)}-light`}
                          id={`quarterly-budget-summary-${source}-fy-${year}-subtotal`}
                        >
                          {t('table.subtotal')}
                        </th>
                      </Fragment>
                    ))}
                    <th
                      className="bg-gray-light"
                      id={`quarterly-budget-summary-${source}-total2`}
                    />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                    <tr
                      key={name}
                      className={`${name === 'combined' ? 'bold' : ''}`}
                    >
                      <td
                        headers={`quarterly-budget-summary-${source}-null1 quarterly-budget-summary-${source}-null2`}
                      >
                        {EXPENSE_NAME_DISPLAY[name]}
                      </td>
                      {years.map((year, i) => (
                        <Fragment key={year}>
                          {QUARTERS.map(q => (
                            <td
                              className={`mono right-align nowrap ${
                                name === 'combined' ? `${color(i)}-light` : ''
                              }`}
                              key={q}
                              headers={`quarterly-budget-summary-${source}-fy-${year} quarterly-budget-summary-${source}-fy-${year}-q${q}`}
                            >
                              {formatMoney(data[year][q][name])}
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align nowrap ${color(
                              i
                            )}-light`}
                            headers={`quarterly-budget-summary-${source}-fy-${year} quarterly-budget-summary-${source}-fy-${year}-subtotal`}
                          >
                            {formatMoney(data[year].subtotal[name])}
                          </td>
                        </Fragment>
                      ))}
                      <td
                        className="bold mono right-align nowrap bg-gray-light"
                        headers={`quarterly-budget-summary-${source}-total2 quarterly-budget-summary-${source}-total`}
                      >
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
};

QuarterlyBudgetSummary.propTypes = {
  budget: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({ budget, apd }) => ({
  budget: budget.federalShareByFFYQuarter,
  years: apd.data.years
});

export default connect(mapStateToProps)(QuarterlyBudgetSummary);

export { QuarterlyBudgetSummary as plain, mapStateToProps };
