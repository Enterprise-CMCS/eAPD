import PropTypes from 'prop-types';
import React from 'react';
import { t } from '../../../i18n';
import { titleCase } from 'title-case';

import { Subsection } from '../../../components/Section';
import DollarCell from '../../../components/DollarCell';

import { tdHdrs, thId } from './ExecutiveSummary';

const MmisBudgetSummary = ({ budget, rowKeys }) => {
  const { mmisByFFP } = budget;

  return (
    <Subsection
      id="executive-summary-budget-table"
      resource="executiveSummary.budgetTable"
    >
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
              {titleCase(t('executiveSummary.budgetTable.mmis90'))}
            </th>
            <th colSpan="2" id={thId('mmis75')}>
              {titleCase(t('executiveSummary.budgetTable.mmis75'))}
            </th>
            <th colSpan="2" id={thId('mmis50')}>
              {titleCase(t('executiveSummary.budgetTable.mmis50'))}
            </th>
            <th colSpan="3" id={thId('mmisTotal')}>
              {titleCase(t('executiveSummary.budgetTable.mmisTotal'))}
            </th>
          </tr>
          <tr>
            <td className="th" id="program-budget-table-null4" />
            <th className="ds-u-text-align--right" id={thId('mmis90', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis90', 'state')}>
              {titleCase(t('executiveSummary.budgetTable.stateShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis75', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis75', 'state')}>
              {titleCase(t('executiveSummary.budgetTable.stateShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis50', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('mmis50', 'state')}>
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
    </Subsection>
  );
};

MmisBudgetSummary.propTypes = {
  budget: PropTypes.object.isRequired,
  rowKeys: PropTypes.array.isRequired
};

export default MmisBudgetSummary;
