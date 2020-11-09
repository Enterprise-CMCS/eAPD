import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ConsentBanner from '../components/ConsentBanner';
import { login, loginOtp, mfaConfig, mfaActivate, mfaAddPhone } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import Password from '../components/PasswordWithMeter';
import UpgradeBrowser from '../components/UpgradeBrowser';
import LoginMFA from './LoginMFA';
import LoginLocked from '../components/LoginLocked';
import LoginMFAEnroll from '../components/LoginMFAEnroll';
import LoginMFAEnrollPhoneNumber from '../components/LoginMFAEnrollPhoneNumber';
import LoginMFAVerifyAuthApp from '../components/LoginMFAVerifyAuthApp';
import LoginMFAVerifyCode from '../components/LoginMFAVerifyCode';

const Login = ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  location,
  otpStage,
  factorsList,
  mfaEnrollStage,
  mfaAddPhoneStage,
  mfaEnrollType,
  mfaActivateStage,
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
    // Ty note: call an action from here to update the state with selected mfa method
    if(selected === 'SMS Text' || selected === 'Call') {
      mfaActionAddPhone(selected);
    } else {
      mfaAction(selected);
    }
  };
  
  const handleVerificationCode = code => {
    // Get the verification code, send it back to OKTA for verification + enrollment status
    console.log("here is the entered code:", code);
    mfaActivation(code);
  }

  const handlePhoneSubmit = userPhoneNumber => {
    mfaAction(mfaEnrollType, userPhoneNumber);
  }

  const handleReturnToSelection = () => {
    // Trigger return to mfa selection
    // Ty note: Is the only way to do this is to create a new action / reducer?
  }
  
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
  };
    
  if (isLocked) {
    return (
      <LoginLocked />
    );
  };
  
  if (mfaEnrollStage) {
    return (
      <LoginMFAEnroll 
        factors={factorsList} 
        handleSelection={handleFactorSelection} 
      />
    );
  };

  if(mfaAddPhoneStage) {
    return (
      <LoginMFAEnrollPhoneNumber handlePhoneSubmit={handlePhoneSubmit} />
    );
  };
  
  if (mfaActivateStage) {
    if(mfaEnrollType === 'Google Authenticator' || mfaEnrollType === 'Okta Push' || mfaEnrollType === 'Okta Authenticator') {
      return (
        <LoginMFAVerifyAuthApp 
          verificationData={verifyData}
          handleVerificationCode={handleVerificationCode}
          handleReturnToSelection={handleReturnToSelection} 
        />
      );
    }

    return (
      <LoginMFAVerifyCode 
        verificationData={verifyData}
        handleVerificationCode={handleVerificationCode}
        handleReturnToSelection={handleReturnToSelection} 
      />
    )
  };
  
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
          label="EUA ID"
          name="username"
          errorMessage={errorMessage === false ? null : ""}
          ariaLabel="Enter your EUA ID."
          value={username}
          onChange={changeUsername}
        />
        <Password 
          title="Password" 
          value={password} 
          onChange={changePassword} 
          errorMessage={errorMessage ? "" : null}
          customErrorMessage={errorMessage ? "Invalid Entry" : null}
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
  mfaEnrollType: PropTypes.string.isRequired,
  mfaEnrollStage: PropTypes.bool.isRequired,
  mfaAddPhoneStage: PropTypes.bool.isRequired,
  mfaActivateStage: PropTypes.bool.isRequired,
  verifyData: PropTypes.object.isRequired,
  isLocked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginOtp: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { authenticated, error, fetching, hasEverLoggedOn, otpStage, factorsList, mfaEnrollType, mfaEnrollStage, mfaAddPhoneStage, mfaActivateStage, verifyData, isLocked }
}) => ({
  authenticated,
  error,
  fetching,
  hasEverLoggedOn,
  otpStage,
  factorsList,
  mfaEnrollType,
  mfaEnrollStage,
  mfaAddPhoneStage,
  mfaActivateStage,
  verifyData,
  isLocked
});

const mapDispatchToProps = { login, loginOtp, mfaConfig, mfaActivate, mfaAddPhone };

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
