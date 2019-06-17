import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
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
      <h4 className="ds-h4">HIT + HIE</h4>
      <table className="budget-table">
        <thead>
          <tr>
            <th id="prev_act_hit_header_null2" rowSpan="2" />
            <th id="prev_act_hithie_total">
              {TABLE_HEADERS.total}
            </th>
            <th
              colSpan="2"
              id="prev_act_hithie_federal"
            >
              {TABLE_HEADERS.federal()}
            </th>
          </tr>
          <tr>
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
                <tr key={year}>
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
                      wrapperClass="budget-table--input-holder"
                      className="budget-table--input__number"
                      value={
                        previousActivityExpenses[year].hithie.totalApproved
                      }
                      onChange={handleChange(year, 'hithie', 'totalApproved')}
                    />
                  </td>

                  <td
                    headers={`prev_act_hithie_row_${year} prev_act_hithie_federal prev_act_hithie_federal_approved`}
                    className="font-family--mono"
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_hithie_row_${year} prev_act_hithie_federal prev_act_hithie_federal_actual`}
                  >
                    <DollarInput
                      name={`hithie-actual-federal-${year}`}
                      label={`actual federal share for HIT and HIE for FFY ${year}`}
                      hideLabel
                      wrapperClass="budget-table--input-holder"
                      className="budget-table--input__number"
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
