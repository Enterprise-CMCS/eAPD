import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../../../i18n';
import { Section, Subsection } from '../../../components/Section';
import { selectActivitySchedule } from '../../../redux/selectors/activities.selectors';
import Waypoint from '../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

const ScheduleSummary = ({ activities }) => (
  <React.Fragment>
    <Waypoint /> {/* Waypoint w/o id indicates top of page */}
    <AlertMissingFFY />
    <Section id="schedule-summary" resource="scheduleSummary">
      <Subsection id="schedule-summary-table" resource="scheduleSummary.main">
        {activities.length === 0 ? (
          <div className="ds-c-alert ds-c-alert--warn">
            {t('scheduleSummary.noDataMessage')}
          </div>
        ) : (
          <table className="budget-table">
            <thead>
              <tr>
                <th scope="col">Activity List Overview</th>
                <th scope="col" className="ds-u-text-align--left">
                  Activity Date Range
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map(({ name: activityName, dateRange }, i) => (
                <tr
                  key={activityName}
                  className="summary-table--gray_row__highlight"
                >
                  <td
                    className="ds-u-font-weight--bold ds-u-border-right--0"
                    style={{ width: '70%' }}
                  >
                    Activity {i + 1}: {activityName || 'Untitled'} Milestones
                  </td>
                  <td className="ds-u-font-weight--bold ds-u-padding-right--3 ds-u-text-align--left ds-u-border-left--0 budget-table--cell__nowrap">
                    {dateRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Subsection>
      <Subsection
        id="schedule-milestones-table"
        resource="scheduleSummary.milestone"
      >
        {activities.length === 0 ? (
          <div className="ds-c-alert ds-c-alert--warn">
            {t('scheduleSummary.noDataMessage')}
          </div>
        ) : (
          activities.map(({ name: activityName, milestones }, i) => (
            <table key={activityName} className="budget-table">
              <thead>
                <tr className="budget-table--row__primary-header">
                  <th scope="col" colSpan={2} style={{ width: '70%' }}>
                    Activity {i + 1}: {activityName || 'Untitled'}
                  </th>
                </tr>
                <tr>
                  <th className="ds-u-font-weight--bold ds-u-border-right--0">
                    Milestone List
                  </th>
                  <th className="ds-u-font-weight--bold ds-u-border-right--0">
                    Target Completion Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {milestones.length === 0 && (
                  <tr>
                    <td className="ds-u-border-right--0">
                      No milestones to display.
                    </td>
                  </tr>
                )}
                {milestones.map(
                  ({ end: milestoneEnd, name: milestoneName }) => (
                    <tr key={`${milestoneName}-${milestoneEnd}`}>
                      <td className="ds-u-border-right--0 indent-title">
                        {milestoneName || 'Milestone not specified'}
                      </td>
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
  </React.Fragment>
);

ScheduleSummary.propTypes = {
  activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitySchedule(state)
});

export default connect(mapStateToProps)(ScheduleSummary);

export { ScheduleSummary as plain, mapStateToProps };
