import {
  Button,
  FormLabel,
  Select,
  TextField
} from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { useBoolState, useFormField, useFormStatus } from './hooks';
import { editAccount as editAccountDispatch } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { LockIcon, UnlockIcon } from '../../components/Icons';
import { getEditAccountError } from '../../reducers/errors';
import { getEditAccountWorking } from '../../reducers/working';
import { STATES } from '../../util';

const EditAccount = ({
  currentUser,
  editAccount,
  error,
  roles,
  users,
  working
}) => {
  const [changePassword, toggleChangePassword] = useBoolState(false);

  const [formEmail, setEmail] = useFormField('');
  const [formName, setName] = useFormField('');
  const [formPassword, setPassword] = useFormField('');
  const [formPhone, setPhone] = useFormField('');
  const [formPosition, setPosition] = useFormField('');
  const [formRole, setRole] = useFormField('');
  const [formState, setState] = useFormField('');

  const [userID, setUserID] = useState('');

  const { errorMsg, success, hasFetched } = useFormStatus(error, working);

  const selectUser = useCallback(
    e => {
      const { value } = e.target;

      const { email, name, phone, position, role, state } = users
        .filter(u => u.id === +value)
        .reduce((_, u) => u, null);

      setEmail(email || '');
      setName(name || '');
      setPhone(phone || '');
      setPosition(position || '');
      setRole(role || '');
      setState(state || '');

      setUserID(+value);
    },
    [users]
  );

  const submit = useMemo(
    () => e => {
      e.preventDefault();
      hasFetched();
      editAccount(
        {
          id: userID,
          email: formEmail,
          name: formName,
          password: formPassword,
          phone: formPhone,
          position: formPosition,
          role: formRole,
          state: formState
        },
        changePassword
      );
    },
    [
      formEmail,
      formName,
      formPassword,
      formPhone,
      formPosition,
      formRole,
      formState
    ]
  );

  return (
    <Fragment>
      <CardForm
        title="Manage accounts"
        sectionName="administrator"
        error={errorMsg}
        success={success && 'Account saved'}
        working={working}
        onSave={!!userID && submit}
      >
        <FormLabel component="label" fieldId="modify_account_user">
          Account to edit
        </FormLabel>
        <Select
          id="modify_account_user"
          name="userID"
          value={`${userID}`}
          onChange={selectUser}
        >
          <option value="">Select...</option>
          {users.map(u => (
            <option key={u.id} value={`${u.id}`}>
              {`${u.name ? `${u.name} - ` : ''}${u.email}`}
            </option>
          ))}
        </Select>

        {userID && (
          <Fragment>
            <hr />

            <TextField
              ariaLabel="please enter the user's full name"
              label="Name"
              name="name"
              value={formName}
              onChange={setName}
            />

            <TextField
              label="Email"
              name="email"
              value={formEmail}
              onChange={setEmail}
            />

            <TextField
              label="Phone number"
              name="phone"
              size="medium"
              mask="phone"
              value={formPhone}
              onChange={setPhone}
            />

            <TextField
              label="Position"
              name="position"
              value={formPosition}
              onChange={setPosition}
            />

            <FormLabel component="label" fieldId="modify_account_state">
              State
            </FormLabel>
            <Select
              id="modify_account_state"
              name="state"
              size="medium"
              value={formState}
              onChange={setState}
            >
              <option value="">None</option>
              {STATES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>

            <FormLabel component="label" fieldId="modify_account_role">
              Authorization role
            </FormLabel>
            <Select
              id="modify_account_role"
              name="role"
              size="medium"
              value={formRole}
              onChange={setRole}
              disabled={currentUser.id === userID}
            >
              <option value="">None</option>
              {roles.map(r => (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
              ))}
            </Select>

            <div className="ds-l-row ds-u-padding-x--2">
              <TextField
                label="Password"
                name="current password"
                ariaLabel="Current password"
                value="********"
                disabled
                size="medium"
              />
              <div className="ds-u-clearfix">
                <div className="ds-c-label">&nbsp;</div>
                <div className="ds-c-field ds-u-border--0">
                  <Button
                    aria-label={
                      changePassword
                        ? 'keep previous password'
                        : 'change password'
                    }
                    variation="transparent"
                    className="ds-u-padding-y--0"
                    onClick={toggleChangePassword}
                    purpose="change password"
                  >
                    {changePassword ? <UnlockIcon /> : <LockIcon />} Change
                    password
                  </Button>
                </div>
              </div>
            </div>
            {changePassword && (
              <Password
                showMeter
                title="New password"
                value={formPassword}
                onChange={setPassword}
              />
            )}
          </Fragment>
        )}
      </CardForm>
    </Fragment>
  );
};

EditAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
  editAccount: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  roles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  error: getEditAccountError(state),
  roles: state.admin.roles,
  users: state.admin.users,
  working: getEditAccountWorking(state)
});

const mapDispatchToProps = { editAccount: editAccountDispatch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccount);

export { EditAccount as plain, mapStateToProps, mapDispatchToProps };
