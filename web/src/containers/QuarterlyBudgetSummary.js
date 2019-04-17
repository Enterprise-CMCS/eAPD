import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { t } from '../i18n';

const FUNDING_SOURCES = [['hitAndHie', 'HIT and HIE'], ['mmis', 'MMIS']];
const QUARTERS = [1, 2, 3, 4];
const EXPENSE_NAME_DISPLAY = {
  state: t('proposedBudget.quarterlyBudget.expenseNames.state'),
  contractors: t('proposedBudget.quarterlyBudget.expenseNames.contractor'),
  combined: t('proposedBudget.quarterlyBudget.expenseNames.combined')
};

const QuarterlyBudgetSummary = ({ budget, years }) => {
  // wait until budget is loaded
  if (!years.length) return null;

  return (
    <Fragment>
      {FUNDING_SOURCES.map(([source, sourceDisplay]) => {
        const data = budget[source];
        return (
          <div
            key={source}
            className="mb3"
          >
            <h3 className="ds-h3">{sourceDisplay}</h3>
            {years.map((year, i) => (
            <table className="table-cms">
              <colgroup>
                <col className="table-cms--col-header__fixed-width" />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th
                    key={year}
                    className="center"
                    id={`quarterly-budget-summary-${source}-fy-${year}`}
                  >
                    {t('ffy', { year })}
                  </th>
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
                    className="right-align"
                    id={`quarterly-budget-summary-${source}-fy-${year}-subtotal`}
                  >
                    {t('table.subtotal')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                  <tr
                    key={name}
                  >
                    <td
                      headers={`quarterly-budget-summary-${source}-null1 quarterly-budget-summary-${source}-null2`}
                    >
                      {EXPENSE_NAME_DISPLAY[name]}
                    </td>
                    {QUARTERS.map(q => (
                      <td
                        className={`mono right-align nowrap ${
                          name === 'combined'
                        }`}
                        key={q}
                        headers={`quarterly-budget-summary-${source}-fy-${year} quarterly-budget-summary-${source}-fy-${year}-q${q}`}
                      >
                        <Dollars>{data[year][q][name]}</Dollars>
                      </td>
                    ))}
                    <td
                      className="mono right-align nowrap"
                      headers={`quarterly-budget-summary-${source}-fy-${year} quarterly-budget-summary-${source}-fy-${year}-subtotal`}
                    >
                      <Dollars>{data[year].subtotal[name]}</Dollars>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ))}
            <table className="table-cms table-cms__totals">
              <colgroup>
                <col className="table-cms--col-header__fixed-width" />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th id={`quarterly-budget-summary-${source}-total`}>Total {sourceDisplay}</th>
                  <th id={`quarterly-budget-summary-${source}-null1`}/>
                </tr>
              </thead>
              <tbody>
              {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                <tr>
                  <td
                    headers={`quarterly-budget-summary-${source}-total`}
                  >
                    {EXPENSE_NAME_DISPLAY[name]}
                  </td>
                  <td
                    className="bold mono right-align nowrap"
                    headers={`quarterly-budget-summary-${source}-total2 quarterly-budget-summary-${source}-total`}
                  >
                    <Dollars>{data.total[name]}</Dollars>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        );

      })}
    </Fragment>
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
