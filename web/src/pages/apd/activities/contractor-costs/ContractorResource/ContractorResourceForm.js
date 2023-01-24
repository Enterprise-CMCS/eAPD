import { FormLabel, TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, forwardRef, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import DateField from '../../../../../components/DateField';
import DollarField from '../../../../../components/DollarField';
import Dollars from '../../../../../components/Dollars';
import NumberField from '../../../../../components/NumberField';
import RichText from '../../../../../components/RichText';

import validationSchema from '@cms-eapd/common/schemas/contractorResources';
import { saveContractor as actualSaveContractor } from '../../../../../redux/actions/editActivity';

const getCheckedValue = value => {
  if (value !== null) {
    if (value === true) return 'yes';
    if (value === false) return 'no';
    return value;
  }
  return null;
};

const getBooleanValue = value => {
  if (value === 'yes') return true;
  if (value === 'no') return false;
  return null;
};

const ContractorResourceForm = forwardRef(
  ({ activityIndex, index, item, saveContractor, setFormValid }, ref) => {
    ContractorResourceForm.displayName = 'ContractorResourceForm';
    const {
      name,
      description,
      start,
      end,
      totalCost,
      useHourly: useHourlyProp,
      hourly,
      years
    } = JSON.parse(JSON.stringify({ ...item }));

    const {
      control,
      formState: { errors, isValid },
      getFieldState,
      trigger,
      setValue,
      getValues
    } = useForm({
      defaultValues: {
        name,
        description,
        start,
        end,
        totalCost,
        useHourly: getCheckedValue(useHourlyProp),
        hourly,
        years
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(validationSchema)
    });
    const [useHourly, setUseHourly] = useState(getCheckedValue(item.useHourly));

    useEffect(() => {
      setFormValid(isValid);
    }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

    const apdFFYs = Object.keys(getValues('years'));

    const onSubmit = e => {
      e.preventDefault();
      saveContractor(activityIndex, index, {
        ...item,
        ...getValues(),
        useHourly: getBooleanValue(getValues('useHourly'))
      });
    };

    return (
      <form
        id={`contractor-resource-${index}`}
        onSubmit={onSubmit}
        aria-label="form"
      >
        {/* Prevent implicit submission of the form. */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
          aria-label="submitButton"
        />
        <Controller
          name="name"
          control={control}
          render={({ field: { ...props } }) => (
            <TextField
              {...props}
              label="Private Contractor or Vendor Name"
              hint="Provide the name of the private contractor or vendor. For planned procurements, generalize by resource name. For example, Computer Resources/TBD."
              labelClassName="full-width-label"
              className="remove-clearfix"
              errorMessage={errors?.name?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <FormLabel
          className="full-width-label"
          fieldId={`contractor-description-field-${index}`}
        >
          Procurement Methodology and Description of Services
          <span className="ds-c-field__hint ds-u-margin--0">
            Explain the procurement process for the contractor and the scope of
            their work. Provide justification for any non-competitive
            procurements.
          </span>
        </FormLabel>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <RichText
              {...props}
              id={`contractor-description-field-${index}`}
              iframe_aria_text="Procurement Methodology and Description of Services Text Area"
              content={value}
              onSync={html => {
                onChange(html);
              }}
              editorClassName="rte-textarea-1"
              error={errors?.description?.message}
            />
          )}
        />
        <FormLabel>Full Contract Term</FormLabel>
        <span className="ds-c-field__hint">
          Provide the total length of the contract, including any option years.
          Contract term may extend beyond the FFY(s) included in this APD.
        </span>
        <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
          <Controller
            name="start"
            control={control}
            render={({
              field: { onChange, onBlur, ...props },
              formState: { isTouched }
            }) => (
              <DateField
                {...props}
                isTouched={isTouched}
                label="Contract start date"
                onChange={(e, dateStr) => onChange(dateStr)}
                onComponentBlur={() => {
                  onBlur();
                  if (getFieldState('end').isTouched) {
                    trigger('end');
                  }
                }}
                errorMessage={errors?.start?.message}
              />
            )}
          />
          <Controller
            name="end"
            control={control}
            render={({ field: { onChange, onBlur, ...props } }) => {
              return (
                <DateField
                  {...props}
                  label="Contract end date"
                  onChange={(e, dateStr) => onChange(dateStr)}
                  onComponentBlur={() => {
                    onBlur();
                    if (getFieldState('start').isTouched) {
                      trigger('start');
                    }
                  }}
                  errorMessage={errors?.end?.message}
                />
              );
            }}
          />
        </div>
        <Controller
          name="totalCost"
          control={control}
          render={({ field: { onChange, onBlur, value, ...props } }) => (
            <DollarField
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              label="Total Contract Cost"
              size="medium"
              hint="Provide the total not to exceed amounts of the contract, including costs for the option years. This is not the amount you are requesting for the FFYs and will not be added to your FFY requests."
              labelClassName="full-width-label"
              errorMessage={errors?.totalCost?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          name="useHourly"
          control={control}
          render={({
            field: {
              name,
              onChange: radioHourlyOnChange,
              onBlur: radioHourlyOnBlur,
              value
            }
          }) => (
            <ChoiceList
              label="This is an hourly resource"
              name={name}
              choices={[
                {
                  label: 'Yes',
                  value: 'yes',
                  checked: value === 'yes',
                  checkedChildren: (
                    <div className="ds-c-choice__checkedChild">
                      {apdFFYs.map(ffy => (
                        <Fragment key={ffy}>
                          <FormLabel>FFY {ffy}</FormLabel>
                          <div className="ds-l-row ds-u-padding-left--2">
                            <Controller
                              key={`${ffy}-hours`}
                              name={`hourly[${ffy}].hours`}
                              control={control}
                              render={({
                                field: { onChange: hoursOnChange, ...props }
                              }) => (
                                <NumberField
                                  {...props}
                                  label="Number of hours"
                                  labelClassName="ds-u-margin-top--1"
                                  size="medium"
                                  onChange={e => {
                                    hoursOnChange(e);
                                    setValue(
                                      `years[${ffy}]`,
                                      e.target.value *
                                        getValues(`hourly[${ffy}].rate`)
                                    );
                                    trigger(`years[${ffy}]`);
                                  }}
                                />
                              )}
                            />
                            <Controller
                              key={`${ffy}-rate`}
                              name={`hourly.${ffy}.rate`}
                              control={control}
                              render={({
                                field: { onChange: rateOnChange, ...props }
                              }) => (
                                <DollarField
                                  {...props}
                                  className="ds-u-margin-left--1"
                                  label="Hourly rate"
                                  labelClassName="ds-u-margin-top--1"
                                  size="medium"
                                  onChange={e => {
                                    rateOnChange(e);
                                    setValue(
                                      `years[${ffy}]`,
                                      e.target.value *
                                        getValues(`hourly[${ffy}].hours`)
                                    );
                                    trigger(`years[${ffy}]`);
                                  }}
                                />
                              )}
                            />
                          </div>
                          <div>
                            <Fragment>
                              {errors?.hourly && errors.hourly[ffy]?.hours && (
                                <span
                                  className="ds-c-inline-error ds-c-field__error-message"
                                  role="alert"
                                >
                                  {errors.hourly[ffy]?.hours?.message}
                                </span>
                              )}
                              {errors?.hourly && errors.hourly[ffy]?.rate && (
                                <span
                                  className="ds-c-inline-error ds-c-field__error-message"
                                  role="alert"
                                >
                                  {errors.hourly[ffy]?.rate?.message}
                                </span>
                              )}
                            </Fragment>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  )
                },
                {
                  label: 'No',
                  value: 'no',
                  checked: value === 'no'
                }
              ]}
              type="radio"
              onChange={e => {
                setUseHourly(e.target.value);
                radioHourlyOnChange(e);
                if (getFieldState('hourly').isTouched) trigger('hourly');
                if (getFieldState('years').isTouched) trigger('years');
              }}
              onBlur={radioHourlyOnBlur}
              onComponentBlur={radioHourlyOnBlur}
              errorMessage={errors?.useHourly?.message}
              errorPlacement="bottom"
            />
          )}
        />
        {useHourly === 'yes' || useHourly === true || useHourly === null ? (
          <div className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <div key={ffy}>
                <FormLabel>FFY {ffy} Cost</FormLabel>
                <Dollars>{getValues(`years[${ffy}]`)}</Dollars>
              </div>
            ))}
          </div>
        ) : (
          <div className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <Controller
                key={ffy}
                name={`years.${ffy}`}
                control={control}
                render={({ field: { ...props } }) => (
                  <DollarField
                    {...props}
                    label={`FFY ${ffy} Cost`}
                    size="medium"
                    errorMessage={errors?.years?.[ffy]?.message}
                    errorPlacement="bottom"
                  />
                )}
              />
            ))}
          </div>
        )}
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

ContractorResourceForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    totalCost: PropTypes.number,
    useHourly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    hourly: PropTypes.object,
    years: PropTypes.object
  }).isRequired,
  saveContractor: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveContractor: actualSaveContractor
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  ContractorResourceForm
);

export { ContractorResourceForm as plain, mapDispatchToProps };
