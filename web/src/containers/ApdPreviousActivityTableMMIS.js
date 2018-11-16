import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../util/formats';
import { DollarInput } from '../components/Inputs';
import { updateApd } from '../actions/apd';
import { TABLE_HEADERS } from '../constants';

const ApdPreviousActivityTableMMIS = ({
  previousActivityExpenses,
  updateApd: dispatchUpdateApd
}) => {
  const years = Object.keys(previousActivityExpenses);

  const handleChange = (year, level, type) => e => {
    const update = {
      previousActivityExpenses: {
        [year]: { mmis: { [level]: { [type]: e.target.value } } }
      }
    };
    dispatchUpdateApd(update);
  };

  return (
    <Fragment>
      <h3>MMIS</h3>
      {[90, 75, 50].map((level, i) => (
        <div
          key={level}
          className={`table-frozen-wrapper table-frozen-narrow-header ${
            i > 0 ? 'mt3' : ''
          }`}
        >
          <div className="table-frozen-scroller">
            <table
              className="table-cms table-fixed table-frozen-left-pane"
              aria-hidden="true"
            >
              <thead>
                <tr>
                  <th className="table-frozen-null-cell">--</th>
                </tr>
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
                    <td>
                      <DollarInput
                        hideLabel
                        wrapperClass="m0"
                        className="fake-spacer-input m0 input input-condensed mono right-align"
                        label="fake-spacer-input"
                        name="fake-spacer-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table-cms centered-headers table-fixed table-frozen-data">
              <thead>
                <tr>
                  <th id="prev_act_mmis_null2" />
                  <th className="pre-line" id={`prev_act_mmis${level}_total`}>
                    {TABLE_HEADERS.total}
                  </th>
                  <th
                    colSpan="2"
                    className="pre-line"
                    id={`prev_act_mmis${level}_federal`}
                  >
                    {TABLE_HEADERS.federal(level)}
                  </th>
                </tr>
                <tr>
                  <th id="prev_act_mmis_null3" />
                  <th id={`prev_act_mmis${level}_total_approved`}>
                    {TABLE_HEADERS.approved}
                  </th>

                  <th id={`prev_act_mmis${level}_federal_approved`}>
                    {TABLE_HEADERS.approved}
                  </th>
                  <th id={`prev_act_mmis${level}_federal_actual`}>
                    {TABLE_HEADERS.actual}
                  </th>
                </tr>
              </thead>
              <tbody>
                {years.map(year => {
                  const expenses = previousActivityExpenses[year].mmis[level];
                  const federalApproved =
                    (expenses.totalApproved * level) / 100;

                  return (
                    <tr key={year} className="align-middle">
                      <th id={`prev_act_mmis_row_${year}`}>
                        {TABLE_HEADERS.ffy(year)}
                      </th>
                      <td
                        headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_total prev_act_mmis${level}_total_approved`}
                      >
                        <DollarInput
                          name={`approved-total-mmis${level}-${year}`}
                          label={`total approved funding for MMIS at the ${level}/${100 -
                            level} level for FFY ${year}, state plus federal`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={expenses.totalApproved}
                          onChange={handleChange(year, level, 'totalApproved')}
                        />
                      </td>

                      <td
                        headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_approved`}
                      >
                        {formatMoney(federalApproved)}
                      </td>

                      <td
                        headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_actual`}
                      >
                        <DollarInput
                          name={`actual-federal-mmis${level}-${year}`}
                          label={`actual federal share for MMIS at the ${level}/${100 -
                            level} level for FFY ${year}`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={expenses.federalActual}
                          onChange={handleChange(year, level, 'federalActual')}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
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
                <th id="prev_act_mmis_null2" />
                <th colSpan="2" className="pre-line" id="prev_act_mmisTotal">
                  Federal totals
                </th>
              </tr>
              <tr>
                <th id="prev_act_mmis_null3" />
                <th id="prev_act_mmisTotal_approved">FFP Approved</th>

                <th id="prev_act_mmisTotal_actual">FFP Actual</th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => {
                const expenses = previousActivityExpenses[year].mmis;
                const approved = [90, 75, 50].reduce(
                  (total, ffp) =>
                    total + (expenses[ffp].totalApproved * ffp) / 100,
                  0
                );
                const actual = [90, 75, 50].reduce(
                  (total, ffp) => total + expenses[ffp].federalActual,
                  0
                );

                return (
                  <tr key={year} className="align-middle">
                    <th id={`prev_act_mmis_row_${year}`}>
                      {TABLE_HEADERS.ffy(year)}
                    </th>
                    <td
                      headers={`prev_act_mmis_row_${year} prev_act_mmisTotal prev_act_mmisTotal_approved`}
                    >
                      {formatMoney(approved)}
                    </td>

                    <td
                      headers={`prev_act_mmis_row_${year} prev_act_mmisTotal prev_act_mmisTotal_actual`}
                    >
                      {formatMoney(actual)}
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
  previousActivityExpenses: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { previousActivityExpenses }
  }
}) => ({
  previousActivityExpenses
});

const mapDispatchToProps = { updateApd };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdPreviousActivityTableMMIS);

export {
  ApdPreviousActivityTableMMIS as plain,
  mapStateToProps,
  mapDispatchToProps
};
