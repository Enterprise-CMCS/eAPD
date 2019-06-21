import PropTypes from 'prop-types';
import React from 'react';
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
    <table className="budget-table">
      <caption className="ds-h4">
        HIT + HIE
      </caption>
      <thead>
        <tr>
          <th id="prev_act_hit_header_ffy">
            <span className="ds-u-visibility--screen-reader">
              Year
            </span>
          </th>
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
          <th aria-hidden="true" />
          <th
            id="prev_act_hithie_total_approved"
            className="ds-u-text-align--right"
          >
            {TABLE_HEADERS.approved}
          </th>
          <th
            id="prev_act_hithie_federal_approved"
            className="ds-u-text-align--right"
          >
            {TABLE_HEADERS.approved}
          </th>
          <th
            id="prev_act_hithie_federal_actual"
            className="ds-u-text-align--right"
          >
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
                <th id={`prev_act_hithie_row_${year}`} headers="prev_act_hit_header_ffy">
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
                  className="budget-table--number"
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
