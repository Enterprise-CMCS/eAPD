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
      <div className="overflow-auto">
        <table className="table-cms table-fixed" style={{ minWidth: 1200 }}>
          <thead>
            <tr>
              <th style={{ width: 160 }} />
              {yearsWithColors.map(({ year, color }) => (
                <th key={year} className={`center ${color}`} colSpan="5">
                  {t('ffy', { year })}
                </th>
              ))}
              <th className="bg-black center">{t('table.total')}</th>
            </tr>
            <tr>
              <th />
              {yearsWithColors.map(({ year, colorLight }) => (
                <Fragment key={year}>
                  {QUARTERS.map(q => (
                    <th key={q} className="right-align">
                      {t('table.quarter', { q })}
                    </th>
                  ))}
                  <th className={`right-align ${colorLight}`}>
                    {t('table.subtotal')}
                  </th>
                </Fragment>
              ))}
              <th className="bg-gray-light" />
            </tr>
          </thead>
          <tbody>
            {INCENTIVE_ENTRIES.map(({ id, name, type }, i) => {
              const InputComponent = type === 'amount' ? DollarInput : Input;
              const fmt = type === 'amount' ? formatMoney : formatNum;

              return (
                <tr key={id}>
                  <td className={`align-middle ${i % 2 === 0 ? 'bold' : ''}`}>
                    {name}
                  </td>
                  {yearsWithColors.map(({ year, colorLight }) => (
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <td key={q}>
                          <InputComponent
                            name={`eh-payments-${year}-q1`}
                            label={`eh-payments-${year}-q1`}
                            wrapperClass="m0"
                            className="m0 input input-condensed mono right-align"
                            value={data[id][year][q]}
                            onChange={this.handleChange(id, year, q)}
                            hideLabel
                          />
                        </td>
                      ))}
                      <td
                        className={`bold mono right-align align-middle ${colorLight}`}
                      >
                        {fmt(totals[id].byYear[year])}
                      </td>
                    </Fragment>
                  ))}
                  <td className="bold mono right-align align-middle bg-gray-light">
                    {fmt(totals[id].allYears)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
