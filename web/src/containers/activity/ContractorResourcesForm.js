import {
  Button,
  Choice,
  DateField,
  FormLabel,
  TextField
} from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useCallback, useMemo } from 'react';

import ContractorReview from './ContractorResourcesReview';
import Dollars from '../../components/Dollars';

const dateFormatter = ({ day, month, year }) => `${year}-${month}-${day}`;

const dateSplitter = dateStr => {
  const [year, month, day] = dateStr.split('-');
  return { day: +day || '', month: +month || '', year: +year || '' };
};

const ContractorForm = ({
  idx,
  contractor,
  years,
  handleChange,
  handleDelete,
  handleHourlyChange,
  handleTermChange,
  handleUseHourly,
  handleYearChange,
  initialCollapsed
}) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const toggleCollapsed = useCallback(e => {
    e.preventDefault();
    setCollapsed(prev => !prev);
  }, []);

  const startDate = useMemo(() => dateSplitter(contractor.start), [
    contractor.start
  ]);

  const endDate = useMemo(() => dateSplitter(contractor.end), [contractor.end]);

  const startDateChangeHandler = useCallback(
    (_, dateStr) => {
      handleTermChange(idx)({ end: contractor.end, start: dateStr });
    },
    [contractor.end]
  );
  const endDateChangeHandler = useCallback(
    (_, dateStr) => {
      handleTermChange(idx)({ end: dateStr, start: contractor.start });
    },
    [contractor.start]
  );

  const handle = {
    changeDesc: useCallback(handleChange(idx, 'desc'), []),
    changeHourlyHours: years.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleHourlyChange(idx, ffy, 'hours'), [years])
      }),
      {}
    ),
    changeHourlyRate: years.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleHourlyChange(idx, ffy, 'rate'), [years])
      }),
      {}
    ),
    changeName: useCallback(handleChange(idx, 'name'), []),
    changeTotalCost: useCallback(handleChange(idx, 'totalCost'), []),
    changeYearCost: years.reduce(
      (acc, ffy) => ({
        ...acc,
        [ffy]: useCallback(handleYearChange(idx, ffy), [years])
      }),
      {}
    ),
    setUseHourlyOff: useCallback(handleUseHourly(contractor.key, false), []),
    setUseHourlyOn: useCallback(handleUseHourly(contractor.key, true), [])
  };

  return collapsed ? (
    <ContractorReview
      idx={idx}
      contractor={contractor}
      years={years}
      handleDelete={handleDelete}
      handleEdit={toggleCollapsed}
    />
  ) : (
    <div className="ds-u-margin-top--2 ds-u-margin-bottom--3">
      <TextField
        label="Contractor Name"
        name="contractor-name"
        value={contractor.name}
        onChange={handle.changeName}
      />
      <TextField
        label="Description of Services"
        name="contractor-description"
        multiline
        rows={5}
        value={contractor.desc}
        onChange={handle.changeDesc}
      />
      <FormLabel>Contract Term</FormLabel>
      <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
        <DateField
          label="Start"
          dayValue={startDate.day}
          monthValue={startDate.month}
          yearValue={startDate.year}
          dateFormatter={dateFormatter}
          onChange={startDateChangeHandler}
        />
        <DateField
          label="End"
          hint=""
          dayValue={endDate.day}
          monthValue={endDate.month}
          yearValue={endDate.year}
          dateFormatter={dateFormatter}
          onChange={endDateChangeHandler}
        />
      </div>
      <TextField
        label="Total Contract Cost"
        name="contractor-total-cost"
        mask="currency"
        size="medium"
        value={contractor.totalCost}
        onChange={handle.changeTotalCost}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">This is an hourly resource</legend>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${contractor.key}-no`}
          value="no"
          checked={!contractor.hourly.useHourly}
          onChange={handle.setUseHourlyOff}
        >
          No
        </Choice>
        <Choice
          type="radio"
          name={`apd-activity-contractor-hourly-${contractor.key}-yes`}
          value="yes"
          checked={contractor.hourly.useHourly}
          onChange={handle.setUseHourlyOn}
          checkedChildren={
            <div className="ds-c-choice__checkedChild">
              {years.map(ffy => (
                <Fragment key={ffy}>
                  <FormLabel>FFY {ffy}</FormLabel>
                  <div className="ds-l-row ds-u-padding-left--2">
                    <TextField
                      label="Number of hours"
                      name={`contractor-num-hours-ffy-${ffy}`}
                      labelClassName="ds-u-margin-top--1"
                      type="number"
                      size="medium"
                      value={contractor.hourly.data[ffy].hours}
                      onChange={handle.changeHourlyHours[ffy]}
                    />
                    <TextField
                      className="ds-u-margin-left--1"
                      label="Hourly rate"
                      name={`contractor-hourly-rate-ffy-${ffy}`}
                      labelClassName="ds-u-margin-top--1"
                      mask="currency"
                      size="medium"
                      value={contractor.hourly.data[ffy].rate}
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

      {contractor.hourly.useHourly ? (
        <p className="ds-u-margin-bottom--0">
          {years.map(ffy => (
            <Fragment key={ffy}>
              <FormLabel>FFY {ffy} Cost</FormLabel>
              <Dollars>{contractor.years[ffy]}</Dollars>
            </Fragment>
          ))}
        </p>
      ) : (
        years.map(ffy => (
          <TextField
            key={ffy}
            label={`FFY ${ffy} Cost`}
            name={`contractor-cost-ffy-${ffy}`}
            disabled={contractor.hourly.useHourly}
            mask="currency"
            size="medium"
            value={contractor.years[ffy]}
            onChange={handle.changeYearCost[ffy]}
          />
        ))
      )}

      <Button
        variation="primary"
        className="ds-u-margin-top--4"
        onClick={toggleCollapsed}
      >
        Done
      </Button>
    </div>
  );
};

ContractorForm.propTypes = {
  idx: PropTypes.number.isRequired,
  contractor: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleHourlyChange: PropTypes.func.isRequired,
  handleTermChange: PropTypes.func.isRequired,
  handleUseHourly: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired,
  initialCollapsed: PropTypes.bool
};

ContractorForm.defaultProps = {
  initialCollapsed: true
};

export default ContractorForm;
