import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { STATES } from '../../util';
import { createUser as createUserDispatch } from '../../actions/admin';
import { getAddAccountError } from '../../reducers/errors';
import { getAddAccountWorking } from '../../reducers/working';

class CreateUser extends Component {
  state = {
    hasFetched: false,
    name: '',
    email: '',
    password: '',
    role: '',
    state: '',
    success: false
  };

  static getDerivedStateFromProps({ error, working }, { hasFetched }) {
    // Success has to be derived.  It can't be stored in the app state because
    // if it was, then the next time this form was loaded, it would show the
    // success state even though it wouldn't be accurate anymore.
    if (hasFetched) {
      const update = { success: !working && !error };

      // And because this component is creating a new user, that user is stored
      // in component state too - so in a success condition, where the user was
      // saved, blank out the state so another new user can be created.  We
      // also need to reset hasFetched or else every prop change would reset
      // the user stored in component state.
      if (update.success) {
        update.hasFetched = false;
        update.name = '';
        update.email = '';
        update.password = '';
        update.role = '';
        update.state = '';
      }
      return update;
    }
    return null;
  }

  handleChange = e => {
    const { name: key, value } = e.target;
    const change = { [key]: value };

    this.setState(change);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, name, password, role, state } = this.state;

    const { createUser } = this.props;

    // Once we've attempted to save these changes, it's valid to show success
    // or error messages.  Since error messages are persisted in app state,
    // it's possible there's an error sitting there from a previous instance
    // of this form.  This flag makes sure we don't show any error messages
    // until this instance of the form has tried to save.
    this.setState({ hasFetched: true });
    createUser({ email, name, password, role, state });
  };

  render() {
    const { error, roles, working } = this.props;
    const {
      hasFetched,
      name,
      email,
      password,
      role,
      state,
      success
    } = this.state;

    return (
      <Fragment>
        <CardForm
          title="Create account"
          sectionName="administrator"
          error={hasFetched && error}
          success={success && 'Account created'}
          working={working}
          onSave={this.handleSubmit}
        >
          <TextField
            label="Name"
            name="name"
            ariaLabel="please enter the user's full name"
            value={name || ''}
            onChange={this.handleChange}
          />

          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <FormLabel component="label" fieldId="create_account_state">
            State
          </FormLabel>
          <Select
            id="create_account_state"
            name="state"
            size="medium"
            value={state}
            onChange={this.handleChange}
          >
            <option value="">None</option>
            {STATES.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>

          <FormLabel component="label" fieldId="create_account_role">
            Authorization role
          </FormLabel>
          <Select
            id="create_account_role"
            name="role"
            size="medium"
            value={role || ''}
            onChange={this.handleChange}
          >
            <option value="">None</option>
            {roles.map(r => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </Select>

          <Password
            value={password}
            compareTo={[email, name]}
            onChange={this.handleChange}
            showMeter
            className="mb2"
          />
        </CardForm>
      </Fragment>
    );
  }
}

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: getAddAccountError(state),
  roles: state.admin.roles,
  working: getAddAccountWorking(state)
});

const mapDispatchToProps = {
  createUser: createUserDispatch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);

export { CreateUser as plain };
