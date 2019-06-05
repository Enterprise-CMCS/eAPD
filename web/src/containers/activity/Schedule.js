import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import Milestone from './Milestone';
import {
  addActivityMilestone as addActivityMilestoneAction,
  removeActivityMilestone as removeActivityMilestoneAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Instruction from '../../components/Instruction';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import StartAndEndDate from '../../components/StartAndEndDateFields';
import { t } from '../../i18n';

const Schedule = ({
  activity,
  addActivityMilestone,
  removeActivityMilestone,
  updateActivity
}) => {
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

  const removeMilestone = useMemo(
    () =>
      activity.schedule.length > 1
        ? i => removeActivityMilestone(activity.key, activity.schedule[i].key)
        : null,
    [activity.schedule.length]
  );

  return (
    <Subsection resource="activities.schedule" nested>
      {activity.schedule.length === 0 ? (
        <NoDataMsg>{t('activities.schedule.noMilestonesNotice')}</NoDataMsg>
      ) : (
        <Fragment>
          <h5 className="ds-h5">Activity start and end dates</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            <StartAndEndDate
              startDate={activity.plannedStartDate}
              onStartDateChanged={handleActivityStartChange}
              endDate={activity.plannedEndDate}
              onEndDateChanged={handleActivityEndChange}
            />
          </div>
          <div className="mb3">
            <Instruction
              source="activities.schedule.milestone.instruction"
              headingDisplay={{ className: 'ds-h5', level: 'h5' }}
            />

            <hr />

            {activity.schedule.map(
              ({ endDate, initialCollapsed, key, milestone: name }, i) => (
                <Milestone
                  key={key}
                  idx={i}
                  initialCollapsed={initialCollapsed}
                  name={name}
                  onChangeName={handleMilestoneNameChange}
                  endDate={endDate}
                  onChangeDate={handleMilestoneDateChange}
                  onDelete={removeMilestone}
                />
              )
            )}
          </div>
        </Fragment>
      )}
      <Button
        className="visibility--screen"
        onClick={() => addActivityMilestone(activity.key)}
      >
        {t('activities.schedule.addMilestoneButtonText')}
      </Button>
      <hr />
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
