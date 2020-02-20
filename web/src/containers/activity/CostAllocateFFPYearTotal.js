import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../../components/Dollars';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFPBudget } from '../../reducers/activities.selectors';

const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

const CostAllocateFFPYearTotal = ({ quarterlyFFP, years }) => {
  // Wait until the budget is ready
  if (!quarterlyFFP) return null;

  return (
    <Fragment>
      <h6 className="ds-h3">{`Total FFY ${years[0]} - ${
        years[years.length - 1]
      }`}</h6>
      {['inHouse', 'contractors'].map(name => (
        <p className="ds-h5" key={name}>
          {EXPENSE_NAME_DISPLAY[name]}:{' '}
          <span className="ds-u-font-weight--normal">
            <Dollars long>{quarterlyFFP.total[name]}</Dollars>
          </span>
        </p>
      ))}
      <p className="ds-h5">
        {EXPENSE_NAME_DISPLAY.combined}:{' '}
        <span className="ds-u-font-weight--normal">
          <Dollars long>{quarterlyFFP.total.combined}</Dollars>
        </span>
      </p>
    </Fragment>
  );
};

CostAllocateFFPYearTotal.propTypes = {
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const makeMapStateToProps = () => {
  const selectCostAllocateFFPBudget = makeSelectCostAllocateFFPBudget();
  const mapStateToProps = (state, props) =>
    selectCostAllocateFFPBudget(state, props);
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null)(CostAllocateFFPYearTotal);

export { CostAllocateFFPYearTotal as raw, makeMapStateToProps };
