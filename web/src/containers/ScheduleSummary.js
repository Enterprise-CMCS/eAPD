import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import Waypoint from './ConnectedWaypoint';
import { Section, Subsection } from '../components/Section';
import { selectActivitySchedule } from '../reducers/activities.selectors';

const ScheduleSummary = ({ activities }) => (
  <Waypoint id="schedule-summary">
    <Section isNumbered id="schedule-summary" resource="scheduleSummary">
      <Subsection id="schedule-summary-table" resource="scheduleSummary.main">
        {activities.length === 0 ? (
          <div className="ds-c-alert ds-c-alert--warn">
            {t('scheduleSummary.noDataMessage')}
          </div>
        ) : (
          activities.map(({ name: activityName, dateRange, milestones }, i) => (
            <table key={activityName} className="budget-table">
              <caption className="ds-u-visibility--screen-reader">
                Activity {i + 1}: {activityName}
              </caption>
              <thead>
                <tr>
                  <th
                    className="ds-u-font-weight--bold ds-u-border-right--0"
                    style={{ width: '70%' }}
                  >
                    Activity {i + 1}: {activityName}
                  </th>
                  <th className="ds-u-font-weight--bold ds-u-padding-right--3 ds-u-text-align--left ds-u-border-left--0 budget-table--cell__nowrap">
                    {dateRange}
                  </th>
                </tr>
              </thead>
              <tbody>
                {milestones.map(
                  ({ end: milestoneEnd, name: milestoneName }) => (
                    <tr>
                      <td className="ds-u-border-right--0">{milestoneName}</td>
                      <td className="ds-u-border-left--0 ds-u-text-align--left">
                        {milestoneEnd}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ))
        )}
      </Subsection>
    </Section>
  </Waypoint>
);

ScheduleSummary.propTypes = {
  activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitySchedule(state)
});

export default connect(mapStateToProps)(ScheduleSummary);

export { ScheduleSummary as plain, mapStateToProps };
