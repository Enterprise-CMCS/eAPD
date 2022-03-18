import { FormLabel, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, forwardRef, useMemo, useReducer } from 'react';
import { connect } from 'react-redux';

import Choice from '../../../components/Choice';
import DateField from '../../../components/DateField';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';
import RichText from '../../../components/RichText';

import { saveContractor as actualSaveContractor } from '../../../actions/editActivity';

const ContractorResourceForm = forwardRef(
  ({ activityIndex, index, item, saveContractor }, ref) => {
    ContractorResourceForm.displayName = 'ContractorResourceForm';

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
            useHourly: action.value
          };
        case 'updateHourlyHours':
          return {
            ...state,
            hourly: {
              ...state.hourly,
              [action.year]: {
                ...state.hourly[action.year],
                hours: action.value
              }
            }
          };
        case 'updateHourlyRate':
          return {
            ...state,
            hourly: {
              ...state.hourly,
              [action.year]: {
                ...state.hourly[action.year],
                rate: action.value
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

    const handleSubmit = e => {
      e.preventDefault();
      saveContractor(activityIndex, index, state);
    };

    const getDateHandler = action => (e, dateStr) => {
      dispatch({ type: 'updateField', field: `${action}`, value: dateStr });
    };

    const getHandlerForYearlyCost =
      year =>
      ({ target: { value } }) => {
        dispatch({ type: 'updateYearCost', year, value });
      };

    const getHandlerForYearlyHours =
      year =>
      ({ target: { value } }) => {
        dispatch({ type: 'updateHourlyHours', year, value });
        dispatch({
          type: 'updateYearCost',
          year,
          value: value * state.hourly[year].rate
        });
      };

    const getHandlerForYearlyHourlyRate =
      year =>
      ({ target: { value } }) => {
        dispatch({ type: 'updateHourlyRate', year, value });
        dispatch({
          type: 'updateYearCost',
          year,
          value: state.hourly[year].hours * value
        });
      };

    const syncDescription = html => {
      dispatch({ type: 'updateField', field: 'description', value: html });
    };

    return (
      <form index={index} onSubmit={handleSubmit}>
        <TextField
          label="Private Contractor or Vendor Name"
          name="contractor-name"
          hint="Provide the name of the private contractor or vendor. For planned procurements, generalize by resource name. For example, Computer Resources/TBD."
          labelClassName="full-width-label"
          className="remove-clearfix"
          value={state.name}
          onChange={e =>
            dispatch({
              type: 'updateField',
              field: 'name',
              value: e.target.value
            })
          }
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
        <RichText
          name="contractor-description"
          id={`contractor-description-field-${index}`}
          content={state.description}
          onSync={syncDescription}
          editorClassName="rte-textarea-1"
        />
        <FormLabel>Full Contract Term</FormLabel>
        <span className="ds-c-field__hint">
          Provide the total length of the contract, including any option years.
          Contract term may extend beyond the FFY(s) included in this APD.
        </span>
        <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
          <DateField
            label="Contract start date"
            value={state.start}
            onChange={getDateHandler('start')}
          />
          <DateField
            label="Contract end date"
            hint=""
            value={state.end}
            onChange={getDateHandler('end')}
          />
        </div>
        <DollarField
          label="Total Contract Cost"
          name="contractor-total-cost"
          size="medium"
          hint="Provide the total not to exceed amounts of the contract, including costs for the option years. This is not the amount you are requesting for the FFYs and will not be added to your FFY requests."
          labelClassName="full-width-label"
          value={state.totalCost}
          onChange={e =>
            dispatch({
              type: 'updateField',
              field: 'totalCost',
              value: e.target.value
            })
          }
        />
        <fieldset className="ds-c-fieldset">
          <legend className="ds-c-label">This is an hourly resource</legend>
          <Choice
            checked={!state.hourly.useHourly}
            label="No"
            name={`apd-activity-contractor-hourly-${state.key}-no`}
            onChange={() => dispatch({ type: 'setHourly', value: false })}
            type="radio"
            value="no"
          />
          <Choice
            checked={state.hourly.useHourly}
            label="Yes"
            name={`apd-activity-contractor-hourly-${state.key}-yes`}
            onChange={() => dispatch({ type: 'setHourly', value: true })}
            type="radio"
            value="yes"
            checkedChildren={
              <div className="ds-c-choice__checkedChild">
                {apdFFYs.map(ffy => (
                  <Fragment key={ffy}>
                    <FormLabel>FFY {ffy}</FormLabel>
                    <div className="ds-l-row ds-u-padding-left--2">
                      <NumberField
                        label="Number of hours"
                        name={`contractor-num-hours-ffy-${ffy}`}
                        labelClassName="ds-u-margin-top--1"
                        size="medium"
                        value={state.hourly[ffy].hours}
                        onChange={getHandlerForYearlyHours(ffy)}
                      />
                      <DollarField
                        className="ds-u-margin-left--1"
                        label="Hourly rate"
                        name={`contractor-hourly-rate-ffy-${ffy}`}
                        labelClassName="ds-u-margin-top--1"
                        size="medium"
                        value={state.hourly[ffy].rate}
                        onChange={getHandlerForYearlyHourlyRate(ffy)}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            }
          />
        </fieldset>
        {state.hourly.useHourly ? (
          <p className="ds-u-margin-bottom--0">
            {apdFFYs.map(ffy => (
              <Fragment key={ffy}>
                <FormLabel>FFY {ffy} Cost</FormLabel>
                <Dollars>{state.years[ffy]}</Dollars>
              </Fragment>
            ))}
          </p>
        ) : (
          apdFFYs.map(ffy => (
            <DollarField
              key={ffy}
              label={`FFY ${ffy} Cost`}
              name={`contractor-cost-ffy-${ffy}`}
              disabled={state.hourly.useHourly}
              size="medium"
              value={state.years[ffy]}
              onChange={getHandlerForYearlyCost(ffy)}
            />
          ))
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
    description: PropTypes.string,
    end: PropTypes.string,
    hourly: PropTypes.object,
    useHourly: PropTypes.bool,
    key: PropTypes.string,
    name: PropTypes.string,
    start: PropTypes.string,
    totalCost: PropTypes.number,
    years: PropTypes.object
  }).isRequired,
  saveContractor: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveContractor: actualSaveContractor
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  ContractorResourceForm
);

export { ContractorResourceForm as plain, mapDispatchToProps };
