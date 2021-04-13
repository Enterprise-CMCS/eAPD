import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

import LoginForm from '../components/LoginForm';
import Password from '../components/PasswordWithMeter';
import UpgradeBrowser from '../components/UpgradeBrowser';

import { apiUrl } from '../util/api';

const Login = ({ hasEverLoggedOn, errorMessage, fetching, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = ({ target: { value } }) => setUsername(value);
  const changePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <main id="start-main-content">
      <UpgradeBrowser />
      <LoginForm
        id="login-form"
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
          <Fragment>
            <h2 className="ds-h4 ds-u-color--base ds-u-padding-top--2">New Users</h2>
            <p className="ds-u-margin-y--0">New users must have an EUA account with the correct job codes before logging into the system.</p>
            <p className="ds-u-margin-y--1">Need an EUA account? <a href={`${apiUrl}/docs/account-registration`} target="_blank">How to Get Started</a>.</p>
            <p className="ds-u-margin-y--1">Have an EUA account? <a href={`${apiUrl}/docs/system-access`} target="_blank">How to Access the eAPD</a>.</p>
            <p className="ds-u-margin-y--3">Still need help? Email us at <a href="mailto:CMS-EAPD@cms.hhs.gov?subject=Password%20Recovery%20Request%20for%20eAPD">CMS-EAPD@cms.hhs.gov</a>.</p>
          </Fragment>
        }
      >
        <TextField
          id="username"
          label="EUA ID"
          name="username"
          ariaLabel="Enter your EUA ID."
          value={username}
          onChange={changeUsername}
        />
        <Password
          id="password"
          title="Password"
          errorMessage={null}
          value={password}
          onChange={changePassword}
        />
        <p>Forgot password? <a href="https://eua.cms.gov/iam/im/pub/cui7/index.jsp?task.tag=forgottenpasswordreset">Reset password at EUA</a>.</p>
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
