import { FormLabel, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, forwardRef, useMemo, useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

import Choice from '../../../components/Choice';
import DateField from '../../../components/DateField';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import NumberField from '../../../components/NumberField';
import RichText from '../../../components/RichText';

import {
  setContractorDescription,
  setContractorEndDate,
  setContractorIsHourly,
  setContractorName,
  setContractorStartDate,
  setContractorTotalCost,
  setContractorCostForYear,
  setContractorNumberOfHoursForYear,
  setContractorHourlyRateForYear,
  saveContractor
} from '../../../actions/editActivity';

const ContractorResourceForm = forwardRef(
  (
    {
      activityIndex,
      index,
      // item: { description, end, hourly, key, name, start, totalCost, years },
      item,
      setDescription,
      setEndDate,
      setIsHourly,
      setName,
      setStartDate,
      setTotalCost,
      setCostForYear,
      setNumberOfHoursForYear,
      setHourlyRateForYear,
      saveContractor
    },
    ref 
) => {
    
    const initialState = item;
    
    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.payload
          }
        case 'setHourly':
          return {
            ...state,
            hourly: {
              data: { 
                ...state.hourly.data
              },
              useHourly: action.payload
            }
          }
        case 'updateHourly':
          return {
            ...state,
            hourly: {
              ...state.hourly.useHourly,
              data: {
                ...state.hourly.data,
                [action.year]: action.value  
              }
            }
          }
        default:
          throw new Error(
            'Unrecognized action type provided to ContractorResourceForm reducer'
          );
      }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const apdFFYs = useMemo(() => Object.keys(state.years), [state.years]);
    const [nonHourlyCost, setNonHourlyCost] = useState(
      apdFFYs.reduce(
        (o, ffy) => ({ ...o, [ffy]: !state.hourly.useHourly ? state.years[ffy] : '' }),
        {}
      )
    );
    
    useEffect(() => {
      console.log("state:", state);
      console.log('apdFFYs', apdFFYs);
    }, [state])
    
    const handleSubmit = e => {
      e.preventDefault();
      saveContractor(activityIndex, index, state);
    };
  
    const getHandler = action => ({ target: { value } }) => {
      action(activityIndex, index, value);
    };
  
    const getDateHandler = action => (e, dateStr) => {
      dispatch({ type: 'updateField', field: `${action}`, payload: dateStr })
    };
  
    const setHourlyOff = () => {
      dispatch({ type: 'setHourly', payload: false })
  //     setIsHourly(activityIndex, index, false);
  // 
  //     // set cost to non-hourly cost saved from last time the radio button was switched (if any)
  //     apdFFYs.forEach(ffy => {
  //       if (nonHourlyCost[ffy]) {
  //         setCostForYear(activityIndex, index, ffy, nonHourlyCost[ffy]);
  //       }
  //     });
    };
  
    const setHourlyOn = () => {
      // setIsHourly(activityIndex, index, true);
      dispatch({ type: 'setHourly', payload: true })
      
      // save non-hourly cost in case the radio button is switched back to non-hourly
      setNonHourlyCost(
        apdFFYs.reduce((o, ffy) => ({ ...o, [ffy]: state.years[ffy] }), {})
      );
  
  
      // set cost to hours x rate
      apdFFYs.forEach(ffy => {
        if (state.hourly.data[ffy].hours && state.hourly.data[ffy].rate) {
          dispatch({ type: 'updateHourly', year: ffy, value: state.hourly.data[ffy].hours * state.hourly.data[ffy].rate })
          
          setCostForYear(
            activityIndex,
            index,
            ffy,
            hourly.data[ffy].hours * hourly.data[ffy].rate
          );
        }
      });
    };
  
    const getHandlerForYearlyCost = year => ({ target: { value } }) => {
      setCostForYear(activityIndex, index, year, value);
    };
  
    const getHandlerForYearlyHours = year => ({ target: { value } }) => {
      setNumberOfHoursForYear(activityIndex, index, year, value);
    };
  
    const getHandlerForYearlyHourlyRate = year => ({ target: { value } }) => {
      setHourlyRateForYear(activityIndex, index, year, value);
    };
  
    const syncDescription = html => {
      dispatch({ type: 'updateField', field: 'description', payload: html })
    };
  
    return (
      <form index={index} ref={ref} onSubmit={handleSubmit}>
        <TextField
          autoFocus
          label="Private Contractor or Vendor Name"
          name="contractor-name"
          hint="Provide the name of the private contractor or vendor. For planned procurements, generalize by resource name. For example, Computer Resources/TBD."
          labelClassName="full-width-label"
          value={state.name}
          onChange={e =>
            dispatch({ type: 'updateField', field: 'name', payload: e.target.value })
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
            dispatch({ type: 'updateField', field: 'totalCost', payload: e.target.value })
          }
        />
        <fieldset className="ds-c-fieldset">
          <legend className="ds-c-label">This is an hourly resource</legend>
          <Choice
            checked={!state.hourly.useHourly}
            label="No"
            name={`apd-activity-contractor-hourly-${state.key}-no`}
            onChange={setHourlyOff}
            type="radio"
            value="no"
          />
          <Choice
            checked={state.hourly.useHourly}
            label="Yes"
            name={`apd-activity-contractor-hourly-${state.key}-yes`}
            onChange={setHourlyOn}
            type="radio"
            value="yes"
            checkedChildren={
              <div className="ds-c-choice__checkedChild">
                {apdFFYs.map(ffy => (
                  console.log("hey its working", state.hourly.data),
                  <Fragment key={ffy}>
                    <FormLabel>FFY {ffy}</FormLabel>
                    <div className="ds-l-row ds-u-padding-left--2">
                      <NumberField
                        label="Number of hours"
                        name={`contractor-num-hours-ffy-${ffy}`}
                        labelClassName="ds-u-margin-top--1"
                        size="medium"
                        value={state.hourly.data[ffy].hours}
                        onChange={getHandlerForYearlyHours(ffy)}
                      />
                      <DollarField
                        className="ds-u-margin-left--1"
                        label="Hourly rate"
                        name={`contractor-hourly-rate-ffy-${ffy}`}
                        labelClassName="ds-u-margin-top--1"
                        size="medium"
                        value={state.hourly.data[ffy].rate}
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
    key: PropTypes.string,
    name: PropTypes.string,
    start: PropTypes.string,
    totalCost: PropTypes.number,
    years: PropTypes.object
  }).isRequired,
  setDescription: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setIsHourly: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setTotalCost: PropTypes.func.isRequired,
  setCostForYear: PropTypes.func.isRequired,
  setNumberOfHoursForYear: PropTypes.func.isRequired,
  setHourlyRateForYear: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setDescription: setContractorDescription,
  setEndDate: setContractorEndDate,
  setIsHourly: setContractorIsHourly,
  setName: setContractorName,
  setStartDate: setContractorStartDate,
  setTotalCost: setContractorTotalCost,
  setCostForYear: setContractorCostForYear,
  setNumberOfHoursForYear: setContractorNumberOfHoursForYear,
  setHourlyRateForYear: setContractorHourlyRateForYear,
  saveContractor: saveContractor
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  ContractorResourceForm
);

export { ContractorResourceForm as plain, mapDispatchToProps };
