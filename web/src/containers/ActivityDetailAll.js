import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ActivityDetailContractorResources from './ActivityDetailContractorResources';
import ActivityDetailCostAllocate from './ActivityDetailCostAllocate';
import ActivityDetailDescription from './ActivityDetailDescription';
import ActivityDetailGoals from './ActivityDetailGoals';
import ActivityDetailSchedule from './ActivityDetailSchedule';
import ActivityDetailExpenses from './ActivityDetailExpenses';
import ActivityDetailStandardsAndConditions from './ActivityDetailStandardsAndConditions';
import ActivityDetailStatePersonnel from './ActivityDetailStatePersonnel';
import DeleteActivity from './DeleteActivity';
import Collapsible from '../components/Collapsible';
import { t } from '../i18n';

const activityTitle = (a, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (a.name) title += `: ${a.name}`;
  if (a.types.length) title += ` (${a.types.join(', ')})`;
  return title;
};

const ActivityDetailAll = ({ aId, title }) => (
  <Collapsible title={title} bgColor="darken-1" open>
    <ActivityDetailDescription aId={aId} />
    <ActivityDetailGoals aId={aId} />
    <ActivityDetailSchedule aId={aId} />
    <ActivityDetailStatePersonnel aId={aId} />
    <ActivityDetailContractorResources aId={aId} />
    <ActivityDetailExpenses aId={aId} />
    <ActivityDetailCostAllocate aId={aId} />
    <ActivityDetailStandardsAndConditions aId={aId} />
    <DeleteActivity aId={aId} />
  </Collapsible>
);

ActivityDetailAll.propTypes = {
  aId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId, num }) => {
  const activity = byId[aId];
  const title = `${t('activities.header')} › ${activityTitle(activity, num)}`;

  return { title };
};

export default connect(mapStateToProps)(ActivityDetailAll);
