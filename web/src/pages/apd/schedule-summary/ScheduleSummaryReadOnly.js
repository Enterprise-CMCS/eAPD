import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../../../i18n';
import { selectActivitySchedule } from '../../../redux/selectors/activities.selectors';

const activityTitle = (activityName, milestones) => {
  if (!activityName && milestones.length === 0) {
    return 'Untitled | No milestones were provided.';
  }
  if (!activityName && milestones.length > 0) {
    return 'Untitled Milestones';
  }
  return `${activityName} Milestones`;
};
const ScheduleSummary = ({ activities }) => (
  <div>
    <h2>Activity Schedule Summary</h2>
    <h3>Schedule Summary by Activity</h3>
    {activities.length === 0 ? (
      <div className="ds-c-alert ds-c-alert--warn">
        {t('scheduleSummary.noDataMessage')}
      </div>
    ) : (
      <table className="budget-table">
        <caption className="ds-u-visibility--screen-reader">
          Activity List Overview
        </caption>
        <thead>
          <tr className="budget-table--row__primary-header">
            <th scope="col">Activity List Overview</th>
            <th scope="col" className="ds-u-text-align--left">
              Activity Date Range
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map(
            ({ name: activityName, dateRange, milestones }, i) => (
              <tr
                key={activityName}
                className="summary-table--gray_row__highlight"
              >
                <td
                  className="ds-u-font-weight--bold ds-u-border-right--0"
                  style={{ width: '70%' }}
                >
                  Activity {i + 1}: {activityTitle(activityName, milestones)}
                </td>
                <td className="ds-u-font-weight--bold ds-u-padding-right--3 ds-u-text-align--left ds-u-border-left--0 budget-table--cell__nowrap">
                  {dateRange === 'Date not specified - Date not specified'
                    ? 'Dates not specified'
                    : dateRange}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    )}

    <h3>Milestone Tables by Activity</h3>
    {activities.length === 0 ? (
      <div className="ds-c-alert ds-c-alert--warn">
        {t('scheduleSummary.noDataMessage')}
      </div>
    ) : (
      activities.map(({ name: activityName, milestones }, i) => (
        <table key={activityName} className="budget-table">
          <caption className="ds-u-visibility--screen-reader">
            Activity {i + 1}: {activityName || 'Untitled'}
          </caption>
          <thead>
            <tr className="budget-table--row__primary-header">
              <th scope="col" style={{ width: '70%' }}>
                Activity Milestones
              </th>
              <th scope="col" className="ds-u-text-align--left">
                Target Completion Date
              </th>
            </tr>
            <tr>
              <th
                className="ds-u-font-weight--bold ds-u-border-right--0"
                colSpan={2}
              >
                Activity {i + 1}: {activityTitle(activityName, milestones)}
              </th>
            </tr>
          </thead>
          <tbody key={`${activityName}-body`}>
            {milestones.length === 0 && (
              <tr>
                <td className="ds-u-border-right--0">
                  No milestones to display.
                </td>
              </tr>
            )}
            {milestones.map(({ end: milestoneEnd, name: milestoneName }) => (
              <tr key={milestoneName}>
                <td className="ds-u-border-right--0">
                  {milestoneName || 'Milestone not specified.'}
                </td>
                <td className="ds-u-border-left--0 ds-u-text-align--left">
                  {milestoneEnd || 'Date not specified.'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))
    )}
  </div>
);

ScheduleSummary.propTypes = {
  activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitySchedule(state)
});

export default connect(mapStateToProps)(ScheduleSummary);

export { ScheduleSummary as plain, mapStateToProps };
