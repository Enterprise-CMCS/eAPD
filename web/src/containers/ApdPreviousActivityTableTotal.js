import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../util/formats';
import { TABLE_HEADERS } from '../constants';

const ApdPreviousActivityTableMMIS = ({ totals }) => {
  const years = Object.keys(totals);

  return (
    <Fragment>
      <h3>Grand totals: Federal HIT, HIE, MMIS</h3>
      <div className="table-frozen-wrapper table-frozen-narrow-header mt3">
        <div className="table-frozen-scroller">
          <table
            className="table-cms table-fixed table-frozen-left-pane"
            aria-hidden="true"
          >
            <thead>
              <tr>
                <th className="table-frozen-null-cell">--</th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => (
                <tr key={`${year}-mmis-fake-row`}>
                  <th key={`${year}-mmis-fake-header`}>
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table-cms centered-headers table-fixed table-frozen-data">
            <thead>
              <tr>
                <th id="prev_act_totals_null3" />
                <th id="prev_act_total_approved">FFP Approved</th>

                <th id="prev_act_total_actual">FFP Actual</th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => {
                const expenses = totals[year];

                return (
                  <tr key={year} className="align-middle">
                    <th id={`prev_act_total_row_${year}`}>
                      {TABLE_HEADERS.ffy(year)}
                    </th>
                    <td
                      headers={`prev_act_total_row_${year} prev_act_total_approved`}
                    >
                      {formatMoney(expenses.approved)}
                    </td>

                    <td
                      headers={`prev_act_total_row_${year} prev_act_total_actual`}
                    >
                      {formatMoney(expenses.actual)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

ApdPreviousActivityTableMMIS.propTypes = {
  totals: PropTypes.object.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { previousActivityExpenses }
  }
}) => {
  const totals = Object.entries(previousActivityExpenses).reduce(
    (acc, [ffy, expenses]) => ({
      ...acc,
      [ffy]: {
        actual:
          expenses.hithie.federalActual +
          [90, 75, 50].reduce(
            (sum, ffp) => sum + expenses.mmis[ffp].federalActual,
            0
          ),
        approved:
          expenses.hithie.totalApproved * 0.9 +
          [90, 75, 50].reduce(
            (sum, ffp) => sum + (expenses.mmis[ffp].totalApproved * ffp) / 100,
            0
          )
      }
    }),
    {}
  );

  return {
    totals
  };
};

export default connect(
  mapStateToProps,
  null
)(ApdPreviousActivityTableMMIS);

export { ApdPreviousActivityTableMMIS as plain, mapStateToProps };
