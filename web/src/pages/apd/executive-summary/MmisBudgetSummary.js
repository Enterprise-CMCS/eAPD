import PropTypes from 'prop-types';
import React from 'react';
import { t } from '../../../i18n';
import { titleCase } from 'title-case';

import { Subsection } from '../../../components/Section';
import DollarCell from '../../../components/DollarCell';

import { thId, tdHdrs } from '../../../util/apd';

const MmisBudgetSummary = ({ budget, rowKeys }) => {
  const { ddi, mando } = budget;

  // We don't want to display the tables if they'll contain empty values.
  // If the total is 0 the table will contain all zeroes.
  const showDdiTable = ddi.combined.total.total !== 0;
  const showMandoTable = mando.combined.total.total !== 0;
  const noTableMessage = 'The Program Budget Table(s) are not available.';

  const renderDdiTable = () => (
    <table className="budget-table">
      <caption className="ds-h4">
        MMIS DDI Costs{' '}
        <span className="ds-u-visibility--screen-reader">
          executive summary
        </span>
      </caption>
      <thead>
        <tr className="budget-table--row__highlight-gray-dark">
          <td className="th" id="program-budget-table-null3" />
          <th colSpan="2" id={thId('ddi90')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.ddi90'))}
          </th>
          <th colSpan="2" id={thId('ddi75')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.ddi75'))}
          </th>
          <th colSpan="2" id={thId('ddi50')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.ddi50'))}
          </th>
          <th colSpan="3" id={thId('ddiTotal')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.ddiTotal'))}
          </th>
        </tr>
        <tr className="budget-table--row__highlight-gray-light">
          <td className="th" id="program-budget-table-null4" />
          <th className="ds-u-text-align--right" id={thId('ddi90', 'fed')}>
            {titleCase(t('executiveSummary.budgetTable.fedShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddi90', 'state')}>
            {titleCase(t('executiveSummary.budgetTable.stateShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddi75', 'fed')}>
            {titleCase(t('executiveSummary.budgetTable.fedShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddi75', 'state')}>
            {titleCase(t('executiveSummary.budgetTable.stateShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddi50', 'fed')}>
            {titleCase(t('executiveSummary.budgetTable.fedShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddi50', 'state')}>
            {titleCase(t('executiveSummary.budgetTable.stateShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('ddiTotal', 'total')}>
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
              headers={tdHdrs('ddi90', 'fed')}
            />
            <DollarCell
              value={ddi['90-10'].combined[year].state}
              headers={tdHdrs('ddi90', 'state')}
            />
            <DollarCell
              value={ddi['75-25'].combined[year].federal}
              headers={tdHdrs('ddi75', 'fed')}
            />
            <DollarCell
              value={ddi['75-25'].combined[year].state}
              headers={tdHdrs('ddi75', 'state')}
            />
            <DollarCell
              value={ddi['50-50'].combined[year].federal}
              headers={tdHdrs('ddi50', 'fed')}
            />
            <DollarCell
              value={ddi['50-50'].combined[year].state}
              headers={tdHdrs('ddi50', 'state')}
            />
            <DollarCell
              className={'budget-table--cell__hightlight-lighter'}
              value={ddi.combined[year].medicaid}
              headers={tdHdrs('ddiTotal', 'total')}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMandoTable = () => (
    <table className="budget-table">
      <caption className="ds-h4">
        MMIS M&O Costs{' '}
        <span className="ds-u-visibility--screen-reader">
          executive summary
        </span>
      </caption>
      <thead>
        <tr className="budget-table--row__highlight-gray-dark">
          <td className="th" id="program-budget-table-null3" />
          <th colSpan="2" id={thId('mando75')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.mando75'))}
          </th>
          <th colSpan="2" id={thId('mando50')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.mando50'))}
          </th>
          <th colSpan="3" id={thId('mandoTotal')}>
            {titleCase(t('executiveSummary.budgetTable.mmis.mandoTotal'))}
          </th>
        </tr>
        <tr className="budget-table--row__highlight-gray-light">
          <td className="th" id="program-budget-table-null4" />
          <th className="ds-u-text-align--right" id={thId('mando75', 'fed')}>
            {titleCase(t('executiveSummary.budgetTable.fedShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('mando75', 'state')}>
            {titleCase(t('executiveSummary.budgetTable.stateShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('mando50', 'fed')}>
            {titleCase(t('executiveSummary.budgetTable.fedShare'))}
          </th>
          <th className="ds-u-text-align--right" id={thId('mando50', 'state')}>
            {titleCase(t('executiveSummary.budgetTable.stateShare'))}
          </th>
          <th
            className="ds-u-text-align--right"
            id={thId('mandoTotal', 'total')}
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
              headers={tdHdrs('mando75', 'fed')}
            />
            <DollarCell
              value={mando['75-25'].combined[year].state}
              headers={tdHdrs('mando75', 'state')}
            />
            <DollarCell
              value={mando['50-50'].combined[year].federal}
              headers={tdHdrs('mando50', 'fed')}
            />
            <DollarCell
              value={mando['50-50'].combined[year].state}
              headers={tdHdrs('mando50', 'state')}
            />
            <DollarCell
              className={'budget-table--cell__hightlight-lighter'}
              value={mando.combined[year].medicaid}
              headers={tdHdrs('mandoTotal', 'total')}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Subsection
      id="executive-summary-budget-table"
      resource="executiveSummary.budgetTable"
    >
      {showDdiTable && renderDdiTable()}
      {showMandoTable && renderMandoTable()}
      {!showDdiTable && !showMandoTable && <p>{noTableMessage}</p>}
    </Subsection>
  );
};

MmisBudgetSummary.propTypes = {
  budget: PropTypes.object.isRequired,
  rowKeys: PropTypes.array.isRequired
};

export default MmisBudgetSummary;
