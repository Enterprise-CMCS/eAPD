import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { t } from '../i18n';

const thId = (program, share) =>
  `program-budget-table-${program}${share ? `-${share}` : ''}`;
const tdHdrs = (program, share) =>
  `program-budget-table-${program} program-budget-table-${program}-${share}`;

const DollarCell = ({ headers, value }) => (
  <td className="budget-table--number" headers={headers}>
    <Dollars>{value}</Dollars>
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
    <Fragment>
      <table className="budget-table">
        <caption className="ds-h4">
          HIT + HIE{' '}
          <span className="ds-u-visibility--screen-reader">
            executive summary
          </span>
        </caption>
        <thead>
          <tr>
            <td className="th" id="program-budget-table-null1" />
            <th colSpan="2" id={thId('hit')}>
              {t('executiveSummary.budgetTable.hit')}
            </th>
            <th colSpan="2" id={thId('hie')}>
              {t('executiveSummary.budgetTable.hie')}
            </th>
            <th colSpan="3" id={thId('combined')}>
              {t('executiveSummary.budgetTable.hitHie')}
            </th>
          </tr>
          <tr>
            <td className="th" id="program-budget-table-null2" />
            <th className="ds-u-text-align--right" id={thId('hit', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('hit', 'state')}>
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('hie', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('hie', 'state')}>
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('combined', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('combined', 'state')}
            >
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('combined', 'total')}
            >
              {t('executiveSummary.budgetTable.grandTotal')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rowKeys.map(({ year, display }) => (
            <tr
              key={year}
              className={
                display === 'Total'
                  ? 'budget-table--total budget-table--row__highlight'
                  : ''
              }
            >
              <th
                headers="program-budget-table-null1 program-budget-table-null2"
                scope="row"
              >
                {display}
              </th>
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
                value={hitAndHie.combined[year].medicaid}
                headers={tdHdrs('combined', 'total')}
              />
            </tr>
          ))}
        </tbody>
      </table>

      <table className="budget-table">
        <caption className="ds-h4">
          MMIS{' '}
          <span className="ds-u-visibility--screen-reader">
            executive summary
          </span>
        </caption>
        <thead>
          <tr>
            <td className="th" id="program-budget-table-null3" />
            <th colSpan="2" id={thId('mmis90')}>
              {t('executiveSummary.budgetTable.mmis90')}
            </th>
            <th colSpan="2" id={thId('mmis75')}>
              {t('executiveSummary.budgetTable.mmis75')}
            </th>
            <th colSpan="2" id={thId('mmis50')}>
              {t('executiveSummary.budgetTable.mmis50')}
            </th>
            <th colSpan="3" id={thId('mmisTotal')}>
              {t('executiveSummary.budgetTable.mmisTotal')}
            </th>
          </tr>
          <tr>
            <td className="th" id="program-budget-table-null4" />
            <th className="ds-u-text-align--right" id={thId('mmis90', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis90', 'state')}>
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis75', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis75', 'state')}>
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis50', 'fed')}>
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis50', 'state')}>
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('mmisTotal', 'fed')}
            >
              {t('executiveSummary.budgetTable.fedShare')}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('mmisTotal', 'state')}
            >
              {t('executiveSummary.budgetTable.stateShare')}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('mmisTotal', 'total')}
            >
              {t('executiveSummary.budgetTable.grandTotal')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rowKeys.map(({ year, display }) => (
            <tr
              key={year}
              className={
                display === 'Total'
                  ? 'budget-table--total budget-table--row__highlight'
                  : ''
              }
            >
              <th
                headers="program-budget-table-null3 program-budget-table-null4"
                scope="row"
              >
                {display}
              </th>
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
                value={mmisByFFP.combined[year].medicaid}
                headers={tdHdrs('mmisTotal', 'total')}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ExecutiveSummaryBudget.propTypes = {
  budget: PropTypes.object.isRequired
};

const mapStateToProps = ({ budget }) => ({ budget });

export default connect(mapStateToProps)(ExecutiveSummaryBudget);

export { ExecutiveSummaryBudget as plain, mapStateToProps, DollarCell };
