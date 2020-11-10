import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

import VerifyMFAForm from '../components/VerifyMFAForm';

const LoginMFA = ({ action, errorMessage, fetching, hasEverLoggedOn }) => {
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
        cancelable
        className="ds-u-margin-top--7"
        canSubmit={!!otp}
        hasEverLoggedOn={hasEverLoggedOn}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Verify', 'Verifying']}
        onSave={handleSubmit}
      >        
        <Fragment>
          <div className="ds-u-margin-bottom--4">
            <label htmlFor="otp" id="otp" className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal">            
              Enter the verification code provided to you via call, text, email, or your chosen authenticator app.
            </label>
            <input 
              width="200px"
              aria-labelledby="otp"
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
  errorMessage: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  hasEverLoggedOn: PropTypes.bool.isRequired
};

LoginMFA.defaultProps = {
  errorMessage: false
};

export default LoginMFA;
