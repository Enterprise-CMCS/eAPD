import { ChoiceList, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import nameFundingSourceSchema from '../../../../../static/schemas/nameAndFundingSource';
import {
  setActivityName,
  setActivityFundingSource
} from '../../../../../redux/actions/editActivity';

const NameAndFundingSourceForm = ({ 
    index, 
    item: { fundingSource, name }, 
    setFundingSource,
    setName 
  }) => {
    NameAndFundingSourceForm.displayName = 'NameAndFundingSourceForm';

    const {
      control,
      formState: { errors }
    } = useForm({
      defaultValues: {
        name: name,
        fundingSource: fundingSource
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(nameFundingSourceSchema)
    });

    useEffect(() => {
      nameFundingSourceSchema.validateAsync({fundingSource, name})
    });

    const changeName = useCallback(
      ({ target: { value } }) => {
        setName(index, value);
      },
      [index, setName]
    );

    const changeFundingSource = useCallback(
      ({ target: { value } }) => {
        setFundingSource(index, value);
      },
      [index, setFundingSource]
    );

    const choices = ['HIT', 'HIE', 'MMIS'].map(choice => ({
      checked: fundingSource === choice,
      label: choice,
      value: choice
    }));

    return (
      <Fragment>
        <Controller
          name="name"
          control={control}
          render={({ field: {onChange, ...props} }) => (
            <TextField
              {...props}
              label="Activity name"
              value={name}
              onChange={e => {
                changeName(e);
                onChange(e);
              }}
              className="remove-clearfix"
              errorMessage={errors?.name?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          name="fundingSource"
          control={control}
          render={({ field: {onChange, ...props} }) => (
            <ChoiceList
              {...props}
              choices={choices}
              label="Program type"
              labelClassName="ds-u-margin-bottom--1"
              onChange={e => {
                changeFundingSource(e);
                onChange(e);
              }}
              type="radio"
              errorMessage={errors?.fundingSource?.message}
              errorPlacement="bottom"
            />
          )}
        />
      </Fragment>
    );
  };

NameAndFundingSourceForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  setFundingSource: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFundingSource: setActivityFundingSource,
  setName: setActivityName
};

export default connect(null, mapDispatchToProps)(NameAndFundingSourceForm);

export { NameAndFundingSourceForm as plain, mapDispatchToProps };
