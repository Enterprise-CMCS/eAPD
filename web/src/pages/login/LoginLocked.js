import React from 'react';
import PropType from 'prop-types';
import { Button } from '@cmsgov/design-system';

const LoginLocked = ({ onCancel }) => {
  return (
    <div id="start-main-content">
      <div className="ds-l-container">
        <div className="login-card login-card__error">
          <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
            <img src="static/icons/error.svg" alt="Error Icon" height="40" />
            <span>Verify Your Identity</span>
          </h1>
          <h2 className="ds-h4 ds-u-margin-y--3">Account Locked</h2>
          <p>
            Your account will reset automatically in one hour, or contact{' '}
            <a href="mailto:CMS-EAPD@cms.hhs.gov">CMS-EAPD@cms.hhs.gov</a> for
            an account reset if you need access sooner.
          </p>
          <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
            <Button variation="transparent" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginLocked.propTypes = {
  onCancel: PropType.func.isRequired
};

export default LoginLocked;
