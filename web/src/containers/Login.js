import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ConsentBanner from '../components/ConsentBanner';
import {
  login,
  loginOtp,
  mfaConfig,
  mfaActivate,
  mfaAddPhone
} from '../actions/auth';
import LoginForm from '../components/LoginForm';
import Password from '../components/PasswordWithMeter';
import UpgradeBrowser from '../components/UpgradeBrowser';
import LoginMFA from './LoginMFA';
import LoginLocked from '../components/LoginLocked';
import LoginMFAEnroll from '../components/LoginMFAEnroll';
import LoginMFAEnrollPhoneNumber from '../components/LoginMFAEnrollPhoneNumber';
import LoginMFAVerifyAuthApp from '../components/LoginMFAVerifyAuthApp';

const Login = ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  location,
  otpStage,
  factorsList,
  mfaEnrollStartStage,
  mfaEnrollAddPhoneStage,
  mfaEnrollActivateStage,
  mfaEnrollType,
  verifyData,
  isLocked,
  login: action,
  loginOtp: otpAction,
  mfaConfig: mfaAction,
  mfaAddPhone: mfaActionAddPhone,
  mfaActivate: mfaActivation // Ty note: what's the thinking behind the naming of these methods?
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

  const handleFactorSelection = selected => {
    if (selected === 'sms-OKTA' || selected === 'call-OKTA') {
      mfaActionAddPhone(selected);
    } else {
      mfaAction(selected);
    }
  };

  const handleVerificationCode = code => {
    mfaActivation(code);
  };

  const handlePhoneSubmit = userPhoneNumber => {
    mfaAction(mfaEnrollType, userPhoneNumber);
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
  if (isLocked) {
    errorMessage = 'You are locked out';
  } else if (otpStage && error === 'Authentication failed') {
    errorMessage = 'The one-time password you’ve entered is incorrect.';
  } else if (
    error === 'Authentication failed' ||
    error === 'Request failed with status code 401'
  ) {
    errorMessage =
      'Please contact your State Administrator for steps to register an account.';
  } else if (error) {
    errorMessage = 'Sorry! Something went wrong. Please try again.';
  }

  if (isLocked) {
    return <LoginLocked />;
  }

  if (mfaEnrollStartStage) {
    return (
      <LoginMFAEnroll
        factors={factorsList}
        handleSelection={handleFactorSelection}
      />
    );
  }

  if (mfaEnrollAddPhoneStage) {
    return <LoginMFAEnrollPhoneNumber handlePhoneSubmit={handlePhoneSubmit} />;
  }

  if (mfaEnrollActivateStage) {
    if (
      mfaEnrollType === 'token:software:totp-GOOGLE' ||
      mfaEnrollType === 'token:software:totp-OKTA'
    ) {
      return (
        <LoginMFAVerifyAuthApp
          verificationData={verifyData}
          handleVerificationCode={handleVerificationCode}
        />
      );
    }

    return (
      <LoginMFA
        action={handleVerificationCode}
        hasEverLoggedOn={false}
        errorMessage={errorMessage}
        fetching={fetching}
      />
    );
  }

  if (otpStage) {
    return (
      <LoginMFA
        action={otpAction}
        hasEverLoggedOn
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
          label="EUA ID"
          name="username"
          errorMessage={errorMessage === false ? null : ''}
          ariaLabel="Enter your EUA ID."
          value={username}
          onChange={changeUsername}
        />
        <Password
          title="Password"
          value={password}
          onChange={changePassword}
          errorMessage={errorMessage ? '' : null}
          customErrorMessage={errorMessage ? 'Invalid Entry' : null}
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
  factorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  mfaEnrollType: PropTypes.string.isRequired,
  mfaEnrollStartStage: PropTypes.bool.isRequired,
  mfaEnrollAddPhoneStage: PropTypes.bool.isRequired,
  mfaEnrollActivateStage: PropTypes.bool.isRequired,
  verifyData: PropTypes.object.isRequired,
  isLocked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginOtp: PropTypes.func.isRequired,
  mfaConfig: PropTypes.func.isRequired,
  mfaAddPhone: PropTypes.func.isRequired,
  mfaActivate: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: {
    authenticated,
    error,
    fetching,
    hasEverLoggedOn,
    otpStage,
    factorsList,
    mfaEnrollType,
    mfaEnrollStartStage,
    mfaEnrollAddPhoneStage,
    mfaEnrollActivateStage,
    verifyData,
    isLocked
  }
}) => ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  otpStage,
  factorsList,
  mfaEnrollType,
  mfaEnrollStartStage,
  mfaEnrollAddPhoneStage,
  mfaEnrollActivateStage,
  verifyData,
  isLocked
});

const mapDispatchToProps = {
  login,
  loginOtp,
  mfaConfig,
  mfaActivate,
  mfaAddPhone
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
