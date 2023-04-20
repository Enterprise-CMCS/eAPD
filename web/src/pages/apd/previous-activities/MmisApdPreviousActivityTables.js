import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import {
  setPreviousActivityFederalActualExpense,
  setPreviousActivityApprovedExpense
} from '../../../redux/actions/editApd';
import { TABLE_HEADERS } from '../../../constants';
import { selectPreviousActivities } from '../../../redux/selectors/apd.selectors';
import { previousMmisActivitySchema as schema } from '@cms-eapd/common';

const MmisApdPreviousActivityTables = ({
  isViewOnly,
  previousActivityExpenses,
  setActual,
  setApproved
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: previousActivityExpenses,
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const years = Object.keys(previousActivityExpenses);

  const getActualsHandler = (year, value, ffp, fundingType) => {
    return setActual(year, value, ffp, fundingType);
  };

  const getApprovedHandler = (year, value, ffp, fundingType) => {
    return setApproved(year, value, ffp, fundingType);
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
        <table
          key={`${level.fundingTypeHeader}-${level.ffp}`}
          className="budget-table"
        >
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
              const errTotalApproved =
                errors &&
                errors[`${year}`] &&
                errors[`${year}`][level.fundingTypeSchema] &&
                errors[`${year}`][level.fundingTypeSchema][level.ffp]
                  ? errors[`${year}`][level.fundingTypeSchema][level.ffp]
                      ?.totalApproved?.message
                  : '';
              const errFederalActual =
                errors &&
                errors[`${year}`] &&
                errors[`${year}`][level.fundingTypeSchema] &&
                errors[`${year}`][level.fundingTypeSchema][level.ffp]
                  ? errors[`${year}`][level.fundingTypeSchema][level.ffp]
                      ?.federalActual?.message
                  : '';

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
                      <Controller
                        name={`${year}.${level.fundingTypeSchema}.${level.ffp}.totalApproved`}
                        control={control}
                        render={({ field: { name, ...props } }) => {
                          return (
                            <DollarField
                              {...props}
                              name={name}
                              data-testid={name}
                              className="budget-table--input-holder"
                              fieldClassName="budget-table--input__number"
                              label={`approved total computable Medicaid funding for MMIS at the ${
                                level.ffp
                              }/${
                                100 - level.ffp
                              } level for FFY ${year}, state plus federal`}
                              labelClassName="ds-u-visibility--screen-reader"
                              value={expenses.totalApproved}
                              onChange={e => {
                                getApprovedHandler(
                                  year,
                                  e.target.value,
                                  level.ffp,
                                  level.fundingTypeSchema
                                );
                                setValue(name, e.target.value, {
                                  shouldValidate: true
                                });
                              }}
                              errorMessage={errTotalApproved}
                              errorPlacement="bottom"
                            />
                          );
                        }}
                      />
                    )}
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    className="budget-table--number"
                    data-cy={`prev_act_mmis${level.ffp}_federal_approved_${level.fundingTypeSchema}_${year}`}
                  >
                    <Dollars>
                      {(expenses.totalApproved * level.ffp) / 100}
                    </Dollars>
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year}_${level.ffp}_${level.fundingTypeSchema}`}
                    className={isViewOnly ? 'budget-table--number' : ''}
                    data-cy={`prev_act_mmis${level.ffp}_federal_actual`}
                  >
                    {isViewOnly ? (
                      <Dollars>{expenses.federalActual}</Dollars>
                    ) : (
                      <Controller
                        name={`${year}.${level.fundingTypeSchema}.${level.ffp}.federalActual`}
                        control={control}
                        render={({ field: { name, ...props } }) => {
                          return (
                            <DollarField
                              {...props}
                              data-testid={name}
                              className="budget-table--input-holder"
                              fieldClassName="budget-table--input__number"
                              label={`actual ffp expenditures for MMIS at the ${
                                level.ffp
                              }/${100 - level.ffp} level for FFY ${year}`}
                              labelClassName="ds-u-visibility--screen-reader"
                              value={expenses.federalActual}
                              onChange={e => {
                                setValue(name, e.target.value, {
                                  shouldValidate: true
                                });
                                getActualsHandler(
                                  year,
                                  e.target.value,
                                  level.ffp,
                                  level.fundingTypeSchema
                                );
                              }}
                              errorMessage={errFederalActual}
                              errorPlacement="bottom"
                            />
                          );
                        }}
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
