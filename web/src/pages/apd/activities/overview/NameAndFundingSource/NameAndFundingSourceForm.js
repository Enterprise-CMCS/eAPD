import { ChoiceList, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import nameFundingSourceSchema from '@cms-eapd/common/schemas/nameAndFundingSource';
import {
  setActivityName,
  setActivityFundingSource
} from '../../../../../redux/actions/editActivity';

const NameAndFundingSourceForm = ({
  index,
  item: { fundingSource, name },
  setFundingSource,
  setName,
  adminCheck
}) => {
  NameAndFundingSourceForm.displayName = 'NameAndFundingSourceForm';

  const {
    control,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: name,
      fundingSource: fundingSource
    },
    resolver: joiResolver(nameFundingSourceSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger(['name', 'fundingSource']);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        render={({ field: { onChange, ...props } }) => (
          <TextField
            {...props}
            label="Activity name"
            onChange={({ target: { value } }) => {
              onChange(value);
              setName(index, value);

              if (adminCheck) {
                trigger();
              }
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
        render={({ field: { onChange, ...props } }) => (
          <ChoiceList
            {...props}
            choices={choices}
            label="Program type"
            labelClassName="ds-u-margin-bottom--1"
            onChange={({ target: { value } }) => {
              onChange(value);
              setFundingSource(index, value);

              if (adminCheck) {
                trigger();
              }
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
  setName: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    adminCheck: state.apd.adminCheck.enabled
  };
};

const mapDispatchToProps = {
  setFundingSource: setActivityFundingSource,
  setName: setActivityName
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameAndFundingSourceForm);

export {
  NameAndFundingSourceForm as plain,
  mapStateToProps,
  mapDispatchToProps
};
