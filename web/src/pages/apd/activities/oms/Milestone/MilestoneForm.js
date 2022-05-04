import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import DateField from '../../../../../components/DateField';

import milestonesSchema from '../../../../../static/schemas/milestones';

import { saveMilestone as actualSaveMilestone } from '../../../../../redux/actions/editActivity';

const MilestoneForm = forwardRef(
  ({ activityIndex, index, item, saveMilestone, setFormValid }, ref) => {
    MilestoneForm.displayName = 'MilestoneForm';

    const {
      control,
      formState: { errors, isValid },
      getFieldState,
      getValues,
      setValue
    } = useForm({
      defaultValues: {
        ...item
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(milestonesSchema)
    });

    const changeDate = (_, dateStr) =>
      setValue(`endDate`, dateStr);

    const changeName = ({ target: { value } }) =>
      setValue(`milestone`, value);

    useEffect(() => {
      console.log("something changed")
      setFormValid(isValid);
    }, [isValid, errors]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = e => {
      e.preventDefault();
      saveMilestone(activityIndex, index, getValues());
    };

    return (
      <form index={index} onSubmit={onSubmit}>
        <h6 className="ds-h4">Milestone {index + 1}:</h6>
        <Controller
          control={control}
          name="milestone"
          render={({ field: { value, ...props } }) => (
            <TextField
              {...props}
              data-cy={`milestone-${index}`}
              label="Name"
              name="milestone"
              value={value}
              className="remove-clearfix textfield__container"
              onChange={changeName}
              errorMessage={errors?.milestone?.message}
              errorPlacement="bottom"
            />
          )} 
        />
        <Controller
          name="endDate"
          control={control}
          render={({
            field: { onChange, onBlur, ...props },
            formState: { isTouched }
          }) => (
            <DateField
              {...props}
              isTouched={isTouched}
              label="Target completion date"
              onChange={(e, dateStr) => onChange(dateStr)}
              onComponentBlur={() => {
                onBlur();
                if (getFieldState('end').isTouched) {
                  trigger('end');
                }
              }}
              errorMessage={errors?.endDate?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <input
          className="ds-u-visibility--hidden"
          type="submit"
          ref={ref}
          hidden
        />
      </form>
    );
  }
);

MilestoneForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    milestone: PropTypes.string.isRequired
  }).isRequired,
  saveMilestone: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveMilestone: actualSaveMilestone
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  MilestoneForm
);

export { MilestoneForm as plain, mapDispatchToProps };