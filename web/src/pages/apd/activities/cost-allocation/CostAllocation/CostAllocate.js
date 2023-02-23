import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { setCostAllocationMethodology } from '../../../../../redux/actions/editActivity';
import Instruction from '../../../../../components/Instruction';
import RichText from '../../../../../components/RichText';
import { selectActivityByIndex } from '../../../../../redux/selectors/activities.selectors';
import {
  selectAdminCheckEnabled,
  selectApdType
} from '../../../../../redux/selectors/apd.selectors';
import { Subsection } from '../../../../../components/Section';

import { costAllocationNarrativeSchema as schema } from '@cms-eapd/common';

const CostAllocate = ({
  activity,
  activityIndex,
  setMethodology,
  adminCheck,
  apdType
}) => {
  const {
    costAllocationNarrative: { methodology = '' }
  } = activity;
  const syncMethodology = html => setMethodology(activityIndex, html);

  const {
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      methodology: methodology
    },
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
      resource={`activities.costAllocate.${apdType}`}
      id={`activity-cost-allocation-${activityIndex}`}
    >
      <div className="data-entry-box">
        <Instruction
          labelFor="cost-allocation-methodology-field"
          source={`activities.costAllocate.methodology.instruction.${apdType}`}
          headingDisplay={{
            level: 'h4',
            className: 'ds-h5'
          }}
        />
        <Controller
          name="methodology"
          control={control}
          data-testid="methodology"
          render={({ field: { onChange, name, ...props } }) => (
            <RichText
              {...props}
              name={name}
              id="cost-allocation-methodology-field"
              content={methodology}
              onSync={html => {
                syncMethodology(html);
                onChange(html);

                if (adminCheck) {
                  trigger();
                }
              }}
              editorClassName="rte-textarea-l"
              error={errors?.methodology?.message}
            />
          )}
        />
      </div>
    </Subsection>
  );
};

CostAllocate.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setMethodology: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired,
  apdType: PropTypes.string.isRequired
};

export const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex }),
    adminCheck: selectAdminCheckEnabled(state),
    apdType: selectApdType(state)
  };
};

export const mapDispatchToProps = {
  setMethodology: setCostAllocationMethodology
};

export { CostAllocate as plain };
export default connect(mapStateToProps, mapDispatchToProps)(CostAllocate);
