import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { selectKeyStatePersonnelCostSummary } from '../../../redux/selectors/activities.selectors';
import { CostSummaryRows } from '../../apd/activities/cost-allocation/CostAllocationRows';
import Dollars from '../../../components/Dollars';

import { getAPDName } from '../../../redux/reducers/apd';

const SummaryKeyStatePersonnel = ({ ffy, costSummary, apdName }) => {
  return (
    <table
      className="budget-table key-state-personnel-summary"
      id={`key-state-personnel-budget-${ffy}`}
    >
      <thead>
        <tr className="budget-table--row__primary-header">
          <th scope="col">{apdName}</th>
          <th scope="col" colSpan="5">
            Personnel Cost × FTE x Medicaid Share (%)
          </th>
          <th scope="col" className="ds-u-text-align--right">
            Total cost
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="budget-table--row__header">
          <th scope="row" colSpan="7">
            Key State Personnel
          </th>
        </tr>
        {costSummary.keyStatePersonnel[ffy].length === 0 && (
          <tr>
            <td className="title">No Key State Personnel Specified</td>
            <td className="budget-table--number">
              <Dollars>0</Dollars>
            </td>
            <td className="budget-table--number ds-u-padding--0">×</td>
            <td className="budget-table--number ds-u-text-align--left">
              1 FTE
            </td>
            <td className="budget-table--number ds-u-text-align--left">× 0%</td>
            <td className="budget-table--number">-</td>
            <td className="budget-table--number">
              <Dollars>$0</Dollars>
            </td>
          </tr>
        )}
        <CostSummaryRows items={costSummary.keyStatePersonnel[ffy]} />
        <tr className="budget-table--subtotal budget-table--row__highlight">
          <td className="title" colSpan="6">
            Key Personnel Total
          </td>
          <td className="budget-table--number" data-cy="subtotal">
            <Dollars>{costSummary.keyStatePersonnelTotal[ffy]}</Dollars>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

SummaryKeyStatePersonnel.propTypes = {
  ffy: PropTypes.string.isRequired,
  costSummary: PropTypes.object.isRequired,
  apdName: PropTypes.string.isRequired
};

const mapStateToProps = (
  state,
  { getCostSummary = selectKeyStatePersonnelCostSummary } = {}
) => {
  return {
    costSummary: getCostSummary(state),
    apdName: getAPDName(state)
  };
};

export default connect(mapStateToProps)(SummaryKeyStatePersonnel);

export { SummaryKeyStatePersonnel as plain, mapStateToProps };
