import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { postMessage, subscribe, unsubscribe } from '../components/Broadcast';
import { selectIsLoggedIn } from '../reducers/auth';

const events = [
  'click',
  'keydown',
  'keypress',
  'load',
  'mousemove',
  'mousedown',
  'touchstart',
  'scroll'
];

const IDLE_TIMEOUT = process.env.IDLE_LOGOUT_TIME_MINUTES * 60 * 1000;

const flashWindowTitle = () => {
  const newTitle = `🔴 ${document.title}`;
  const originalTitle = document.title;
  const timer = setInterval(() => {
    document.title =
      document.title === originalTitle ? newTitle : originalTitle;
  }, 300);

  return () => {
    clearInterval(timer);
    document.title = originalTitle;
  };
};

const IdleLogout = ({ history, loggedIn }) => {
  useEffect(() => {
    if (loggedIn) {
      let notification = null;
      let stopFlashing = () => {};

      if (window.Notification) {
        window.Notification.requestPermission();
      }

      const logout = () => {
        history.replace('/logout');
      };

      const idleWarning = () => {
        stopFlashing = flashWindowTitle();

        if (window.Notification) {
          notification = new Notification('Session expiring', {
            body: 'You will be logged out soon',
            requireInteraction: true
          });
          notification.onclick = () => {
            resetTimer(); // eslint-disable-line no-use-before-define
            window.focus();
          };
        }
      };

      const clearIdleWarning = () => {
        stopFlashing();
      };

      let idleTimer = setTimeout(logout, IDLE_TIMEOUT);
      let warningTimer = setTimeout(
        idleWarning,
        Math.max(0, IDLE_TIMEOUT - 120000)
      );

      const resetTimer = () => {
        clearTimeout(idleTimer);
        clearTimeout(warningTimer);

        clearIdleWarning();
        if (notification) {
          notification.close();
        }

        idleTimer = setTimeout(logout, IDLE_TIMEOUT);
        warningTimer = setTimeout(
          idleWarning,
          Math.max(0, IDLE_TIMEOUT - 120000)
        );
      };

      const localActivity = () => {
        postMessage({ type: 'user activity' });
        resetTimer();
      };

      const remoteActivity = ({ type }) => {
        if (type === 'user activity') {
          resetTimer();
        }
      };
      subscribe(remoteActivity);

      events.forEach(e => {
        document.addEventListener(e, localActivity, { passive: true });
      });

      return () => {
        stopFlashing();
        unsubscribe(remoteActivity);
        clearTimeout(idleTimer);
        events.forEach(e => {
          document.removeEventListener(e, resetTimer, { passive: true });
        });
      };
    }

    return undefined;
  }, [loggedIn]);

  return null;
};

IdleLogout.propTypes = {
  history: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loggedIn: selectIsLoggedIn(state)
});

export default withRouter(connect(mapStateToProps)(IdleLogout));

export { IdleLogout as plain, mapStateToProps };
