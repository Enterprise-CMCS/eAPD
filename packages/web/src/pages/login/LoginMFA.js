import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AuthenticationForm from './AuthenticationForm';

const LoginMFA = ({
  saveAction,
  cancelAction,
  errorMessage,
  fetching,
  hasEverLoggedOn
}) => {
  const [otp, setOtp] = useState('');

  const changeOtp = ({ target: { value } }) => setOtp(value);

  const handleSubmit = e => {
    e.preventDefault();
    saveAction(otp);
  };

  const handleCancel = e => {
    e.preventDefault();
    cancelAction();
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="login-mfa-form"
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable
        className="ds-u-margin-top--7"
        canSubmit={!!otp}
        hasEverLoggedOn={hasEverLoggedOn}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Verify Identity', 'Verifying Identity']}
        secondaryButtonText="Back to Login"
        onSave={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="ds-u-margin-bottom--4">
          <label
            htmlFor="otp"
            id="otp-label"
            className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal"
          >
            Enter the verification code provided to you via call, text, email,
            or your chosen authenticator app.
          </label>
          <input
            width="200px"
            aria-labelledby="otp-label"
            className="ds-c-field ds-c-field--medium"
            id="otp"
            type="text"
            name="otp"
            value={otp}
            onChange={changeOtp}
          />
        </div>
      </AuthenticationForm>
    </div>
  );
};

LoginMFA.propTypes = {
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fetching: PropTypes.bool.isRequired,
  saveAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  hasEverLoggedOn: PropTypes.bool.isRequired
};

LoginMFA.defaultProps = {
  errorMessage: null
};

export default LoginMFA;
