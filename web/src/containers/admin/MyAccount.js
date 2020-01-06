import { Button, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { editSelf } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { LockIcon, UnlockIcon } from '../../components/Icons';
import { getEditOwnAccountError } from '../../reducers/errors';
import { getEditOwnAccountWorking } from '../../reducers/working';

const MyAccount = ({
  editAccount,
  error,
  user: { name: initialName, phone: initialPhone, position: initialPosition },
  working
}) => {
  const [changePassword, setChangePassword] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    name: initialName,
    password: '',
    phone: initialPhone,
    position: initialPosition
  });

  const changeUserName = ({ target: { value } }) =>
    setUser({ ...user, name: value });
  const changeUserPassword = ({ target: { value } }) =>
    setUser({ ...user, password: value });
  const changeUserPhone = ({ target: { value } }) =>
    setUser({ ...user, phone: value });
  const changeUserPosition = ({ target: { value } }) =>
    setUser({ ...user, position: value });

  // Success has to be derived.  It can't be stored in the app state because
  // if it was, then the next time this form was loaded, it would show the
  // success state even though it wouldn't be accurate anymore.
  if (hasFetched) {
    const newSuccess = !working && !error;
    if (newSuccess !== success) {
      setSuccess(newSuccess);
    }
  }

  const saveAccount = e => {
    e.preventDefault();

    // Once we've attempted to save these changes, it's valid to show success
    // or error messages.  Since error messages are persisted in app state,
    // it's possible there's an error sitting there from a previous instance
    // of this form.  This flag makes sure we don't show any error messages
    // until this instance of the form has tried to save.
    setHasFetched(true);
    editAccount(user, changePassword);
  };

  const toggleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  return (
    <Fragment>
      <CardForm
        title="Manage account"
        legend="manage account details"
        sectionName="administrator"
        error={hasFetched && error}
        success={success && 'Changes saved'}
        working={working}
        onSave={saveAccount}
      >
        <TextField
          label="Name"
          name="name"
          ariaLabel="please enter your full name"
          value={user.name || ''}
          onChange={changeUserName}
        />
        <TextField
          label="Phone number"
          ariaLabel="please enter your 10-digit phone number"
          mask="phone"
          name="phone"
          size="medium"
          value={user.phone || ''}
          onChange={changeUserPhone}
        />
        <TextField
          label="Role"
          name="position"
          ariaLabel="please enter your position or role"
          value={user.position || ''}
          onChange={changeUserPosition}
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
            onChange={changeUserPassword}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export { MyAccount as plain, mapStateToProps, mapDispatchToProps };
