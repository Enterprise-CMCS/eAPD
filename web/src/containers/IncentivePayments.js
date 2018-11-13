import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Input, DollarInput } from '../components/Inputs';
import { t } from '../i18n';
import { INCENTIVE_ENTRIES } from '../util';
import { formatMoney, formatNum } from '../util/formats';

const QUARTERS = [1, 2, 3, 4];
const COLORS = ['teal', 'green', 'yellow'];

const thId = (fy, q) => `incentive-payments-table-fy${fy}${q ? `-q${q}` : ''}`;
const tdHdrs = (fy, q) =>
  `incentive-payments-table-fy${fy} incentive-payments-table-fy${fy}-q${q}`;

class IncentivePayments extends Component {
  handleChange = (key, year, quarter) => e => {
    const { value } = e.target;
    const incentivePayments = { [key]: { [year]: { [quarter]: value } } };
    this.props.updateApd({ incentivePayments });
  };

  render() {
    const { data, totals, years } = this.props;

    const yearsWithColors = years.map((year, i) => {
      const color = `bg-${COLORS[i] || 'gray'}`;
      const colorLight = `${color}-light`;
      return { year, color, colorLight };
    });

    return (
      <div className="table-frozen-wrapper">
        <div className="table-frozen-scroller">
          <table className="table-cms table-fixed table-frozen-left-pane" aria-hidden="true">
            <thead>
              <tr>
                <th className="table-frozen-null-cell">
                  " "
                </th>
              </tr>
              <tr>
                <th className="table-frozen-null-cell">
                  " "
                </th>
              </tr>
            </thead>
            <tbody>
              {INCENTIVE_ENTRIES.map(({ id, name, type }, i) => {
                return (
                  <tr key={id}>
                    <td>
                      {name}
                    </td>
                    <td>
                      <DollarInput
                        hideLabel
                        wrapperClass="m0"
                        className="fake-spacer-input m0 input input-condensed mono right-align"
                        label="null"
                      />
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
          <table className="table-cms table-fixed table-frozen-data" style={{ minWidth: 1200 }}>
            <thead>
              <tr>
                <th style={{ width: 140 }} id={thId('null1')} />
                {yearsWithColors.map(({ year, color }) => (
                  <th
                    key={year}
                    className={`center ${color}`}
                    colSpan="5"
                    id={thId(year)}
                  >
                    {t('ffy', { year })}
                  </th>
                ))}
                <th className="bg-black center" id={thId('total')}>
                  {t('table.total')}
                </th>
              </tr>
              <tr>
                <th id={thId('null2')} />
                {yearsWithColors.map(({ year, colorLight }) => (
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <th key={q} className="right-align" id={thId(year, q)}>
                        {t('table.quarter', { q })}
                      </th>
                    ))}
                    <th
                      className={`right-align ${colorLight}`}
                      id={thId(year, 'subtotal')}
                    >
                      {t('table.subtotal')}
                    </th>
                  </Fragment>
                ))}
                <th className="bg-gray-light" id={thId('total', 'grand')} />
              </tr>
            </thead>
            <tbody>
              {INCENTIVE_ENTRIES.map(({ id, name, type }, i) => {
                const InputComponent = type === 'amount' ? DollarInput : Input;
                const fmt = type === 'amount' ? formatMoney : formatNum;

                return (
                  <tr key={id}>
                    <td
                      className={`align-middle ${i % 2 === 0 ? 'bold' : ''}`}
                      headers="incentive-payments-table-fynull1 incentive-payments-table-fynull2"
                    >
                      {name}
                    </td>
                    {yearsWithColors.map(({ year, colorLight }) => (
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
                          className={`bold mono right-align align-middle ${colorLight}`}
                          headers={tdHdrs(year, 'subtotal')}
                        >
                          {fmt(totals[id].byYear[year])}
                        </td>
                      </Fragment>
                    ))}
                    <td
                      className="bold mono right-align align-middle bg-gray-light"
                      headers={tdHdrs('total', 'grand')}
                    >
                      {fmt(totals[id].allYears)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IncentivePayments);

export { IncentivePayments as plain, mapStateToProps, mapDispatchToProps };
