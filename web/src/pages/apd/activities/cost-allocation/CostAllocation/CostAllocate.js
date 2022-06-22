import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { setCostAllocationMethodology } from '../../../../../redux/actions/editActivity';
import Instruction from '../../../../../components/Instruction';
import RichText from '../../../../../components/RichText';
import { selectActivityByIndex } from '../../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../../components/Section';

import Joi from 'joi';

const costAllocateSchema = Joi.object({
  methodology: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a description of the cost allocation methodology.',
    'string.empty': 'Provide a description of the cost allocation methodology.',
    'string.min': 'Provide a description of the cost allocation methodology.'
  })
});

const CostAllocate = ({ 
  activity,
  activityIndex, 
  setMethodology,
  adminCheck }) => {
  const {
    costAllocationNarrative: { methodology }
  } = activity;
  const syncMethodology = html => setMethodology(activityIndex, html);


  const {
    control,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      methodology: methodology
    },
    resolver: joiResolver(costAllocateSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
      console.log({errors})
    };
  }, []);

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
        <Controller
          name="methodology"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="cost-allocation-methodology-field"
              content={methodology}
              onSync={html => {
                syncMethodology(html)
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
  adminCheck: PropTypes.func.isRequired
};

export const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex }),
    adminCheck: state.apd.adminCheck
  };
};

export const mapDispatchToProps = {
  setMethodology: setCostAllocationMethodology
};

export { CostAllocate as plain };
export default connect(mapStateToProps, mapDispatchToProps)(CostAllocate);
