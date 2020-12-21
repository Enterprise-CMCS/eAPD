import { Alert, Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Countdown, { zeroPad } from 'react-countdown';
import { v4 as uuidv4 } from 'uuid';

import { Spinner } from '../components/Icons';

import { setLatestActivity, extendSession, logout } from '../actions/auth';
import { isUserActive } from '../util/auth';

const Timer = ({
  isExtendingSession,
  latestActivity,
  expiresAt,
  extend,
  logoutAction,
  latestActivityAction
}) => {
  const ref = useRef(null);
  const clickListener = useCallback(
    e => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        latestActivityAction();
      }
    },
    [ref.current]
  );

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener);
    // Detach the listeners on component unmount.
    return () => {
      document.addEventListener('click', clickListener);
    };
  }, []);

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
    if (isUserActive(latestActivity)) {
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
    <div ref={ref}>
      <Countdown
        date={expiresAt - 5000}
        key={uuidv4()}
        renderer={createTimer}
        onComplete={logoutAction}
        onStop={extend}
      />
    </div>
  );
};

Timer.propTypes = {
  isExtendingSession: PropTypes.bool.isRequired,
  latestActivity: PropTypes.number.isRequired,
  expiresAt: PropTypes.number.isRequired,
  extend: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  latestActivityAction: PropTypes.func.isRequired
};

const SessionEndingAlert = ({ isSessionEnding, ...props }) => {
  const className = isSessionEnding
    ? 'alert--session-expiring__active'
    : 'alert--session-expiring__inactive';

  return (
    <div
      aria-hidden={!isSessionEnding}
      aria-live="polite"
      className={`alert--session-expiring ${className}`}
    >
      {isSessionEnding && <Timer {...props} />}
    </div>
  );
};

SessionEndingAlert.propTypes = {
  isSessionEnding: PropTypes.bool.isRequired,
  isExtendingSession: PropTypes.bool.isRequired,
  latestActivity: PropTypes.number.isRequired,
  expiresAt: PropTypes.number.isRequired,
  extend: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  latestActivityAction: PropTypes.func.isRequired
};

const mapStateToProps = ({
  auth: { isSessionEnding, isExtendingSession, latestActivity, expiresAt }
}) => ({
  isSessionEnding,
  isExtendingSession,
  latestActivity,
  expiresAt
});

const mapDispatchToProps = {
  extend: extendSession,
  logoutAction: logout,
  latestActivityAction: setLatestActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionEndingAlert);

export { SessionEndingAlert as plain, mapStateToProps, mapDispatchToProps };
