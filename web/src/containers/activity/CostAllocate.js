import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import CostAllocateFFP from './CostAllocateFFP';
import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';
import { updateActivity as updateActivityAction } from '../../actions/activities';
import Instruction from '../../components/Instruction';
import { RichText } from '../../components/Inputs';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const CostAllocate = props => {
  const { activity, updateActivity } = props;
  const { costAllocationDesc, otherFundingDesc } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.costAllocate" nested>
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.methodology.title')}
        </div>
        <Instruction source="activities.costAllocate.methodology.instruction" />
        <RichText
          content={costAllocationDesc}
          onSync={sync('costAllocationDesc')}
          editorClassName="rte-textarea-l"
        />
      </div>
      <CostAllocateFFP aKey={activity.key} />
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.quarterly.title')}
        </div>
        <Instruction source="activities.costAllocate.quarterly.instruction" />
        <CostAllocateFFPQuarterly aKey={activity.key} />
      </div>
      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.costAllocate.otherFunding.title')}
        </div>
        <Instruction source="activities.costAllocate.otherFunding.instruction" />
        <RichText
          content={otherFundingDesc}
          onSync={sync('otherFundingDesc')}
          editorClassName="rte-textarea-l"
        />
      </div>
    </Subsection>
  );
};

CostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activity: byKey[aKey]
});

export const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export { CostAllocate as CostAllocateRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CostAllocate);
