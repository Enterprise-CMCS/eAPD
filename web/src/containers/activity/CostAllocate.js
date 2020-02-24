import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  setCostAllocationMethodology,
  setCostAllocationOtherFunding
} from '../../actions/editActivity';
import Instruction from '../../components/Instruction';
import RichText from '../../components/RichText';
import { Subsection } from '../../components/Section';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

const CostAllocate = ({
  activity,
  activityIndex,
  setMethodology,
  setOtherFunding
}) => {
  const {
    costAllocationNarrative: { methodology, otherSources }
  } = activity;
  const syncMethodology = html => setMethodology(activityIndex, html);
  const syncOtherFunding = html => setOtherFunding(activityIndex, html);

  return (
    <Subsection
      resource="activities.costAllocate"
      id={`activity-cost-allocation-${activityIndex}`}
    >
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
          onSync={syncMethodology}
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
          onSync={syncOtherFunding}
          editorClassName="rte-textarea-l"
        />
      </div>
    </Subsection>
  );
};

CostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setMethodology: PropTypes.func.isRequired,
  setOtherFunding: PropTypes.func.isRequired
};

export const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex })
  };
};

export const mapDispatchToProps = {
  setMethodology: setCostAllocationMethodology,
  setOtherFunding: setCostAllocationOtherFunding
};

export { CostAllocate as CostAllocateRaw };
export default connect(mapStateToProps, mapDispatchToProps)(CostAllocate);
