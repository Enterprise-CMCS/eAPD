import { TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { 
  forwardRef,
  Fragment,
  useEffect,
  useReducer
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { t } from '../../../i18n';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';

import Joi from 'joi';
import { saveKeyPersonnel } from '../../../actions/editApd';

const getCheckedValue = value => {
  if (value !== null) {
    if (value === true) return 'yes';
    if (value === false) return 'no';
    return value;
  }
  return null;
};

const keyPersonSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name is required',
    'string.empty': 'Name is required'
  }),
  email: Joi.string().required().messages({
    'string.base': 'Email is required',
    'string.empty': 'Email is required'
  }),
  position: Joi.string().required().messages({
    'string.base': 'Role is required',
    'string.empty': 'Role is required'
  }),
  hasCosts: Joi.string().required().messages({
    'string.base': 'Must select hourly or yearly.',
    'string.empty': 'Must select hourly or yearly.'
  }),
  costs: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().required().messages({
        'number.base': 'Provide a cost with benefits.',
        'number.empty': 'Provide a cost with benefits.',
        'number.format': 'Costs with Benefits should not be less than 0.',
        'number.positive': 'Costs with Benefits should not be less than 0.'
      })
    ),
    otherwise: Joi.any()
  }),
  fte: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().required().messages({
        'number.base': 'Provide an FTE.',
        'number.empty': 'Provide an FTE.',
        'number.format': 'FTE should not be less than 0.',
        'number.positive': 'FTE should not be less than 0.'
      })
    ),
    otherwise: Joi.any()
  })
})

const tRoot = 'apd.stateProfile.keyPersonnel';

const PersonForm = forwardRef(({ index, item, savePerson, years, setFormValid }, ref) => {
  PersonForm.displayName = 'PersonForm';
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    resetField: resetFieldErrors
  } = useForm({
    defaultValues: {
      name: item.name,
      email: item.email,
      position: item.position,
      hasCosts: getCheckedValue(item.hasCosts),
      costs: item.costs,
      fte: item.fte
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(keyPersonSchema)
  });

  useEffect(() => {
    console.log({ isValid });
    setFormValid(isValid);
  }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

  const initialState = item;

  function reducer(state, action) {
    switch (action.type) {
      case 'updateField':
        return {
          ...state,
          [action.field]: action.payload
        };
      case 'updateCosts':
        return {
          ...state,
          costs: {
            ...state.costs,
            [action.year]: action.value
          }
        };
      case 'updateFte':
        return {
          ...state,
          fte: {
            ...state.fte,
            [action.year]: action.value
          }
        };
      default:
        throw new Error(
          'Unrecognized action type provided to ApdKeyPersonForm reducer'
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNameChange = e => {
    dispatch({
      type: 'updateField',
      field: 'name',
      payload: e.target.value
    });
  };

  const handleEmailChange = e => {
    dispatch({
      type: 'updateField',
      field: 'email',
      payload: e.target.value
    });
  };

  const handlePositionChange = e => {
    dispatch({
      type: 'updateField',
      field: 'position',
      payload: e.target.value
    });
  };

  const handleHasCostsChange = e => {
    let value = e.target.value === "yes" ? true : false;
    dispatch({
      type: 'updateField',
      field: 'hasCosts',
      payload: value
    });
  };

  const handleCostChange = (year, e) => {
    dispatch({
      type: 'updateCosts',
      year: year,
      value: e.target.value
    });
  };

  const handleFteChange = (year, e) => {
    dispatch({
      type: 'updateFte',
      year: year,
      value: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    savePerson(index, state);
    handleSubmit(e);
  };

  const totalCostFte = year => {
    let total = state.costs[year] * state.fte[year];
    return total;
  }

  const primary = index === 0;

  return (
    <form index={index} onSubmit={onSubmit} aria-label="form">
      <h4 className="ds-h4">
        {primary
          ? titleCase(t(`${tRoot}.labels.titlePrimary`))
          : titleCase(t(`${tRoot}.labels.titleSecondary`))}
      </h4>
      <p className="ds-u-margin-bottom--0">
        {primary
          ? t(`${tRoot}.labels.notePrimary`)
          : t(`${tRoot}.labels.noteSecondary`)}
      </p>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <TextField
            {...props}
            id={`apd-state-profile-pocname${index}`}
            label={t(`${tRoot}.labels.name`)}
            data-cy={`key-person-${index}__name`}
            onChange={e => {
              handleNameChange(e);
              onChange(e);
            }}
            errorMessage={errors?.name?.message}
            errorPlacement="bottom"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <TextField
            {...props}
            id={`apd-state-profile-pocemail${index}`}
            label={t(`${tRoot}.labels.email`)}
            data-cy={`key-person-${index}__email`}
            onChange={e => {
              handleEmailChange(e);
              onChange(e);
            }}
            errorMessage={errors?.email?.message}
            errorPlacement="bottom"
          />
        )}
      />
      <Controller
        name="position"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <TextField
            {...props}
            id={`apd-state-profile-pocposition${index}`}
            label={t(`${tRoot}.labels.position`)}
            data-cy={`key-person-${index}__position`}
            onChange={e => {
              handlePositionChange(e);
              onChange(e);
            }}
            errorMessage={errors?.position?.message}
            errorPlacement="bottom"
          />
        )}
      />
      <Controller
        name="hasCosts"
        control={control}
        render={({
          field: { name, onChange, onBlur: hasCostsOnBlur, value }
        }) => (
          <ChoiceList
            label={t(`${tRoot}.labels.hasCosts`)}
            id={`apd-state-profile-hascosts${index}`}
            name={name}
            choices={[
              {
                label: "Yes",
                value: "yes",
                checked: value === "yes",
                checkedChildren: (
                  <div>
                    {years.map((year, i) => (
                      <Fragment key={year}>
                        <h5 className="ds-h5">FFY {year} Cost</h5>
                        <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
                          <Controller
                            key={`${year}-cost`}
                            name={`costs.${year}`}
                            control={control}
                            render={({ field: { onChange: costOnChange, ...props } }) => (
                              <DollarField
                                {...props}
                                label="Cost with benefits"
                                size="medium"
                                data-cy={`key-person-${index}-${i}__cost`}
                                onChange={e => {
                                  handleCostChange(year, e);
                                  costOnChange(e);
                                }}
                              />
                            )}
                          />
                          <div>
                            <Fragment>
                              {errors?.costs && errors.costs[year] && (
                                <span className="ds-c-inline-error ds-c-field__error-message"
                                role="alert">
                                  {errors.costs[year]?.message}
                                </span>
                              )}
                            </Fragment>
                          </div>
                          <Controller
                            key={`${year}-fte`}
                            name={`fte.${year}`}
                            control={control}
                            render={({ field: { onChange: fteOnChange, ...props } }) => (
                              <NumberField
                                {...props}
                                label="FTE Allocation"
                                size="medium"
                                min={0}
                                hint="For example: 0.5 = 0.5 FTE = 50% time"
                                data-cy={`key-person-${index}-${i}__fte`}
                                onChange={e => {
                                  handleFteChange(year, e);
                                  fteOnChange(e);
                                }}
                              />
                            )}
                          />
                          <div>
                            <Fragment>
                              {errors?.fte && errors.fte[year] && (
                                <span className="ds-c-inline-error ds-c-field__error-message"
                                role="alert">
                                  {errors.fte[year]?.message}
                                </span>
                              )}
                            </Fragment>
                          </div>
                          <strong>Total: </strong>
                            <Dollars>{totalCostFte(year)}</Dollars>
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
              resetFieldErrors('costs');
              resetFieldErrors('fte');
              handleHasCostsChange(e);
              onChange(e);
            }}
            onBlur={hasCostsOnBlur}
            onComponentBlur={hasCostsOnBlur}
            errorMessage={errors?.hasCosts?.message}
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
});
PersonForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  years: PropTypes.array.isRequired,
  savePerson: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  savePerson: saveKeyPersonnel
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  PersonForm
);

export { PersonForm as plain, mapDispatchToProps };
