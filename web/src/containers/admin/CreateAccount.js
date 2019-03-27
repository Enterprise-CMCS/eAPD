import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminForm from './AdminForm';
import { STATES } from '../../util';
import Password from '../../components/PasswordWithMeter';
import { createUser as createUserDispatch } from '../../actions/admin';
import { t } from '../../i18n';

class CreateUser extends Component {
  state = {
    error: false,
    fetching: false,
    name: '',
    email: '',
    password: '',
    role: '',
    state: '',
    success: false
  };

  handleChange = e => {
    const { name: key, value } = e.target;
    const change = { [key]: value };

    this.setState(change);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, name, password, role, state } = this.state;

    const { createUser } = this.props;

    this.setState({ fetching: true });
    createUser({ email, name, password, role, state })
      .then(() => {
        this.setState({
          error: false,
          fetching: false,
          name: '',
          email: '',
          password: '',
          role: '',
          state: '',
          success: true
        });
      })
      .catch(error => {
        this.setState({ error, fetching: false, success: false });
      });
  };

  render() {
    const { roles } = this.props;
    const {
      error,
      fetching,
      name,
      email,
      password,
      role,
      state,
      success
    } = this.state;

    return (
      <Fragment>
        <header className="clearfix px2 py1 bg-white">
          <div className="left">
            <Link to="/" className="btn px0 bold caps">
              {t('titleBasic')}
            </Link>
          </div>
        </header>

        <AdminForm
          title="Create account"
          error={error}
          success={success && 'Account created'}
          working={fetching}
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
            className="mb2"
          />
        </AdminForm>
      </Fragment>
    );
  }
}

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({ admin: { roles } }) => ({
  roles
});

const mapDispatchToProps = {
  createUser: createUserDispatch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);

export { CreateUser as plain };
