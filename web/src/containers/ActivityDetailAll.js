import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActivityDetailContractorResources from './ActivityDetailContractorResources';
import ActivityDetailCostAllocate from './ActivityDetailCostAllocate';
import ActivityDetailDescription from './ActivityDetailDescription';
import ActivityDetailGoals from './ActivityDetailGoals';
import ActivityDetailSchedule from './ActivityDetailSchedule';
import ActivityDetailExpenses from './ActivityDetailExpenses';
import ActivityDetailStandardsAndConditions from './ActivityDetailStandardsAndConditions';
import ActivityDetailStatePersonnel from './ActivityDetailStatePersonnel';
import {
  removeActivity as removeActivityAction,
  toggleActivitySection
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import DeleteButton from '../components/DeleteConfirm';
import { t } from '../i18n';

const activityTitle = (a, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (a.name) title += `: ${a.name}`;
  if (a.fundingSource) title += ` (${a.fundingSource})`;
  return title;
};

const activityComponents = [
  ActivityDetailDescription,
  ActivityDetailGoals,
  ActivityDetailSchedule,
  ActivityDetailStatePersonnel,
  ActivityDetailContractorResources,
  ActivityDetailExpenses,
  ActivityDetailCostAllocate,
  ActivityDetailStandardsAndConditions
];

class ActivityDetailAll extends Component {
  handleChange = id => () => {
    this.props.toggleSection(id);
  };

  render() {
    const { aId, expanded, num, removeActivity, title } = this.props;

    return (
      <Collapsible
        id={`activity-${aId}`}
        title={title}
        bgColor="blue-light"
        btnBgColor="blue-bright"
        btnColor="white"
        open={expanded}
        onChange={this.handleChange(aId)}
        sticky
      >
        {activityComponents.map((ActivityComponent, i) => (
          <ActivityComponent key={i} aId={aId} />
        ))}
        {num > 1 && (
          <DeleteButton
            remove={() => removeActivity(aId)}
            resource="activities.delete"
          />
        )}
      </Collapsible>
    );
  }
}

ActivityDetailAll.propTypes = {
  aId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expanded: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  removeActivity: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleSection: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byId } }, { aId, num }) => {
  const activity = byId[aId];
  const { expanded } = activity.meta;
  const title = `${t('activities.header')} › ${activityTitle(activity, num)}`;

  return { expanded, title };
};

export const mapDispatchToProps = {
  removeActivity: removeActivityAction,
  toggleSection: toggleActivitySection
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailAll);

export const raw = ActivityDetailAll;
