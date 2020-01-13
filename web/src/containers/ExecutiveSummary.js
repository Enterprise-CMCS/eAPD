import PropTypes from 'prop-types';
import React, { Fragment, PureComponent, useState } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import Waypoint from './ConnectedWaypoint';
import Dollars from '../components/Dollars';
import Review from '../components/Review';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';

import { jumpTo } from '../actions/app';
import { selectApdYears } from '../reducers/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../reducers/budget.selectors';

import ActivityDialog from './activity/EntryDetailsDialog.js';

const ExecutiveSummary = props => {
  const [showModal, setShowModal] = useState(false);
  const [activityIndexForModal, setActivityIndexForModal] = useState(-1);
  const { data, total, years } = props;
  const openModal = index => {
    setActivityIndexForModal(index);
    setShowModal(true);
  };
  return (
    <Waypoint id="executive-summary-overview">
      <Section isNumbered id="executive-summary" resource="executiveSummary">
        <Waypoint id="executive-summary-summary" />
        <Subsection
          id="executive-summary-summary"
          resource="executiveSummary.summary"
        >
          {data.map((activity, i) => (
            <Review
              key={activity.key}
              heading={
                <Fragment>
                  Activity {i + 1}: {activity.name}
                </Fragment>
              }
              headingLevel={4}
              editHref={''}
              onEditClick={() => openModal(i)}
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
          {showModal && (
            <ActivityDialog
              title={data[activityIndexForModal].name}
              activityIndex={activityIndexForModal}
            />
          )}
          <hr className="ds-u-border--dark ds-u-margin--0" />
          <Review
            heading="Total cost"
            headingLevel={4}
            className="ds-u-border--0"
          >
            <p>
              Verify that this information is correct. Edit activities above to
              make changes.
            </p>
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

        <Waypoint id="executive-summary-budget-table" />
        <Subsection
          id="executive-summary-budget-table"
          resource="executiveSummary.budgetTable"
        >
          <ExecutiveSummaryBudget />
        </Subsection>
      </Section>
    </Waypoint>
  );
};

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

export default connect(
  mapStateToProps,
  null
)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps };
