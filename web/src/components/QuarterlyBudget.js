import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { formatMoney } from '../util/formats';

const fakeData = {
  inHouse: {
    name: 'In-house',
    values: {
      total: 2000,
      '2018': {
        total: 1000,
        byQuarter: {
          1: 100,
          2: 200,
          3: 300,
          4: 400
        }
      },
      '2019': {
        total: 1000,
        byQuarter: {
          1: 100,
          2: 200,
          3: 300,
          4: 400
        }
      }
    }
  },
  privateContractor: {
    name: 'Private Contractor',
    values: {
      total: 20000,
      '2018': {
        total: 10000,
        byQuarter: {
          1: 1000,
          2: 2000,
          3: 3000,
          4: 4000
        }
      },
      '2019': {
        total: 10000,
        byQuarter: {
          1: 1000,
          2: 2000,
          3: 3000,
          4: 4000
        }
      }
    }
  },
  combined: {
    name: 'Total Enhanced FFP',
    values: {
      total: 22000,
      '2018': {
        total: 11000,
        byQuarter: {
          1: 1100,
          2: 2200,
          3: 3300,
          4: 4400
        }
      },
      '2019': {
        total: 11000,
        byQuarter: {
          1: 1100,
          2: 2200,
          3: 3300,
          4: 4400
        }
      }
    }
  }
};

const colors = {
  '2018': 'bg-light-blue',
  '2019': 'bg-light-green'
};

const NumCell = ({ bold, color, fmt, value }) => (
  <td className={`mono right-align ${color || ''} ${bold ? 'bold' : ''}`}>
    {fmt(value)}
  </td>
);

NumCell.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  fmt: PropTypes.func
};

NumCell.defaultProps = {
  bold: false,
  color: null,
  fmt: formatMoney
};

const QuarterlyBudget = () => (
  <div className="py1 overflow-auto">
    <table
      className="h6 table-fixed table-bordered table-budget"
      style={{ minWidth: 1200 }}
    >
      <thead>
        <tr>
          <th style={{ width: 200 }} />
          <th className="bg-teal white center" colSpan="5">
            FFY 2018
          </th>
          <th className="bg-green white center" colSpan="5">
            FFY 2019
          </th>
          <th className="bg-black white center">Total</th>
        </tr>
        <tr>
          <th />
          {['2018', '2019'].map(year => (
            <Fragment key={year}>
              <th className="right-align border-left-thick">Q1</th>
              <th className="right-align">Q2</th>
              <th className="right-align">Q3</th>
              <th className="right-align">Q4</th>
              <th className={`right-align ${colors[year]}`}>Subtotal</th>
            </Fragment>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {Object.keys(fakeData).map(key => {
          const { name, values } = fakeData[key];
          const isLast = key === 'combined';
          return (
            <tr key={key} className={isLast ? 'bold' : ''}>
              <td>{name}</td>
              {['2018', '2019'].map(year => {
                const extra = isLast && { color: colors[year] };
                return (
                  <Fragment key={year}>
                    <NumCell value={values[year].byQuarter[1]} {...extra} />
                    <NumCell value={values[year].byQuarter[2]} {...extra} />
                    <NumCell value={values[year].byQuarter[3]} {...extra} />
                    <NumCell value={values[year].byQuarter[4]} {...extra} />
                    <NumCell
                      value={values[year].total}
                      color={colors[year]}
                      bold
                    />
                  </Fragment>
                );
              })}
              <NumCell value={values.total} color="bg-silver" bold />
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default QuarterlyBudget;
