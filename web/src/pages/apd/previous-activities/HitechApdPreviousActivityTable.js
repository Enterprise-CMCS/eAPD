import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import {
  setPreviousActivityFederalActualExpense,
  setPreviousActivityApprovedExpense
} from '../../../redux/actions/editApd';
import { TABLE_HEADERS } from '../../../constants';
import { selectPreviousMMISActivitiesHITECH } from '../../../redux/selectors/apd.selectors';

const HitechApdPreviousActivityTable = ({
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

  const tables = [
    {
      ffp: 90,
      fundingTypeHeader: 'HIT + HIE ',
      fundingTypeSchema: 'hithie'
    },
    {
      ffp: 90,
      fundingTypeHeader: 'MMIS ',
      fundingTypeSchema: 'mmis'
    },
    {
      ffp: 75,
      fundingTypeHeader: 'MMIS ',
      fundingTypeSchema: 'mmis'
    },
    {
      ffp: 50,
      fundingTypeHeader: 'MMIS ',
      fundingTypeSchema: 'mmis'
    }
  ];

  return (
    <Fragment>
      {tables.map(level => (
        <table key={level.ffp} className="budget-table">
          <caption className="ds-h4">
            {level.fundingTypeHeader}
            {TABLE_HEADERS.federal(level.ffp)}
          </caption>
          <thead>
            <tr>
              <td className="th" aria-hidden="true" />
              <th
                id={`prev_act_${level.fundingTypeSchema}${level.ffp}_total_approved`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approvedTotal}
              </th>

              <th
                id={`prev_act_${level.fundingTypeSchema}${level.ffp}_federal_approved`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approved(level.ffp)}
              </th>
              <th
                id={`prev_act_${level.fundingTypeSchema}${level.ffp}_federal_actual`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.actual}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const expenses = previousActivityExpenses[year][level.ffp];
              const federalApproved =
                (expenses.totalApproved * level.ffp) / 100;

              return (
                <tr key={year}>
                  <th
                    id={`prev_act_${level.fundingTypeSchema}_row_${year}_${level.ffp}`}
                    scope="row"
                  >
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                  <td
                    headers={`prev_act_${level.fundingTypeSchema}_row_${year}_${level.ffp}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_${level.fundingTypeSchema}${level.ffp}_total_approved`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.totalApproved}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`approved total computable Medicaid funding for ${
                          level.fundingTypeHeader
                        } at the ${level.ffp}/${
                          100 - level
                        } level for FFY ${year}, state plus federal`}
                        labelClassName="ds-u-visibility--screen-reader"
                        name={`approved-total-${level.fundingTypeSchema}${level.ffp}-${year}`}
                        value={expenses.totalApproved}
                        onChange={getApprovedHandler(
                          year,
                          level.ffp,
                          level.fundingTypeSchema
                        )}
                      />
                    )}
                  </td>

                  <td
                    headers={`prev_act_${level.fundingTypeSchema}_row_${year}_${level.ffp}`}
                    className="budget-table--number"
                    data-cy={`prev_act_${level.fundingTypeSchema}${level.ffp}_federal_approved_${year}`}
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_${level.fundingTypeSchema}_row_${year}_${level.ffp}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_${level.fundingTypeSchema}${level.ffp}_federal_actual`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.federalActual}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`actual ffp expenditures for ${
                          level.fundingTypeHeader
                        } at the ${level.ffp}/${
                          100 - level
                        } level for FFY ${year}`}
                        labelClassName="ds-u-visibility--screen-reader"
                        name={`actual-federal-${level.fundingTypeSchema}${level.ffp}-${year}`}
                        value={expenses.federalActual}
                        onChange={getActualsHandler(
                          year,
                          level.ffp,
                          level.fundingTypeSchema
                        )}
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

HitechApdPreviousActivityTable.propTypes = {
  isViewOnly: PropTypes.bool,
  previousActivityExpenses: PropTypes.object.isRequired,
  setActual: PropTypes.func.isRequired,
  setApproved: PropTypes.func.isRequired
};

HitechApdPreviousActivityTable.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = state => ({
  previousActivityExpenses: selectPreviousMMISActivitiesHITECH(state)
});

const mapDispatchToProps = {
  setActual: setPreviousActivityFederalActualExpense,
  setApproved: setPreviousActivityApprovedExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HitechApdPreviousActivityTable);

export {
  HitechApdPreviousActivityTable as plain,
  mapStateToProps,
  mapDispatchToProps
};
