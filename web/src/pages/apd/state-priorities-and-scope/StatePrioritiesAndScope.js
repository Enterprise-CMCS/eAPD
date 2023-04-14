import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Section } from '../../../components/Section';
import RichText from '../../../components/RichText';
import Instruction from '../../../components/Instruction';
import { useForm, Controller } from 'react-hook-form';

import {
  setProgramPriorities,
  setEnterpriseSystemIntro,
  setScopeOfAPD
} from '../../../redux/actions/editApd/statePrioritiesAndScope';
import {
  selectAdminCheckEnabled,
  selectPriorities,
  selectMesIntro,
  selectScope
} from '../../../redux/selectors/apd.selectors';

import { statePrioritiesAndScopeSchema } from '@cms-eapd/common';
import { joiResolver } from '@hookform/resolvers/joi';

const StatePrioritiesAndScope = ({
  adminCheck,
  medicaidProgramAndPriorities,
  mesIntroduction,
  scopeOfAPD,
  setPP,
  setESI,
  setScope
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      medicaidProgramAndPriorities,
      mesIntroduction,
      scopeOfAPD
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(statePrioritiesAndScopeSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Section id="state-priorities-and-scope" resource="statePrioritiesAndScope">
      <hr />

      <div
        className="ds-u-margin-top--6"
        id="medicaid-program-priorities-container"
      >
        <Instruction
          labelFor="medicaid-program-priorities-field"
          source="statePrioritiesAndScope.programPriorities"
        />
        <Controller
          name="medicaidProgramAndPriorities"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="medicaid-program-priorities-field"
              iframe_aria_text="Medicaid Program and Priorities Text Area"
              content={medicaidProgramAndPriorities}
              onSync={html => {
                setPP(html);
                onChange(html);
              }}
              data-testid="medicaidProgramAndPriorities"
              editorClassName="rte-textarea-l"
              error={
                adminCheck && errors?.medicaidProgramAndPriorities?.message
              }
            />
          )}
        />
      </div>

      <div
        className="ds-u-margin-top--6"
        id="medicaid-enterprise-system-intro-container"
      >
        <Instruction
          labelFor="medicaid-enterprise-system-intro"
          source="statePrioritiesAndScope.enterpriseSystemIntro"
        />
        <Controller
          name="mesIntroduction"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="medicaid-enterprise-system-intro"
              iframe_aria_text="Medicaid Enterprise System Introduction Text Area"
              content={mesIntroduction}
              onSync={html => {
                setESI(html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.mesIntroduction?.message}
            />
          )}
        />
      </div>

      <div className="ds-u-margin-top--6" id="scope-of-apd-container">
        <Instruction
          labelFor="scope-of-apd"
          source="statePrioritiesAndScope.scopeOfApd"
        />
        <Controller
          name="scopeOfAPD"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="scope-of-apd"
              iframe_aria_text="Scope of APD Text Area"
              content={scopeOfAPD}
              onSync={html => {
                setScope(html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.scopeOfAPD?.message}
            />
          )}
        />
      </div>
    </Section>
  );
};

StatePrioritiesAndScope.propTypes = {
  adminCheck: PropTypes.bool.isRequired,
  medicaidProgramAndPriorities: PropTypes.string.isRequired,
  mesIntroduction: PropTypes.string.isRequired,
  scopeOfAPD: PropTypes.string.isRequired,
  setPP: PropTypes.func.isRequired,
  setESI: PropTypes.func.isRequired,
  setScope: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminCheck: selectAdminCheckEnabled(state),
  medicaidProgramAndPriorities: selectPriorities(state),
  mesIntroduction: selectMesIntro(state),
  scopeOfAPD: selectScope(state)
});

const mapDispatchToProps = {
  setPP: setProgramPriorities,
  setESI: setEnterpriseSystemIntro,
  setScope: setScopeOfAPD
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePrioritiesAndScope);

export {
  StatePrioritiesAndScope as plain,
  mapStateToProps,
  mapDispatchToProps
};
