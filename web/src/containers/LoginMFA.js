import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CardForm from '../components/CardForm';

const LoginMFA = ({ action, errorMessage, fetching }) => {
  const [otp, setOtp] = useState('');

  const changeOtp = ({ target: { value } }) => setOtp(value);

  const handleSubmit = e => {
    e.preventDefault();
    action(otp);
  };

  return (
    <div id="start-main-content">
      <CardForm
        title="Verify with Email Authentication"
        legend="Verify with Email Authentication"
        cancelable={false}
        className="ds-u-margin-top--7"
        canSubmit={!!otp}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Verify', 'Verifying']}
        onSave={handleSubmit}
      >
        <TextField
          id="otp"
          label="Verification Code"
          name="otp"
          ariaLabel="Enter the verification code you received in your email"
          value={otp}
          onChange={changeOtp}
        />
      </CardForm>
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
