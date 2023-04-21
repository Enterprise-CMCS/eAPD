import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ActivityExecutiveSummary from './ActivityExecutiveSummary';
import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import FFYList from '../../../components/FFYList';

import { selectApdYears } from '../../../redux/selectors/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../../../redux/selectors/budget.selectors';

class ExecutiveSummary extends PureComponent {
  render() {
    const { data, total, years } = this.props;
    return (
      <div>
        <h2>Executive Summary</h2>
        <h3 className="ds-h3">Total Cost</h3>
        <Review className="ds-u-border--0">
          <ul className="ds-c-list--bare">
            <li>
              <strong>Federal Fiscal Years requested:</strong> FFY{' '}
              {years.join(', ')}
            </li>
            <li>
              <strong>Total Computable Medicaid Cost:</strong>{' '}
              <Dollars>{total.medicaid}</Dollars> (
              <Dollars>{total.federal}</Dollars> Federal share)
            </li>
            <li>
              <strong>Total funding request:</strong>{' '}
              <Dollars>{total.combined}</Dollars>
            </li>
            <FFYList ffys={total.ffys} />
          </ul>
        </Review>
        <h3 className="subsection--title ds-h3">Activity Summary</h3>
        <ActivityExecutiveSummary data={data} years={years} />
        <ExecutiveSummaryBudget />
      </div>
    );
  }
}

ExecutiveSummary.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  data: selectBudgetExecutiveSummary(state),
  total: selectBudgetGrandTotal(state),
  years: selectApdYears(state)
});

export default connect(mapStateToProps, null)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps };
