import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { setCostAllocationMethodology } from '../../../../../redux/actions/editActivity';
import Instruction from '../../../../../components/Instruction';
import RichText from '../../../../../components/RichText';
import { selectActivityByIndex } from '../../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../../components/Section';

const CostAllocate = ({ activity, activityIndex, setMethodology }) => {
  const {
    costAllocationNarrative: { methodology }
  } = activity;
  const syncMethodology = html => setMethodology(activityIndex, html);

  return (
    <Subsection
      resource="activities.costAllocate"
      id={`activity-cost-allocation-${activityIndex}`}
    >
      <div className="data-entry-box">
        <Instruction
          labelFor="cost-allocation-methodology-field"
          source="activities.costAllocate.methodology.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          id="cost-allocation-methodology-field"
          iframe_aria_text="Description of Cost Allocation Methodology Summary Text Area"
          content={methodology}
          onSync={syncMethodology}
          editorClassName="rte-textarea-l"
        />
      </div>
    </Subsection>
  );
};

CostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setMethodology: PropTypes.func.isRequired
};

export const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex })
  };
};

export const mapDispatchToProps = {
  setMethodology: setCostAllocationMethodology
};

export { CostAllocate as plain };
export default connect(mapStateToProps, mapDispatchToProps)(CostAllocate);
