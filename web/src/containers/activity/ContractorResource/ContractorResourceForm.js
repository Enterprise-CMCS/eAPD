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
  // hourly: Joi.alternatives().conditional('useHourly', {
  //   is: 'yes',
  //   then: Joi.object().pattern(
  //     /\d{4}/,
  //     Joi.object({
  //       hours: Joi.number().required(),
  //       rate: Joi.number().required()
  //     })
  //   )
  // }),
  years: Joi.alternatives().conditional('useHourly', {
    is: 'no',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().required().messages({
        'number.empty': 'Provide a number greater than 0'
      })
    )
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
      formState: { errors, isValid: isFormValid }
    } = useForm({
      defaultValues: {
        name: item.name,
        description: item.description,
        start: item.start,
        end: item.end,
        totalCost: item.totalCost,
        useHourly: getCheckedValue(item.hourly.useHourly),
        years: item.years
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(schemas)
    });

    useEffect(() => {
      setFormValid(isFormValid);
    }, [isFormValid]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const onSubmit = () => {
      saveContractor(activityIndex, index, state);
    };

    return (
      <form index={index} onSubmit={handleSubmit(onSubmit)}>
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
                dispatch({
                  type: 'updateField',
                  field: 'name',
                  value: e.target.value
                });
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
                dispatch({
                  type: 'updateField',
                  field: 'description',
                  value: html
                });
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
                  dispatch({
                    type: 'updateField',
                    field: 'start',
                    value: dateStr
                  });
                  onChange(e);
                }}
                onBlur={onBlur}
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
                    dispatch({
                      type: 'updateField',
                      field: 'end',
                      value: dateStr
                    });
                    onChange(e);
                  }}
                  onBlur={onBlur}
                  errorMessage={errors?.end?.message}
                />
              );
            }}
          />
        </div>
        <Controller
          name="totalCost"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DollarField
              label="Total Contract Cost"
              name="contractor-total-cost"
              size="medium"
              hint="Provide the total not to exceed amounts of the contract, including costs for the option years. This is not the amount you are requesting for the FFYs and will not be added to your FFY requests."
              labelClassName="full-width-label"
              value={value}
              onBlur={onBlur}
              onChange={e => {
                dispatch({
                  type: 'updateField',
                  field: 'totalCost',
                  value: e.target.value
                });
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
          render={({ field: { name, onChange, onBlur, value } }) => (
            <ChoiceList
              label="This is an hourly resource"
              name={name}
              choices={[
                {
                  label: 'Yes',
                  value: 'yes',
                  defaultChecked: value === 'yes',
                  checkedChildren: (
                    <div className="ds-c-choice__checkedChild">
                      {apdFFYs.map(ffy => (
                        <Fragment key={ffy}>
                          <FormLabel>FFY {ffy}</FormLabel>
                          <div className="ds-l-row ds-u-padding-left--2">
                            <NumberField
                              label="Number of hours"
                              labelClassName="ds-u-margin-top--1"
                              size="medium"
                              value={state.hourly.data[ffy].hours}
                              onChange={e => {
                                const { value } = e.target;
                                dispatch({
                                  type: 'updateHourlyHours',
                                  year: ffy,
                                  value
                                });
                                dispatch({
                                  type: 'updateYearCost',
                                  year: ffy,
                                  value: value * state.hourly.data[ffy].rate
                                });
                              }}
                            />
                            <DollarField
                              className="ds-u-margin-left--1"
                              label="Hourly rate"
                              labelClassName="ds-u-margin-top--1"
                              size="medium"
                              value={state.hourly.data[ffy].rate}
                              onChange={e => {
                                const { value } = e.target;
                                dispatch({
                                  type: 'updateHourlyRate',
                                  year: ffy,
                                  value
                                });
                                dispatch({
                                  type: 'updateYearCost',
                                  year: ffy,
                                  value: state.hourly.data[ffy].hours * value
                                });
                              }}
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
                  defaultChecked: value === 'no'
                }
              ]}
              type="radio"
              onChange={e => {
                dispatch({ type: 'setHourly', value: e.target.value });
                onChange(e);
              }}
              onComponentBlur={onBlur}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <DollarField
                  label={`FFY ${ffy} Cost`}
                  size="medium"
                  value={value}
                  onChange={e => {
                    dispatch({
                      type: 'updateYearCost',
                      year: ffy,
                      value: e.target.value
                    });
                    onChange(e);
                  }}
                  onBlur={onBlur}
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
    key: PropTypes.string,
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
