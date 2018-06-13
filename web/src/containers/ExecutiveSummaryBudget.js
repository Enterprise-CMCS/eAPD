import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const DollarCell = ({ value }) => (
  <td className="mono right-align">{formatMoney(value)}</td>
);

DollarCell.propTypes = {
  value: PropTypes.number.isRequired
};

const ExecutiveSummaryBudget = ({ budget }) => {
  const { hit, hie, hitAndHie, years } = budget;

  if (!years.length) return null;

  const rowKeys = [
    ...years.map(year => ({ year, display: t('ffy', { year }) })),
    { year: 'total', display: 'Total' }
  ];

  return (
    <div>
      <div className="mb3 overflow-auto">
        <table className="h6 table-condensed table-bordered">
          <thead>
            <tr>
              <th />
              <th className="center" colSpan="2">
                HIT
              </th>
              <th className="center" colSpan="2">
                HIE
              </th>
              <th className="center" colSpan="3">
                HIT + HIE
              </th>
            </tr>
            <tr>
              <th />
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Grand total</th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr key={year}>
                <td>{display}</td>
                <DollarCell value={hit.combined[year].federal} />
                <DollarCell value={hit.combined[year].state} />
                <DollarCell value={hie.combined[year].federal} />
                <DollarCell value={hie.combined[year].state} />
                <DollarCell value={hitAndHie.combined[year].federal} />
                <DollarCell value={hitAndHie.combined[year].state} />
                <DollarCell value={hitAndHie.combined[year].total} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-auto">
        <table className="h6 table-condensed table-bordered">
          <thead>
            <tr>
              <th />
              <th className="center" colSpan="3">
                MMIS
              </th>
            </tr>
            <tr>
              <th />
              <th className="right-align">Federal share</th>
              <th className="right-align">Federal share</th>
              <th className="right-align">Grand total</th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr key={year}>
                <td>{display}</td>
                <DollarCell value={hitAndHie.combined[year].federal} />
                <DollarCell value={hitAndHie.combined[year].state} />
                <DollarCell value={hitAndHie.combined[year].total} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ExecutiveSummaryBudget.propTypes = {
  budget: PropTypes.object.isRequired
};

const mapStateToProps = ({ budget }) => ({ budget });

export default connect(mapStateToProps)(ExecutiveSummaryBudget);
