import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Subsection } from '../../../../components/Section';
import RichText from '../../../../components/RichText';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { analysisOfAlternativesAndRisksSchema as schema } from '@cms-eapd/common';
import Instruction from '../../../../components/Instruction';

import {
  setAlternativeAnalysis as actualSetAlternativeAnalysis,
  setCostBenefitAnalysis as actualSetCostBenefitAnalysis,
  setFeasibilityStudy as actualSetFeasibilityStudy,
  setRequirementsAnalysis as actualSetRequirementsAnalysis,
  setForseeableRisks as actualSetForseeableRisks
} from '../../../../redux/actions/editActivity/alternativesAndRisks';
import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';
import { selectAlternativesAndRisksByActivityIndex } from '../../../../redux/selectors/activities.selectors';

const AlternativesAndRisks = ({
  activityIndex,
  alternativeAnalysis,
  costBenefitAnalysis,
  feasibilityStudy,
  requirementsAnalysis,
  forseeableRisks,
  setAlternativeAnalysis,
  setCostBenefitAnalysis,
  setFeasibilityStudy,
  setRequirementsAnalysis,
  setForseeableRisks,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      alternativeAnalysis,
      costBenefitAnalysis,
      feasibilityStudy,
      requirementsAnalysis,
      forseeableRisks
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Subsection
      id="alternatives-and-risk"
      resource="activities.alternativesAndRisks"
    >
      <div className="ds-u-margin-top--3" id="alternative-analysis-container">
        <Instruction
          labelFor="alternative-analysis-field"
          source="activities.alternativesAndRisks.alternativeAnalysis"
        />
        <Controller
          name="alternativeAnalysis"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="alternative-analysis-field"
              iframe_aria_text="Alternative Analysis Text Area"
              content={alternativeAnalysis}
              onSync={html => {
                setAlternativeAnalysis(activityIndex, html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.alternativeAnalysis?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-top--3" id="cost-benefit-analysis-container">
        <Instruction
          labelFor="cost-benefit-analysis-field"
          source="activities.alternativesAndRisks.costBenefitAnalysis"
        />
        <Controller
          name="costBenefitAnalysis"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="cost-benefit-analysis-field"
              iframe_aria_text="Alternative Analysis Text Area"
              content={costBenefitAnalysis}
              onSync={html => {
                setCostBenefitAnalysis(activityIndex, html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.costBenefitAnalysis?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-top--3" id="feasibility-study-container">
        <Instruction
          labelFor="feasibility-study-field"
          source="activities.alternativesAndRisks.feasibilityStudy"
        />
        <Controller
          name="feasibilityStudy"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="feasibility-study-field"
              iframe_aria_text="Alternative Analysis Text Area"
              content={feasibilityStudy}
              onSync={html => {
                setFeasibilityStudy(activityIndex, html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.feasibilityStudy?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-top--3" id="requirements-analysis-container">
        <Instruction
          labelFor="requirements-analysis-field"
          source="activities.alternativesAndRisks.requirementsAnalysis"
        />
        <Controller
          name="requirementsAnalysis"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="requirements-analysis-field"
              iframe_aria_text="Alternative Analysis Text Area"
              content={requirementsAnalysis}
              onSync={html => {
                setRequirementsAnalysis(activityIndex, html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.requirementsAnalysis?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-top--3" id="forseeable-risks-container">
        <Instruction
          labelFor="forseeable-risks-field"
          source="activities.alternativesAndRisks.forseeableRisks"
        />
        <Controller
          name="forseeableRisks"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="forseeable-risks-field"
              iframe_aria_text="Alternative Analysis Text Area"
              content={forseeableRisks}
              onSync={html => {
                setForseeableRisks(activityIndex, html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              error={adminCheck && errors?.forseeableRisks?.message}
            />
          )}
        />
      </div>
    </Subsection>
  );
};

AlternativesAndRisks.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  alternativeAnalysis: PropTypes.string.isRequired,
  costBenefitAnalysis: PropTypes.string.isRequired,
  feasibilityStudy: PropTypes.string.isRequired,
  requirementsAnalysis: PropTypes.string.isRequired,
  forseeableRisks: PropTypes.string.isRequired,
  setAlternativeAnalysis: PropTypes.func.isRequired,
  setCostBenefitAnalysis: PropTypes.func.isRequired,
  setFeasibilityStudy: PropTypes.func.isRequired,
  setRequirementsAnalysis: PropTypes.func.isRequired,
  setForseeableRisks: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  { getAlternativesAndRisks = selectAlternativesAndRisksByActivityIndex } = {}
) => {
  const {
    alternativeAnalysis,
    costBenefitAnalysis,
    feasibilityStudy,
    requirementsAnalysis,
    forseeableRisks
  } = getAlternativesAndRisks(state, { activityIndex });
  return {
    adminCheck: selectAdminCheckEnabled(state),
    alternativeAnalysis,
    costBenefitAnalysis,
    feasibilityStudy,
    requirementsAnalysis,
    forseeableRisks
  };
};

const mapDispatchToProps = {
  setAlternativeAnalysis: actualSetAlternativeAnalysis,
  setCostBenefitAnalysis: actualSetCostBenefitAnalysis,
  setFeasibilityStudy: actualSetFeasibilityStudy,
  setRequirementsAnalysis: actualSetRequirementsAnalysis,
  setForseeableRisks: actualSetForseeableRisks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlternativesAndRisks);

export { AlternativesAndRisks as plain, mapStateToProps, mapDispatchToProps };
