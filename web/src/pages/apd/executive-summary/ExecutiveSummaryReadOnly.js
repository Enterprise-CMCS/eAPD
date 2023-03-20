import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { t } from '../../../i18n';

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
        <Review
          heading="Total Cost of All Activities"
          headingLevel="3"
          className="ds-u-border--0"
        >
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
            {Object.entries(total.ffys).map(
              ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
                <li key={ffy} className={i === 0 ? 'ds-u-margin-top--2' : ''}>
                  <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                  <strong>Total Computable Medicaid Cost:</strong>{' '}
                  <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars>{' '}
                  Federal share)
                </li>
              )
            )}
          </ul>
        </Review>
        {data.map((activity, i) => (
          <Review
            key={activity.activityId}
            heading={titleCase(
              `Activity ${i + 1}: ${activity.name || t('activities.noNameYet')}`
            )}
            headingLevel="3"
            className={i === data.length - 1 ? 'ds-u-border-bottom--0' : ''}
          >
            {activity.summary && (
              /* eslint-disable react/no-danger */
              <p dangerouslySetInnerHTML={{ __html: activity.summary }} />
            )}

            <ul className="ds-c-list--bare">
              <li>
                <strong>Start date - End date:</strong> {activity.dateRange}
              </li>
              <li>
                <strong>Total cost of activity:</strong>{' '}
                <Dollars>{activity.combined}</Dollars>
              </li>
              <li>
                <strong>Total Computable Medicaid Cost:</strong>{' '}
                <Dollars>{activity.medicaid}</Dollars> (
                <Dollars>{activity.federal}</Dollars> Federal share)
              </li>
              {Object.entries(activity.ffys).map(
                ([ffy, { medicaid, federal, total: ffyTotal }], j) => (
                  <li key={ffy} className={j === 0 ? 'ds-u-margin-top--2' : ''}>
                    <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                    <strong>Total Computable Medicaid Cost:</strong>{' '}
                    <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars>{' '}
                    Federal share)
                  </li>
                )
              )}
            </ul>
          </Review>
        ))}

        <hr className="subsection-rule" />
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
