import { Dropdown } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import DollarField from '../../../../../components/DollarField';
import TextArea from '../../../../../components/TextArea';

import { expensesSchema as schema, APD_TYPE } from '@cms-eapd/common';

import { saveNonPersonnelCost as actualSaveNonPersonnelCost } from '../../../../../redux/actions/editActivity';

const NonPersonnelCostForm = forwardRef(
  (
    { activityIndex, apdType, index, item, saveNonPersonnelCost, setFormValid },
    ref
  ) => {
    NonPersonnelCostForm.displayName = 'NonPersonnelCostForm';
    const { category, description, years } = JSON.parse(
      JSON.stringify({ ...item })
    );
    const {
      control,
      formState: { errors, isValid },
      getValues,
      setValue,
      trigger
    } = useForm({
      defaultValues: {
        category,
        description,
        years
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(schema)
    });

    const categoryList = [
      'Equipment and supplies',
      'Hardware, software, and licensing',
      'Miscellaneous expenses for the project',
      'Training and outreach',
      'Travel'
    ];

    const [catList, setCatList] = useState(categoryList);

    useEffect(() => {
      if (apdType === APD_TYPE.HITECH) {
        let newCatList = ['Administrative operations', ...categoryList];
        setCatList(newCatList);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apdType]);

    const onSubmit = e => {
      e.preventDefault();
      saveNonPersonnelCost(activityIndex, index, {
        ...item,
        ...getValues()
      });
    };

    useEffect(() => {
      setFormValid(isValid);
    }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

    const categories = catList.map(category => ({
      label: category,
      value: category
    }));
    categories.unshift({ label: 'Select an option', value: '' });
    return (
      <form id={`non-personnel-cost-${index}`} onSubmit={onSubmit}>
        {/* Prevent implicit submission of the form. */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
          aria-label="submitButton"
        />
        <h4 className="ds-h4">Non-Personnel Cost {index + 1}:</h4>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Controller
          control={control}
          name="category"
          render={({ field: { value, ...props } }) => (
            <Dropdown
              {...props}
              autoFocus
              label="Category"
              name="category"
              options={categories}
              value={value}
              onChange={e => {
                setValue('category', e.target.value);
                trigger('category');
              }}
              onBlur={() => {
                trigger('category');
              }}
              errorMessage={errors?.category?.message}
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
              name="description"
              value={value}
              onChange={onChange}
              errorMessage={errors?.description?.message}
              errorPlacement="bottom"
            />
          )}
        />

        {Object.entries(item.years).map(([year]) => (
          <Controller
            key={year}
            control={control}
            name={`years[${year}]`}
            render={({ field: { onChange, value, ...props } }) => (
              <DollarField
                {...props}
                key={year}
                label={`FFY ${year} Cost`}
                name={`years[${year}]`}
                size="medium"
                value={value}
                onChange={onChange}
                errorMessage={
                  errors && errors.years && errors?.years[`${year}`]?.message
                }
                errorPlacement="bottom"
              />
            )}
          />
        ))}
        <input
          className="ds-u-visibility--hidden"
          type="submit"
          ref={ref}
          hidden
          aria-label="submitButton"
        />
      </form>
    );
  }
);

NonPersonnelCostForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  apdType: PropTypes.string,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  saveNonPersonnelCost: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  apdType: state.apd.data.apdType
});

const mapDispatchToProps = {
  saveNonPersonnelCost: actualSaveNonPersonnelCost
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(NonPersonnelCostForm);

export { NonPersonnelCostForm as plain, mapDispatchToProps };
