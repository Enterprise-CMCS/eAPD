import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import { useFormStatus, useFormField } from './hooks';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { STATES } from '../../util';
import { createUser as createUserDispatch } from '../../actions/admin';
import { getAddAccountError } from '../../reducers/errors';
import { getAddAccountWorking } from '../../reducers/working';

const CreateUser = ({ createUser, error, roles, working }) => {
  const { errorMsg, success, hasFetched } = useFormStatus(error, working);

  const [name, setName] = useFormField('');
  const [email, setEmail] = useFormField('');
  const [password, setPassword] = useFormField('');
  const [role, setRole] = useFormField('');
  const [state, setState] = useFormField('');

  useMemo(() => {
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setState('');
    }
  }, [success]);

  const submit = e => {
    e.preventDefault();
    hasFetched();
    createUser({ email, name, password, role, state });
  };

  return (
    <Fragment>
      <CardForm
        title="Create account"
        sectionName="administrator"
        error={errorMsg}
        success={success && 'Account created'}
        working={working}
        onSave={submit}
      >
        <TextField
          label="Name"
          name="name"
          ariaLabel="please enter the user's full name"
          value={name}
          onChange={setName}
        />

        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={setEmail}
        />

        <FormLabel component="label" fieldId="create_account_state">
          State
        </FormLabel>
        <Select
          id="create_account_state"
          name="state"
          size="medium"
          value={state}
          onChange={setState}
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
          value={role}
          onChange={setRole}
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
          onChange={setPassword}
          showMeter
          className="mb2"
        />
      </CardForm>
    </Fragment>
  );
};

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
