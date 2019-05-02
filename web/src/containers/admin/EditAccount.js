import {
  Button,
  FormLabel,
  Select,
  TextField
} from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { editAccount as editAccountDispatch } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { LockIcon, UnlockIcon } from '../../components/Icons';
import { getEditAccountError } from '../../reducers/errors';
import { getEditAccountWorking } from '../../reducers/working';
import { STATES } from '../../util';

class EditAccount extends Component {
  state = {
    changePassword: false,
    hasFetched: false,
    success: false,
    userID: '',
    user: null
  };

  static getDerivedStateFromProps({ error, working }, { hasFetched }) {
    // Success has to be derived.  It can't be stored in the app state because
    // if it was, then the next time this form was loaded, it would show the
    // success state even though it wouldn't be accurate anymore.

    if (hasFetched) {
      return {
        success: !working && !error
      };
    }
    return null;
  }

  getForm = () => {
    const { currentUser, roles } = this.props;
    const { changePassword, user } = this.state;

    if (user) {
      const { email, name, password, phone, position, state, role } = user;

      return (
        <Fragment>
          <hr />

          <TextField
            ariaLabel="please enter the user's full name"
            label="Name"
            name="name"
            value={name || ''}
            onChange={this.handleEditAccount}
          />

          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={this.handleEditAccount}
          />

          <TextField
            label="Phone number"
            name="phone"
            size="medium"
            mask="phone"
            value={phone || ''}
            onChange={this.handleEditAccount}
          />

          <TextField
            label="Position"
            name="position"
            value={position || ''}
            onChange={this.handleEditAccount}
          />

          <FormLabel component="label" fieldId="modify_account_state">
            State
          </FormLabel>
          <Select
            id="modify_account_state"
            name="state"
            size="medium"
            value={state}
            onChange={this.handleEditAccount}
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
            value={role || ''}
            onChange={this.handleEditAccount}
            disabled={currentUser.id === user.id}
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
                  onClick={this.toggleChangePassword}
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
              value={password}
              onChange={this.handleEditAccount}
            />
          )}
        </Fragment>
      );
    }
    return null;
  };

  handlePickAccount = e => {
    const { users } = this.props;
    const { value } = e.target;

    const user = users.filter(u => u.id === +value).reduce((_, u) => u, null);

    this.setState({ userID: +value, user });
  };

  handleEditAccount = e => {
    const { name, value } = e.target;
    this.setState(prev => ({ user: { ...prev.user, [name]: value } }));
  };

  editAccount = e => {
    e.preventDefault();
    const { editAccount } = this.props;
    const { changePassword, user } = this.state;

    // Once we've attempted to save these changes, it's valid to show success
    // or error messages.  Since error messages are persisted in app state,
    // it's possible there's an error sitting there from a previous instance
    // of this form.  This flag makes sure we don't show any error messages
    // until this instance of the form has tried to save.
    this.setState({ hasFetched: true });
    editAccount(user, changePassword);
  };

  toggleChangePassword = e => {
    e.preventDefault();
    this.setState(prev => ({ changePassword: !prev.changePassword }));
  };

  render() {
    const { error, users, working } = this.props;
    const { hasFetched, success, userID } = this.state;

    const onSave = !!userID && this.editAccount;

    return (
      <Fragment>
        <CardForm
          title="Manage accounts"
          sectionName="administrator"
          error={hasFetched && error}
          success={success && 'Account saved'}
          working={working}
          onSave={onSave}
        >
          <FormLabel component="label" fieldId="modify_account_user">
            Account to edit
          </FormLabel>
          <Select
            id="modify_account_user"
            name="userID"
            value={`${userID}`}
            onChange={this.handlePickAccount}
          >
            <option value="">Select...</option>
            {users.map(u => (
              <option key={u.id} value={`${u.id}`}>
                {`${u.name ? `${u.name} - ` : ''}${u.email}`}
              </option>
            ))}
          </Select>

          {this.getForm()}
        </CardForm>
      </Fragment>
    );
  }
}

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
