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
            {years.map((year) => (
              <table
                className="table-cms"
                key={year}
              >
              <colgroup>
                <col className="table-cms--col-header__fixed-width" />
                <col span="5"/>
              </colgroup>
              <thead>
                <tr>
                  <th className="center">
                    {t('ffy', { year })}
                  </th>
                  {QUARTERS.map(q => (
                    <th
                      key={q}
                      className="center"
                      scope="col"
                    >
                      {t('table.quarter', { q })}
                    </th>
                  ))}
                  <th
                    className="center"
                    scope="col"
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
                    <th scope="row">
                      {EXPENSE_NAME_DISPLAY[name]}
                    </th>
                    {QUARTERS.map(q => (
                      <td
                        className="mono right-align nowrap"
                        key={q}
                      >
                        <Dollars>{data[year][q][name]}</Dollars>
                      </td>
                    ))}
                    <td
                      className="mono right-align nowrap"
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
              </colgroup>
              <thead>
                <tr>
                  <th>Total {sourceDisplay}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
              {Object.keys(EXPENSE_NAME_DISPLAY).map(name => (
                <tr>
                  <th scope="row">
                    {EXPENSE_NAME_DISPLAY[name]}
                  </th>
                  <td className="bold mono right-align nowrap">
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
