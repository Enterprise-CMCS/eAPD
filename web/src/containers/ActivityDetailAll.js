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
import DeleteActivity from './DeleteActivity';
import { toggleActivitySection } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { t } from '../i18n';

const activityTitle = (a, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (a.name) title += `: ${a.name}`;
  if (a.fundingSource) title += ` (${a.fundingSource})`;
  return title;
};

class ActivityDetailAll extends Component {
  handleChange = id => () => {
    this.props.toggleSection(id);
  };

  render() {
    const { aId, expanded, num, title } = this.props;

    return (
      <Collapsible
        id={`activity-${aId}`}
        title={title}
        bgColor="light-gray"
        open={expanded}
        onChange={this.handleChange(aId)}
        sticky
      >
        <ActivityDetailDescription aId={aId} />
        <ActivityDetailGoals aId={aId} />
        <ActivityDetailSchedule aId={aId} />
        <ActivityDetailStatePersonnel aId={aId} />
        <ActivityDetailContractorResources aId={aId} />
        <ActivityDetailExpenses aId={aId} />
        <ActivityDetailCostAllocate aId={aId} />
        <ActivityDetailStandardsAndConditions aId={aId} />
        {num > 1 && <DeleteActivity aId={aId} />}
      </Collapsible>
    );
  }
}

ActivityDetailAll.propTypes = {
  aId: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toggleSection: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId, num }) => {
  const activity = byId[aId];
  const { expanded } = activity.meta;
  const title = `${t('activities.header')} › ${activityTitle(activity, num)}`;

  return { expanded, title };
};

const mapDispatchToProps = {
  toggleSection: toggleActivitySection
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailAll);
