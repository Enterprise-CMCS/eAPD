import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Instruction from '../../../components/Instruction';
import SummaryActivityBreakdownTable from './SummaryActivityBreakdown';
import Dollars from '../../../components/Dollars';

const categories = [
  { category: 'statePersonnel', title: 'State Staff Total' },
  { category: 'expenses', title: 'Other State Expenses Total' },
  { category: 'contractors', title: 'Private Contractor Total' },
  { category: 'combined', title: 'Total' }
];

const DataRow = ({ category, data, title, groupTitle }) => (
  <tr
    key={category}
    className={
      category === 'combined'
        ? 'budget-table--subtotal budget-table--row__highlight'
        : ''
    }
  >
    <th scope="row" className="title indent-title">
      {category === 'combined' ? `${groupTitle} ${title}` : title}
    </th>
    <td className="budget-table--number">
      <Dollars>{data.medicaid}</Dollars>
    </td>
  </tr>
);

DataRow.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired
};

const DataRowGroup = ({ data, year, groupTitle }) => (
  <Fragment>
    {categories.map(({ category, title }) => (
      <DataRow
        key={`${groupTitle}-${category}-${title}`}
        category={category}
        data={data[category][year]}
        title={title}
        groupTitle={groupTitle}
      />
    ))}
  </Fragment>
);

DataRowGroup.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired
};

const SummaryBudgetByActivityTotals = ({ data, ffy }) => {
  return (
    <table className="budget-table" data-cy="CACTable">
      <thead>
        <tr className="budget-table--row__primary-header">
          <th scope="col">
            Combined Activity Costs FFY {ffy} (Total Computable Medicaid Cost)
          </th>
          <th scope="col" className="ds-u-text-align--right">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.hit && (
          <Fragment>
            <tr className="budget-table--row__header">
              <th scope="row" colSpan="2">
                HIT
              </th>
            </tr>
            <DataRowGroup data={data.hit} year={ffy} groupTitle="HIT" />
          </Fragment>
        )}

        {data?.hie && (
          <Fragment>
            <tr className="budget-table--row__header">
              <th scope="row" colSpan="2">
                HIE
              </th>
            </tr>
            <DataRowGroup data={data.hie} year={ffy} groupTitle="HIE" />
          </Fragment>
        )}

        {data?.mmis && (
          <Fragment>
            <tr className="budget-table--row__header">
              <th scope="row" colSpan="2">
                MMIS
              </th>
            </tr>
            <DataRowGroup data={data.mmis} year={ffy} groupTitle="MMIS" />
          </Fragment>
        )}

        <tr key={ffy} className="budget-table--row__header">
          <th scope="row">FFY {ffy} Total Computable Medicaid Cost</th>
          <td className="budget-table--number budget-table--total">
            <Dollars>{data.combined[ffy].medicaid}</Dollars>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

SummaryBudgetByActivityTotals.propTypes = {
  data: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired
};

const SummaryBudgetByActivityBreakdown = ({ data, ffy }) => {
  return data.activityTotals.map((item, index) => (
    <SummaryActivityBreakdownTable
      key={`${ffy}-${index}` /* eslint-disable-line react/no-array-index-key */}
      ffy={ffy}
      activityIndex={index}
      otherFunding={item.data.otherFunding}
    />
  ));
};

SummaryBudgetByActivityBreakdown.propTypes = {
  data: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired
};

const CombinedActivityCosts = ({ data, years, isViewOnly }) => {
  return years.map(ffy => (
    <Fragment key={ffy}>
      <h4 className="ds-h4" aria-hidden="true">
        FFY {ffy}
      </h4>
      {!isViewOnly && (
        <Instruction source="proposedBudget.combinedActivityCosts.totalMedicaidCost" />
      )}
      <SummaryBudgetByActivityTotals data={data} ffy={ffy} />

      <h4 className="ds-h4" aria-hidden="true">
        State and Contractor Cost Breakdown
      </h4>
      {!isViewOnly && (
        <Instruction source="proposedBudget.combinedActivityCosts.activityBreakdown" />
      )}
      <SummaryBudgetByActivityBreakdown data={data} ffy={ffy} />
    </Fragment>
  ));
};

CombinedActivityCosts.propTypes = {
  data: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  isViewOnly: PropTypes.bool
};

CombinedActivityCosts.defaultProps = {
  isViewOnly: false
};

const mapStateToProps = state => ({
  data: state.budget,
  years: state.apd.data.years
});

export default connect(mapStateToProps)(CombinedActivityCosts);

export {
  CombinedActivityCosts as plain,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  SummaryBudgetByActivityTotals,
  SummaryBudgetByActivityBreakdown
};
