import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ActivityDetailCostAllocateFFP from './ActivityDetailCostAllocateFFP';
import ActivityQuarterlyBudgetSummary from './ActivityQuarterlyBudgetSummary';
import { updateActivity as updateActivityAction } from '../actions/activities';
import { Subsection } from '../components/Section';
import { RichText } from '../components/Inputs';
import HelpText from '../components/HelpText';
import { t } from '../i18n';

const ActivityDetailCostAllocate = props => {
  const { activity, updateActivity } = props;
  const { costAllocationDesc, otherFundingDesc } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.costAllocate">
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.methodology.title')}
        </div>
        <HelpText
          text="activities.costAllocate.methodology.helpText"
          reminder="activities.costAllocate.methodology.reminder"
        />
        <RichText
          content={costAllocationDesc}
          onSync={sync('costAllocationDesc')}
        />
      </div>
      <ActivityDetailCostAllocateFFP aKey={activity.key} />

      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.quarterly.title')}
        </div>
        <HelpText
          text="activities.costAllocate.quarterly.helpText"
          reminder="activities.costAllocate.quarterly.reminder"
        />
        <ActivityQuarterlyBudgetSummary aKey={activity.key} />
      </div>

      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.otherFunding.title')}
        </div>
        <HelpText
          text="activities.costAllocate.otherFunding.helpText"
          reminder="activities.costAllocate.otherFunding.reminder"
        />
        <RichText
          content={otherFundingDesc}
          onSync={sync('otherFundingDesc')}
        />
      </div>
    </Subsection>
  );
};

ActivityDetailCostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activity: byKey[aKey]
});

export const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocate
);

export const raw = ActivityDetailCostAllocate;
