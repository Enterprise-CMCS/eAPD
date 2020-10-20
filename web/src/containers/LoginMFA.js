import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

import VerifyMFAForm from '../components/VerifyMFAForm';

const LoginMFA = ({ action, errorMessage, fetching }) => {
  const [otp, setOtp] = useState('');

  const changeOtp = ({ target: { value } }) => setOtp(value);

  const handleSubmit = e => {
    e.preventDefault();
    action(otp);
  };

  return (
    <div id="start-main-content">
      <VerifyMFAForm
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable={true}
        className="ds-u-margin-top--7"
        canSubmit={!!otp}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Verify', 'Verifying']}
        onSave={handleSubmit}
      >        
        <Fragment>
          <div className="ds-u-margin-bottom--4">
            <label className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal" for="otp" id="otp">
              Please enter the 6 digit code generated in your SMS text.
            </label>
            <input 
              width="200px"
              aria-label="Enter the verification code you received in your email" 
              className="ds-c-field ds-c-field--medium" 
              id="otp" 
              type="text" 
              name="otp" 
              value={otp}
              onChange={changeOtp}
            />
          </div>        
        </Fragment>
      </VerifyMFAForm>
    </div>
  );
};

LoginMFA.propTypes = {
  errorMessage: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
};

LoginMFA.defaultProps = {
  errorMessage: null
};

export default LoginMFA;
