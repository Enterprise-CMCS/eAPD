import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../util/formats';
import { DollarInput } from '../components/Inputs';
import { updateApd } from '../actions/apd';
import { TABLE_HEADERS } from '../constants';

const ApdPreviousActivityTable = ({
  previousActivityExpenses,
  updateApd: dispatchUpdateApd
}) => {
  const years = Object.keys(previousActivityExpenses);

  const handleChange = (year, program, type) => e => {
    const update = {
      previousActivityExpenses: {
        [year]: { [program]: { [type]: e.target.value } }
      }
    };
    dispatchUpdateApd(update);
  };

  return (
    <Fragment>
      <h3>HIT + HIE</h3>
      <div className="table-frozen-wrapper table-frozen-narrow-header">
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
                <tr key={`${year}-fake-row`}>
                  <th key={`${year}-fake-header`}>{TABLE_HEADERS.ffy(year)}</th>
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
                <th id="prev_act_hit_header_null2" />
                <th className="pre-line" id="prev_act_hithie_total">
                  {TABLE_HEADERS.total}
                </th>
                <th
                  colSpan="2"
                  className="pre-line"
                  id="prev_act_hithie_federal"
                >
                  {TABLE_HEADERS.federal()}
                </th>
              </tr>
              <tr>
                <th id="prev_act_hit_header_null3" />
                <th id="prev_act_hithie_total_approved">
                  {TABLE_HEADERS.approved}
                </th>
                <th id="prev_act_hithie_federal_approved">
                  {TABLE_HEADERS.approved}
                </th>
                <th id="prev_act_hithie_federal_actual">
                  {TABLE_HEADERS.actual}
                </th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => {
                const federalApproved =
                  previousActivityExpenses[year].hithie.totalApproved * 0.9;

                return (
                  <tr key={year} className="align-middle">
                    <th id={`prev_act_hithie_row_${year}`}>
                      {TABLE_HEADERS.ffy(year)}
                    </th>

                    <td
                      headers={`prev_act_hithie_row_${year} prev_act_hithie_total prev_act_hithie_total_approved`}
                    >
                      <DollarInput
                        name={`hithie-approved-total-${year}`}
                        label={`total approved funding for HIT and HIE for FFY ${year}, state plus federal`}
                        hideLabel
                        wrapperClass="m0"
                        className="m0 input input-condensed mono right-align"
                        value={
                          previousActivityExpenses[year].hithie.totalApproved
                        }
                        onChange={handleChange(year, 'hithie', 'totalApproved')}
                      />
                    </td>

                    <td
                      headers={`prev_act_hithie_row_${year} prev_act_hithie_federal prev_act_hithie_total_approved`}
                    >
                      {formatMoney(federalApproved)}
                    </td>

                    <td
                      headers={`prev_act_hithie_row_${year} prev_act_hithie_federal prev_act_hithie_federal_actual`}
                    >
                      <DollarInput
                        name={`hithie-actual-federal-${year}`}
                        label={`actual federal share for HIT and HIE for FFY ${year}`}
                        hideLabel
                        wrapperClass="m0"
                        className="m0 input input-condensed mono right-align"
                        value={
                          previousActivityExpenses[year].hithie.federalActual
                        }
                        onChange={handleChange(year, 'hithie', 'federalActual')}
                      />
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

ApdPreviousActivityTable.propTypes = {
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
)(ApdPreviousActivityTable);

export {
  ApdPreviousActivityTable as plain,
  mapStateToProps,
  mapDispatchToProps
};
