import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

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
  years
}) => {
  const updateEHPayment =
    (year, quarter) =>
    ({ target: { value } }) => {
      setEHPayment(year, quarter, value);
    };

  const updateEHCount =
    (year, quarter) =>
    ({ target: { value } }) => {
      setEHCount(year, quarter, value);
    };

  const updateEPPayment =
    (year, quarter) =>
    ({ target: { value } }) => {
      setEPPayment(year, quarter, value);
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
          <table className="budget-table" data-cy="EQIPTable">
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
                        <DollarField
                          className="budget-table--input-holder"
                          fieldClassName="budget-table--input__number"
                          aria-labelledby={`q${q} eh-payments`}
                          label={`ehAmt payments for ${year}, quarter ${q}`}
                          labelClassName="sr-only"
                          name={`ehAmt-payments-${year}-q${q}`}
                          value={data.ehAmt[year][q] || ''}
                          onChange={updateEHPayment(year, q)}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
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
                        <Dollars>{data.epAmt[year][q] || ''}</Dollars>
                      ) : (
                        <DollarField
                          className="budget-table--input-holder"
                          fieldClassName="budget-table--input__number"
                          aria-labelledby={`q${q} ep-payments`}
                          label={`epAmt payments for ${year}, quarter ${q}`}
                          labelClassName="sr-only"
                          name={`epAmt-payments-${year}-q${q}`}
                          value={data.epAmt[year][q] || ''}
                          onChange={updateEPPayment(year, q)}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    className="budget-table--number budget-table--col__highlight budget-table--subtotal"
                    data-cy="subtotal"
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
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

IncentivePayments.defaultProps = { isViewOnly: false };

const mapStateToProps = state => ({
  data: selectIncentivePayments(state),
  totals: selectIncentivePaymentTotals(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  setEHCount: setIncentiveEHCount,
  setEPCount: setIncentiveEPCount,
  setEHPayment: setIncentiveEHPayment,
  setEPPayment: setIncentiveEPPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(IncentivePayments);

export { IncentivePayments as plain, mapStateToProps, mapDispatchToProps };
