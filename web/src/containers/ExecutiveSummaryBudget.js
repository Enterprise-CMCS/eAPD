import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const thId = (program, share) =>
  `program-budget-table-${program}${share ? `-${share}` : ''}`;
const tdHdrs = (program, share) =>
  `program-budget-table-${program} program-budget-table-${program}-${share}`;

const DollarCell = ({ headers, value }) => (
  <td className="mono right-align" headers={headers}>
    {formatMoney(value)}
  </td>
);

DollarCell.propTypes = {
  headers: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

DollarCell.defaultProps = { headers: '' };

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
        <table className="table-cms table-fixed" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ width: 90 }} id="program-budget-table-null1" />
              <th className="center" colSpan="2" id={thId('hit')}>
                {t('executiveSummary.budgetTable.hit')}
              </th>
              <th className="center" colSpan="2" id={thId('hie')}>
                {t('executiveSummary.budgetTable.hie')}
              </th>
              <th className="center" colSpan="3" id={thId('combined')}>
                {t('executiveSummary.budgetTable.hitHie')}
              </th>
            </tr>
            <tr>
              <th id="program-budget-table-null2" />
              <th className="right-align" id={thId('hit', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('hit', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('hie', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('hie', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('combined', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('combined', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>

              <th className="right-align" id={thId('combined', 'total')}>
                {t('executiveSummary.budgetTable.grandTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr key={year}>
                <td headers="program-budget-table-null1 program-budget-table-null2">
                  {display}
                </td>
                <DollarCell
                  value={hit.combined[year].federal}
                  headers={tdHdrs('hit', 'fed')}
                />
                <DollarCell
                  value={hit.combined[year].state}
                  headers={tdHdrs('hit', 'state')}
                />
                <DollarCell
                  value={hie.combined[year].federal}
                  headers={tdHdrs('hie', 'fed')}
                />
                <DollarCell
                  value={hie.combined[year].state}
                  headers={tdHdrs('hie', 'state')}
                />
                <DollarCell
                  value={hitAndHie.combined[year].federal}
                  headers={tdHdrs('combined', 'fed')}
                />
                <DollarCell
                  value={hitAndHie.combined[year].state}
                  headers={tdHdrs('combined', 'state')}
                />
                <DollarCell
                  value={hitAndHie.combined[year].total}
                  headers={tdHdrs('combined', 'total')}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-auto">
        <table className="table-cms table-fixed" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ width: 90 }} id="program-budget-table-null3" />
              <th className="center" colSpan="2" id={thId('mmis90')}>
                {t('executiveSummary.budgetTable.mmis90')}
              </th>
              <th className="center" colSpan="2" id={thId('mmis75')}>
                {t('executiveSummary.budgetTable.mmis75')}
              </th>
              <th className="center" colSpan="2" id={thId('mmis50')}>
                {t('executiveSummary.budgetTable.mmis50')}
              </th>
              <th className="center" colSpan="3" id={thId('mmisTotal')}>
                {t('executiveSummary.budgetTable.mmisTotal')}
              </th>
            </tr>
            <tr>
              <th id="program-budget-table-null4" />
              <th className="right-align" id={thId('mmis90', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('mmis90', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('mmis75', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('mmis75', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('mmis50', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('mmis50', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('mmisTotal', 'fed')}>
                {t('executiveSummary.budgetTable.fedShare')}
              </th>
              <th className="right-align" id={thId('mmisTotal', 'state')}>
                {t('executiveSummary.budgetTable.stateShare')}
              </th>
              <th className="right-align" id={thId('mmisTotal', 'total')}>
                {t('executiveSummary.budgetTable.grandTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr key={year}>
                <td headers="program-budget-table-null3 program-budget-table-null4">
                  {display}
                </td>
                <DollarCell
                  value={mmisByFFP['90-10'][year].federal}
                  headers={tdHdrs('mmis90', 'fed')}
                />
                <DollarCell
                  value={mmisByFFP['90-10'][year].state}
                  headers={tdHdrs('mmis90', 'state')}
                />
                <DollarCell
                  value={mmisByFFP['75-25'][year].federal}
                  headers={tdHdrs('mmis75', 'fed')}
                />
                <DollarCell
                  value={mmisByFFP['75-25'][year].state}
                  headers={tdHdrs('mmis75', 'state')}
                />
                <DollarCell
                  value={mmisByFFP['50-50'][year].federal}
                  headers={tdHdrs('mmis50', 'fed')}
                />
                <DollarCell
                  value={mmisByFFP['50-50'][year].state}
                  headers={tdHdrs('mmis50', 'state')}
                />
                <DollarCell
                  value={mmisByFFP.combined[year].federal}
                  headers={tdHdrs('mmisTotal', 'fed')}
                />
                <DollarCell
                  value={mmisByFFP.combined[year].state}
                  headers={tdHdrs('mmisTotal', 'state')}
                />
                <DollarCell
                  value={mmisByFFP.combined[year].total}
                  headers={tdHdrs('mmisTotal', 'total')}
                />
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

export { ExecutiveSummaryBudget as plain, mapStateToProps, DollarCell };
