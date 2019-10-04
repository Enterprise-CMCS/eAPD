import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import CostAllocateFFP from './CostAllocateFFP';
import { updateActivity as updateActivityAction } from '../../actions/activities';
import Instruction from '../../components/Instruction';
import RichText from '../../components/RichText';
import { Subsection } from '../../components/Section';

const CostAllocate = props => {
  const { activity, updateActivity } = props;
  const {
    costAllocationNarrative: { methodology, otherSources }
  } = activity;

  const sync = name => html => {
    updateActivity(activity.key, { [name]: html });
  };

  return (
    <Subsection resource="activities.costAllocate" nested>
      <div className="data-entry-box">
        <Instruction
          source="activities.costAllocate.methodology.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={methodology}
          onSync={sync('costAllocationDesc')}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="data-entry-box">
        <Instruction
          source="activities.costAllocate.otherFunding.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={otherSources}
          onSync={sync('otherFundingDesc')}
          editorClassName="rte-textarea-l"
        />
      </div>
      <hr />
      <CostAllocateFFP aKey={activity.key} />
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
