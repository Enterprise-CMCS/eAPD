import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import DollarField from '../components/DollarField';
import Dollars from '../components/Dollars';
import { t } from '../i18n';
import {
  selectApdYears,
  selectIncentivePayments,
  selectIncentivePaymentTotals
} from '../reducers/apd.selectors';
import { INCENTIVE_ENTRIES } from '../util';
import { formatNum } from '../util/formats';

const QUARTERS = [1, 2, 3, 4];

const formatNumber = (type, number) =>
  type === 'amount' ? <Dollars>{number}</Dollars> : formatNum(number);

class IncentivePayments extends Component {
  handleChange = (key, year, quarter) => e => {
    const { value } = e.target;
    const incentivePayments = { [key]: { [year]: { [quarter]: value } } };
    const { updateApd: action } = this.props;
    action({ incentivePayments });
  };

  render() {
    const { data, totals, years } = this.props;

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
                      <th
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
                {INCENTIVE_ENTRIES.map(({ id, name, type }) => {
                  const InputComponent =
                    type === 'amount' ? DollarField : TextField;

                  return (
                    <tr key={id}>
                      <th scope="row">{name}</th>
                      <Fragment key={year}>
                        {QUARTERS.map(q => (
                          <td key={q}>
                            <InputComponent
                              className="budget-table--input-holder"
                              fieldClassName="budget-table--input__number"
                              label={`${id} payments for ${year}, quarter ${q}`}
                              labelClassName="sr-only"
                              name={`${id}-payments-${year}-q${q}`}
                              value={data[id][year][q] || ''}
                              onChange={this.handleChange(id, year, q)}
                            />
                          </td>
                        ))}
                        <td className="budget-table--number budget-table--col__highlight budget-table--subtotal">
                          {formatNumber(type, totals[id].byYear[year])}
                        </td>
                      </Fragment>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

IncentivePayments.propTypes = {
  data: PropTypes.object.isRequired,
  totals: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  data: selectIncentivePayments(state),
  totals: selectIncentivePaymentTotals(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncentivePayments);

export { IncentivePayments as plain, mapStateToProps, mapDispatchToProps };
