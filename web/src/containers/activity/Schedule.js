import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import DatePicker from '../../components/DatePicker';
import DateRangePicker from '../../components/DateRangePicker';
import HelpText from '../../components/HelpText';
import { Input } from '../../components/Inputs';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class Schedule extends Component {
  handleActivityDateChange = ({ start, end }) => {
    const { activity, updateActivity } = this.props;
    updateActivity(activity.key, {
      plannedStartDate: start,
      plannedEndDate: end
    });
  };

  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { schedule: { [index]: { [field]: value } } };
    updateActivity(activity.key, updates);
  };

  handleMilestoneDateChange = index => endDate => {
    const { activity, updateActivity } = this.props;

    const updates = { schedule: { [index]: { endDate } } };
    updateActivity(activity.key, updates);
  };

  render() {
    const {
      activity,
      addActivityMilestone,
      removeActivityMilestone
    } = this.props;

    return (
      <Subsection resource="activities.schedule" nested>
        {activity.schedule.length === 0 ? (
          <NoDataMsg>{t('activities.schedule.noMilestonesNotice')}</NoDataMsg>
        ) : (
          <div className="mb3 overflow-auto">
            <div className="mt1 mb3">
              <DateRangePicker
                initialStartDate={activity.plannedStartDate}
                startDateId={`activity-${activity.key}-start-date`}
                initialEndDate={activity.plannedEndDate}
                endDateId={`activity-${activity.key}-end-date`}
                onChange={this.handleActivityDateChange}
              />
            </div>
            <HelpText
              text="activities.schedule.milestoneHelpText"
              reminder="activities.schedule.milestoneReminder"
            />

            <table className="h5 table table-fixed" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th className="col-5 border-none">
                    {t('activities.schedule.milestoneHeader')}
                  </th>
                  <th className="col-6 border-none">
                    {t('activities.schedule.endHeader')}
                  </th>
                  <th className="col-1 border-none" />
                </tr>
              </thead>
              <tbody>
                {activity.schedule.map((d, i) => (
                  <tr key={d.key}>
                    <td className="border-bottom">
                      <Input
                        name={`milestone-${d.key}-name`}
                        label={t('activities.schedule.milestoneLabel')}
                        hideLabel
                        wrapperClass="m0"
                        value={d.milestone}
                        onChange={this.handleChange(i, 'milestone')}
                      />
                    </td>
                    <td className="border-bottom">
                      <DatePicker
                        id={`milestone-${d.key}-end-date`}
                        initialDate={d.endDate}
                        initialVisibleMonth={() =>
                          activity.plannedStartDate
                            ? moment(activity.plannedStartDate)
                            : moment()
                        }
                        onChange={this.handleMilestoneDateChange(i)}
                      />
                    </td>
                    <td className="center align-middle border-bottom">
                      <Btn
                        kind="outline"
                        extraCss="px1 py-tiny"
                        onClick={() =>
                          removeActivityMilestone(activity.key, d.key)
                        }
                      >
                        ✗
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Btn onClick={() => addActivityMilestone(activity.key)}>
          {t('activities.schedule.addMilestoneButtonText')}
        </Btn>
      </Subsection>
    );
  }
}

Schedule.propTypes = {
  activity: PropTypes.object.isRequired,
  addActivityMilestone: PropTypes.func.isRequired,
  removeActivityMilestone: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activity: byKey[aKey]
});

const mapDispatchToProps = {
  addActivityMilestone: addActivityMilestoneAction,
  removeActivityMilestone: removeActivityMilestoneAction,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
