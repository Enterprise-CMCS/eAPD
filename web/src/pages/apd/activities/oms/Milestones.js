import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';

import FormAndReviewList from '../../../../components/FormAndReviewList';
import { MilestoneForm, MilestoneReview } from './Milestone';
import { Subsection } from '../../../../components/Section';

import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { removeMilestone } from '../../../../redux/actions/editActivity';
import { newMilestone } from '../../../../redux/reducers/activities';

const Milestone = ({ activity, activityIndex, remove }) => {
  const [localList, setLocalList] = useState(activity.schedule);

  useEffect(() => {
    setLocalList(activity.schedule);
  }, [activity.schedule]);

  const handleAdd = () => {
    const newListItem = newMilestone();
    setLocalList([...localList, newListItem]);
  };

  const handleDelete = index => {
    remove(activityIndex, index);
  };

  const onCancel = () => {
    setLocalList(activity.schedule);
  };

  return (
    <Subsection resource="activities.milestones">
      <Fragment>
        <div className="mb3">
          <hr />
          <FormAndReviewList
            activityIndex={activityIndex}
            addButtonText={t('activities.milestones.addMilestoneButtonText')}
            list={localList}
            collapsed={MilestoneReview}
            expanded={MilestoneForm}
            noDataMessage={t('activities.milestones.noMilestonesNotice')}
            onAddClick={handleAdd}
            onCancelClick={onCancel}
            onDeleteClick={handleDelete}
            allowDeleteAll
          />
        </div>
      </Fragment>
    </Subsection>
  );
};

Milestone.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  remove: removeMilestone
};

export default connect(mapStateToProps, mapDispatchToProps)(Milestone);

export { Milestone as plain, mapStateToProps, mapDispatchToProps };
