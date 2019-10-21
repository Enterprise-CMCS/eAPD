import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import { MilestoneForm, MilestoneReview } from './Milestone';

import {
  addMilestone,
  removeMilestone,
  setActivityEndDate,
  setActivityStartDate
} from '../../actions/editActivity';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import DateField from '../../components/DateField';
import { t } from '../../i18n';
import { selectActivityByIndex } from '../../reducers/activities.selectors';
import { stateDateToDisplay } from '../../util';

const Schedule = ({
  activity,
  activityIndex,
  add,
  remove,
  setEndDate,
  setStartDate
}) => {
  const handleAdd = useCallback(() => {
    add(activityIndex);
  });

  const handleActivityStartChange = useCallback((_, dateStr) => {
    setStartDate(activityIndex, dateStr);
  });

  const handleActivityEndChange = useCallback((_, dateStr) => {
    setEndDate(activityIndex, dateStr);
  });

  const handleDelete = useCallback(key => {
    activity.schedule.forEach(({ key: milestoneKey }, i) => {
      if (milestoneKey === key) {
        remove(activityIndex, i);
      }
    });
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
            activityIndex={activityIndex}
            addButtonText={t('activities.schedule.addMilestoneButtonText')}
            list={activity.schedule}
            collapsed={MilestoneReview}
            expanded={MilestoneForm}
            noDataMessage={t('activities.schedule.noMilestonesNotice')}
            onAddClick={handleAdd}
            onDeleteClick={handleDelete}
          />
        </div>
      </Fragment>
    </Subsection>
  );
};

Schedule.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addMilestone,
  remove: removeMilestone,
  setEndDate: setActivityEndDate,
  setStartDate: setActivityStartDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

export { Schedule as plain, mapStateToProps, mapDispatchToProps };
