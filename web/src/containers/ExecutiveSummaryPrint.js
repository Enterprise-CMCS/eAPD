import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import { expandActivitySection } from '../actions/activities';
import Dollars from '../components/Dollars';
import Review from '../components/Review';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';

import { selectApdYears } from '../reducers/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../reducers/budget.selectors';

class ExecutiveSummaryPrint extends PureComponent {

  render() {
    const { data, total, years } = this.props;
    debugger;
    return (
        <Section isNumbered id="executive-summary" resource="executiveSummary">
          <Subsection
            id="executive-summary-summary"
            resource="executiveSummary.summary"
          >
            {data.map((activity, i) => (
              <Review
                key={activity.key}
                heading={
                  <Fragment>
                    Activity {i + 1}:{' '}
                    <a
                      href={`#activity-${activity.key}`}
                    >
                      {activity.name || t('activities.noNameYet')}
                    </a>
                  </Fragment>
                }
                headingLevel={4}
                editHref={`#activity-${activity.key}`}
                className={i === data.length - 1 ? 'ds-u-border-bottom--0' : ''}
              >
                {activity.summary && <p>{activity.summary}</p>}

                <ul className="ds-c-list--bare">
                  <li>
                    <strong>Date:</strong> {activity.dateRange}
                  </li>
                  <li>
                    <strong>Total cost of activity:</strong>{' '}
                    <Dollars long>{activity.combined}</Dollars>
                  </li>
                  <li>
                    <strong>Medicaid share:</strong>{' '}
                    <Dollars long>{activity.medicaid}</Dollars> (
                    <Dollars long>{activity.federal}</Dollars> Federal share)
                  </li>
                </ul>
              </Review>
            ))}
            <hr className="ds-u-border--dark ds-u-margin--0" />
            <Review
              heading="Total cost"
              headingLevel={4}
              className="ds-u-border--0"
            >
              <ul className="ds-c-list--bare">
                <li>
                  <strong>Federal Fiscal Years requested:</strong> FFY{' '}
                  {years.join(', ')}
                </li>
                <li>
                  <strong>Medicaid share:</strong>{' '}
                  <Dollars long>{total.medicaid}</Dollars> (
                  <Dollars long>{total.federal}</Dollars> Federal share)
                </li>
                <li>
                  <strong>Total funding request:</strong>{' '}
                  <Dollars long>{total.combined}</Dollars>
                </li>
              </ul>
            </Review>
          </Subsection>
        </Section>
    );
  }
}

ExecutiveSummaryPrint.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  data: selectBudgetExecutiveSummary(state),
  total: selectBudgetGrandTotal(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  expandSection: expandActivitySection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutiveSummaryPrint);

export { ExecutiveSummaryPrint as plain, mapStateToProps, mapDispatchToProps };
