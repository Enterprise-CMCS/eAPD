import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import Dollars from '../components/Dollars';
import { Input, DollarInput } from '../components/Inputs';
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

const thId = (fy, q) => `incentive-payments-table-fy${fy}${q ? `-q${q}` : ''}`;

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
            <h3 id={thId(year)}>{t('ffy', { year })}</h3>
            <table className="table-cms table-fixed">
              <thead>
                <tr>
                  <th />
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <th key={q} className="right-align" scope="col">
                        {t('table.quarter', { q })}
                      </th>
                    ))}
                    <th className="right-align" scope="col">
                      {t('table.subtotal')}
                    </th>
                  </Fragment>
                </tr>
              </thead>
              <tbody>
                {INCENTIVE_ENTRIES.map(({ id, name, type }) => {
                  const InputComponent =
                    type === 'amount' ? DollarInput : Input;

                  return (
                    <tr key={id}>
                      <th
                        className="align-middle"
                        scope="row"
                      >
                        {name}
                      </th>
                      <Fragment key={year}>
                        {QUARTERS.map(q => (
                          <td key={q}>
                            <InputComponent
                              name={`${id}-payments-${year}-q${q}`}
                              label={`${id} payments for ${year}, quarter ${q}`}
                              wrapperClass="m0"
                              className="m0 input input-condensed mono right-align"
                              value={data[id][year][q] || ''}
                              onChange={this.handleChange(id, year, q)}
                              hideLabel
                            />
                          </td>
                        ))}
                        <td
                          className="mono right-align align-middle"
                        >
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
