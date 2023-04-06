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
import { selectPreviousActivities } from '../../../redux/selectors/apd.selectors';

const MmisApdPreviousActivityTables = ({
  isViewOnly,
  previousActivityExpenses,
  setActual,
  setApproved
}) => {
  const years = Object.keys(previousActivityExpenses);

  const getActualsHandler = (year, ffp, fundingType) => {
    return ({ target: { value } }) => {
      setActual(year, value, ffp, fundingType);
    };
  };

  const getApprovedHandler = (year, ffp, fundingType) => {
    return ({ target: { value } }) => {
      setApproved(year, value, ffp, fundingType);
    };
  };

  const tables = [
    {
      ffp: 90,
      fundingTypeHeader: 'DDI',
      fundingTypeSchema: 'ddi'
    },
    {
      ffp: 75,
      fundingTypeHeader: 'DDI',
      fundingTypeSchema: 'ddi'
    },
    {
      ffp: 75,
      fundingTypeHeader: 'M&O',
      fundingTypeSchema: 'mando'
    },
    {
      ffp: 50,
      fundingTypeHeader: 'DDI',
      fundingTypeSchema: 'ddi'
    },
    {
      ffp: 50,
      fundingTypeHeader: 'M&O',
      fundingTypeSchema: 'mando'
    }
  ];

  return (
    <Fragment>
      {tables.map(level => (
        <table key={level} className="budget-table">
          {level.fundingTypeHeader === 'DDI' && (
            <caption className="ds-h4">
              MMIS {TABLE_HEADERS.federal(level.ffp)}
            </caption>
          )}
          <thead>
            <tr className="budget-table--row__primary-header">
              <th
                scope="col"
                colSpan="4"
              >{`MMIS ${level.fundingTypeHeader} at ${level.ffp}% FFP`}</th>
            </tr>
            <tr>
              <td className="th" aria-hidden="true" />
              <th
                id={`prev_act_mmis${level.ffp}_total_approved_${level.fundingTypeSchema}`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approvedTotal}
              </th>

              <th
                id={`prev_act_mmis${level.ffp}_federal_approved_${level.fundingTypeSchema}`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.approved(level.ffp)}
              </th>
              <th
                id={`prev_act_mmis${level.ffp}_federal_actual_${level.fundingTypeSchema}`}
                className="ds-u-text-align--right"
                scope="col"
              >
                {TABLE_HEADERS.actual}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const expenses =
                previousActivityExpenses[year][level.fundingTypeSchema][
                  level.ffp
                ];
              const federalApproved =
                (expenses.totalApproved * level.ffp) / 100;

              return (
                <tr key={year}>
                  <th
                    id={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    scope="row"
                    data-cy="yearRow"
                  >
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                  <td
                    headers={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_mmis${level.ffp}_total_approved`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.totalApproved}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`approved total computable Medicaid funding for MMIS at the ${
                          level.ffp
                        }/${
                          100 - level.ffp
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
                    headers={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    className="budget-table--number"
                    data-cy={`prev_act_mmis${level.ffp}_federal_approved_${year}`}
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_mmis${level.ffp}_federal_actual`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.federalActual}</Dollars>
                    ) : (
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`actual ffp expenditures for MMIS at the ${
                          level.ffp
                        }/${100 - level.ffp} level for FFY ${year}`}
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

MmisApdPreviousActivityTables.propTypes = {
  isViewOnly: PropTypes.bool,
  previousActivityExpenses: PropTypes.object.isRequired,
  setActual: PropTypes.func.isRequired,
  setApproved: PropTypes.func.isRequired
};

MmisApdPreviousActivityTables.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = state => ({
  previousActivityExpenses: selectPreviousActivities(state)
});

const mapDispatchToProps = {
  setActual: setPreviousActivityFederalActualExpense,
  setApproved: setPreviousActivityApprovedExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MmisApdPreviousActivityTables);

export {
  MmisApdPreviousActivityTables as plain,
  mapStateToProps,
  mapDispatchToProps
};
