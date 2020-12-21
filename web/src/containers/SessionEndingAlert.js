import { Alert, Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Countdown, { zeroPad } from 'react-countdown';
import { v4 as uuidv4 } from 'uuid';

import { Spinner } from '../components/Icons';

import { extendSession, logout } from '../actions/auth';
import { isUserActive } from '../util/auth';

const SessionEndingAlert = ({
  isSessionEnding,
  isExtendingSession,
  latestActivity,
  expiresAt,
  extend,
  logoutAction
}) => {
  const className = isSessionEnding
    ? 'alert--session-expiring__active'
    : 'alert--session-expiring__inactive';
  const isActive = isUserActive(latestActivity);

  // Renderer callback with condition
  // eslint-disable-next-line react/prop-types
  const createTimer = ({ minutes, seconds, completed, api }) => {
    if (completed) {
      // Render a completed state
      return (
        <Alert
          heading="Your session has ended."
          role="alertdialog"
          variation="error"
        />
      );
    }
    if (isActive) {
      api.stop(); // eslint-disable-line react/prop-types
      return <span />;
    }
    // Render a countdown
    return (
      <Alert
        heading="Your session is expiring."
        role="alertdialog"
        variation="warn"
      >
        Your session will end in {zeroPad(minutes)}:{zeroPad(seconds)} minutes.
        If you’d like to keep working, choose continue.
        <p className="ds-u-text-align--right ds-u-margin-bottom--0">
          <Button variation="primary" onClick={extend}>
            {isExtendingSession && <Spinner />}
            {isExtendingSession ? ' Continuing' : 'Continue'}
          </Button>
        </p>
      </Alert>
    );
  };

  return (
    <div
      aria-hidden={!isSessionEnding}
      aria-live="polite"
      className={`alert--session-expiring ${className}`}
    >
      {isSessionEnding && (
        <Countdown
          date={expiresAt - 5000}
          key={uuidv4()}
          renderer={createTimer}
          onComplete={logoutAction}
          onStop={extend}
        />
      )}
    </div>
  );
};

SessionEndingAlert.propTypes = {
  isSessionEnding: PropTypes.bool.isRequired,
  isExtendingSession: PropTypes.bool.isRequired,
  latestActivity: PropTypes.bool.isRequired,
  expiresAt: PropTypes.number.isRequired,
  extend: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { isSessionEnding, isExtendingSession, latestActivity, expiresAt }
}) => ({
  isSessionEnding,
  isExtendingSession,
  latestActivity,
  expiresAt
});

const mapDispatchToProps = { extend: extendSession, logoutAction: logout };

export default connect(mapStateToProps, mapDispatchToProps)(SessionEndingAlert);

export { SessionEndingAlert as plain, mapStateToProps, mapDispatchToProps };
