import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const DollarCell = ({ value }) => (
  <td className="mono right-align">{formatMoney(value)}</td>
);

DollarCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

const ExecutiveSummaryBudget = ({ budget }) => {
  const { hit, hie, hitAndHie, mmisByFFP, years } = budget;

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
                {t('executiveSummary.budgetTable.hit')}
              </th>
              <th className="center" colSpan="2">
                {t('executiveSummary.budgetTable.hie')}
              </th>
              <th className="center" colSpan="3">
                {t('executiveSummary.budgetTable.hitHie')}
              </th>
            </tr>
            <tr>
              <th />
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.grandTotal')}
              </th>
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
              <th className="center" colSpan="2">
                {t('executiveSummary.budgetTable.mmis90')}
              </th>
              <th className="center" colSpan="2">
                {t('executiveSummary.budgetTable.mmis75')}
              </th>
              <th className="center" colSpan="2">
                {t('executiveSummary.budgetTable.mmis50')}
              </th>
              <th className="center" colSpan="3">
                {t('executiveSummary.budgetTable.mmisTotal')}
              </th>
            </tr>
            <tr>
              <th />
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align">
                {t('executiveSummary.budgetTable.grandTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr key={year}>
                <td>{display}</td>
                <DollarCell value={mmisByFFP['90-10'][year].federal} />
                <DollarCell value={mmisByFFP['90-10'][year].state} />
                <DollarCell value={mmisByFFP['75-25'][year].federal} />
                <DollarCell value={mmisByFFP['75-25'][year].state} />
                <DollarCell value={mmisByFFP['50-50'][year].federal} />
                <DollarCell value={mmisByFFP['50-50'][year].state} />
                <DollarCell value={mmisByFFP.combined[year].federal} />
                <DollarCell value={mmisByFFP.combined[year].state} />
                <DollarCell value={mmisByFFP.combined[year].total} />
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
