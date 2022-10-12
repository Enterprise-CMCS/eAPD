import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import incentivePayments from '@cms-eapd/common/schemas/incentivePayments';

import {
  setIncentiveEHCount,
  setIncentiveEPCount,
  setIncentiveEHPayment,
  setIncentiveEPPayment
} from '../../../redux/actions/editApd';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';
import { t } from '../../../i18n';
import {
  selectApdYears,
  selectIncentivePayments,
  selectIncentivePaymentTotals
} from '../../../redux/selectors/apd.selectors';
import { formatNum } from '../../../util/formats';

const QUARTERS = [1, 2, 3, 4];

const IncentivePayments = ({
  data,
  setEHCount,
  setEPCount,
  setEHPayment,
  setEPPayment,
  totals,
  isViewOnly,
  years,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: {
      data
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(incentivePayments)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dollar_error = v => {
    if (adminCheck) {
      return v >= 0 && v % 1 == 0 && !isNaN(parseInt(v)) ? false : true;
    }
  };

  const updateEHCount =
    (year, quarter) =>
    ({ target: { value } }) => {
      setEHCount(year, quarter, value);
    };

  const updateEPCount =
    (year, quarter) =>
    ({ target: { value } }) => {
      setEPCount(year, quarter, value);
    };

  return (
    <Fragment>
      {years.map(year => (
        <Fragment key={year}>
          <table
            name={`EQIPTable ${year}`}
            className="budget-table"
            data-cy="EQIPTable"
          >
            <caption className="ds-u-visibility--screen-reader">
              {t('ffy', { year })} Incentive Payments by Quarter
            </caption>
            <thead>
              <tr>
                <th>
                  <span aria-hidden="true">{t('ffy', { year })}</span>
                </th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <th
                      id={`q${q}`}
                      key={q}
                      className="ds-u-text-align--right"
                      scope="col"
                    >
                      {t('table.quarter', { q })}
                    </th>
                  ))}
                  <th
                    className="ds-u-text-align--right budget-table--subtotal budget-table--col__highlight"
                    scope="col"
                  >
                    {t('table.subtotal')}
                  </th>
                </Fragment>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th id="eh-payments" scope="row">
                  EH Payments
                </th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q} className="budget-table--number">
                      {isViewOnly ? (
                        <Dollars>{data.ehAmt[year][q] || ''}</Dollars>
                      ) : (
                        <Controller
                          name={`data.ehAmt.${year}.${q}`}
                          control={control}
                          render={({ field: { onChange, name, ...props } }) => (
                            <DollarField
                              {...props}
                              name={name}
                              className="budget-table--input-holder"
                              fieldClassName={
                                dollar_error(data.ehAmt[year][q])
                                  ? 'budget-table--input__number-error'
                                  : 'budget-table--input__number'
                              }
                              aria-labelledby={`q${q} eh-payments`}
                              label={`ehAmt payments for ${year}, quarter ${q}`}
                              data-testid={`ehAmt ${year} ${q}`}
                              labelClassName="sr-only"
                              value={data.ehAmt[year][q] || '0'}
                              onChange={({ target: { value } }) => {
                                setEHPayment(year, q, value);
                                onChange(value);

                                if (adminCheck) {
                                  trigger();
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
                    data-testid={`ehAmt ${year} total`}
                  >
                    <Dollars>{totals.ehAmt.byYear[year]}</Dollars>
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th id="eh-count" scope="row">
                  EH Count (optional)
                </th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q} className="budget-table--number">
                      {isViewOnly ? (
                        data.ehCt[year][q] || 0
                      ) : (
                        <NumberField
                          className="budget-table--input-holder"
                          fieldClassName="budget-table--input__number"
                          aria-labelledby={`q${q} eh-count`}
                          label={`ehCt payments for ${year}, quarter ${q}`}
                          labelClassName="sr-only"
                          name={`ehCt-payments-${year}-q${q}`}
                          value={data.ehCt[year][q] || ''}
                          onChange={updateEHCount(year, q)}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
                  >
                    {formatNum(totals.ehCt.byYear[year])}
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th id="ep-payments" scope="row">
                  EP Payments
                </th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q} className="budget-table--number">
                      {isViewOnly ? (
                        <Dollars>{data.epAmt[year][q] || '0'}</Dollars>
                      ) : (
                        <Controller
                          name={`data.epAmt.${year}.${q}`}
                          control={control}
                          render={({ field: { onChange, name, ...props } }) => (
                            <DollarField
                              {...props}
                              name={name}
                              className="budget-table--input-holder"
                              fieldClassName={
                                dollar_error(data.epAmt[year][q])
                                  ? 'budget-table--input__number-error'
                                  : 'budget-table--input__number'
                              }
                              aria-labelledby={`q${q} ep-payments`}
                              label={`epAmt payments for ${year}, quarter ${q}`}
                              labelClassName="sr-only"
                              value={data.epAmt[year][q] || '0'}
                              data-testid={`epAmt ${year} ${q}`}
                              onChange={({ target: { value } }) => {
                                setEPPayment(year, q, value);
                                onChange(value);

                                if (adminCheck) {
                                  trigger();
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
                    data-testid={`epAmt ${year} total`}
                  >
                    <Dollars>{totals.epAmt.byYear[year]}</Dollars>
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th id="ep-count" scope="row">
                  EP Count (optional)
                </th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q} className="budget-table--number">
                      {isViewOnly ? (
                        data.epCt[year][q] || 0
                      ) : (
                        <NumberField
                          className="budget-table--input-holder"
                          fieldClassName="budget-table--input__number"
                          aria-labelledby={`q${q} ep-count`}
                          label={`epCt payments for ${year}, quarter ${q}`}
                          labelClassName="sr-only"
                          name={`epCt-payments-${year}-q${q}`}
                          value={data.epCt[year][q] || ''}
                          onChange={updateEPCount(year, q)}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
                  >
                    {formatNum(totals.epCt.byYear[year])}
                  </td>
                </Fragment>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ))}
      <div>
        {errors?.data && (
          <span
            className="ds-u-margin-top--2 ds-u-font-size--sm ds-u-font-weight--bold ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            Provide a whole number greater than or equal to $0. Decimals will be
            rounded to the closest number.
          </span>
        )}
      </div>
    </Fragment>
  );
};

IncentivePayments.propTypes = {
  data: PropTypes.object.isRequired,
  setEHCount: PropTypes.func.isRequired,
  setEPCount: PropTypes.func.isRequired,
  setEHPayment: PropTypes.func.isRequired,
  setEPPayment: PropTypes.func.isRequired,
  totals: PropTypes.object.isRequired,
  isViewOnly: PropTypes.bool,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  adminCheck: PropTypes.bool
};

IncentivePayments.defaultProps = { isViewOnly: false };

const mapStateToProps = state => ({
  data: selectIncentivePayments(state),
  totals: selectIncentivePaymentTotals(state),
  years: selectApdYears(state),
  adminCheck: state.apd.adminCheck
});

const mapDispatchToProps = {
  setEHCount: setIncentiveEHCount,
  setEPCount: setIncentiveEPCount,
  setEHPayment: setIncentiveEHPayment,
  setEPPayment: setIncentiveEPPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(IncentivePayments);

export { IncentivePayments as plain, mapStateToProps, mapDispatchToProps };
