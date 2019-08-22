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
      <hr />
      <h6 className="ds-h3">{`Total FFY ${years[0]} - ${
        years[years.length - 1]
      }`}</h6>
      {['state', 'contractors'].map(name => (
        <Fragment key={name}>
          <p className="ds-h5">{EXPENSE_NAME_DISPLAY[name]}</p>
          <p>
            <Dollars long>{quarterlyFFP.total[name]}</Dollars>
          </p>
        </Fragment>
      ))}
      <p className="ds-h5">{EXPENSE_NAME_DISPLAY.combined}</p>
      <p>
        <Dollars long>{quarterlyFFP.total.combined}</Dollars>
      </p>
    </Fragment>
  );
};

CostAllocateFFPYearTotal.propTypes = {
  aKey: PropTypes.string.isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const makeMapStateToProps = () => {
  const selectCostAllocateFFPBudget = makeSelectCostAllocateFFPBudget();
  const mapStateToProps = (state, props) =>
    selectCostAllocateFFPBudget(state, props);
  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  null
)(CostAllocateFFPYearTotal);

export { CostAllocateFFPYearTotal as raw, makeMapStateToProps };
