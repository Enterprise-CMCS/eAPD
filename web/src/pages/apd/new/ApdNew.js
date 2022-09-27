import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';

import CardForm from '../../../components/CardForm';
import { Alert, ChoiceList, TextField } from '@cmsgov/design-system';

import HitechView from './HitechView';
import MmisView from './MmisView';

import { createApd } from '../../../redux/actions/app';

const ApdNew = () => {
  const [apdType, setApdType] = useState(false);

  const { control } = useForm({
    defaultValues: {
      apdType
    },
    mode: 'onChange'
  });

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

  const yearChoices = yearOptions.map(year => ({
    defaultChecked: years.includes(year),
    label: year,
    value: year
  }));

  return (
    <CardForm primaryButtonText={['Submit']}>
      <h1 className="ds-h2">Create a New Advanced Planning Document (APD)</h1>
      <div>Complete all the fields below to create your APD.</div>
      <h2 className="ds-h3">What type of APD are you creating?</h2>
      <Alert variation="warn" className="ds-u-margin-y--3">
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
          <TextField
            className="remove-clearfix"
            label="APD Name"
            name="apd-name"
          />
          <ChoiceList
            choices={yearChoices}
            label="Federal Fiscal Year (FFY)"
            labelClassName="ds-u-margin-bottom--1"
            hint="Choose the federal fiscal year(s) this APD covers."
            name="apd-years"
            type="checkbox"
          />
        </div>
      )}
      {apdType === 'hitech' && <HitechView />}
      {apdType === 'mmis' && <MmisView />}
    </CardForm>
  );
};

ApdNew.PropTypes = {
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  yearOptions: PropTypes.arrayOf(PropTypes.string).isRequired
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
