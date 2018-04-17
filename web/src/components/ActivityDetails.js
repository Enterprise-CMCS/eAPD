import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ActivityDescription from './ActivityDescription';
import ContractorResources from './ContractorResources';
import CostAllocation from './CostAllocation';
import Expenses from './Expenses';
import StandardsConditions from './StandardsConditions';
import StatePersonnel from './StatePersonnel';
import Collapsible from './Collapsible';
import FormActivityGoals from './FormActivityGoals';
import FormActivitySchedule from './FormActivitySchedule';
import { activityDisplay } from '../util';

const DetailEntry = ({ activity, idx, editActivityText }) => {
  const title = `Program Activities › ${activityDisplay(activity, idx)}`;
  const goalFormId = `activity-${activity.id}-goals`;
  const scheduleFormId = `activity-${activity.id}-schedule`;

  return (
    <Collapsible title={title} bgColor="darken-1">
      <Collapsible title="Activity Description">
        <ActivityDescription
          activity={activity}
          editActivityText={editActivityText}
        />
      </Collapsible>

      <Collapsible title="Needs and Objectives">
        <FormActivityGoals form={goalFormId} />
      </Collapsible>

      <Collapsible title="Proposed Activity Schedule">
        <FormActivitySchedule form={scheduleFormId} />
      </Collapsible>

      <Collapsible title="State Personnel">
        <StatePersonnel activity={activity} />
      </Collapsible>

      <Collapsible title="Contractor Resources">
        <ContractorResources activity={activity} />
      </Collapsible>

      <Collapsible title="Expenses">
        <Expenses activity={activity} />
      </Collapsible>

      <Collapsible title="Cost Allocation and Other Funding Sources">
        <CostAllocation />
      </Collapsible>

      <Collapsible title="Standards & Conditions">
        <StandardsConditions aId={activity.id} />
      </Collapsible>
    </Collapsible>
  );
};

DetailEntry.propTypes = {
  activity: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  editActivityText: PropTypes.func.isRequired
};

const ActivityDetails = ({ activities, ...rest }) => (
  <Fragment>
    {activities.map((activity, idx) => (
      <DetailEntry
        key={activity.id}
        activity={activity}
        idx={idx + 1}
        {...rest}
      />
    ))}
  </Fragment>
);

ActivityDetails.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

export default ActivityDetails;
