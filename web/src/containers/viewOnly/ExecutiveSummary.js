import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from '../ExecutiveSummaryBudget';
import Dollars from '../../components/Dollars';
import Review from '../../components/Review';
import { t } from '../../i18n';

import { selectApdYears } from '../../reducers/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../../reducers/budget.selectors';

class ExecutiveSummary extends PureComponent {
  render() {
    const { data, total, years } = this.props;
    return (
      <div>
        <h2>Executive Summary</h2>
        <Review
          heading="Total cost of all activities"
          headingLevel={3}
          className="ds-u-border--0"
        >
          <ul className="ds-c-list--bare">
            <li>
              <strong>Federal Fiscal Years requested:</strong> FFY{' '}
              {years.join(', ')}
            </li>
            <li>
              <strong>Medicaid share:</strong>{' '}
              <Dollars>{total.medicaid}</Dollars> (
              <Dollars>{total.federal}</Dollars> Federal share)
            </li>
            <li>
              <strong>Total funding request:</strong>{' '}
              <Dollars>{total.combined}</Dollars>
            </li>
            {Object.entries(total.ffys).map(
              ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
                <li key={ffy} className={i === 0 ? 'ds-u-margin-top--2' : ''}>
                  <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                  <strong>Medicaid share:</strong> <Dollars>{medicaid}</Dollars>{' '}
                  (<Dollars>{federal}</Dollars> Federal share)
                </li>
              )
            )}
          </ul>
        </Review>
        {data.map((activity, i) => (
          <Review
            key={activity.key}
            heading={`Activity ${i + 1}: ${activity.name ||
              t('activities.noNameYet')}`}
            headingLevel={3}
            className={i === data.length - 1 ? 'ds-u-border-bottom--0' : ''}
          >
            {activity.summary && <p>{activity.summary}</p>}

            <ul className="ds-c-list--bare">
              <li>
                <strong>Start date - End date:</strong> {activity.dateRange}
              </li>
              <li>
                <strong>Total cost of activity:</strong>{' '}
                <Dollars>{activity.combined}</Dollars>
              </li>
              <li>
                <strong>Medicaid share:</strong>{' '}
                <Dollars>{activity.medicaid}</Dollars> (
                <Dollars>{activity.federal}</Dollars> Federal share)
              </li>
              {Object.entries(activity.ffys).map(
                ([ffy, { medicaidShare, federal, total: ffyTotal }], j) => (
                  <li key={ffy} className={j === 0 ? 'ds-u-margin-top--2' : ''}>
                    <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                    <strong>Medicaid share:</strong>{' '}
                    <Dollars>{medicaidShare}</Dollars> (
                    <Dollars>{federal}</Dollars> Federal share)
                  </li>
                )
              )}
            </ul>
          </Review>
        ))}

        <hr className="subsection-rule" />
        <h3>Program Budget Tables</h3>
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
