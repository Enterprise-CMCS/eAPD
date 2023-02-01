import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Section } from '../../../components/Section';
import RichText from '../../../components/RichText';
import {
  setSecurityInterfacePlan,
  setBCDRPlan
} from '../../../redux/actions/editApd';
import {
  selectSecurityInterfacePlan,
  selectBusinessContinuityAndDisasterRecovery,
  selectAdminCheckEnabled
} from '../../../redux/selectors/apd.selectors';

import { securityPlanningSchema } from '@cms-eapd/common';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Instruction from '../../../components/Instruction';

const SecurityPlanning = ({
  securityInterfacePlan,
  BCDRPlan,
  setPlanForSI,
  setPlanforBCDR,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      securityAndInterfacePlan: securityInterfacePlan || '',
      businessContinuityAndDisasterRecovery: BCDRPlan || ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(securityPlanningSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Section id="security-planning" resource="securityPlanning">
        <hr className="custom-hr" />
        <div className="ds-u-margin-y--3">
          <Instruction
            labelFor="security-interface-plan"
            source="securityPlanning.securityInterfacePlan.instruction"
          />
          <Controller
            name="securityAndInterfacePlan"
            control={control}
            render={({ field: { onChange, ...props } }) => (
              <RichText
                {...props}
                id="security-interface-plan"
                iframe_aria_text="Security Interface Planning Text Area"
                content={securityInterfacePlan}
                onSync={html => {
                  setPlanForSI(html);
                  onChange(html);
                }}
                editorClassName="rte-textarea-l"
                error={adminCheck && errors?.securityAndInterfacePlan?.message}
              />
            )}
          />
        </div>
        <div className="ds-u-margin-y--3">
          <Instruction
            labelFor="bc-dr-plan"
            source="securityPlanning.bcDrplan.instruction"
          />
          <Controller
            name="businessContinuityAndDisasterRecovery"
            control={control}
            render={({ field: { onChange, ...props } }) => (
              <RichText
                {...props}
                id="bc-dr-plan"
                iframe_aria_text="Business Continuity and Disaster Recovery Text Area"
                content={BCDRPlan}
                onSync={html => {
                  setPlanforBCDR(html);
                  onChange(html);
                }}
                editorClassName="rte-textarea-l"
                error={
                  adminCheck &&
                  errors?.businessContinuityAndDisasterRecovery?.message
                }
              />
            )}
          />
        </div>
      </Section>
    </React.Fragment>
  );
};

SecurityPlanning.propTypes = {
  securityInterfacePlan: PropTypes.string,
  BCDRPlan: PropTypes.string,
  setPlanForSI: PropTypes.func.isRequired,
  setPlanforBCDR: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool
};

SecurityPlanning.defaultProps = {
  adminCheck: false
};

const mapStateToProps = state => ({
  securityInterfacePlan: selectSecurityInterfacePlan(state),
  BCDRPlan: selectBusinessContinuityAndDisasterRecovery(state),
  adminCheck: selectAdminCheckEnabled(state)
});

const mapDispatchToProps = {
  setPlanForSI: setSecurityInterfacePlan,
  setPlanforBCDR: setBCDRPlan
};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPlanning);

export { SecurityPlanning as plain, mapStateToProps, mapDispatchToProps };
