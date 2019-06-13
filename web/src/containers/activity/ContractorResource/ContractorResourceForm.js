import { Choice, FormLabel, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo } from 'react';

import DateField from '../../../components/DateField';
import DollarField from '../../../components/DollarField';
import Dollars from '../../../components/Dollars';

const ContractorResourceForm = ({
  index,
  item: { desc, end, hourly, key, name, start, totalCost, years },
  handleChange,
  handleHourlyChange,
  handleTermChange,
  handleUseHourly,
  handleYearChange
}) => {
  const apdFFYs = useMemo(() => Object.keys(years), [years]);

  const startDateChangeHandler = useCallback(
    (_, dateStr) => {
      handleTermChange(index)({ end, start: dateStr });
    },
    [end]
  );
  const endDateChangeHandler = useCallback(
    (_, dateStr) => {
      handleTermChange(index)({ end: dateStr, start });
    },
    [start]
  );

  const handle = {
    changeDesc: useCallback(handleChange(index, 'desc'), []),
    changeHourlyHours: apdFFYs.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleHourlyChange(index, ffy, 'hours'), [apdFFYs])
      }),
      {}
    ),
    changeHourlyRate: apdFFYs.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleHourlyChange(index, ffy, 'rate'), [apdFFYs])
      }),
      {}
    ),
    changeName: useCallback(handleChange(index, 'name'), []),
    changeTotalCost: useCallback(handleChange(index, 'totalCost'), []),
    changeYearCost: apdFFYs.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleYearChange(index, ffy), [apdFFYs])
      }),
      {}
    ),
    setUseHourlyOff: useCallback(handleUseHourly(key, false), []),
    setUseHourlyOn: useCallback(handleUseHourly(key, true), [])
  };

  return (
    <Fragment>
      <TextField
        label="Contractor Name"
        name="contractor-name"
        value={name}
        onChange={handleChange(index, 'name')}
      />
      <TextField
        label="Description of Services"
        name="contractor-description"
        multiline
        rows={5}
        value={desc}
        onChange={handleChange(index, 'desc')}
      />
      <FormLabel>Contract Term</FormLabel>
      <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
        <DateField
          label="Start"
          value={start}
          onChange={startDateChangeHandler}
        />
        <DateField
          label="End"
          hint=""
          value={end}
          onChange={endDateChangeHandler}
        />
      </div>
      <DollarField
        label="Total Contract Cost"
        name="contractor-total-cost"
        size="medium"
        value={totalCost}
        onChange={handle.changeTotalCost}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">This is an hourly resource</legend>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${key}-no`}
          value="no"
          checked={!hourly.useHourly}
          onChange={handle.setUseHourlyOff}
        >
          No
        </Choice>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${key}-yes`}
          value="yes"
          checked={hourly.useHourly}
          onChange={handle.setUseHourlyOn}
          checkedChildren={
            <div className="ds-c-choice__checkedChild">
              {apdFFYs.map(ffy => (
                <Fragment key={ffy}>
                  <FormLabel>FFY {ffy}</FormLabel>
                  <div className="ds-l-row ds-u-padding-left--2">
                    <TextField
                      label="Number of hours"
                      name={`contractor-num-hours-ffy-${ffy}`}
                      labelClassName="ds-u-margin-top--1"
                      type="number"
                      size="medium"
                      value={hourly.data[ffy].hours}
                      onChange={handle.changeHourlyHours[ffy]}
                    />
                    <DollarField
                      className="ds-u-margin-left--1"
                      label="Hourly rate"
                      name={`contractor-hourly-rate-ffy-${ffy}`}
                      labelClassName="ds-u-margin-top--1"
                      size="medium"
                      value={hourly.data[ffy].rate}
                      onChange={handle.changeHourlyRate[ffy]}
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
            onChange={handle.changeYearCost[ffy]}
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
  handleChange: PropTypes.func.isRequired,
  handleHourlyChange: PropTypes.func.isRequired,
  handleTermChange: PropTypes.func.isRequired,
  handleUseHourly: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired
};

export default ContractorResourceForm;
