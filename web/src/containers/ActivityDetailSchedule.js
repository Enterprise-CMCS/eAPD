import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input } from '../components/Inputs2';

class ActivityDetailSchedule extends Component {
  handleChange = (idx, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { milestones: { [idx]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  render() {
    const {
      activity,
      addActivityMilestone,
      removeActivityMilestone
    } = this.props;

    return (
      <Collapsible title={t('activities.schedule.title')}>
        <div className="mb2">{t('activities.schedule.subheader')}</div>

        {activity.milestones.length === 0 ? (
          <div className="mb2 p1 h6 alert">
            {t('activities.schedule.noMilestonesNotice')}
          </div>
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
                  <tr key={i}>
                    <td>
                      <Input
                        name={`milestone-${i}-name`}
                        label={t('activities.schedule.milestoneLabel')}
                        hideLabel
                        wrapperClass="m0"
                        value={d.name}
                        onChange={this.handleChange(i, 'name')}
                      />
                    </td>
                    <td>
                      <Input
                        name={`milestone-${i}-start`}
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
                        name={`milestone-${i}-end`}
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
                        onClick={() => removeActivityMilestone(activity.id, i)}
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
          onClick={() => addActivityMilestone(activity.id)}
        >
          {t('activities.schedule.addMilestoneButtonText')}
        </button>
      </Collapsible>
    );
  }
}

ActivityDetailSchedule.propTypes = {
  activity: PropTypes.object.isRequired,
  addActivityMilestone: PropTypes.func.isRequired,
  removeActivityMilestone: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  addActivityMilestone: addActivityMilestoneAction,
  removeActivityMilestone: removeActivityMilestoneAction,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailSchedule
);
