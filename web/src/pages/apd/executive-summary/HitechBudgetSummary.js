import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { titleCase } from 'title-case';
import DollarCell from '../../../components/DollarCell';
import { t } from '../../../i18n';

const HitechBudgetSummary = ({ budget, rowKeys, tdHdrs, thId }) => {
  const { hit, hie, hitAndHie } = budget;

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
              {titleCase(t('executiveSummary.budgetTable.hit'))}
            </th>
            <th colSpan="2" id={thId('hie')}>
              {titleCase(t('executiveSummary.budgetTable.hie'))}
            </th>
            <th colSpan="3" id={thId('combined')}>
              {titleCase(t('executiveSummary.budgetTable.hitHie'))}
            </th>
          </tr>
          <tr>
            <td className="th" id="program-budget-table-null2" />
            <th className="ds-u-text-align--right" id={thId('hit', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('hit', 'state')}>
              {titleCase(t('executiveSummary.budgetTable.stateShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('hie', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('hie', 'state')}>
              {titleCase(t('executiveSummary.budgetTable.stateShare'))}
            </th>
            <th className="ds-u-text-align--right" id={thId('combined', 'fed')}>
              {titleCase(t('executiveSummary.budgetTable.fedShare'))}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('combined', 'state')}
            >
              {titleCase(t('executiveSummary.budgetTable.stateShare'))}
            </th>
            <th
              className="ds-u-text-align--right"
              id={thId('combined', 'total')}
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
    </Fragment>
  );
};

HitechBudgetSummary.propTypes = {
  apdType: PropTypes.string
};

// export default connect(mapStateToProps)(HitechBudgetSummary);

export default HitechBudgetSummary;
