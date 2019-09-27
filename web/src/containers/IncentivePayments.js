import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setIncentiveEHCount,
  setIncentiveEPCount,
  setIncentiveEHPayment,
  setIncentiveEPPayment
} from '../actions/editApd';
import DollarField from '../components/DollarField';
import Dollars from '../components/Dollars';
import NumberField from '../components/NumberField';
import { t } from '../i18n';
import {
  selectApdYears,
  selectIncentivePayments,
  selectIncentivePaymentTotals
} from '../reducers/apd.selectors';
import { formatNum } from '../util/formats';

const QUARTERS = [1, 2, 3, 4];

const IncentivePayments = () => {
  const dispatch = useDispatch();

  const updateEHPayment = (year, quarter) => ({ target: { value } }) => {
    dispatch(setIncentiveEHPayment(year, quarter, value));
  };

  const updateEHCount = (year, quarter) => ({ target: { value } }) => {
    dispatch(setIncentiveEHCount(year, quarter, value));
  };

  const updateEPPayment = (year, quarter) => ({ target: { value } }) => {
    dispatch(setIncentiveEPPayment(year, quarter, value));
  };

  const updateEPCount = (year, quarter) => ({ target: { value } }) => {
    dispatch(setIncentiveEPCount(year, quarter, value));
  };

  const { data, totals, years } = useSelector(state => ({
    data: selectIncentivePayments(state),
    totals: selectIncentivePaymentTotals(state),
    years: selectApdYears(state)
  }));

  return (
    <Fragment>
      {years.map(year => (
        <Fragment key={year}>
          <table className="budget-table">
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
                    <th key={q} className="ds-u-text-align--right" scope="col">
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
                <th scope="row">EH Payments</th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q}>
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`ehAmt payments for ${year}, quarter ${q}`}
                        labelClassName="sr-only"
                        name={`ehAmt-payments-${year}-q${q}`}
                        value={data.ehAmt[year][q] || ''}
                        onChange={updateEHPayment(year, q)}
                      />
                    </td>
                  ))}
                  <td className="budget-table--number budget-table--col__highlight budget-table--subtotal">
                    <Dollars>{totals.ehAmt.byYear[year]}</Dollars>
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th scope="row">EH Count (optional)</th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q}>
                      <NumberField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`ehCt payments for ${year}, quarter ${q}`}
                        labelClassName="sr-only"
                        name={`ehCt-payments-${year}-q${q}`}
                        value={data.ehCt[year][q] || ''}
                        onChange={updateEHCount(year, q)}
                      />
                    </td>
                  ))}
                  <td className="budget-table--number budget-table--col__highlight budget-table--subtotal">
                    {formatNum(totals.ehCt.byYear[year])}
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th scope="row">EP Payments</th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q}>
                      <DollarField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`epAmt payments for ${year}, quarter ${q}`}
                        labelClassName="sr-only"
                        name={`epAmt-payments-${year}-q${q}`}
                        value={data.epAmt[year][q] || ''}
                        onChange={updateEPPayment(year, q)}
                      />
                    </td>
                  ))}
                  <td className="budget-table--number budget-table--col__highlight budget-table--subtotal">
                    <Dollars>{totals.epAmt.byYear[year]}</Dollars>
                  </td>
                </Fragment>
              </tr>

              <tr>
                <th scope="row">EP Count (optional)</th>
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <td key={q}>
                      <NumberField
                        className="budget-table--input-holder"
                        fieldClassName="budget-table--input__number"
                        label={`epCt payments for ${year}, quarter ${q}`}
                        labelClassName="sr-only"
                        name={`epCt-payments-${year}-q${q}`}
                        value={data.epCt[year][q] || ''}
                        onChange={updateEPCount(year, q)}
                      />
                    </td>
                  ))}
                  <td className="budget-table--number budget-table--col__highlight budget-table--subtotal">
                    {formatNum(totals.epCt.byYear[year])}
                  </td>
                </Fragment>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default IncentivePayments;
