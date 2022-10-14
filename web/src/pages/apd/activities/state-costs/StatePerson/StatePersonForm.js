import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextArea from '../../../../../components/TextArea';
import PersonCostForm from '../../../../../components/PersonCostForm';

import statePersonnelSchema from '@cms-eapd/common/schemas/statePersonnel';
import { savePersonnel as actualSavePersonnel } from '../../../../../redux/actions/editActivity';

const StatePersonForm = forwardRef(
  ({ activityIndex, item, index, savePersonnel, setFormValid }, ref) => {
    StatePersonForm.displayName = 'StatePersonForm';
    const { title, description, years } = JSON.parse(
      JSON.stringify({ ...item })
    );
    const {
      control,
      formState: { errors, isValid },
      getValues,
      setValue
    } = useForm({
      defaultValues: {
        title,
        description,
        years
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(statePersonnelSchema)
    });

    const [subFormValid, setSubFormValid] = useState(false);

    useEffect(() => {
      if (isValid && subFormValid) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }, [isValid, subFormValid]); // eslint-disable-line react-hooks/exhaustive-deps

    const getEditCostForYear = (year, value) => {
      // Manually update the react-hook-form store
      setValue(`years[${year}].amt`, value);
    };

    const getEditFTEForYear = (year, value) => {
      // Manually update the react-hook-form store
      setValue(`years[${year}].perc`, value);
    };

    const onSubmit = e => {
      e.preventDefault();
      savePersonnel(activityIndex, index, {
        ...item,
        ...getValues()
      });
    };

    const handleSubForm = value => {
      setSubFormValid(value);
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
        <h4 className="ds-h4">Personnel {index + 1}:</h4>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value, ...props } }) => (
            <TextField
              {...props}
              label="Personnel title"
              name="title"
              value={value}
              onChange={onChange}
              className="remove-clearfix"
              errorMessage={errors?.title?.message}
              errorPlacement="bottom"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, ...props } }) => (
            <TextArea
              {...props}
              label="Description"
              rows={5}
              value={value}
              onChange={onChange}
              className="remove-clearfix"
              errorMessage={errors?.description?.message}
              errorPlacement="bottom"
            />
          )}
        />

        <div className="ds-u-margin-top--3">
          <Controller
            control={control}
            name="years"
            render={({ field: { value, ...props } }) => (
              <PersonCostForm
                {...props}
                items={value}
                setCost={getEditCostForYear}
                setFTE={getEditFTEForYear}
                setFormValid={handleSubForm}
              />
            )}
          />
        </div>

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

StatePersonForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  savePersonnel: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  savePersonnel: actualSavePersonnel
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  StatePersonForm
);

export { StatePersonForm as plain, mapDispatchToProps };
