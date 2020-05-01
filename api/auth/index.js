const Passport = require('passport');
const LocalStrategy = require('passport-local');

const logger = require('../logger')('auth index');
const authenticate = require('./authenticate');
const serialization = require('./serialization');
const sessionFunction = require('./session')();
const { removeUserSession } = require('./sessionStore');
const { signWebToken, verifyWebtoken } = require('./jwtUtils');
const jwtMiddleware = require('./jwtMiddleware');

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

const setup = (
  app,
  {
    auth = authenticate,
    deserializeUser = serialization.deserializeUser,
    passport = Passport,
    removeSession = removeUserSession,
    serializeUser = serialization.serializeUser,
    session = sessionFunction,
    signToken = signWebToken,
    strategies = defaultStrategies
  } = {}
) => {
  // Handle all of the authentication strategies that we support
  logger.silly('setting up strategies with Passport');
  strategies.forEach(strategy => passport.use(strategy));

  // Register our user serialization methods with passport
  // logger.silly('setting up our user serializer with Passport');
  // passport.serializeUser(serializeUser);
  // passport.deserializeUser(deserializeUser);

  // Add our session function and passport to our app's
  // middleware
  logger.silly('adding Passport middleware');
  app.use(passport.initialize());

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
  app.post('/auth/login', passport.authenticate('local', { session: false }), (req, res) => {
    serializeUser(req.user, (err, sessionId) => {
      if (err) res.status(400).send(err).end;

      const jwt = signToken({ sub: sessionId });
      res.send({
        token: jwt,
        user: req.user
      });
    })
  });

  // Pull JWT from HTTP headers and deserialize user for all routes, except for
  // login routes.
  const jwtExcludedRoutes = [
    '/auth/login/nonce',
    '/auth/login',
  ];
  app.use((req, res, next) => jwtExcludedRoutes.includes(req.originalUrl) ? next() : jwtMiddleware(req, res, next));

  // Add a logout endpoint
  logger.silly('setting up a logout handler');
  app.get('/auth/logout', (req, res) => {
    if (req.payload) {
      removeSession(payload.sub);
      req.logout();
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
};

module.exports = { setup };
