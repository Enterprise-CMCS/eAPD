import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import { Input } from '../../components/Inputs';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class Schedule extends Component {
  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { schedule: { [index]: { [field]: value } } };
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
        {activity.schedul.length === 0 ? (
          <NoDataMsg>{t('activities.schedule.noMilestonesNotice')}</NoDataMsg>
        ) : (
          <div className="mb3 overflow-auto">
            <table className="h5 table table-fixed" style={{ minWidth: 500 }}>
              <thead>
                <tr>
                  <th className="col-4 sm-col-5">
                    {t('activities.schedule.milestoneHeader')}
                  </th>
                  <th className="col-4 sm-col-3">
                    {t('activities.schedule.startHeader')}
                  </th>
                  <th className="col-4 sm-col-3">
                    {t('activities.schedule.endHeader')}
                  </th>
                  <th className="col-1" />
                </tr>
              </thead>
              <tbody>
                {activity.schedule.map((d, i) => (
                  <tr key={d.key}>
                    <td>
                      <Input
                        name={`milestone-${d.key}-name`}
                        label={t('activities.schedule.milestoneLabel')}
                        hideLabel
                        wrapperClass="m0"
                        value={d.milestone}
                        onChange={this.handleChange(i, 'milestone')}
                      />
                    </td>
                    <td>
                      <Input
                        name={`milestone-${d.key}-start`}
                        label={t('activities.schedule.startLabel')}
                        hideLabel
                        type="date"
                        wrapperClass="m0"
                        value={d.plannedStart}
                        onChange={this.handleChange(i, 'plannedStart')}
                      />
                    </td>
                    <td>
                      <Input
                        name={`milestone-${d.key}-end`}
                        label={t('activities.schedule.endLabel')}
                        hideLabel
                        type="date"
                        wrapperClass="m0"
                        value={d.plannedEnd}
                        onChange={this.handleChange(i, 'plannedEnd')}
                      />
                    </td>
                    <td className="center align-middle">
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
