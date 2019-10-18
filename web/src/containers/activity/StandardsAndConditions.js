import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  setActivityStandardsBusinessResults,
  setActivityStandardsDocumentation,
  setActivityStandardsIndustryStandards,
  setActivityStandardsInteroperability,
  setActivityStandardsKeyPersonnel,
  setActivityStandardsLeverage,
  setActivityStandardsMinimizeCost,
  setActivityStandardsMITA,
  setActivityStandardsMitigationStrategy,
  setActivityStandardsModularity,
  setActivityStandardsReporting
} from '../../actions/editActivity';

import RichText from '../../components/RichText';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setBusinessResults,
  setDocumentation,
  setIndustryStandards,
  setInteroperability,
  setKeyPersonnel,
  setLeverage,
  setMinimizeCost,
  setMITA,
  setMitigationStrategy,
  setModularity,
  setReporting
}) => {
  const getHandler = action => html => {
    action(activityIndex, html);
  };

  return (
    <Subsection resource="activities.standardsAndConditions" nested>
      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.modularity.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.modularity}
          onSync={getHandler(setModularity)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.mita.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.mita}
          onSync={getHandler(setMITA)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.industryStandards.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.industryStandards}
          onSync={getHandler(setIndustryStandards)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.leverage.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.leverage}
          onSync={getHandler(setLeverage)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.businessResults.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.businessResults}
          onSync={getHandler(setBusinessResults)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.reporting.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.reporting}
          onSync={getHandler(setReporting)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.interoperability.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.interoperability}
          onSync={getHandler(setInteroperability)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.mitigationStrategy.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.mitigationStrategy}
          onSync={getHandler(setMitigationStrategy)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.keyPersonnel.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.keyPersonnel}
          onSync={getHandler(setKeyPersonnel)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.documentation.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.documentation}
          onSync={getHandler(setDocumentation)}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="ds-u-margin-bottom--6">
        <Instruction
          source="activities.standardsAndConditions.minimizeCost.instruction"
          headingDisplay={{
            level: 'h6',
            className: 'ds-h5'
          }}
        />
        <RichText
          content={activity.standardsAndConditions.minimizeCost}
          onSync={getHandler(setMinimizeCost)}
          editorClassName="rte-textarea-l"
        />
      </div>
    </Subsection>
  );
};

StandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setBusinessResults: PropTypes.func.isRequired,
  setDocumentation: PropTypes.func.isRequired,
  setIndustryStandards: PropTypes.func.isRequired,
  setInteroperability: PropTypes.func.isRequired,
  setKeyPersonnel: PropTypes.func.isRequired,
  setLeverage: PropTypes.func.isRequired,
  setMinimizeCost: PropTypes.func.isRequired,
  setMITA: PropTypes.func.isRequired,
  setMitigationStrategy: PropTypes.func.isRequired,
  setModularity: PropTypes.func.isRequired,
  setReporting: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  activity: selectActivityByIndex(state, props)
});

const mapDispatchToProps = {
  setBusinessResults: setActivityStandardsBusinessResults,
  setDocumentation: setActivityStandardsDocumentation,
  setIndustryStandards: setActivityStandardsIndustryStandards,
  setInteroperability: setActivityStandardsInteroperability,
  setKeyPersonnel: setActivityStandardsKeyPersonnel,
  setLeverage: setActivityStandardsLeverage,
  setMinimizeCost: setActivityStandardsMinimizeCost,
  setMITA: setActivityStandardsMITA,
  setMitigationStrategy: setActivityStandardsMitigationStrategy,
  setModularity: setActivityStandardsModularity,
  setReporting: setActivityStandardsReporting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardsAndConditions);

export { StandardsAndConditions as plain, mapStateToProps, mapDispatchToProps };
