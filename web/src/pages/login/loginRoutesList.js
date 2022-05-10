import React from 'react';

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

const routes = ({
  path,
  hasEverLoggedOn = false,
  fetching = false,
  factorsList = [],
  verifyData = {},
  errorMessage = null,
  handleFactorSelection = () => {},
  handlePhoneSubmit = () => {},
  handleVerificationCode = () => {},
  handleCreateAccessRequest = () => {},
  handleCompleteAccessRequest = () => {},
  handleLogin = () => {},
  handleLoginOtp = () => {},
  handleLogout = () => {}
} = {}) => [
  {
    path: `${path}`,
    children: (
      <Login
        hasEverLoggedOn={hasEverLoggedOn}
        errorMessage={errorMessage}
        fetching={fetching}
        login={handleLogin}
      />
    ),
    exact: true,
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Form'
  },
  {
    path: `${path}/locked-out`,
    children: <LoginLocked onCancel={handleLogout} />,
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Locked Out'
  },
  {
    path: `${path}/not-in-group`,
    children: <LoginGroupError onCancel={handleLogout} />,
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Not in Group'
  },
  {
    path: `${path}/mfa/enroll`,
    children: (
      <LoginMFAEnroll
        factors={factorsList}
        handleSelection={handleFactorSelection}
      />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Enroll in MFA'
  },
  {
    path: `${path}/mfa/configure-phone`,
    children: (
      <LoginMFAEnrollPhoneNumber handlePhoneSubmit={handlePhoneSubmit} />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Configure MFA by Phone'
  },
  {
    path: `${path}/mfa/configure-app`,
    children: (
      <LoginMFAVerifyAuthApp
        verificationData={verifyData}
        handleVerificationCode={handleVerificationCode}
      />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Configure MFA by App'
  },
  {
    path: `${path}/mfa/activate`,
    children: (
      <LoginMFA
        saveAction={handleVerificationCode}
        cancelAction={handleLogout}
        hasEverLoggedOn={false}
        errorMessage={errorMessage}
        fetching={fetching}
      />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Activate MFA'
  },
  {
    path: `${path}/mfa/verify`,
    children: (
      <LoginMFA
        saveAction={handleLoginOtp}
        cancelAction={handleLogout}
        hasEverLoggedOn
        errorMessage={errorMessage}
        fetching={fetching}
      />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Verify MFA'
  },
  {
    path: `${path}/affiliations/request`,
    children: (
      <StateAccessRequest
        saveAction={handleCreateAccessRequest}
        cancelAction={handleLogout}
        errorMessage={errorMessage}
        fetching={fetching}
        secondaryButtonText="Back to Login"
      />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Request State Access'
  },
  {
    path: `${path}/affiliations/select`,
    children: <SelectAffiliation />,
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'Select State to Access'
  },
  {
    path: `${path}/affiliations/thank-you`,
    children: (
      <StateAccessRequestConfirmation action={handleCompleteAccessRequest} />
    ),
    isPublic: true,
    contentType: 'login',
    title: 'Login',
    pageName: 'State Access Request Confirmation'
  }
];

export default routes;
