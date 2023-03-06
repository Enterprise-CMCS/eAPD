import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import {
  setPreviousActivityFederalActualExpenseforMMISOld,
  setPreviousActivityApprovedExpenseforMMISOld
} from '../../../redux/actions/editApd';
import { TABLE_HEADERS } from '../../../constants';
import { selectPreviousMMISActivitiesHITECH } from '../../../redux/selectors/apd.selectors';

const HitechApdPreviousActivityMmis = ({
  isViewOnly,
  previousActivityExpenses,
  setActual,
  setApproved
}) => {
  const years = Object.keys(previousActivityExpenses);

  const getActualsHandler = (year, level) => {
    return ({ target: { value } }) => {
      setActual(year, value, level);
    };
  };

  const getApprovedHandler = (year, level) => {
    return ({ target: { value } }) => {
      setApproved(year, value, level);
    };
  };

  return (
    <Fragment>
      {[90, 75, 50].map(level => (
        <table key={level} className="budget-table">
          <caption className="ds-h4">
            MMIS {TABLE_HEADERS.federal(level)}
          </caption>
          <thead>
            <tr>
              <td className="th" aria-hidden="true" />
              <th
                id={`prev_act_mmis${level}_total_approved`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approvedTotal}
              </th>

              <th
                id={`prev_act_mmis${level}_federal_approved`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approved(level)}
              </th>
              <th
                id={`prev_act_mmis${level}_federal_actual`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.actual}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const expenses = previousActivityExpenses[year][level];
              const federalApproved = (expenses.totalApproved * level) / 100;

              return (
                <tr key={year}>
                  <th id={`prev_act_mmis_row_${year}_${level}`} scope="row">
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                  <td
                    headers={`prev_act_mmis_row_${year}_${level}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_mmis${level}_total_approved`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.totalApproved}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`approved total computable Medicaid funding for MMIS at the ${level}/${
                          100 - level
                        } level for FFY ${year}, state plus federal`}
                        labelClassName="ds-u-visibility--screen-reader"
                        name={`approved-total-mmis${level}-${year}`}
                        value={expenses.totalApproved}
                        onChange={getApprovedHandler(year, level)}
                      />
                    )}
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year}_${level}`}
                    className="budget-table--number"
                    data-cy={`prev_act_mmis${level}_federal_approved_${year}`}
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year}_${level}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_mmis${level}_federal_actual`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.federalActual}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`actual ffp expenditures for MMIS at the ${level}/${
                          100 - level
                        } level for FFY ${year}`}
                        labelClassName="ds-u-visibility--screen-reader"
                        name={`actual-federal-mmis${level}-${year}`}
                        value={expenses.federalActual}
                        onChange={getActualsHandler(year, level)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </Fragment>
  );
};

HitechApdPreviousActivityMmis.propTypes = {
  isViewOnly: PropTypes.bool,
  previousActivityExpenses: PropTypes.object.isRequired,
  setActual: PropTypes.func.isRequired,
  setApproved: PropTypes.func.isRequired
};

HitechApdPreviousActivityMmis.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = state => ({
  previousActivityExpenses: selectPreviousMMISActivitiesHITECH(state)
});

const mapDispatchToProps = {
  setActual: setPreviousActivityFederalActualExpenseforMMISOld,
  setApproved: setPreviousActivityApprovedExpenseforMMISOld
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HitechApdPreviousActivityMmis);

export {
  HitechApdPreviousActivityMmis as plain,
  mapStateToProps,
  mapDispatchToProps
};
