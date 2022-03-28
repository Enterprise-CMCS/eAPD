import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  useRouteMatch as actualUseRouteMatch
} from 'react-router-dom';

import Login from './Login';
import LoginLocked from './LoginLocked';
import LoginGroupError from './LoginGroupError';
import LoginMFAEnroll from './LoginMFAEnroll';
import LoginMFAEnrollPhoneNumber from './LoginMFAEnrollPhoneNumber';
import LoginMFAVerifyAuthApp from './LoginMFAVerifyAuthApp';
import LoginMFA from './LoginMFA';
import StateAccessRequest from './StateAccessRequest';
import StateAccessRequestConfirmation from './StateAccessRequestConfirmation';
import SelectAffiliation from './SelectAffiliation';

const LoginPageRoutes = ({
  useRouteMatch,
  hasEverLoggedOn,
  fetching,
  factorsList,
  verifyData,
  errorMessage,
  handleFactorSelection,
  handlePhoneSubmit,
  handleVerificationCode,
  handleCreateAccessRequest,
  handleCompleteAccessRequest,
  handleLogin,
  handleLoginOtp,
  handleLogout
}) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Route exact path={`${path}`}>
          <Login
            hasEverLoggedOn={hasEverLoggedOn}
            errorMessage={errorMessage}
            fetching={fetching}
            login={handleLogin}
          />
        </Route>

        <Route path={`${path}/locked-out`}>
          <LoginLocked onCancel={handleLogout} />
        </Route>

        <Route path={`${path}/not-in-group`}>
          <LoginGroupError onCancel={handleLogout} />
        </Route>

        <Route path={`${path}/mfa/enroll`}>
          <LoginMFAEnroll
            factors={factorsList}
            handleSelection={handleFactorSelection}
          />
        </Route>

        <Route path={`${path}/mfa/configure-phone`}>
          <LoginMFAEnrollPhoneNumber handlePhoneSubmit={handlePhoneSubmit} />
        </Route>

        <Route path={`${path}/mfa/configure-app`}>
          <LoginMFAVerifyAuthApp
            verificationData={verifyData}
            handleVerificationCode={handleVerificationCode}
          />
        </Route>

        <Route path={`${path}/mfa/activate`}>
          <LoginMFA
            saveAction={handleVerificationCode}
            cancelAction={handleLogout}
            hasEverLoggedOn={false}
            errorMessage={errorMessage}
            fetching={fetching}
          />
        </Route>

        <Route path={`${path}/mfa/verify`}>
          <LoginMFA
            saveAction={handleLoginOtp}
            cancelAction={handleLogout}
            hasEverLoggedOn
            errorMessage={errorMessage}
            fetching={fetching}
          />
        </Route>

        <Route path={`${path}/affiliations/request`}>
          <StateAccessRequest
            saveAction={handleCreateAccessRequest}
            cancelAction={handleLogout}
            errorMessage={errorMessage}
            fetching={fetching}
            secondaryButtonText="Back to Login"
          />
        </Route>

        <Route path={`${path}/affiliations/select`}>
          <SelectAffiliation />
        </Route>

        <Route path={`${path}/affiliations/thank-you`}>
          <StateAccessRequestConfirmation
            action={handleCompleteAccessRequest}
          />
        </Route>
      </Route>
    </Switch>
  );
};

LoginPageRoutes.propTypes = {
  useRouteMatch: PropTypes.func,
  hasEverLoggedOn: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  factorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  verifyData: PropTypes.object.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleFactorSelection: PropTypes.func.isRequired,
  handlePhoneSubmit: PropTypes.func.isRequired,
  handleVerificationCode: PropTypes.func.isRequired,
  handleCreateAccessRequest: PropTypes.func.isRequired,
  handleCompleteAccessRequest: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLoginOtp: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

LoginPageRoutes.defaultProps = {
  useRouteMatch: actualUseRouteMatch,
  errorMessage: null
};

export default LoginPageRoutes;
