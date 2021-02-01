import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  useRouteMatch as actualUseRouteMatch
} from 'react-router-dom';

import Login from './Login';
import LoginLocked from '../components/LoginLocked';
import LoginGroupError from '../components/LoginGroupError';
import LoginMFAEnroll from '../components/LoginMFAEnroll';
import LoginMFAEnrollPhoneNumber from '../components/LoginMFAEnrollPhoneNumber';
import LoginMFAVerifyAuthApp from '../components/LoginMFAVerifyAuthApp';
import LoginMFA from './LoginMFA';
import StateAccessRequest from './StateAccessRequest';
import StateAccessRequestConfirmation from './StateAccessRequestConfirmation';

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
  handleLoginOtp
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
          <LoginLocked />
        </Route>

        <Route path={`${path}/not-in-group`}>
          <LoginGroupError />
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
            action={handleVerificationCode}
            hasEverLoggedOn={false}
            errorMessage={errorMessage}
            fetching={fetching}
          />
        </Route>

        <Route path={`${path}/mfa/verify`}>
          <LoginMFA
            action={handleLoginOtp}
            hasEverLoggedOn
            errorMessage={errorMessage}
            fetching={fetching}
          />
        </Route>

        <Route path={`${path}/affiliations/request`}>
          <StateAccessRequest
            action={handleCreateAccessRequest}
            errorMessage={errorMessage}
            fetching={fetching}
          />
        </Route>

        {/* <Route path={`${path}/affiliations/select`}></Route> */}

        <Route path={`${path}/affiliations/thank-you`}>
          <StateAccessRequestConfirmation
            action={handleCompleteAccessRequest}
            errorMessage={errorMessage}
            fetching={fetching}
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
  errorMessage: PropTypes.string,
  handleFactorSelection: PropTypes.func.isRequired,
  handlePhoneSubmit: PropTypes.func.isRequired,
  handleVerificationCode: PropTypes.func.isRequired,
  handleCreateAccessRequest: PropTypes.func.isRequired,
  handleCompleteAccessRequest: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLoginOtp: PropTypes.func.isRequired
};

LoginPageRoutes.defaultProps = {
  useRouteMatch: actualUseRouteMatch,
  errorMessage: null
};

export default LoginPageRoutes;
