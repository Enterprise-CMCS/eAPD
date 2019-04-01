import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CardForm from '../../components/CardForm';
import Header from '../../components/Header';
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
    if (!hasFetched) {
      return { hasFetched: working };
    }

    if (!working && !error) {
      return {
        hasFetched: false,
        name: '',
        email: '',
        password: '',
        role: '',
        state: '',
        success: true
      };
    }

    return { success: false };
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
        <Header />

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
