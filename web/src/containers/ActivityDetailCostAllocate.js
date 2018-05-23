import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateActivity as updateActivityAction } from '../actions/activities';
import { Subsection } from '../components/Section';
import { DollarInput, RichText } from '../components/Inputs';
import HelpText from '../components/HelpText';

const ActivityDetailCostAllocate = props => {
  const { activity, updateActivity } = props;
  const { costAllocateDesc, otherFundingDesc } = activity;

  const sync = name => html => {
    updateActivity(activity.id, { [name]: html });
  };

  return (
    <Subsection resource="activities.costAllocate">
      <div className="mb3">
        <HelpText
          text="activities.costAllocate.methodology.helpText"
          reminder="activities.costAllocate.methodology.reminder"
        />
        <div className="mb-tiny bold">
          {t('activities.costAllocate.methodology.title')}
        </div>
        <RichText
          content={costAllocateDesc}
          onSync={sync('costAllocateDesc')}
        />
      </div>
      <div className="mb3">
        <HelpText
          text="activities.costAllocate.otherFunding.helpText"
          reminder="activities.costAllocate.otherFunding.reminder"
        />
        <div className="mb-tiny bold">
          {t('activities.costAllocate.otherFunding.title')}
        </div>
        <RichText
          content={otherFundingDesc}
          onSync={sync('otherFundingDesc')}
        />
      </div>
      <DollarInput
        name="other-funding-amt"
        label={t('activities.costAllocate.otherFunding.amount')}
        wrapperClass="mb2 sm-col-4"
        value={activity.otherFundingAmt}
        onChange={e =>
          updateActivity(activity.id, { otherFundingAmt: e.target.value })
        }
      />
    </Subsection>
  );
};

ActivityDetailCostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocate
);
