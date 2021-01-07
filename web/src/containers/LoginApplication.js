import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import LoginPageRoutes from './LoginPageRoutes';
import ConsentBanner from '../components/ConsentBanner';

import { MFA_FACTOR_TYPES } from '../constants';
import { setConsented, hasConsented } from '../util/auth';
import {
  mfaConfig,
  mfaAddPhone,
  mfaActivate,
  completeAccessToState,
  createAccessRequest,
  login,
  loginOtp
} from '../actions/auth';

const LoginApplication = ({
  authenticated,
  hasEverLoggedOn,
  location,
  error,
  fetching,
  factorsList,
  mfaEnrollType,
  verifyData,
  mfaConfig: mfaAction,
  mfaAddPhone: mfaActionAddPhone,
  mfaActivate: mfaActivation,
  createAccessRequest: createAccessRequestAction,
  completeAccessToState: completeAccessToStateAction,
  login: loginAction,
  loginOtp: otpAction,
  history
}) => {
  const [showConsent, setShowConsent] = useState(!hasConsented());

  let errorMessage = null;
  // if (otpStage && error === 'Authentication failed') {
  //   errorMessage = 'The one-time password you’ve entered is incorrect.';
  // } else
  if (
    error === 'Authentication failed' ||
    error === 'Request failed with status code 401'
  ) {
    errorMessage =
      'Please contact your State Administrator for steps to register an account.';
  } else if (error) {
    errorMessage = 'Sorry! Something went wrong. Please try again.';
  }

  // TODO: test
  const handleFactorSelection = async selected => {
    if (
      selected === MFA_FACTOR_TYPES.SMS ||
      selected === MFA_FACTOR_TYPES.CALL
    ) {
      mfaActionAddPhone(selected);
      history.push('/login/mfa/configure-phone');
    } else {
      const route = await mfaAction(selected);
      if (route) {
        history.push(route);
      }
    }
  };

  // TODO: test
  const handleVerificationCode = async code => {
    const route = await mfaActivation(code);
    if (route) {
      history.push(route);
    }
  };

  // TODO: test
  const handlePhoneSubmit = userPhoneNumber => {
    mfaAction(mfaEnrollType, userPhoneNumber);
    history.push('/login/mfa/activate');
  };

  // TODO: test
  const handleCreateAccessRequest = async states => {
    const route = await createAccessRequestAction(states);
    if (route) {
      history.push(route);
    }
  };

  // TODO: test
  const handleCompleteAccessRequest = async () => {
    await completeAccessToStateAction();
  };

  // TODO: test
  const handleLogin = async (username, password) => {
    const route = await loginAction(username, password);
    if (route) {
      history.push(route);
    }
  };

  // TODO: test
  const handleLoginOtp = async otp => {
    const route = await otpAction(otp);
    if (route) {
      history.push(route);
    }
  };

  // TODO: test
  const hideConsent = () => {
    setConsented();
    setShowConsent(false);
    history.push('/login');
  };

  if (showConsent) {
    return <ConsentBanner onAgree={hideConsent} />;
  }

  if (authenticated) {
    const { from = { pathname: '/' } } = location.state || {};
    if (from.pathname !== '/logout') {
      return <Redirect to={from} push />;
    }
    // TODO: test
    return <Redirect to="/" push />;
  }

  return (
    <LoginPageRoutes
      errorMessage={errorMessage}
      hasEverLoggedOn={hasEverLoggedOn}
      fetching={fetching}
      factorsList={factorsList}
      verifyData={verifyData}
      handleFactorSelection={handleFactorSelection}
      handlePhoneSubmit={handlePhoneSubmit}
      handleVerificationCode={handleVerificationCode}
      handleCreateAccessRequest={handleCreateAccessRequest}
      handleCompleteAccessRequest={handleCompleteAccessRequest}
      handleLogin={handleLogin}
      handleLoginOtp={handleLoginOtp}
    />
  );
};

LoginApplication.propTypes = {
  hasEverLoggedOn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  factorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  mfaEnrollType: PropTypes.string.isRequired,
  verifyData: PropTypes.object,
  mfaConfig: PropTypes.func.isRequired,
  mfaAddPhone: PropTypes.func.isRequired,
  mfaActivate: PropTypes.func.isRequired,
  createAccessRequest: PropTypes.func.isRequired,
  completeAccessToState: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginOtp: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]).isRequired
};

LoginApplication.defaultProps = {
  error: null,
  verifyData: {}
};

// TODO: test
const mapStateToProps = (
  {
    auth: {
      hasEverLoggedOn,
      authenticated,
      error,
      fetching,
      factorsList,
      mfaEnrollType,
      verifyData
    }
  },
  { history }
) => ({
  hasEverLoggedOn,
  authenticated,
  error,
  fetching,
  factorsList,
  mfaEnrollType,
  verifyData,
  history
});

const mapDispatchToProps = {
  mfaConfig,
  mfaAddPhone,
  mfaActivate,
  createAccessRequest,
  completeAccessToState,
  login,
  loginOtp
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginApplication)
);

export { LoginApplication as plain };
