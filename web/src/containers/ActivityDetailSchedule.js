import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../actions/activities';
import NoDataMsg from '../components/NoDataMsg';
import { Subsection } from '../components/Section';
import { Input } from '../components/Inputs';
import { t } from '../i18n';
import { isProgamAdmin } from '../util';

class ActivityDetailSchedule extends Component {
  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { milestones: { [index]: { [field]: value } } };
    updateActivity(activity.key, updates);
  };

  render() {
    const {
      activity,
      addActivityMilestone,
      removeActivityMilestone
    } = this.props;

    return (
      <Subsection
        resource="activities.schedule"
        isKey={isProgamAdmin(activity)}
      >
        {activity.milestones.length === 0 ? (
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
                {activity.milestones.map((d, i) => (
                  <tr key={d.key}>
                    <td>
                      <Input
                        name={`milestone-${d.key}-name`}
                        label={t('activities.schedule.milestoneLabel')}
                        hideLabel
                        wrapperClass="m0"
                        value={d.name}
                        onChange={this.handleChange(i, 'name')}
                      />
                    </td>
                    <td>
                      <Input
                        name={`milestone-${d.key}-start`}
                        label={t('activities.schedule.startLabel')}
                        hideLabel
                        type="date"
                        wrapperClass="m0"
                        value={d.start}
                        onChange={this.handleChange(i, 'start')}
                      />
                    </td>
                    <td>
                      <Input
                        name={`milestone-${d.key}-end`}
                        label={t('activities.schedule.endLabel')}
                        hideLabel
                        type="date"
                        wrapperClass="m0"
                        value={d.end}
                        onChange={this.handleChange(i, 'end')}
                      />
                    </td>
                    <td className="center align-middle">
                      <button
                        type="button"
                        className="btn btn-outline border-silver px1 py-tiny"
                        title={t('activities.schedule.removeLabel')}
                        onClick={() =>
                          removeActivityMilestone(activity.key, d.key)
                        }
                      >
                        ✗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addActivityMilestone(activity.key)}
        >
          {t('activities.schedule.addMilestoneButtonText')}
        </button>
      </Subsection>
    );
  }
}

ActivityDetailSchedule.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailSchedule
);
