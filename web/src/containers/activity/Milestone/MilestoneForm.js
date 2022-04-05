import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import DateField from '../../../components/DateField';

import milestonesSchema from '../../../static/schemas/milestones';

import { saveMilestone as actualSaveMilestone } from '../../../actions/editActivity';

const MilestoneForm = forwardRef(
  ({ activityIndex, index, item, saveMilestone, setFormValid }, ref) => {
    MilestoneForm.displayName = 'MilestoneForm';

    const {
      control,
      formState: { errors, isValid },
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

    const [subFormValid, setSubFormValid] = useState(false);

    const changeDate = (_, dateStr) =>
      setValue(`endDate`, dateStr);
      // dispatch({ type: 'updateField', field: 'endDate', value: dateStr });

    const changeName = ({ target: { value } }) =>
      setValue(`milestone`, value);
      // dispatch({ type: 'updateField', field: 'milestone', value });

    useEffect(() => {
      setFormValid(isValid);
      console.log("getValues", getValues())
      console.log("errors", errors)
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
          render={({ field: { onChange, value, ...props } }) => (
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
          control={control}
          name="endDate"
          render={({ field: { onChange, value, ...props } }) => (
            <DateField
              {...props}
              label="Target completion date"
              hint=""
              name="endDate"
              value={value}
              onChange={changeDate}
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
