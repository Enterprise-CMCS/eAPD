import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import Dollars from '../components/Dollars';
import { Input, DollarInput } from '../components/Inputs';
import { t } from '../i18n';
import { INCENTIVE_ENTRIES } from '../util';
import { formatNum } from '../util/formats';

const QUARTERS = [1, 2, 3, 4];

const formatNumber = (type, number) =>
  type === 'amount' ? <Dollars>{number}</Dollars> : formatNum(number);

const thId = (fy, q) => `incentive-payments-table-fy${fy}${q ? `-q${q}` : ''}`;
const tdHdrs = (fy, q) =>
  `incentive-payments-table-fy${fy} incentive-payments-table-fy${fy}-q${q}`;

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
        {years.map(( year ) => (
        <Fragment>
          <h3 id={thId(year)}>
            {t('ffy', { year })}
          </h3>
          <table className="table-cms table-fixed">
            <thead>
              <tr>
                <th id={thId('null2')} />
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <th key={q} className="right-align" id={thId(year, q)}>
                      {t('table.quarter', { q })}
                    </th>
                  ))}
                  <th
                    className="right-align"
                    id={thId(year, 'subtotal')}
                  >
                    {t('table.subtotal')}
                  </th>
                </Fragment>
              </tr>
            </thead>
            <tbody>
              {INCENTIVE_ENTRIES.map(({ id, name, type }, i) => {
                const InputComponent = type === 'amount' ? DollarInput : Input;

                return (
                  <tr key={id}>
                    <td
                      className={`align-middle ${i % 2 === 0 ? 'bold' : ''}`}
                      headers="incentive-payments-table-fynull1 incentive-payments-table-fynull2"
                    >
                      {name}
                    </td>
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <td key={q} headers={tdHdrs(year, q)}>
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
                        className="bold mono right-align align-middle"
                        headers={tdHdrs(year, 'subtotal')}
                      >
                        {formatNumber(totals[id].byYear[year])}
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

const addObjVals = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);

/* eslint-disable no-param-reassign */
const getTotals = (data, years) =>
  INCENTIVE_ENTRIES.reduce((obj, entry) => {
    const datum = data[entry.id];
    const byYear = years.reduce((obj2, yr) => {
      obj2[yr] = addObjVals(datum[yr]);
      return obj2;
    }, {});

    obj[entry.id] = { byYear, allYears: addObjVals(byYear) };
    return obj;
  }, {});

const mapStateToProps = ({ apd }) => {
  const { incentivePayments: data, years } = apd.data;
  const totals = getTotals(data, years);

  return { data, totals, years };
};

const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncentivePayments);

export { IncentivePayments as plain, mapStateToProps, mapDispatchToProps };
