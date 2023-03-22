import { ChoiceList } from '../../../../components/ChoiceList';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { nameAndFundingSourceSchema as schema } from '@cms-eapd/common';
import { setActivityFundingSource } from '../../../../redux/actions/editActivity';

import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';

const FundingSourceForm = ({
  index,
  item: { fundingSource },
  setFundingSource,
  adminCheck
}) => {
  const {
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fundingSource: fundingSource
    },
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger(['fundingSource']);
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const choices = ['HIT', 'HIE', 'MMIS'].map(choice => ({
    checked: fundingSource === choice,
    label: choice,
    value: choice
  }));

  return (
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
  );
};

FundingSourceForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired
  }).isRequired,
  setFundingSource: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    adminCheck: selectAdminCheckEnabled(state)
  };
};

const mapDispatchToProps = {
  setFundingSource: setActivityFundingSource
};

export default connect(mapStateToProps, mapDispatchToProps)(FundingSourceForm);

export { FundingSourceForm as plain, mapStateToProps, mapDispatchToProps };
