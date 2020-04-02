// Express session middleware.

const defaultCookies = require('cookies');
const { signWebToken, verifyWebToken } = require('./jwtUtils');
const logger = require('../logger')('auth session');

const COOKIE_NAME = 'token';

const sessionLifetimeMilliseconds =
  +process.env.SESSION_LIFETIME_MINUTES * 60 * 1000;

/**
 * Load a session from client cookie
 * @param {Object} req - Express request object
 * @param {Object} options - Options
 * @param {Object} options.Cookies - Injected cookie library; defaults to
 *                                   cookies; primary for unit testing
 */
const loadSession = (req, cookie) => {
  if (!cookie) {
    logger.silly(req, 'no auth cookie, skip validation');
    return {};
  }

  logger.silly(req, 'verifying JWT auth token');
  const valid = verifyWebToken(cookie);

  if (valid) {
    return valid.payload;
  } else {
    logger.error(req, `invalid jwt: ${cookie}`);
    return {};
  }
};

/**
 * Returns an Express middleware for handling sessions
 */
module.exports = ({ Cookies = defaultCookies } = {}) => {
  const session = { content: {} };

  /**
   * Express middleware for managing client-side sessions via JWT
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - next() callback
   */
  const middleware = (req, res, next) => {
    const cookies = new Cookies(req, res);

    session.content = loadSession(req, cookies.get(COOKIE_NAME));

    // Add a session object to the request and configure it to modify
    // session.content rather than the actual session object, so we
    // can be sure the session variable doesn't get mangled
    Object.defineProperty(req, 'session', {
      get: () => session.content,
      set: v => {
        session.content = v;
      }
    });

    // Hijack the response method that writes headers so we can write our
    // cookie beforehand.
    const writeHead = res.writeHead;
    res.writeHead = (...args) => {
      // Only write a cookie if the session content has stuff in it.
      if (Object.keys(session.content).length) {
        logger.silly('writing session cookie to headers');

        // Cookie value is a JWT whose body is an issuer tag and the contents
        // of session.content as the token payload.  The JWT is signed with
        // the SESSION_SECRET env var, explicitly sets the algorithm, and sets
        // an expiration date.
        cookies.set(
          COOKIE_NAME,
          signWebToken({ payload: session.content }),
          {
            httpOnly: true,
            maxAge: sessionLifetimeMilliseconds,
            overwrite: true,
            sameSite: process.env.DISABLE_SAME_SITE ? '' : 'none',
            secure: !process.env.DISABLE_SECURE_COOKIE
          }
        );
      } else {
        // Else, write a cookie with an immediate expiration
        logger.silly('expiring/setting empty session cookie');
        cookies.set(COOKIE_NAME, '', {
          maxAge: 0,
          httpOnly: true,
          sameSite: process.env.DISABLE_SAME_SITE ? '' : 'none',
          secure: !process.env.DISABLE_SECURE_COOKIE
        });
      }

      // Now call the original writeHead method
      return writeHead.apply(res, args);
    };

    next();
  };

  /**
   * Destroy the current session, which will lead to the cookie being
   * immediately expired
   */
  middleware.destroy = () => {
    logger.verbose('destroying user session');
    session.content = {};
  };

  return middleware;
};
