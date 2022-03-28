import { TextField, Alert } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState, Fragment, useEffect } from 'react';

import LoginForm from './LoginForm';
import Password from '../../components/PasswordWithMeter';
import UpgradeBrowser from '../../components/UpgradeBrowser';

import axios, { apiUrl } from '../../util/api';

const Login = ({ hasEverLoggedOn, errorMessage, fetching, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [systemDown, setSystemDown] = useState(false);

  const changeUsername = ({ target: { value } }) => setUsername(value);
  const changePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  const openHelpDoc = e => {
    e.preventDefault();
    const { docName } = e.target.dataset;
    fetch(`${apiUrl}/docs/${docName}`)
      .then(res => res.blob())
      .then(blob => {
        const type = 'application/pdf';
        const docBlob = new Blob([blob], { type });
        const url = URL.createObjectURL(docBlob);
        window.open(url);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/heartbeat', {
        signal: controller.signal
      })
      .then(() => {})
      .catch(() => {
        setSystemDown(true);
      });

    return () => controller?.abort();
  }, []);

  return (
    <main id="start-main-content">
      <UpgradeBrowser />
      <LoginForm
        id="login-form"
        title="Log in"
        legend="Log in"
        cancelable={false}
        className="ds-u-margin-top--7"
        canSubmit={!systemDown && !!username && !!password}
        error={errorMessage}
        success={hasEverLoggedOn ? 'You have securely logged out.' : null}
        working={fetching}
        primaryButtonText={['Log in', 'Logging in']}
        onSave={handleSubmit}
        footer={
          <Fragment>
            <h2 className="ds-h4 ds-u-color--base ds-u-padding-top--2">
              New Users
            </h2>
            <p className="ds-u-margin-y--0">
              New users must have an EUA account with the correct job codes
              before logging into the system.
            </p>
            <p className="ds-u-margin-y--1">
              Need an EUA account?{' '}
              <a
                onClick={openHelpDoc}
                data-doc-name="account-registration"
                href={`${apiUrl}/docs/account-registration`}
              >
                How to Get Started
              </a>
              .
            </p>
            <p className="ds-u-margin-y--1">
              Have an EUA account?{' '}
              <a
                onClick={openHelpDoc}
                data-doc-name="system-access"
                href={`${apiUrl}/docs/system-access`}
              >
                How to Access the eAPD
              </a>
              .
            </p>
            <p className="ds-u-margin-y--3">
              Still need help? Email us at{' '}
              <a href="mailto:CMS-EAPD@cms.hhs.gov?subject=Password%20Recovery%20Request%20for%20eAPD">
                CMS-EAPD@cms.hhs.gov
              </a>
              .
            </p>
          </Fragment>
        }
      >
        {systemDown && (
          <Alert variation="error" className="ds-u-margin-top--2">
            The eAPD system is down, try again later.
          </Alert>
        )}
        <TextField
          id="username"
          label="EUA ID"
          name="username"
          ariaLabel="Enter your EUA ID."
          value={username}
          onChange={changeUsername}
          disabled={systemDown}
        />
        <Password
          id="password"
          title="Password"
          errorMessage={null}
          value={password}
          onChange={changePassword}
          disabled={systemDown}
        />
        <p>
          Forgot password?{' '}
          <a href="https://eua.cms.gov/iam/im/pub/cui7/index.jsp?task.tag=forgottenpasswordreset">
            Reset password at EUA
          </a>
          .
        </p>
      </LoginForm>
    </main>
  );
};

Login.propTypes = {
  hasEverLoggedOn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fetching: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

Login.defaultProps = {
  errorMessage: null
};

export default Login;
