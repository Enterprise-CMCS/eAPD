import { FormLabel, Dropdown, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { STATES, toSentenceCase } from '../../util';
import { createUser as createUserDispatch } from '../../actions/admin';
import { getAddAccountError } from '../../reducers/errors';
import { getAddAccountWorking } from '../../reducers/working';

const CreateUser = ({ createUser, error, roles, working }) => {
  const [email, setEmail] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [state, setState] = useState('');

  // Success has to be derived.  It can't be stored in the app state because
  // if it was, then the next time this form was loaded, it would show the
  // success state even though it wouldn't be accurate anymore.
  const success = useMemo(() => {
    const newSuccess = hasFetched && !working && !error;

    // On a successful save, we need to blank out the local user state so
    // we can start inputting another user.
    if (newSuccess) {
      setEmail('');
      setHasFetched(false);
      setName('');
      setPassword('');
      setRole('');
      setState('');
    }

    return newSuccess;
  }, [error, hasFetched, working]);

  const changeEmail = ({ target: { value } }) => setEmail(value);
  const changeName = ({ target: { value } }) => setName(value);
  const changePassword = ({ target: { value } }) => setPassword(value);
  const changeRole = ({ target: { value } }) => setRole(value);
  const changeState = ({ target: { value } }) => setState(value);

  const handleSubmit = e => {
    e.preventDefault();

    // Once we've attempted to save these changes, it's valid to show success
    // or error messages.  Since error messages are persisted in app state,
    // it's possible there's an error sitting there from a previous instance
    // of this form.  This flag makes sure we don't show any error messages
    // until this instance of the form has tried to save.
    setHasFetched(true);
    createUser({ email, name, password, role, state });
  };

  return (
    <Fragment>
      <CardForm
        title="Create account"
        sectionName="administrator"
        error={hasFetched && error}
        success={success && 'Account created'}
        working={working}
        onSave={handleSubmit}
      >
        <TextField
          label="Name"
          name="name"
          ariaLabel="please enter the user's full name"
          value={name || ''}
          onChange={changeName}
        />

        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={changeEmail}
        />

        <FormLabel component="label" fieldId="create_account_state">
          State
        </FormLabel>
        <Dropdown
          id="create_account_state"
          name="state"
          size="medium"
          value={state}
          onChange={changeState}
        >
          <option value="">None</option>
          {STATES.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Dropdown>

        <FormLabel component="label" fieldId="create_account_role">
          Authorization role
        </FormLabel>
        <Dropdown
          id="create_account_role"
          name="role"
          size="medium"
          value={role || ''}
          onChange={changeRole}
        >
          <option value="">None</option>
          {roles.map(r => (
            <option key={r.name} value={r.name}>
              {toSentenceCase(r.name)}
            </option>
          ))}
        </Dropdown>

        <Password
          value={password}
          compareTo={[email, name]}
          onChange={changePassword}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

export { CreateUser as plain };
