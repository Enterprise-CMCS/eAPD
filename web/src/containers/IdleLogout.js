import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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

const IdleLogout = ({ history, loggedIn }) => {
  useEffect(() => {
    if (loggedIn) {
      const logout = () => {
        history.replace('/logout');
      };

      let idleTimer = setTimeout(logout, IDLE_TIMEOUT);
      const resetTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(logout, IDLE_TIMEOUT);
      };

      events.forEach(e => {
        document.addEventListener(e, resetTimer, { passive: true });
      });

      return () => {
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
