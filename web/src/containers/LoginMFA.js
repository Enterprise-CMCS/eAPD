import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

import VerifyMFAForm from '../components/VerifyMFAForm';

const LoginMFA = ({ action, errorMessage, fetching, mfaType }) => {
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
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Verify', 'Verifying']}
        onSave={handleSubmit}
      >        
        <Fragment>
          <div className="ds-u-margin-bottom--4">
            <label htmlFor="otp" id="otp" className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal">            
              Please enter the 6 digit code sent to you via {mfaType}.
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
  mfaType: PropTypes.string.isRequired
};

LoginMFA.defaultProps = {
  errorMessage: false,
  mfaType: ''
};

export default LoginMFA;
