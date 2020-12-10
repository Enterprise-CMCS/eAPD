import { Alert, Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../components/Icons';

import { extendSession } from '../actions/auth';

const SessionEndingAlert = ({
  isSessionEnding,
  isExtendingSession,
  extend
}) => {
  const className = isSessionEnding ? 'alert--session-expiring__active' : '';

  return (
    <div
      aria-hidden={!isSessionEnding}
      aria-live="polite"
      className={`alert--session-expiring ${className}`}
    >
      <Alert
        heading="Your session is expiring."
        role="alertdialog"
        variation="warn"
      >
        Your session will end in X minutes. If you’d like to keep working,
        choose continue.
        <p className="ds-u-text-align--right ds-u-margin-bottom--0">
          <Button variation="primary" onClick={extend}>
            {isExtendingSession && <Spinner />}
            {isExtendingSession ? ' Continuing' : 'Continue'}
          </Button>
        </p>
      </Alert>
    </div>
  );
};

SessionEndingAlert.propTypes = {
  isSessionEnding: PropTypes.bool.isRequired,
  isExtendingSession: PropTypes.bool.isRequired,
  extend: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { isSessionEnding, isExtendingSession }
}) => ({
  isSessionEnding,
  isExtendingSession
});

const mapDispatchToProps = { extend: extendSession };

export default connect(mapStateToProps, mapDispatchToProps)(SessionEndingAlert);

export { SessionEndingAlert as plain, mapStateToProps, mapDispatchToProps };
