import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import DateField from '../../../../../components/DateField';

import { milestones as schema } from '@cms-eapd/common';

import { saveMilestone as actualSaveMilestone } from '../../../../../redux/actions/editActivity';

const MilestoneForm = forwardRef(
  ({ activityIndex, index, item, saveMilestone, setFormValid }, ref) => {
    MilestoneForm.displayName = 'MilestoneForm';
    const { milestone, endDate } = JSON.parse(JSON.stringify({ ...item }));
    const {
      control,
      formState: { errors, isValid },
      getFieldState,
      trigger,
      getValues
    } = useForm({
      defaultValues: {
        milestone,
        endDate
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(schema)
    });

    useEffect(() => {
      setFormValid(isValid);
    }, [isValid, errors]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = e => {
      e.preventDefault();
      saveMilestone(activityIndex, index, {
        ...item,
        ...getValues()
      });
    };

    return (
      <form index={index} onSubmit={onSubmit}>
        {/* Prevent implicit submission of the form. */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        <h4 className="ds-h4">Milestone {index + 1}:</h4>
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
