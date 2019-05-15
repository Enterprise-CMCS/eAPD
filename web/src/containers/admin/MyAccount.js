import { Button, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import { useBoolState, useFormField, useFormStatus } from './hooks';
import { editSelf } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { LockIcon, UnlockIcon } from '../../components/Icons';
import { getEditOwnAccountError } from '../../reducers/errors';
import { getEditOwnAccountWorking } from '../../reducers/working';

const MyAccount = ({ editAccount, error, user, working }) => {
  const { errorMsg, success, hasFetched } = useFormStatus(error, working);

  const [name, setName] = useFormField(user.name || '');
  const [password, setPassword] = useFormField('');
  const [phone, setPhone] = useFormField(user.phone || '');
  const [position, setPosition] = useFormField(user.position || '');

  const [changePassword, toggleChangePassword] = useBoolState(false);

  const submit = useCallback(
    e => {
      e.preventDefault();

      hasFetched();
      editAccount({ name, password, phone, position }, changePassword);
    },
    [name, password, phone, position]
  );

  return (
    <Fragment>
      <CardForm
        title="Manage account"
        legend="manage account details"
        sectionName="administrator"
        error={errorMsg}
        success={success && 'Changes saved'}
        working={working}
        onSave={submit}
      >
        <TextField
          label="Name"
          name="name"
          ariaLabel="please enter your full name"
          value={name}
          onChange={setName}
        />
        <TextField
          label="Phone number"
          ariaLabel="please enter your 10-digit phone number"
          mask="phone"
          name="phone"
          size="medium"
          value={phone}
          onChange={setPhone}
        />
        <TextField
          label="Role"
          name="position"
          ariaLabel="please enter your position or role"
          value={position}
          onChange={setPosition}
        />
        <div className="ds-l-row ds-u-padding-x--2">
          <TextField
            label="Password"
            ariaLabel="Current password"
            name="current password"
            value="********"
            disabled
            size="medium"
          />
          <div className="ds-u-clearfix">
            <div className="ds-c-label">&nbsp;</div>
            <div className="ds-c-field ds-u-border--0">
              <Button
                aria-label={
                  changePassword ? 'keep previous password' : 'change password'
                }
                variation="transparent"
                className="ds-u-padding-y--0"
                onClick={toggleChangePassword}
                purpose="change password"
              >
                {changePassword ? <UnlockIcon /> : <LockIcon />} Change password
              </Button>
            </div>
          </div>
        </div>
        {changePassword && (
          <Password
            showMeter
            title="New password"
            value={password}
            onChange={setPassword}
          />
        )}
      </CardForm>
    </Fragment>
  );
};

MyAccount.propTypes = {
  editAccount: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string
  }).isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: getEditOwnAccountError(state),
  user: {
    name: state.user.data.name,
    phone: state.user.data.phone,
    position: state.user.data.position
  },
  working: getEditOwnAccountWorking(state)
});

const mapDispatchToProps = { editAccount: editSelf };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export { MyAccount as plain, mapStateToProps, mapDispatchToProps };
