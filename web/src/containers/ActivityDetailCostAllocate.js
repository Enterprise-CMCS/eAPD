import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ActivityDetailCostAllocateFFP from './ActivityDetailCostAllocateFFP';
import { updateActivity as updateActivityAction } from '../actions/activities';
import { Subsection } from '../components/Section';
import { RichText } from '../components/Inputs';
import HelpText from '../components/HelpText';
import { t } from '../i18n';
import { isProgamAdmin } from '../util';

const ActivityDetailCostAllocate = props => {
  const { activity, updateActivity } = props;
  const { costAllocationDesc, otherFundingDesc } = activity;

  const sync = name => html => {
    updateActivity(activity.id, { [name]: html });
  };

  return (
    <Subsection
      resource="activities.costAllocate"
      isKey={isProgamAdmin(activity)}
    >
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
      <ActivityDetailCostAllocateFFP aId={activity.id} />
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

export const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

export const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocate
);

export const raw = ActivityDetailCostAllocate;
