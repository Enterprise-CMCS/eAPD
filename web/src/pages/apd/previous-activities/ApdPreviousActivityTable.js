import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import {
  setPreviousActivityApprovedExpenseForHITandHIE,
  setPreviousActivityFederalActualExpenseForHITandHIE
} from '../../../redux/actions/editApd';
import { TABLE_HEADERS } from '../../../constants';

import { selectPreviousHITHIEActivities } from '../../../redux/selectors/apd.selectors';

const ApdPreviousActivityTable = ({
  isViewOnly,
  previousActivityExpenses,
  setActual,
  setApproved
}) => {
  const years = Object.keys(previousActivityExpenses);

  const getActualsHandler =
    year =>
    ({ target: { value } }) => {
      setActual(year, value);
    };

  const getApprovedHandler =
    year =>
    ({ target: { value } }) => {
      setApproved(year, value);
    };

  return (
    <table className="budget-table">
      <caption className="ds-h4">HIT + HIE Federal share 90% FFP</caption>
      <thead>
        <tr>
          <td className="th" aria-hidden="true" />
          <th
            id="prev_act_hithie_total_approved"
            className="ds-u-text-align--right"
            scope="col"
          >
            {TABLE_HEADERS.approvedTotal}
          </th>
          <th
            id="prev_act_hithie_federal_approved"
            className="ds-u-text-align--right"
            scope="col"
          >
            {TABLE_HEADERS.approved()}
          </th>
          <th
            id="prev_act_hithie_federal_actual"
            className="ds-u-text-align--right"
            scope="col"
          >
            {TABLE_HEADERS.actual}
          </th>
        </tr>
      </thead>
      <tbody>
        {years.map(year => {
          const federalApproved =
            previousActivityExpenses[year].totalApproved * 0.9;

          return (
            <tr key={year}>
              <th
                id={`prev_act_hithie_row_${year}`}
                scope="row"
                data-cy="yearRow"
              >
                {TABLE_HEADERS.ffy(year)}
              </th>

              <td
                headers={`prev_act_hithie_row_${year}`}
                className={isViewOnly ? 'budget-table--number' : ''}
                data-cy={`prev_act_hithie_total_approved_${year}`}
              >
                {isViewOnly ? (
                  <Dollars>
                    {previousActivityExpenses[year].totalApproved}
                  </Dollars>
                ) : (
                  <DollarField
                    className="budget-table--input-holder"
                    fieldClassName="budget-table--input__number"
                    label={`approved total computable Medicaid funding for HIT and HIE for FFY ${year}`}
                    labelClassName="ds-u-visibility--screen-reader"
                    name={`hithie-approved-total-${year}`}
                    value={previousActivityExpenses[year].totalApproved}
                    onChange={getApprovedHandler(year)}
                  />
                )}
              </td>

              <td
                headers={`prev_act_hithie_row_${year}`}
                className="budget-table--number"
                data-cy={`prev_act_hithie_federal_approved_${year}`}
              >
                <Dollars>{federalApproved}</Dollars>
              </td>

              <td
                headers={`prev_act_hithie_row_${year}`}
                className={isViewOnly ? 'budget-table--number' : ''}
                data-cy="prev_act_hithie_federal_actual"
              >
                {isViewOnly ? (
                  <Dollars>
                    {previousActivityExpenses[year].federalActual}
                  </Dollars>
                ) : (
                  <DollarField
                    className="budget-table--input-holder"
                    fieldClassName="budget-table--input__number"
                    label={`actual ffp expenditures for HIT and HIE for FFY  ${year}`}
                    labelClassName="ds-u-visibility--screen-reader"
                    name={`hithie-actual-federal-${year}`}
                    value={previousActivityExpenses[year].federalActual}
                    onChange={getActualsHandler(year)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ApdPreviousActivityTable.propTypes = {
  isViewOnly: PropTypes.bool,
  previousActivityExpenses: PropTypes.object.isRequired,
  setActual: PropTypes.func.isRequired,
  setApproved: PropTypes.func.isRequired
};

ApdPreviousActivityTable.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = state => ({
  previousActivityExpenses: selectPreviousHITHIEActivities(state)
});

const mapDispatchToProps = {
  setActual: setPreviousActivityFederalActualExpenseForHITandHIE,
  setApproved: setPreviousActivityApprovedExpenseForHITandHIE
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdPreviousActivityTable);

export {
  ApdPreviousActivityTable as plain,
  mapStateToProps,
  mapDispatchToProps
};
