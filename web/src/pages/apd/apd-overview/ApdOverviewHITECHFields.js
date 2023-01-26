import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { hitechOverviewSchema } from '@cms-eapd/common/schemas/apdOverview';

import {
  setNarrativeForHIE,
  setNarrativeForHIT,
  setNarrativeForMMIS,
  setProgramOverview
} from '../../../redux/actions/editApd';
import RichText from '../../../components/RichText';
import Instruction from '../../../components/Instruction';

import {
  selectSummary,
  selectAdminCheckEnabled
} from '../../../redux/selectors/apd.selectors';
import { getAllFundingSources } from '../../../redux/selectors/activities.selectors';

const ApdOverviewHITECHFields = ({
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview,
  setHIE,
  setHIT,
  setMMIS,
  setOverview,
  fundingSources,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      fundingSources,
      programOverview,
      narrativeHIT,
      narrativeHIE,
      narrativeMMIS
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(hitechOverviewSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProgramOverview = html => {
    setOverview(html);
    setValue('programOverview', html);
    if (adminCheck) {
      trigger();
    }
  };

  const handleHIEOverview = html => {
    setHIE(html);
    setValue('narrativeHIE', html);
    if (adminCheck) {
      trigger();
    }
  };

  const handleHITOverview = html => {
    setHIT(html);
    setValue('narrativeHIT', html);
    if (adminCheck) {
      trigger();
    }
  };

  const handleMMISOverview = html => {
    setMMIS(html);
    setValue('narrativeMMIS', html);
    if (adminCheck) {
      trigger();
    }
  };

  return (
    <Fragment>
      <div className="ds-u-margin-y--3">
        <Instruction
          labelFor="program-introduction-field"
          source="apd.introduction.instruction"
        />
        <Controller
          name="programOverview"
          control={control}
          render={({ field: { ...props } }) => (
            <RichText
              {...props}
              id="program-introduction-field"
              iframe_aria_text="Program Introduction Text Area"
              content={programOverview}
              onSync={handleProgramOverview}
              editorClassName="rte-textarea-l"
              error={errors?.programOverview?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-bottom--3">
        <Instruction
          labelFor="hit-overview-field"
          source="apd.hit.instruction"
        />
        <Controller
          name="narrativeHIT"
          control={control}
          render={({ field: { ...props } }) => (
            <RichText
              {...props}
              id="hit-overview-field"
              iframe_aria_text="HIT Overview Text Area"
              content={narrativeHIT}
              onSync={handleHITOverview}
              editorClassName="rte-textarea-l"
              error={errors?.narrativeHIT?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-bottom--3">
        <Instruction
          labelFor="hie-overview-field"
          source="apd.hie.instruction"
        />
        <Controller
          name="narrativeHIE"
          control={control}
          render={({ field: { ...props } }) => (
            <RichText
              {...props}
              id="hie-overview-field"
              iframe_aria_text="HIE Overview Text Area"
              content={narrativeHIE}
              onSync={handleHIEOverview}
              editorClassName="rte-textarea-l"
              error={errors?.narrativeHIE?.message}
            />
          )}
        />
      </div>
      <div>
        <Instruction
          labelFor="mmis-overview-field"
          source="apd.mmis.instruction"
        />
        <Controller
          name="narrativeMMIS"
          control={control}
          render={({ field: { ...props } }) => (
            <RichText
              {...props}
              id="mmis-overview-field"
              iframe_aria_text="MMIS Overview Text Area"
              content={narrativeMMIS}
              onSync={handleMMISOverview}
              editorClassName="rte-textarea-l"
              error={errors?.narrativeMMIS?.message}
            />
          )}
        />
      </div>
    </Fragment>
  );
};

ApdOverviewHITECHFields.propTypes = {
  name: PropTypes.string.isRequired,
  narrativeHIE: PropTypes.string.isRequired,
  narrativeHIT: PropTypes.string.isRequired,
  narrativeMMIS: PropTypes.string.isRequired,
  programOverview: PropTypes.string.isRequired,
  setHIE: PropTypes.func.isRequired,
  setHIT: PropTypes.func.isRequired,
  setMMIS: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  fundingSources: PropTypes.array,
  adminCheck: PropTypes.bool
};

ApdOverviewHITECHFields.defaultProps = {
  fundingSources: ['HIT'],
  adminCheck: false
};

const mapStateToProps = state => ({
  fundingSources: getAllFundingSources(state),
  adminCheck: selectAdminCheckEnabled(state),
  ...selectSummary(state)
});

const mapDispatchToProps = {
  setHIE: setNarrativeForHIE,
  setHIT: setNarrativeForHIT,
  setMMIS: setNarrativeForMMIS,
  setOverview: setProgramOverview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdOverviewHITECHFields);

export {
  ApdOverviewHITECHFields as plain,
  mapStateToProps,
  mapDispatchToProps
};
