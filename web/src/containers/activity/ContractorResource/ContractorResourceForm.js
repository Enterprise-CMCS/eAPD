import { FormLabel, TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import Joi from 'joi';
import React, {
  Fragment,
  forwardRef,
  useMemo,
  useReducer,
  useEffect
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import DateField from '../../../components/DateField';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';
import RichText from '../../../components/RichText';

// import validationSchema from '../../../static/schemas/privateContractor';
import { saveContractor as actualSaveContractor } from '../../../actions/editActivity';

const schemas = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  }),
  start: Joi.date().iso().required().messages({
    'date.base': 'Start date is required',
    'date.empty': 'Start date is required',
    'date.format': 'Start date must be a valid date'
  }),
  end: Joi.date().iso().min(Joi.ref('start')).required().messages({
    'date.base': 'End date is required',
    'date.empty': 'End date is required',
    'date.format': 'End date must be a valid date',
    'date.min': 'End date must be after start date'
  }),
  totalCost: Joi.number().required().messages({
    'number.empty': 'Total cost is required',
    'number.format': 'Total cost must be a valid number'
  }),
  useHourly: Joi.string().required().messages({
    'string.empty': 'Must select hourly or yearly'
  }),
  hourly: Joi.alternatives().conditional('useHourly', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.object({
        hours: Joi.number().positive().required().messages({
          'number.empty': 'Hours is required',
          'number.format': 'Hours must be a valid number',
          'number.positive': 'Hours must be positive'
        }),
        rate: Joi.number().positive().greater(0).required().messages({
          'number.empty': 'Rate is required',
          'number.format': 'Rate must be a valid number',
          'number.positive': 'Rate must be positive',
          'number.greater': 'Rate must be greater than 0'
        })
      })
    ),
    otherwise: Joi.any()
  }),
  years: Joi.alternatives().conditional('useHourly', {
    is: 'no',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().greater(0).required().messages({
        'number.empty': 'Cost is required',
        'number.format': 'Cost must be a valid number',
        'number.positive': 'Cost must be positive',
        'number.greater': 'Cost must be greater than 0'
      })
    ),
    otherwise: Joi.any()
  })
});

const getCheckedValue = value => {
  if (value != null) {
    return value ? 'yes' : 'no';
  }
  return null;
};

const ContractorResourceForm = forwardRef(
  ({ activityIndex, index, item, saveContractor, setFormValid }, ref) => {
    ContractorResourceForm.displayName = 'ContractorResourceForm';
    const {
      handleSubmit,
      control,
      formState: { errors, isValid, isValidating },
      resetField: resetFieldErrors,
      getValues
    } = useForm({
      defaultValues: {
        name: item.name,
        description: item.description,
        start: item.start,
        end: item.end,
        totalCost: item.totalCost,
        useHourly: getCheckedValue(item.hourly.useHourly),
        years: item.years,
        hourly: item.hourly.data
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(schemas)
    });

    useEffect(() => {
      console.log('isValid changed');
      console.log({ errors, isValid, isValidating });
      setFormValid(isValid);
    }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      console.log('errors changed');
      console.log({ errors, isValid, isValidating });
    }, [errors, errors.useHourly, errors.hourly, errors.years]);

    useEffect(() => {
      console.log('isValidating changed');
      console.log(`validating... hourly is ${getValues('useHourly')}`);
      const { error, value } = schemas.validate(getValues());
      console.log({ error, value, errors, isValid, isValidating });
    }, [isValidating]);

    const initialState = item;

    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.value
          };
        case 'setHourly':
          return {
            ...state,
            hourly: {
              useHourly: action.value,
              data: {
                ...state.hourly.data
              }
            }
          };
        case 'updateHourlyHours':
          return {
            ...state,
            hourly: {
              ...state.hourly,
              data: {
                ...state.hourly.data,
                [action.year]: {
                  ...state.hourly.data[action.year],
                  hours: action.value
                }
              }
            }
          };
        case 'updateHourlyRate':
          return {
            ...state,
            hourly: {
              ...state.hourly,
              data: {
                ...state.hourly.data,
                [action.year]: {
                  ...state.hourly.data[action.year],
                  rate: action.value
                }
              }
            }
          };
        case 'updateYearCost':
          return {
            ...state,
            years: {
              ...state.years,
              [action.year]: action.value
            }
          };
        default:
          throw new Error(
            'Unrecognized action type provided to ContractorResourceForm reducer'
          );
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const apdFFYs = useMemo(() => Object.keys(state.years), [state.years]);

    const handleNameChange = e => {
      dispatch({
        type: 'updateField',
        field: 'name',
        value: e.target.value
      });
    };

    const handleDescriptionChange = value => {
      dispatch({
        type: 'updateField',
        field: 'description',
        value
      });
    };

    const handleTotalCostChange = e => {
      dispatch({
        type: 'updateField',
        field: 'totalCost',
        value: e.target.value
      });
    };

    const handleDateChange = (field, value) => {
      dispatch({
        type: 'updateField',
        field,
        value
      });
    };

    const handleUseHourlyChange = e => {
      dispatch({ type: 'setHourly', value: e.target.value });
    };

    const handleHourlyHoursChange = (ffy, e) => {
      dispatch({
        type: 'updateHourlyHours',
        year: ffy,
        value: e.target.value
      });
      dispatch({
        type: 'updateYearCost',
        year: ffy,
        value: e.target.value * state.hourly.data[ffy].rate
      });
    };

    const handleHourlyRateChange = (ffy, e) => {
      dispatch({
        type: 'updateHourlyRate',
        year: ffy,
        value: e.target.value
      });
      dispatch({
        type: 'updateYearCost',
        year: ffy,
        value: state.hourly.data[ffy].hours * e.target.value
      });
    };

    const handleYearCostChange = (ffy, e) => {
      dispatch({
        type: 'updateYearCost',
        year: ffy,
        value: e.target.value
      });
    };

    const onSubmit = e => {
      e.preventDefault();
      saveContractor(activityIndex, index, state);
      handleSubmit(e);
    };

    return (
      <form index={index} onSubmit={onSubmit}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              label="Private Contractor or Vendor Name"
              hint="Provide the name of the private contractor or vendor. For planned procurements, generalize by resource name. For example, Computer Resources/TBD."
              labelClassName="full-width-label"
              className="remove-clearfix"
              onChange={e => {
                handleNameChange(e);
                onChange(e);
              }}
              errorMessage={errors?.name?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <FormLabel
          className="full-width-label"
          fieldId="contractor-description-field"
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
          render={({ field: { onChange, onBlur } }) => (
            <RichText
              name="contractor-description"
              id={`contractor-description-field-${index}`}
              content={state.description}
              onSync={html => {
                handleDescriptionChange(html);
                onChange(html);
              }}
              onBlur={onBlur}
              editorClassName="rte-textarea-1"
            />
          )}
        />
        {errors?.description && (
          <span
            className="ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            {errors.description.message}
          </span>
        )}
        <FormLabel>Full Contract Term</FormLabel>
        <span className="ds-c-field__hint">
          Provide the total length of the contract, including any option years.
          Contract term may extend beyond the FFY(s) included in this APD.
        </span>
        <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
          <Controller
            name="start"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DateField
                label="Contract start date"
                value={value}
                onChange={(e, dateStr) => {
                  handleDateChange('start', dateStr);
                  onChange(e);
                }}
                onComponentBlur={onBlur}
                errorMessage={errors?.start?.message}
              />
            )}
          />
          <Controller
            name="end"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <DateField
                  label="Contract end date"
                  value={value}
                  onChange={(e, dateStr) => {
                    handleDateChange('end', dateStr);
                    onChange(e);
                  }}
                  onComponentBlur={onBlur}
                  errorMessage={errors?.end?.message}
                />
              );
            }}
          />
        </div>
        <Controller
          name="totalCost"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <DollarField
              {...props}
              label="Total Contract Cost"
              size="medium"
              hint="Provide the total not to exceed amounts of the contract, including costs for the option years. This is not the amount you are requesting for the FFYs and will not be added to your FFY requests."
              labelClassName="full-width-label"
              onChange={e => {
                handleTotalCostChange(e);
                onChange(e);
              }}
            />
          )}
        />
        {errors?.totalCost && (
          <span
            className="ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            {errors.totalCost.message}
          </span>
        )}
        <Controller
          name="useHourly"
          control={control}
          render={({
            field: { name, onChange, onBlur: useHourlyOnBlur, value }
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
                              name={`hourly.${ffy}.hours`}
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
                                    handleHourlyHoursChange(ffy, e);
                                    hoursOnChange(e);
                                  }}
                                  errorMessage={
                                    errors?.hourly
                                      ? errors?.hourly[ffy]?.hours?.message
                                      : null
                                  }
                                  errorPlacement="bottom"
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
                                    handleHourlyRateChange(ffy, e);
                                    rateOnChange(e);
                                  }}
                                  errorMessage={
                                    errors?.hourly
                                      ? errors?.hourly[ffy]?.rate?.message
                                      : null
                                  }
                                  errorPlacement="bottom"
                                />
                              )}
                            />
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
                onChange(e);
              }}
              onBlur={useHourlyOnBlur}
              onComponentBlur={useHourlyOnBlur}
              errorMessage={errors?.useHourly?.message}
              errorPlacement="bottom"
            />
          )}
        />
        {(state.hourly.useHourly === 'yes' ||
          state.hourly.useHourly === true) && (
          <p className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <Fragment key={ffy}>
                <FormLabel>FFY {ffy} Cost</FormLabel>
                <Dollars>{state.years[ffy]}</Dollars>
              </Fragment>
            ))}
          </p>
        )}
        {(state.hourly.useHourly === 'no' ||
          state.hourly.useHourly === false) &&
          apdFFYs.map(ffy => (
            <Controller
              key={ffy}
              name={`years.${ffy}`}
              control={control}
              render={({ field: { onChange, ...props } }) => (
                <DollarField
                  {...props}
                  label={`FFY ${ffy} Cost`}
                  size="medium"
                  onChange={e => {
                    handleYearCostChange(ffy, e);
                    onChange(e);
                  }}
                  errorMessage={errors?.years?.[ffy]?.message}
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
        />
      </form>
    );
  }
);

ContractorResourceForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    totalCost: PropTypes.number,
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
