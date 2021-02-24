import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import Password from '../components/PasswordWithMeter';
import UpgradeBrowser from '../components/UpgradeBrowser';

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
          ariaLabel="Enter your EUA ID."
          value={username}
          onChange={changeUsername}
        />
        <Password
          id="password"
          title="Password"
          value={password}
          onChange={changePassword}
        />
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
