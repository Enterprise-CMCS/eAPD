import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Section } from '../../../components/Section';
import RichText from '../../../components/RichText';
import Instruction from '../../../components/Instruction';
import { useForm, Controller } from 'react-hook-form';

import { selectAdminCheckEnabled } from '../../../redux/selectors/apd.selectors';

import statePrioritiesAndScopeSchema from '@cms-eapd/common/schemas/statePrioritiesAndScope';
import { joiResolver } from '@hookform/resolvers/joi';

const StatePrioritiesAndScope = ({
  medicaidProgramAndPriorities,
  mesIntroduction,
  scopeOfAPD,
  adminCheck
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
  }, [adminCheck]);

  return (
    <Section id="state-priorities-and-scope" resource="statePrioritiesAndScope">
      <hr />

      <div
        className="ds-u-margin-top--6"
        id="medicaid-program-priorities-container"
      >
        <Instruction source="statePrioritiesAndScope.programPriorities" />
        <Controller
          name="medicaidProgramAndPriorities"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <RichText
              {...props}
              id="medicaid-program-priorities-field"
              iframe_aria_text="Medicaid Program and Priorities Text Area"
              content={value}
              onSync={html => {
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={errors?.medicaidProgramAndPriorities?.message}
            />
          )}
        />
      </div>

      <div
        className="ds-u-margin-top--6"
        id="medicaid-enterprise-system-intro-container"
      >
        <Instruction source="statePrioritiesAndScope.enterpriseSystemIntro" />
        <Controller
          name="mesIntroduction"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <RichText
              {...props}
              id="medicaid-enterprise-system-intro"
              iframe_aria_text="Medicaid Enterprise System Introduction Text Area"
              content={value}
              onSync={html => {
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={errors?.mesIntroduction?.message}
            />
          )}
        />
      </div>

      <div className="ds-u-margin-top--6" id="scope-of-apd-container">
        <Instruction source="statePrioritiesAndScope.scopeOfApd" />
        <Controller
          name="scopeOfAPD"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <RichText
              {...props}
              id="scope-of-apd"
              iframe_aria_text="Scope of APD Text Area"
              content={value}
              onSync={html => {
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={errors?.scopeOfAPD?.message}
            />
          )}
        />
      </div>
    </Section>
  );
};

StatePrioritiesAndScope.propTypes = {
  medicaidProgramAndPriorities: PropTypes.string.isRequired,
  mesIntroduction: PropTypes.string.isRequired,
  scopeOfAPD: PropTypes.string.isRequired,
  adminCheck: PropTypes.bool
};

StatePrioritiesAndScope.defaultProps = {
  adminCheck: false
};

const mapStateToProps = state => ({
  adminCheck: selectAdminCheckEnabled(state)
});

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
