import React from 'react';
import { connect } from 'react-redux';

import { Section } from '../../../components/Section';
import RichText from '../../../components/RichText';
import Instruction from '../../../components/Instruction';

const StatePrioritiesAndScope = () => {
  return (
    <Section id="state-priorities-and-scope" resource="statePrioritiesAndScope">
      <hr />

      <div
        className="ds-u-margin-top--6"
        id="medicaid-program-priorities-container"
      >
        <Instruction source="statePrioritiesAndScope.programPriorities" />
        <RichText
          id="medicaid-program-priorities-field"
          iframe_aria_text="Medicaid Program and Priorities Text Area"
        />
      </div>

      <div
        className="ds-u-margin-top--6"
        id="medicaid-enterprise-system-intro-container"
      >
        <Instruction source="statePrioritiesAndScope.enterpriseSystemIntro" />
        <RichText
          id="medicaid-enterprise-system-intro"
          iframe_aria_text="Medicaid Enterprise System Introduction Text Area"
        />
      </div>

      <div className="ds-u-margin-top--6" id="scope-of-apd-container">
        <Instruction source="statePrioritiesAndScope.scopeOfApd" />
        <RichText id="scope-of-apd" iframe_aria_text="Scope of APD Text Area" />
      </div>
    </Section>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePrioritiesAndScope);

export {
  StatePrioritiesAndScope as plain,
  mapStateToProps,
  mapDispatchToProps
};
