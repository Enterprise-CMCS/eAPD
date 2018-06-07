import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Input, DollarInput } from '../components/Inputs';
import { INCENTIVE_ENTRIES } from '../util';
import { formatMoney, formatNum } from '../util/formats';

const YEARS = ['2018'];
const QUARTERS = [1, 2, 3, 4];

class IncentivePayments extends Component {
  handleChange = (key, year, quarter) => e => {
    const { value } = e.target;
    const incentivePayments = { [key]: { [year]: { [quarter]: value } } };
    this.props.updateApd({ incentivePayments });
  };

  render() {
    const { data, totals } = this.props;

    return (
      <div className="py1 overflow-auto">
        <table className="h6 table-fixed table-bordered">
          <thead>
            <tr>
              <th style={{ width: 200 }} />
              {YEARS.map(year => (
                <th key={year} className="bg-teal white center" colSpan="5">
                  FFY {year}
                </th>
              ))}
              <th className="bg-black white center">Total</th>
            </tr>
            <tr>
              <th />
              {YEARS.map(year => (
                <Fragment key={year}>
                  <th className="right-align">Q1</th>
                  <th className="right-align">Q2</th>
                  <th className="right-align">Q3</th>
                  <th className="right-align">Q4</th>
                  <th className="right-align">Subtotal</th>
                </Fragment>
              ))}
              <th />
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
                  {YEARS.map(year => (
                    <Fragment key={year}>
                      {QUARTERS.map(q => (
                        <td key={q}>
                          <InputComponent
                            name={`eh-payments-${year}-q1`}
                            label={`eh-payments-${year}-q1`}
                            wrapperClass="m0"
                            className="m0 input mono right-align"
                            value={data[id][year][q]}
                            onChange={this.handleChange(id, year, q)}
                            hideLabel
                          />
                        </td>
                      ))}
                      <td className="bold mono right-align align-middle">
                        {fmt(totals[id].byYear[year])}
                      </td>
                    </Fragment>
                  ))}
                  <td className="bold mono right-align align-middle">
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
  updateApd: PropTypes.func.isRequired
};

const addObjVals = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);

/* eslint-disable no-param-reassign */
const getTotals = data =>
  INCENTIVE_ENTRIES.reduce((obj, entry) => {
    const datum = data[entry.id];
    const byYear = YEARS.reduce((obj2, yr) => {
      obj2[yr] = addObjVals(datum[yr]);
      return obj2;
    }, {});

    obj[entry.id] = { byYear, allYears: addObjVals(byYear) };
    return obj;
  }, {});

const mapStateToProps = ({ apd }) => {
  const data = apd.data.incentivePayments;
  const totals = getTotals(data);

  return { data, totals };
};

const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(IncentivePayments);
