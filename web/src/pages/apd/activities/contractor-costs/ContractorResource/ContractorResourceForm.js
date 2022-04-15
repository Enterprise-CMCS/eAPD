import { FormLabel, TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, {
  Fragment,
  forwardRef,
  useMemo,
  useEffect
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import DateField from '../../../../../components/DateField';
import DollarField from '../../../../../components/DollarField';
import Dollars from '../../../../../components/Dollars';
import NumberField from '../../../../../components/NumberField';
import RichText from '../../../../../components/RichText';

import validationSchema from '../../../../../static/schemas/privateContractor';
import { saveContractor as actualSaveContractor } from '../../../../../actions/editActivity';

const getCheckedValue = value => {
  if (value !== null) {
    if (value === true) return 'yes';
    if (value === false) return 'no';
    return value;
  }
  return null;
};

const ContractorResourceForm = forwardRef(
  ({ activityIndex, index, item, saveContractor, setFormValid }, ref) => {
    ContractorResourceForm.displayName = 'ContractorResourceForm';
    const {
      control,
      getFieldState,
      trigger,
      formState: { errors, isValid },
      resetField: resetFieldErrors,
      setValue,
      getValues
    } = useForm({
      defaultValues: {
        ...item,
        useHourly: getCheckedValue(item.useHourly)
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(validationSchema)
    });

    useEffect(() => {
      console.log("errors", errors);
      console.log("item", item);
      console.log("getValues", getValues());
      console.log("isValid", isValid);
      setFormValid(isValid);
    }, [isValid, errors]); // eslint-disable-line react-hooks/exhaustive-deps

    const apdFFYs = Object.keys(getValues('years'));

    const handleNameChange = e => {
      setValue('name', e.target.value);
    };

    const handleDescriptionChange = value => {
      setValue('description', value);
    };

    const handleTotalCostChange = e => {
      setValue('totalCost', e.target.value);
    };

    const handleStartDateChange = value => setValue('start', value);
    const handleEndDateChange = value => setValue('end', value);

    const handleUseHourlyChange = e => {
      setValue('useHourly', e.target.value);
    };

    const handleHourlyHoursChange = (ffy, e) => {
      setValue(`hourly[${ffy}].hours`, e.target.value);
      setValue(`years[${ffy}]`, e.target.value * getValues(`hourly[${ffy}].rate`));
    };

    const handleHourlyRateChange = (ffy, e) => {
      setValue(`hourly[${ffy}].rate`, e.target.value);
      setValue(`years[${ffy}]`, getValues(`hourly[${ffy}]`) * e.target.value);
    };

    const handleYearCostChange = (ffy, e) => {
      setValue(`years[${ffy}]`, e.target.value);
    };

    const onSubmit = e => {
      e.preventDefault();
      saveContractor(activityIndex, index, getValues());
    };

    return (
      <form index={index} onSubmit={onSubmit} aria-label="form">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <TextField
              {...props}
              name="name"
              value={value}
              label="Private Contractor or Vendor Name"
              hint="Provide the name of the private contractor or vendor. For planned procurements, generalize by resource name. For example, Computer Resources/TBD."
              labelClassName="full-width-label"
              className="remove-clearfix"
              onChange={e => {
                handleNameChange(e);
              }}
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
          render={({ field: { onChange, onBlur, value, ...props }}) => (
            <RichText
              {...props}
              name="description"
              id={`contractor-description-field-${index}`}
              content={value}
              onSync={html => {
                handleDescriptionChange(html);
              }}
              onBlur={onBlur}
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
            render={({ field: { onBlur, onChange, name, value, ...props } }) => (
              <DateField
                {...props}
                name={name}
                label="Contract start date"
                value={value}
                onChange={(e, dateStr) => {
                  handleStartDateChange('start', dateStr);
                }}
                onComponentBlur={(e, dateStr) => {
                  if (getFieldState('end').isTouched) trigger('end');
                  onBlur(dateStr);
                }}
                errorMessage={errors?.start?.message}
              />
            )}
          />
          <Controller
            name="end"
            control={control}
            render={({ field: { onBlur, onChange, name, value, ...props } }) => {
              return (
                <DateField
                  {...props}
                  name={name}
                  label="Contract end date"
                  value={value}
                  onChange={(e, dateStr) => {
                    handleEndDateChange('end', dateStr);
                  }}
                  onComponentBlur={(e, dateStr) => {
                    if (getFieldState('start').isTouched) trigger('start');
                    onBlur(dateStr);
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
          render={({ field: { onChange, onBlur, name, value, ...props } }) => (
            <DollarField
              {...props}
              name={name}
              label="Total Contract Cost"
              size="medium"
              hint="Provide the total not to exceed amounts of the contract, including costs for the option years. This is not the amount you are requesting for the FFYs and will not be added to your FFY requests."
              labelClassName="full-width-label"
              value={value}
              onBlur={onBlur}
              onChange={e => {
                handleTotalCostChange(e);
              }}
              errorMessage={errors?.totalCost?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          name="useHourly"
          control={control}
          render={({
            field: { name, onChange, onBlur: useHourlyOnBlur, value, ...props }
          }) => (
            <ChoiceList
              label="This is an hourly resource"
              name={name}
              choices={[
                {
                  label: 'Yes',
                  value: 'yes',
                  checked: value,
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
                                field: { onChange, value, ...props }
                              }) => (
                                <NumberField
                                  {...props}
                                  label="Number of hours"
                                  labelClassName="ds-u-margin-top--1"
                                  size="medium"
                                  value={value}
                                  onChange={e => {
                                    handleHourlyHoursChange(ffy, e);
                                  }}
                                />
                              )}
                            />
                            <Controller
                              key={`${ffy}-rate`}
                              name={`hourly.${ffy}.rate`}
                              control={control}
                              render={({
                                field: {
                                  onChange: rateOnChange,
                                  onBlur: rateOnBlur,
                                  name,
                                  value,
                                  ...props
                                }
                              }) => (
                                <DollarField
                                  {...props}
                                  name={name}
                                  value={value}
                                  className="ds-u-margin-left--1"
                                  label="Hourly rate"
                                  labelClassName="ds-u-margin-top--1"
                                  size="medium"
                                  onBlur={rateOnBlur}
                                  onChange={e => {
                                    handleHourlyRateChange(ffy, e);
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
                resetFieldErrors('hourly');
                resetFieldErrors('years');
                handleUseHourlyChange(e);
              }}
              onBlur={useHourlyOnBlur}
              onComponentBlur={useHourlyOnBlur}
              errorMessage={errors?.useHourly?.message}
              errorPlacement="bottom"
            />
          )}
        />
        {getValues('useHourly') === null ||
        getValues('useHourly') === true ||
        getValues('useHourly') === 'yes' ? (
          <p className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <div key={ffy}>
                <FormLabel>FFY {ffy} Cost</FormLabel>
                <Dollars>{getValues(`years[${ffy}]`)}</Dollars>
              </div>
            ))}
          </p>
        ) : (
          <p className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <Controller
                key={ffy}
                name={`years.${ffy}`}
                control={control}
                render={({ field: { onChange, onBlur, name, value, ...props } }) => (
                  <DollarField
                    {...props}
                    name={name}
                    value={value}
                    label={`FFY ${ffy} Cost`}
                    size="medium"
                    onBlur={onBlur}
                    onChange={e => {
                      handleYearCostChange(ffy, e);
                    }}
                    errorMessage={errors?.years?.[ffy]?.message}
                    errorPlacement="bottom"
                  />
                )}
              />
            ))}
          </p>
        )}
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
    useHourly: PropTypes.bool,
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
