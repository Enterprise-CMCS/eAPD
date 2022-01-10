import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import { MilestoneForm, MilestoneReview } from './Milestone';

import { addMilestone, removeMilestone } from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

const Milestone = ({ activity, activityIndex, add, remove }) => {
  const handleAdd = useCallback(() => {
    add(activityIndex);
  });

  const handleDelete = useCallback(index => {
    remove(activityIndex, index);
  });

  return (
    <Subsection resource="activities.milestones">
      <div className="mb3">
        <hr />

        <FormAndReviewList
          activityIndex={activityIndex}
          addButtonText={t('activities.milestones.addMilestoneButtonText')}
          list={activity.schedule}
          collapsed={MilestoneReview}
          expanded={MilestoneForm}
          noDataMessage={t('activities.milestones.noMilestonesNotice')}
          onAddClick={handleAdd}
          onDeleteClick={handleDelete}
          allowDeleteAll
        />
      </div>
    </Subsection>
  );
};

Milestone.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addMilestone,
  remove: removeMilestone
};

export default connect(mapStateToProps, mapDispatchToProps)(Milestone);

export { Milestone as plain, mapStateToProps, mapDispatchToProps };
