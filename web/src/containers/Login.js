import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField } from '@cmsgov/design-system-core';

import { useFormField } from './admin/hooks';
import ConsentBanner from '../components/ConsentBanner';
import { login as loginDispatch } from '../actions/auth';
import CardForm from '../components/CardForm';
import Password from '../components/PasswordWithMeter';

const Login = ({ authenticated, error, fetching, location, login }) => {
  const { from } = location.state || { from: { pathname: '/' } };

  const [username, setUsername] = useFormField('');
  const [password, setPassword] = useFormField('');
  const [showConsent, setShowConsent] = useState(true);

  const hideConsent = useCallback(() => setShowConsent(false), []);

  const submit = useCallback(
    e => {
      e.preventDefault();
      login(username, password);
    },
    [username, password]
  );

  if (authenticated) {
    if (from.pathname !== '/logout') {
      return <Redirect to={from} />;
    }
    return <Redirect to="/" />;
  }

  if (showConsent) {
    return (
      <Fragment>
        <ConsentBanner onAgree={hideConsent} />
      </Fragment>
    );
  }

  let errorMessage = false;
  if (error === 'Unauthorized') {
    errorMessage = 'The email or password you’ve entered is incorrect.';
  } else if (error === 'Unauthorized') {
    errorMessage = 'Sorry! Something went wrong. Please try again.';
  }

  return (
    <Fragment>
      <CardForm
        title="Log in"
        cancelable={false}
        canSubmit={username.length && password.length}
        error={errorMessage}
        working={fetching}
        primaryButtonText={['Log in', 'Logging in']}
        onSave={submit}
        footer={
          <p>
            Forgot your password? Contact{' '}
            <a href="mailto:CMS-EAPD@cms.hhs.gov?subject=Password%20Recovery%20Request%20for%20eAPD">
              CMS-EAPD@cms.hhs.gov
            </a>
          </p>
        }
      >
        <TextField
          id="username"
          label="Email"
          name="username"
          ariaLabel="Enter the email associated with this account."
          value={username}
          onChange={setUsername}
        />
        <Password title="Password" value={password} onChange={setPassword} />
      </CardForm>
    </Fragment>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated, error, fetching } }) => ({
  authenticated,
  error,
  fetching
});

const mapDispatchToProps = { login: loginDispatch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
