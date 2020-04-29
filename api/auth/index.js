const Passport = require('passport');
const LocalStrategy = require('passport-local');

const logger = require('../logger')('auth index');
const authenticate = require('./authenticate');
const serialization = require('./serialization');
const sessionFunction = require('./session')();
const { removeUserSession } = require('./sessionStore');

const defaultStrategies = [new LocalStrategy(authenticate())];

// This setup method configures passport and inserts it into
// the express middleware. After a successful authentication,
// passport will store a serialized representation of the user
// in a session, which (as configured here, by default) is a
// browser cookie.
//
// In endpoint handlers, the req.user variable will be set
// to the deserialized user object if the user is
// authenticated. Otherwise it will be null.

module.exports.setup = function setup(
  app,
  {
    auth = authenticate,
    deserializeUser = serialization.deserializeUser,
    passport = Passport,
    removeSession = removeUserSession,
    serializeUser = serialization.serializeUser,
    session = sessionFunction,
    strategies = defaultStrategies
  } = {}
) {
  // Handle all of the authentication strategies that we support
  logger.silly('setting up strategies with Passport');
  strategies.forEach(strategy => passport.use(strategy));

  // Register our user serialization methods with passport
  logger.silly('setting up our user serializer with Passport');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  // Add our session function and passport to our app's
  // middleware
  logger.silly('adding session and Passport middleware');
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  logger.silly('setting up a logout handler');
  app.get('/auth/logout', (req, res) => {
    if (req.session && req.session.passport) {
      removeSession(req.session.passport.user);
    }
    req.logout();
    session.destroy();
    res.status(200).end();
  });

  logger.silly('setting up local login nonce-fetcher');
  app.post('/auth/login/nonce', (req, res) => {
    if (req.body && req.body.username) {
      res.send({
        nonce: auth.getNonce(req.body.username)
      });
    }
    res.status(400).end();
  });

  // Add a local authentication endpoint
  logger.silly('setting up a local login handler');
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });
};
