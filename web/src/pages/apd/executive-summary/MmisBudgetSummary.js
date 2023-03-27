import PropTypes from 'prop-types';
import React from 'react';
import { t } from '../../../i18n';
import { titleCase } from 'title-case';

import { Subsection } from '../../../components/Section';
import DollarCell from '../../../components/DollarCell';

import { thId, tdHdrs } from '../../../util/apd';

const MmisBudgetSummary = ({ budget, rowKeys }) => {
  const { ddi, mando } = budget;

  const ddiTableIsEmpty =
    ddi?.combined?.total?.medicaid === 0 &&
    ddi?.combined?.total?.federal === 0 &&
    ddi?.combined?.total?.state === 0
      ? true
      : false;
  const mandoTableIsEmpty =
    mando?.combined?.total?.medicaid === 0 &&
    mando?.combined?.total?.federal === 0 &&
    mando?.combined?.total?.state === 0
      ? true
      : false;

  return (
    <Subsection
      id="executive-summary-budget-table"
      resource="executiveSummary.budgetTable"
    >
      {!ddiTableIsEmpty && (
        <table className="budget-table">
          <caption className="ds-h4">
            MMIS DDI Costs
            <span className="ds-u-visibility--screen-reader">
              executive summary
            </span>
          </caption>
          <thead>
            <tr className="budget-table--row__highlight-gray-dark">
              <td className="th" id="program-budget-table-null3" />
              <th colSpan="2" id={thId('mmis90')}>
                {titleCase(t('executiveSummary.budgetTable.mmisDdi90'))}
              </th>
              <th colSpan="2" id={thId('mmis75')}>
                {titleCase(t('executiveSummary.budgetTable.mmisDdi75'))}
              </th>
              <th colSpan="2" id={thId('mmis50')}>
                {titleCase(t('executiveSummary.budgetTable.mmisDdi50'))}
              </th>
              <th colSpan="3" id={thId('mmisTotal')}>
                {titleCase(t('executiveSummary.budgetTable.mmisDdiTotal'))}
              </th>
            </tr>
            <tr className="budget-table--row__highlight-gray-light">
              <td className="th" id="program-budget-table-null4" />
              <th className="ds-u-text-align--right" id={thId('mmis90', 'fed')}>
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmis90', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th className="ds-u-text-align--right" id={thId('mmis75', 'fed')}>
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmis75', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th className="ds-u-text-align--right" id={thId('mmis50', 'fed')}>
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmis50', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'fed')}
              >
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'total')}
              >
                {titleCase(t('executiveSummary.budgetTable.grandTotal'))}
              </th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr
                key={year}
                className={
                  display === 'Total'
                    ? 'budget-table--total budget-table--row__highlight-lighter'
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
                  value={ddi['90-10'].combined[year].federal}
                  headers={tdHdrs('mmis90', 'fed')}
                />
                <DollarCell
                  value={ddi['90-10'].combined[year].state}
                  headers={tdHdrs('mmis90', 'state')}
                />
                <DollarCell
                  value={ddi['75-25'].combined[year].federal}
                  headers={tdHdrs('mmis75', 'fed')}
                />
                <DollarCell
                  value={ddi['75-25'].combined[year].state}
                  headers={tdHdrs('mmis75', 'state')}
                />
                <DollarCell
                  value={ddi['50-50'].combined[year].federal}
                  headers={tdHdrs('mmis50', 'fed')}
                />
                <DollarCell
                  value={ddi['50-50'].combined[year].state}
                  headers={tdHdrs('mmis50', 'state')}
                />
                <DollarCell
                  value={ddi.combined[year].federal}
                  headers={tdHdrs('mmisTotal', 'fed')}
                />
                <DollarCell
                  value={ddi.combined[year].state}
                  headers={tdHdrs('mmisTotal', 'state')}
                />
                <DollarCell
                  className={'budget-table--cell__hightlight-lighter'}
                  value={ddi.combined[year].medicaid}
                  headers={tdHdrs('mmisTotal', 'total')}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!mandoTableIsEmpty && (
        <table className="budget-table">
          <caption className="ds-h4">
            MMIS M&O Costs
            <span className="ds-u-visibility--screen-reader">
              executive summary
            </span>
          </caption>
          <thead>
            <tr className="budget-table--row__highlight-gray-dark">
              <td className="th" id="program-budget-table-null3" />
              <th colSpan="2" id={thId('mmis75')}>
                {titleCase(t('executiveSummary.budgetTable.mmisMando75'))}
              </th>
              <th colSpan="2" id={thId('mmis50')}>
                {titleCase(t('executiveSummary.budgetTable.mmisMando50'))}
              </th>
              <th colSpan="3" id={thId('mmisTotal')}>
                {titleCase(t('executiveSummary.budgetTable.mmisMandoTotal'))}
              </th>
            </tr>
            <tr className="budget-table--row__highlight-gray-light">
              <td className="th" id="program-budget-table-null4" />
              <th className="ds-u-text-align--right" id={thId('mmis75', 'fed')}>
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmis75', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th className="ds-u-text-align--right" id={thId('mmis50', 'fed')}>
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmis50', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'fed')}
              >
                {titleCase(t('executiveSummary.budgetTable.fedShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'state')}
              >
                {titleCase(t('executiveSummary.budgetTable.stateShare'))}
              </th>
              <th
                className="ds-u-text-align--right"
                id={thId('mmisTotal', 'total')}
              >
                {titleCase(t('executiveSummary.budgetTable.grandTotal'))}
              </th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(({ year, display }) => (
              <tr
                key={year}
                className={
                  display === 'Total'
                    ? 'budget-table--total budget-table--row__highlight-lighter'
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
                  value={mando['75-25'].combined[year].federal}
                  headers={tdHdrs('mmis75', 'fed')}
                />
                <DollarCell
                  value={mando['75-25'].combined[year].state}
                  headers={tdHdrs('mmis75', 'state')}
                />
                <DollarCell
                  value={mando['50-50'].combined[year].federal}
                  headers={tdHdrs('mmis50', 'fed')}
                />
                <DollarCell
                  value={mando['50-50'].combined[year].state}
                  headers={tdHdrs('mmis50', 'state')}
                />
                <DollarCell
                  value={mando.combined[year].federal}
                  headers={tdHdrs('mmisTotal', 'fed')}
                />
                <DollarCell
                  value={mando.combined[year].state}
                  headers={tdHdrs('mmisTotal', 'state')}
                />
                <DollarCell
                  className={'budget-table--cell__hightlight-lighter'}
                  value={mando.combined[year].medicaid}
                  headers={tdHdrs('mmisTotal', 'total')}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Subsection>
  );
};

MmisBudgetSummary.propTypes = {
  budget: PropTypes.object.isRequired,
  rowKeys: PropTypes.array.isRequired
};

export default MmisBudgetSummary;
