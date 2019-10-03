import { FormLabel, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useContext, useMemo } from 'react';
import { connect } from 'react-redux';

import { ActivityContext } from '../ActivityContext';

import Choice from '../../../components/Choice';
import DateField from '../../../components/DateField';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';
import TextArea from '../../../components/TextArea';
import NumberField from '../../../components/NumberField';

import {
  setContractorDescription,
  setContractorEndDate,
  setContractorIsHourly,
  setContractorName,
  setContractorStartDate,
  setContractorTotalCost,
  setContractorCostForYear,
  setContractorNumberOfHoursForYear,
  setContractorHourlyRateForYear
} from '../../../actions/editActivity';

const ContractorResourceForm = ({
  index,
  item: { desc, end, hourly, key, name, start, totalCost, years },
  setDescription,
  setEndDate,
  setIsHourly,
  setName,
  setStartDate,
  setTotalCost,
  setCostForYear,
  setNumberOfHoursForYear,
  setHourlyRateForYear
}) => {
  const { index: activityIndex } = useContext(ActivityContext);

  const apdFFYs = useMemo(() => Object.keys(years), [years]);

  const getHandler = action => ({ target: { value } }) => {
    action(activityIndex, index, value);
  };

  const getDateHandler = action => (_, dateStr) => {
    action(activityIndex, index, dateStr);
  };

  const setHourlyOff = () => {
    setIsHourly(activityIndex, index, false);
  };

  const setHourlyOn = () => {
    setIsHourly(activityIndex, index, true);
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

  return (
    <Fragment>
      <TextField
        autoFocus
        label="Contractor Name"
        name="contractor-name"
        value={name}
        onChange={getHandler(setName)}
      />
      <TextArea
        label="Description of Services"
        name="contractor-description"
        rows={5}
        value={desc}
        onChange={getHandler(setDescription)}
      />
      <FormLabel>Contract Term</FormLabel>
      <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
        <DateField
          label="Start"
          value={start}
          onChange={getDateHandler(setStartDate)}
        />
        <DateField
          label="End"
          hint=""
          value={end}
          onChange={getDateHandler(setEndDate)}
        />
      </div>
      <DollarField
        label="Total Contract Cost"
        name="contractor-total-cost"
        size="medium"
        value={totalCost}
        onChange={getHandler(setTotalCost)}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">This is an hourly resource</legend>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${key}-no`}
          value="no"
          checked={!hourly.useHourly}
          onChange={setHourlyOff}
        >
          No
        </Choice>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${key}-yes`}
          value="yes"
          checked={hourly.useHourly}
          onChange={setHourlyOn}
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
                      type="number"
                      size="medium"
                      value={hourly.data[ffy].hours}
                      onChange={getHandlerForYearlyHours(ffy)}
                    />
                    <DollarField
                      className="ds-u-margin-left--1"
                      label="Hourly rate"
                      name={`contractor-hourly-rate-ffy-${ffy}`}
                      labelClassName="ds-u-margin-top--1"
                      size="medium"
                      value={hourly.data[ffy].rate}
                      onChange={getHandlerForYearlyHourlyRate(ffy)}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          }
        >
          Yes
        </Choice>
      </fieldset>

      {hourly.useHourly ? (
        <p className="ds-u-margin-bottom--0">
          {apdFFYs.map(ffy => (
            <Fragment key={ffy}>
              <FormLabel>FFY {ffy} Cost</FormLabel>
              <Dollars>{years[ffy]}</Dollars>
            </Fragment>
          ))}
        </p>
      ) : (
        apdFFYs.map(ffy => (
          <DollarField
            key={ffy}
            label={`FFY ${ffy} Cost`}
            name={`contractor-cost-ffy-${ffy}`}
            disabled={hourly.useHourly}
            size="medium"
            value={years[ffy]}
            onChange={getHandlerForYearlyCost(ffy)}
          />
        ))
      )}
    </Fragment>
  );
};

ContractorResourceForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    desc: PropTypes.string,
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
  setHourlyRateForYear: setContractorHourlyRateForYear
};

export default connect(
  null,
  mapDispatchToProps
)(ContractorResourceForm);

export { ContractorResourceForm as plain, mapDispatchToProps };
