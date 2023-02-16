import { TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, useEffect, useReducer } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { t } from '../../../i18n';

import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';

import {
  keyPersonnelSchema as schema,
  FUNDING_CATEGORY_TYPE,
  FUNDING_CATEGORY_LABEL_MAPPING
} from '@cms-eapd/common';
import { saveKeyPersonnel } from '../../../redux/actions/editApd';

import { selectApdType } from '../../../redux/selectors/apd.selectors';

const getCheckedValue = value => {
  if (value !== null) {
    if (value === true) return 'yes';
    if (value === false) return 'no';
    return value;
  }
  return null;
};

const PersonForm = forwardRef(
  ({ index, item, savePerson, years, setFormValid, apdType }, ref) => {
    PersonForm.displayName = 'PersonForm';
    const {
      name,
      email,
      position,
      hasCosts,
      isPrimary,
      costs,
      split,
      fte,
      medicaidShare
    } = JSON.parse(JSON.stringify({ ...item }));

    const {
      handleSubmit,
      control,
      trigger,
      formState: { errors, isValid },
      setValue,
      resetField: resetFieldErrors
    } = useForm({
      defaultValues: {
        name,
        email,
        position,
        hasCosts: getCheckedValue(hasCosts),
        costs,
        split,
        fte,
        medicaidShare
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
      resolver: joiResolver(schema)
    });

    useEffect(() => {
      setFormValid(isValid);
    }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

    const initialState = {
      name,
      email,
      position,
      hasCosts,
      isPrimary,
      costs,
      split,
      medicaidShare,
      fte
    };

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
        case 'updateSplit':
          return {
            ...state,
            split: {
              ...state.split,
              [action.year]: {
                federal: action.federal,
                state: action.state,
                fundingCategory: action.fundingCategory
              }
            }
          };
        case 'updateMedicaidShare':
          return {
            ...state,
            medicaidShare: {
              ...state.medicaidShare,
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
      let value = e.target.value === 'yes' ? true : false;
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
      });
    };

    const handleSplitChange = (year, e) => {
      const [federal, state] = e.target.value.split('-').map(Number);
      let fundingCategory = null;
      if (federal === 90 && state === 10) {
        fundingCategory = FUNDING_CATEGORY_TYPE.DDI;
      }
      if (federal === 75 && state === 25) {
        fundingCategory = FUNDING_CATEGORY_TYPE.MANDO;
      }

      dispatch({
        type: 'updateSplit',
        year: year,
        federal,
        state,
        fundingCategory
      });

      setValue(`split.${year}.federal`, federal);
      setValue(`split.${year}.state`, state);
      setValue(`split.${year}.fundingCategory`, fundingCategory);
    };

    const handleMedicaidShareChange = (year, e) => {
      const value = e.target.value;

      dispatch({
        type: 'updateMedicaidShare',
        year: year,
        value
      });

      setValue(`medicaidShare.${year}`, value);
    };

    const onSubmit = e => {
      e.preventDefault();
      savePerson(index, {
        ...item,
        ...state
      });
      handleSubmit(e);
    };

    const totalCostFte = year => {
      let total = state.costs[year] * state.fte[year];
      return total;
    };

    const renderMMISFields = ({ year, errors, control, i }) => (
      <Fragment>
        <Controller
          key={`${year}-medicaidShare`}
          name={`medicaidShare.${year}`}
          control={control}
          render={({ field: { ...props } }) => (
            <NumberField
              {...props}
              label="Medicaid Share (%)"
              size="medium"
              min={0}
              hint="Enter the percentage that is allocated towards Medicaid"
              data-cy={`key-person-${index}-${i}__medicaidShare`}
              onChange={e => {
                handleMedicaidShareChange(year, e);
              }}
              onBlur={() => {
                trigger(`medicaidShare.${year}`);
              }}
              errorMessage={
                errors?.medicaidShare &&
                errors?.medicaidShare[year] &&
                errors?.medicaidShare[year]?.message
              }
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          key={`${year}-split`}
          name={`split.${year}`}
          control={control}
          data-cy={`key-person-${index}-${i}__split`}
          render={({ field: { value, ...props } }) => (
            <ChoiceList
              {...props}
              choices={[
                {
                  checked: value?.federal == 90,
                  label: `90/10 ${FUNDING_CATEGORY_LABEL_MAPPING.DDI}`,
                  value: '90-10'
                },
                {
                  checked: value?.federal == 75,
                  label: `75/25 ${FUNDING_CATEGORY_LABEL_MAPPING.MANDO}`,
                  value: '75-25'
                }
              ]}
              type="radio"
              label="Federal-State Split"
              hint="Select the match rate for Federal Financial Participation applicable to this activity. A FFP of 90-10 means 90% of the total will be Federal government’s share and 10% will be the State’s share."
              onChange={e => {
                handleSplitChange(year, e);
              }}
              onBlur={() => {
                trigger(`split.${year}`);
              }}
              errorMessage={
                errors?.split &&
                errors?.split[year] &&
                errors?.split[year]?.state?.message
              }
              errorPlacement="bottom"
            />
          )}
        />
      </Fragment>
    );

    const primary = index === 0;

    const tRoot = `apd.stateProfile.keyPersonnel${apdType}`;

    return (
      <form id={`key-personnel-${index}`} onSubmit={onSubmit} aria-label="form">
        {/* Prevent implicit submission of the form. */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
          aria-label="submitButton"
        />
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
              onBlur={() => {
                trigger('name');
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
              onBlur={() => {
                trigger('email');
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
              onBlur={() => {
                trigger('position');
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
                  label: 'Yes',
                  value: 'yes',
                  checked: value === 'yes',
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
                              render={({
                                field: { onChange: costOnChange, ...props }
                              }) => (
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
                                  <span
                                    className="ds-c-inline-error ds-c-field__error-message"
                                    role="alert"
                                  >
                                    {errors.costs[year]?.message}
                                  </span>
                                )}
                              </Fragment>
                            </div>
                            <Controller
                              key={`${year}-fte`}
                              name={`fte.${year}`}
                              control={control}
                              render={({
                                field: { onChange: fteOnChange, ...props }
                              }) => (
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
                                  <span
                                    className="ds-c-inline-error ds-c-field__error-message"
                                    role="alert"
                                  >
                                    {errors.fte[year]?.message}
                                  </span>
                                )}
                              </Fragment>
                            </div>
                            <div className="ds-u-margin-top--2">
                              <strong>Total: </strong>
                              <Dollars>{totalCostFte(year)}</Dollars>
                              <span className="ds-c-field__hint">
                                Cost with benefits x FTE = Total
                              </span>
                            </div>
                            {apdType === 'MMIS' &&
                              renderMMISFields({
                                year,
                                errors,
                                control,
                                i
                              })}
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
              onBlur={() => {
                trigger('hasCosts');
              }}
              onComponentBlur={hasCostsOnBlur}
              errorMessage={errors?.hasCosts?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <input
          className="ds-u-visibility--hidden"
          aria-label="submitButton"
          type="submit"
          ref={ref}
          hidden
        />
      </form>
    );
  }
);
PersonForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  years: PropTypes.array.isRequired,
  savePerson: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired,
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  savePerson: saveKeyPersonnel
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(PersonForm);

export { PersonForm as plain, mapDispatchToProps };
