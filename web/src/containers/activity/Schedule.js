import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import { MilestoneForm, MilestoneReview } from './Milestone';

import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import DateField from '../../components/DateField';
import { t } from '../../i18n';
import { stateDateToDisplay } from '../../util';

const Schedule = ({
  activity,
  addActivityMilestone,
  removeActivityMilestone,
  updateActivity
}) => {
  const handleAdd = useCallback(() => {
    addActivityMilestone(activity.key);
  });

  const handleActivityStartChange = useCallback((_, dateStr) => {
    updateActivity(activity.key, { plannedStartDate: dateStr });
  });

  const handleActivityEndChange = useCallback((_, dateStr) => {
    updateActivity(activity.key, { plannedEndDate: dateStr });
  });

  const handleMilestoneNameChange = useCallback((index, name) => {
    updateActivity(activity.key, {
      schedule: { [index]: { milestone: name } }
    });
  });

  const handleMilestoneDateChange = useCallback((index, date) => {
    updateActivity(activity.key, { schedule: { [index]: { endDate: date } } });
  });

  const handleDelete = useCallback(key => {
    removeActivityMilestone(activity.key, key);
  });

  return (
    <Subsection resource="activities.schedule" nested>
      <Fragment>
        <div className="ds-u-padding-y--0 visibility--screen">
          <DateField
            label="Planned start date"
            value={activity.plannedStartDate}
            onChange={handleActivityStartChange}
          />
          <DateField
            label="Planned end date"
            value={activity.plannedEndDate}
            onChange={handleActivityEndChange}
          />
        </div>
        <div className="visibility--print">
          <p>
            <strong>Planned start date:</strong>{' '}
            {stateDateToDisplay(activity.plannedStartDate)}
          </p>
          <p>
            <strong>Planned end date:</strong>{' '}
            {stateDateToDisplay(activity.plannedEndDate)}
          </p>
          <hr />
        </div>
        <div className="mb3">
          <Instruction
            source="activities.schedule.milestone.instruction"
            headingDisplay={{ className: 'ds-h5', level: 'h6' }}
          />

          <hr />

          <FormAndReviewList
            addButtonText={t('activities.schedule.addMilestoneButtonText')}
            list={activity.schedule}
            collapsed={MilestoneReview}
            expanded={MilestoneForm}
            noDataMessage={t('activities.schedule.noMilestonesNotice')}
            onAddClick={handleAdd}
            onChangeName={handleMilestoneNameChange}
            onChangeDate={handleMilestoneDateChange}
            onDeleteClick={handleDelete}
          />
        </div>
      </Fragment>
    </Subsection>
  );
};

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

export { Schedule as plain, mapStateToProps, mapDispatchToProps };
