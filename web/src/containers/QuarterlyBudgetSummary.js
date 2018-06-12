import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const FUNDING_SOURCES = ['hit', 'hie', 'mmis'];
const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];
const CATEGORY_LOOKUP = {
  statePersonnel: 'Project state staff',
  expenses: 'Non-personnel',
  contractors: 'Contracted resources',
  combined: 'Total Enhanced FFP'
};

const color = idx => `bg-${COLORS[idx] || 'gray'}`;

const QuarterlyBudgetSummary = ({ budget }) => {
  const { years } = budget;

  // wait until budget is loaded
  if (!years.length) return null;

  return (
    <div>
      {FUNDING_SOURCES.map(source => {
        const data = budget[source];
        return (
          <div key={source} className="mb3">
            <h4 className="mt0">{source.toUpperCase()}</h4>
            <div className="overflow-auto">
              <table
                className="h6 table-fixed table-bordered table-budget"
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
                    {years.map((year, i) => (
                      <Fragment key={year}>
                        {QUARTERS.map(q => (
                          <th key={q} className="right-align">
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
                  {Object.keys(data).map(key => (
                    <tr
                      key={key}
                      className={`${key === 'combined' ? 'bold' : ''}`}
                    >
                      <td>{CATEGORY_LOOKUP[key]}</td>
                      {years.map((year, i) => (
                        <Fragment key={year}>
                          {QUARTERS.map(q => (
                            <td
                              className={`mono right-align ${
                                key === 'combined' ? `${color(i)}-light` : ''
                              }`}
                              key={q}
                            >
                              {formatMoney(data[key][year].federal / 4)}
                            </td>
                          ))}
                          <td
                            className={`bold mono right-align ${color(
                              i
                            )}-light`}
                          >
                            {formatMoney(data[key][year].federal)}
                          </td>
                        </Fragment>
                      ))}
                      <td className="bold mono right-align bg-gray-light">
                        {formatMoney(data[key].total.federal)}
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
  budget: PropTypes.object.isRequired
};

const mapStateToProps = ({ budget }) => ({ budget });

export default connect(mapStateToProps)(QuarterlyBudgetSummary);
