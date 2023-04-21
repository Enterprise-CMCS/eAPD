import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Dollars from '../../../../components/Dollars';
import { APD_TYPE } from '@cms-eapd/common';

import classNames from 'classnames';

export const CostSummaryRows = ({
  items,
  defaultMessage,
  highlightSubtotals
}) => {
  if (defaultMessage && (!items || items.length === 0)) {
    return (
      <tr>
        <td className="title">{defaultMessage || ''}</td>
        <td className="budget-table--number"></td>
        <td className="budget-table--number ds-u-padding--0"></td>
        <td className="budget-table--number ds-u-text-align--left"></td>
        <td className="budget-table--number"></td>
        <td className="budget-table--number">
          <Dollars>$0</Dollars>
        </td>
      </tr>
    );
  }
  return items.map(
    ({ key, description, totalCost, unitCost, units, medicaidShare }) => (
      <tr key={key || description}>
        <td className="title">{description || 'Category Not Selected'}</td>
        <td className="budget-table--number">
          {unitCost !== null && <Dollars>{unitCost}</Dollars>}
        </td>
        <td className="budget-table--number ds-u-padding--0">
          {unitCost !== null && '×'}
        </td>
        <td className="budget-table--number ds-u-text-align--left">{units}</td>
        {medicaidShare && (
          <td className="budget-table--number ds-u-text-align--left">
            × {medicaidShare}%
          </td>
        )}
        <td className="budget-table--number">{unitCost !== null && '='}</td>
        <td
          className={`budget-table--number ${
            highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
          }`}
        >
          <Dollars>{totalCost}</Dollars>
        </td>
      </tr>
    )
  );
};

CostSummaryRows.propTypes = {
  items: PropTypes.array.isRequired,
  defaultMessage: PropTypes.string,
  highlightSubtotals: PropTypes.bool
};
CostSummaryRows.defaultProps = {
  defaultMessage: null,
  highlightSubtotals: false
};

const CostAllocationRows = ({
  years,
  ffy,
  otherFunding,
  activityIndex,
  apdType,
  highlightSubtotals,
  showUnitCostHeader,
  highlightTotal
}) => {
  const budgetTableClassName = classNames({
    'budget-table--number': true,
    'budget-table--cell__hightlight-lighter': highlightSubtotals
  });

  return (
    <Fragment>
      {otherFunding && (
        <tr className="budget-table--row__header">
          {!showUnitCostHeader && (
            <th scope="row" colSpan="6">
              State Staff
            </th>
          )}
          {showUnitCostHeader && (
            <Fragment>
              <th scope="row" colSpan="1">
                State Staff
              </th>
              <th scope="col" colSpan="4">
                Personnel Cost × FTE
              </th>
              <th scope="col" className="ds-u-text-align--right">
                Total cost
              </th>
            </Fragment>
          )}
        </tr>
      )}
      {!otherFunding && (
        <tr className="budget-table--row__header">
          <th scope="col">State Staff</th>
          <th scope="col" colSpan="2">
            <span className="ds-u-visibility--screen-reader">unit cost</span>
          </th>
          <th scope="col" colSpan="2">
            <span className="ds-u-visibility--screen-reader">units</span>
          </th>
          <th scope="col">Total cost</th>
        </tr>
      )}
      {apdType === APD_TYPE.HITECH && (
        <CostSummaryRows
          items={years[ffy].keyPersonnel}
          highlightSubtotals={highlightSubtotals}
        />
      )}
      <CostSummaryRows
        items={years[ffy].statePersonnel}
        defaultMessage={
          apdType === APD_TYPE.MMIS ? 'State staff not specified.' : null
        }
        highlightSubtotals={highlightSubtotals}
      />
      {otherFunding && (
        <tr>
          <td className="title" colSpan="4">
            Other Funding Amount
          </td>
          <td>-</td>
          <td className={budgetTableClassName}>
            <Dollars>{otherFunding[ffy].statePersonnel}</Dollars>
          </td>
        </tr>
      )}
      <tr className="budget-table--total budget-table--row__highlight-lighter">
        <td className="title" colSpan="5">
          State Staff Total
        </td>
        <td
          className={`budget-table--number ${
            highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
          }`}
          data-cy="total"
        >
          <Dollars>
            {otherFunding
              ? years[ffy].statePersonnelTotal -
                otherFunding[ffy].statePersonnel
              : years[ffy].statePersonnelTotal}
          </Dollars>
        </td>
      </tr>
      <tr className="budget-table--row__header">
        <th scope="col" colSpan="6">
          Other State Expenses
        </th>
      </tr>
      <CostSummaryRows
        items={years[ffy].nonPersonnel}
        defaultMessage={
          apdType === APD_TYPE.MMIS
            ? 'Other state expenses not specified.'
            : null
        }
        highlightSubtotals={highlightSubtotals}
      />
      {otherFunding && (
        <tr>
          <td className="title" colSpan="4">
            Other Funding Amount
          </td>
          <td>-</td>
          <td
            className={`budget-table--number ${
              highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
            }`}
          >
            <Dollars>{otherFunding[ffy].expenses}</Dollars>
          </td>
        </tr>
      )}
      <tr className="budget-table--total budget-table--row__highlight-lighter">
        <td className="title" colSpan="5">
          Other State Expenses Total
        </td>
        <td
          className={`budget-table--number ${
            highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
          }`}
          data-cy="total"
        >
          <Dollars>
            {otherFunding
              ? years[ffy].nonPersonnelTotal - otherFunding[ffy].expenses
              : years[ffy].nonPersonnelTotal}
          </Dollars>
        </td>
      </tr>
      <tr className="budget-table--row__header">
        <th scope="col" colSpan="6">
          Private Contractor
        </th>
      </tr>
      <CostSummaryRows
        items={years[ffy].contractorResources}
        defaultMessage={
          apdType === APD_TYPE.MMIS ? 'Private contractor not specified.' : null
        }
        highlightSubtotals={highlightSubtotals}
      />
      {otherFunding && (
        <tr>
          <td className="title" colSpan="4">
            Other Funding Amount
          </td>
          <td>-</td>
          <td
            className={`budget-table--number ${
              highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
            }`}
          >
            <Dollars>{otherFunding[ffy].contractors}</Dollars>
          </td>
        </tr>
      )}
      <tr className="budget-table--total budget-table--row__highlight-lighter">
        <td className="title" colSpan="5">
          Private Contractor Total
        </td>
        <td
          className={`budget-table--number ${
            highlightSubtotals ? 'budget-table--cell__hightlight-lighter' : ''
          }`}
          data-cy="total"
        >
          <Dollars>
            {otherFunding
              ? years[ffy].contractorResourcesTotal -
                otherFunding[ffy].contractors
              : years[ffy].contractorResourcesTotal}
          </Dollars>
        </td>
      </tr>
      <tr
        className={`budget-table--total budget-table--row__header ${
          highlightTotal ? 'budget-table--row__highlight' : ''
        }`}
      >
        <td colSpan="5">
          Activity {activityIndex >= 0 && activityIndex + 1} Total Computable
          Medicaid Cost
        </td>
        <td className="budget-table--number" data-cy="total">
          <Dollars>
            {otherFunding
              ? years[ffy].totalCost - otherFunding[ffy].total
              : years[ffy].totalCost}
          </Dollars>
        </td>
      </tr>
    </Fragment>
  );
};

CostAllocationRows.propTypes = {
  years: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired,
  apdType: PropTypes.string.isRequired,
  otherFunding: PropTypes.shape({
    statePersonnel: PropTypes.object,
    expenses: PropTypes.object,
    contractors: PropTypes.object,
    total: PropTypes.number
  }),
  activityIndex: PropTypes.number,
  highlightSubtotals: PropTypes.bool,
  showUnitCostHeader: PropTypes.bool,
  highlightTotal: PropTypes.bool
};

CostAllocationRows.defaultProps = {
  otherFunding: null,
  activityIndex: -1,
  highlightSubtotals: false,
  showUnitCostHeader: false,
  highlightTotal: false
};

export default CostAllocationRows;
