import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ConsentBanner from '../components/ConsentBanner';
import { login } from '../actions/auth';
import CardForm from '../components/CardForm';
import Password from '../components/PasswordWithMeter';

const Login = ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  location,
  login: action
}) => {
  const [showConsent, setShowConsent] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = ({ target: { value } }) => setUsername(value);
  const changePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = e => {
    e.preventDefault();
    action(username, password);
  };

  const hideConsent = () => {
    setShowConsent(false);
  };

  const { from } = location.state || { from: { pathname: '/' } };

  if (authenticated) {
    if (from.pathname !== '/logout') {
      return <Redirect to={from} />;
    }
    return <Redirect to="/" />;
  }

  if (showConsent && !hasEverLoggedOn) {
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
        legend="Log in"
        cancelable={false}
        canSubmit={username.length && password.length}
        error={errorMessage}
        success={hasEverLoggedOn ? 'You have securely logged out.' : null}
        working={fetching}
        primaryButtonText={['Log in', 'Logging in']}
        onSave={handleSubmit}
        footer={
          <p className="ds-u-padding-top--2">
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
          onChange={changeUsername}
        />
        <Password title="Password" value={password} onChange={changePassword} />
      </CardForm>
    </Fragment>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasEverLoggedOn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { authenticated, error, fetching, hasEverLoggedOn }
}) => ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
