import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ConsentBanner from '../components/ConsentBanner';
import { login, loginOtp } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import Password from '../components/PasswordWithMeter';
import UpgradeBrowser from '../components/UpgradeBrowser';
import LoginMFA from './LoginMFA';
import LoginLocked from '../components/LoginLocked';

const Login = ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  location,
  otpStage,
  isLocked,
  login: action,
  loginOtp: otpAction
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

// Ty Note: I sort of tacked this on here thinking isLocked would take precedent over the otpStage. Open to ideas for improving this. 
  let errorMessage = false;
  if (isLocked) {
    errorMessage = 'You are locked out'
  } else if (otpStage && error === 'Authentication failed') {
    errorMessage = 'The one-time password you’ve entered is incorrect.';
  } else if (
    error === 'Authentication failed' ||
    error === 'Request failed with status code 401'
  ) {
    errorMessage = 'Please contact your State Administrator for steps to register an account.';
  } else if (error) {
    errorMessage = 'Sorry! Something went wrong. Please try again.';
  }
  
  if (isLocked) {
    return (
      <LoginLocked />
    );
  } 
  
  if (otpStage) {
    return (
      <LoginMFA
        action={otpAction}
        errorMessage={errorMessage}
        fetching={fetching}
      />
    );
  }

  return (
    <main id="start-main-content">
      <UpgradeBrowser />
      <LoginForm
        title="Log in"
        legend="Log in"
        cancelable={false}
        className="ds-u-margin-top--7"
        canSubmit={!!username && !!password}
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
          errorMessage={errorMessage === false ? null : ""}
          ariaLabel="Enter the email associated with this account."
          value={username}
          onChange={changeUsername}
        />
        <Password 
          title="Password" 
          value={password} 
          onChange={changePassword} 
          errorMessage={errorMessage === false ? null : ""}
          customErrorMessage={errorMessage === false ? null : "Invalid Entry"}
        />
      </LoginForm>
    </main>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasEverLoggedOn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  otpStage: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginOtp: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { authenticated, error, fetching, hasEverLoggedOn, otpStage, isLocked }
}) => ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  otpStage,
  isLocked
});

const mapDispatchToProps = { login, loginOtp };

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
