import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Section, Subsection } from '../../../components/Section';
import RichText from '../../../components/RichText';
import {
  setSecurityInterfacePlan,
  setBCDRPlan
} from '../../../redux/actions/editApd';
import {
  selectSecurityInterfacePlan,
  selectBusinessContinuityAndDisasterRecovery
} from '../../../redux/selectors/apd.selectors';

const SecurityPlanning = ({
  securityInterfacePlan,
  BCDRPlan,
  setPlanForSI,
  setPlanforBCDR
}) => {
  const handleSIPlan = html => {
    setPlanForSI(html);
    // setValue('securityInterfacePlan', html);
  };

  const handleBCDRPlan = html => {
    setPlanforBCDR(html);
    // setValue('BCDRPlan', html);
  };

  return (
    <React.Fragment>
      <Section id="security-planning" resource="securityPlanning">
        <Subsection
          id="security-interface-plan"
          resource="securityPlanning.securityInterfacePlan"
        >
          <RichText
            id="security-interface-plan-field"
            iframe_aria_text="Security Interface Planning Text Area"
            content={securityInterfacePlan}
            onSync={handleSIPlan}
            editorClassName="rte-textarea-l"
          />
        </Subsection>
        <Subsection id="bc-dr-plan" resource="securityPlanning.bcDrplan">
          <RichText
            id="bc-dr-plan-field"
            iframe_aria_text="Business Continuity and Disaster Recovery Text Area"
            content={BCDRPlan}
            onSync={handleBCDRPlan}
            editorClassName="rte-textarea-l"
          />
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

SecurityPlanning.propTypes = {
  securityInterfacePlan: PropTypes.string,
  BCDRPlan: PropTypes.string,
  setPlanForSI: PropTypes.func.isRequired,
  setPlanforBCDR: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  securityInterfacePlan: selectSecurityInterfacePlan(state),
  BCDRPlan: selectBusinessContinuityAndDisasterRecovery(state)
});

const mapDispatchToProps = {
  setPlanForSI: setSecurityInterfacePlan,
  setPlanforBCDR: setBCDRPlan
};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPlanning);

export { SecurityPlanning as plain, mapStateToProps, mapDispatchToProps };
