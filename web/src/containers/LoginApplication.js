import PropTypes from 'prop-types';
import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import LoginPageRoutes from '../pages/login/LoginPageRoutes';
import ConsentBanner from '../pages/login/ConsentBanner';
import Loading from '../components/Loading';

import { MFA_FACTOR_TYPES } from '../constants';
import { setConsented, hasConsented } from '../util/auth';
import {
  mfaConfig,
  mfaAddPhone,
  mfaActivate,
  createAccessRequest,
  completeAccessRequest,
  authCheck,
  login,
  loginOtp,
  logout
} from '../actions/auth';

const LoginApplication = ({
  authenticated,
  hasEverLoggedOn,
  initialCheck,
  error,
  fetching,
  factorsList,
  mfaEnrollType,
  verifyData,
  mfaConfig: mfaAction,
  mfaAddPhone: mfaActionAddPhone,
  mfaActivate: mfaActivation,
  createAccessRequest: createAccessRequestAction,
  completeAccessRequest: completeAccessRequestAction,
  authCheck: authCheckAction,
  login: loginAction,
  loginOtp: otpAction,
  logout: logoutAction
}) => {
  const [restoringSession, setRestoringSession] = useState(false);
  const [showConsent, setShowConsent] = useState(!hasConsented());
  const history = useHistory();
  const location = useLocation();

  useEffect(
    () => {
      const controller = new AbortController();
      if (!initialCheck && !showConsent) {
        setRestoringSession(true);
        authCheckAction({
          signal: controller.signal
        }).then(() => {
          setRestoringSession(false);
        });
      }

      return () => controller?.abort();
    },
    // we want this to run on load so we don't need any thing
    // in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let errorMessage = null;

  if (error === 'MFA_AUTH_FAILED') {
    errorMessage = 'The one-time password you’ve entered is incorrect.';
  } else if (error === 'PASSWORD_EXPIRED') {
    errorMessage = (
      <Fragment>
        Your password has expired. Update your password in{' '}
        <a href="https://cms.okta.com/">Okta</a>.
      </Fragment>
    );
  } else if (error === 'AUTH_FAILED') {
    errorMessage = 'Your username and/or password is incorrect.';
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
    const route = await completeAccessRequestAction();
    history.push(route);
  };

  // TODO: test
  const handleLogin = async (username, password) => {
    const route = await loginAction(username, password);
    if (route) {
      history.push(route);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    history.push('/login');
  };

  // TODO: test
  const handleLoginOtp = async otp => {
    const route = await otpAction(otp);
    if (route) {
      history.push(route);
    }
  };

  const hideConsent = () => {
    setConsented();
    setShowConsent(false);
  };

  if (restoringSession) {
    return (
      <div id="start-main-content">
        <Loading>Validating your session</Loading>
      </div>
    );
  }

  if (showConsent && !hasEverLoggedOn) {
    return <ConsentBanner onAgree={hideConsent} />;
  }

  if (authenticated) {
    const { from = { pathname: '/' } } = location.state || {};
    if (from.pathname === '/logout') {
      return <Redirect to="/" push />;
    }
    // TODO: test
    return <Redirect to={from} push />;
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
      handleLogout={handleLogout}
    />
  );
};

LoginApplication.propTypes = {
  hasEverLoggedOn: PropTypes.bool.isRequired,
  initialCheck: PropTypes.bool,
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
  completeAccessRequest: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginOtp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

LoginApplication.defaultProps = {
  error: null,
  verifyData: {},
  initialCheck: true
};

// TODO: test
const mapStateToProps = ({
  auth: {
    hasEverLoggedOn,
    authenticated,
    error,
    fetching,
    factorsList,
    mfaEnrollType,
    verifyData,
    initialCheck
  }
}) => ({
  hasEverLoggedOn,
  authenticated,
  error,
  fetching,
  factorsList,
  mfaEnrollType,
  verifyData,
  initialCheck
});

const mapDispatchToProps = {
  mfaConfig,
  mfaAddPhone,
  mfaActivate,
  createAccessRequest,
  completeAccessRequest,
  authCheck,
  login,
  loginOtp,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginApplication);

export { LoginApplication as plain };
