import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import nameFundingSourceSchema from '@cms-eapd/common/schemas/nameAndFundingSource';
import { setActivityName } from '../../../../redux/actions/editActivity';

import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';

const NameForm = ({ index, item: { name }, setName, adminCheck }) => {
  const {
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: name
    },
    resolver: joiResolver(nameFundingSourceSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger(['name']);
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <TextField
            {...props}
            id="activity-name-field"
            data-cy="activity-name"
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
    </Fragment>
  );
};

NameForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  setName: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    adminCheck: selectAdminCheckEnabled(state)
  };
};

const mapDispatchToProps = {
  setName: setActivityName
};

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);

export { NameForm as plain, mapStateToProps, mapDispatchToProps };
