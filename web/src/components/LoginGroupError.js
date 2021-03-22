import React from 'react';
import { apiUrl } from '../util/api';

const LoginGroupError = () => {
  return (
    <div id="start-main-content">
      <div className="ds-l-container">
        <div className="login-card login-card__error">
          <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
            <img src="/static/icons/error.svg" alt="Error Icon" height="40" />
            <span>Job Code Missing</span>
          </h1>
          <p>
            You don’t have the correct job code to access the eAPD system. The{' '}
            <a href={`${apiUrl}/docs/account-registration`}>
              account registration guide
            </a>{' '}
            will help you with instructions on getting the correct job code in
            your EUA account.
          </p>
          <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
            <a href="/" className="ds-c-button ds-c-button--transparent">
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGroupError;
