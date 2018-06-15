// import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { defaultAPDYearOptions } from '../util';
import { formatMoney } from '../util/formats';
import { DollarInput } from '../components/Inputs';

const ApdPreviousActivityTable = () => {
  const sections = { hit: 'HIT', hie: 'HIE', hitAndHie: 'HIT + HIE' };
  const colors = ['aqua', 'blue', 'navy'];
  const years = defaultAPDYearOptions.map(y => +y - 2); // ['2018', '2019', '2020'];

  const borderClass = i => `border-left border-${i < 0 ? 'gray' : colors[i]}`;

  return (
    <table
      className={`h6 table-fixed table-condensed border-right border-${
        colors[2]
      }`}
      style={{ minWidth: 1200 }}
    >
      <thead>
        <tr>
          <th />
          {Object.values(sections).map((name, i) => (
            <th
              colSpan={4 + (i === 2 ? 2 : 0)}
              className={`bg-${colors[i]} white center border border-${
                colors[i]
              }`}
            >
              {name}
            </th>
          ))}
        </tr>
        <tr>
          <th className="border-none" />
          {Object.values(sections).map((_, i) => (
            <Fragment>
              <th colSpan="2" className={borderClass(i)}>
                Federal share<br />90% FFP
              </th>
              <th colSpan="2" className={borderClass(i)}>
                State share<br />10% FFP
              </th>
            </Fragment>
          ))}
          <th colSpan="2" className={`border-right ${borderClass(2)}`}>
            Federal + state<br />Grand total computable
          </th>
        </tr>
        <tr>
          <th />
          {Object.values(sections).map((_, i) => (
            <Fragment>
              <th className={`bg-${colors[i]}-light ${borderClass(i)}`}>
                Approved
              </th>
              <th className={borderClass(-1)}>Actual</th>
              <th className={`bg-${colors[i]}-light ${borderClass(i)}`}>
                Approved
              </th>
              <th className={borderClass(-1)}>Actual</th>
            </Fragment>
          ))}
          <th className={`bg-${colors[2]}-light ${borderClass(2)}`}>
            Approved
          </th>
          <th className={borderClass(-1)}>Actual</th>
        </tr>
      </thead>
      <tbody>
        {years.map(year => (
          <tr className="border border-gray">
            <th>FFY {year}</th>
            {Object.keys(sections).map((program, i) => (
              <Fragment>
                <td className={`bg-${colors[i]}-light ${borderClass(i)}`}>
                  <DollarInput
                    name={`approved-federal-${program}-${year}`}
                    label={`approved federal share for ${program}, FFY ${year}`}
                    hideLabel
                    value={0}
                  />
                </td>
                <td className={borderClass(-1)}>
                  <DollarInput
                    name={`actual-federal-${program}-${year}`}
                    label={`actual federal share for ${program}, FFY ${year}`}
                    hideLabel
                    value={0}
                  />
                </td>

                <td className={`bg-${colors[i]}-light ${borderClass(i)}`}>
                  <DollarInput
                    name={`approved-state-${program}-${year}`}
                    label={`approved state share for ${program}, FFY ${year}`}
                    hideLabel
                    value={0}
                  />
                </td>
                <td className={borderClass(-1)}>
                  {' '}
                  <DollarInput
                    name={`actual-state-${program}-${year}`}
                    label={`actual state share for ${program}, FFY ${year}`}
                    hideLabel
                    value={0}
                  />
                </td>
              </Fragment>
            ))}
            <td className={`bg-${colors[2]}-light ${borderClass(2)}`}>
              {formatMoney(27000)}
            </td>
            <td>{formatMoney(3000)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ApdPreviousActivityTable.propTypes = {
  // updateApd: PropTypes.func.isRequired
};

const mapDispatchToProps = { updateApd: () => {} };

export default connect(null, mapDispatchToProps)(ApdPreviousActivityTable);
