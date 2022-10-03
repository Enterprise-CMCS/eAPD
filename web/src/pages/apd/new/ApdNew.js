import PropType from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Alert, Button, ChoiceList, TextField } from '@cmsgov/design-system';
import { createApd } from '../../../redux/actions/app';

import HitechView from './HitechView';
import MmisView from './MmisView';

import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const yearObj = Joi.object().keys({
  defaultChecked: Joi.boolean().required(),
  name: Joi.any(),
  label: Joi.any(),
  value: Joi.any()
});

const createApdSchema = Joi.object({
  apdType: Joi.valid('hitech', 'mmis').required(),
  name: Joi.string().min(1).required(),
  years: Joi.array().required()
});

const ApdNew = () => {
  const thisFFY = (() => {
    const year = new Date().getFullYear();

    // Federal fiscal year starts October 1,
    // but Javascript months start with 0 for
    // some reason, so October is month 9.
    if (new Date().getMonth() > 8) {
      return year + 1;
    }
    return year;
  })();

  const yearOptions = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);
  const years = yearOptions.slice(0, 2);

  const yearChoices = yearOptions.map((year, index) => ({
    defaultChecked: years.includes(year),
    name: `years[${index}].year`,
    label: year,
    value: year
  }));

  ApdNew.displayName = 'ApdNew';
  const history = useHistory();
  const [apdType, setApdType] = useState(false);
  const [data, setData] = useState({
    apdType,
    name,
    years
  });

  const {
    control,
    trigger,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(createApdSchema)
  });

  function setYears(value) {
    let index = years.indexOf(value),
      newData = data;
    if (index > -1) {
      // only splice array when item is found
      years.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      years.push(value);
    }
    newData.years = years;
    setData(newData);
  }

  const disabled = !isValid || !isDirty || (!isValid && isDirty);

  return (
    <Fragment>
      <div className="ds-u-margin--7 ds-u-padding--7 ds-u-padding-right--12">
        <h1 className="ds-h2">Create a New Advanced Planning Document (APD)</h1>
        <div className="ds-u-padding-bottom--1 ds-u-border-bottom--2">
          Complete all the fields below to create your APD.
        </div>
        <h2 className="ds-h3">What type of APD are you creating?</h2>
        <Alert
          variation="warn"
          className="ds-u-margin-y--3 ds-u-margin-right--7"
        >
          <p className="ds-c-alert__text">
            This selection cannot be changed after creating a new APD.
          </p>
        </Alert>
        <Controller
          name="apdType"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <ChoiceList
              {...props}
              type="radio"
              choices={[
                {
                  label: 'HITECH IAPD',
                  value: 'hitech',
                  checked: value === 'hitech'
                },
                {
                  label: 'MMIS IAPD',
                  value: 'mmis',
                  checked: value === 'mmis'
                }
              ]}
              onChange={e => {
                onChange(e);
                setApdType(e.target.value);
              }}
            />
          )}
        />
        {(apdType === 'mmis' || apdType === 'hitech') && (
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onBlur, ...props } }) => (
                <TextField
                  {...props}
                  label="APD Name"
                  className="remove-clearfix"
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              name="years"
              control={control}
              label="Federal Fiscal Year (FFY)"
              render={({ field: { onChange, onBlur } }) => (
                <ChoiceList
                  choices={yearChoices}
                  labelClassName="ds-u-margin-bottom--1"
                  hint="Choose the federal fiscal year(s) this APD covers."
                  type="checkbox"
                  onChange={e => {
                    setYears(e.target.value);
                    onChange(e);
                    trigger();
                    console.log({ data });
                  }}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                />
              )}
            />
          </div>
        )}
        {apdType === 'hitech' && <HitechView />}
        {apdType === 'mmis' && <MmisView />}

        <Button variation="transparent" onClick={history.goBack}>
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled}
          className="ds-u-float--right"
        >
          Create an APD
        </Button>
      </div>
    </Fragment>
  );
};

ApdNew.PropTypes = {
  createApd: PropType.func.isRequired,
  yearChoices: PropType.arrayOf(PropType.string).isRequired
};

ApdNew.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  activities: state.user.data.activities
});

const mapDispatchToProps = {
  createApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdNew);
