const logger = require('../logger')('auth index');
const Passport = require('passport');
const LocalStrategy = require('passport-local');

const authenticate = require('./authenticate')();
const serialization = require('./serialization');
const sessionFunction = require('./session').getSessionFunction();

const defaultStrategies = [new LocalStrategy(authenticate)];

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
  passport = Passport,
  strategies = defaultStrategies,
  session = sessionFunction
) {
  // Handle all of the authentication strategies that we support
  logger.silly('setting up strategies with Passport');
  strategies.forEach((strategy) => passport.use(strategy));

  // Register our user serialization methods with passport
  logger.silly('setting up our user serializer with Passport');
  passport.serializeUser(serialization.serializeUser);
  passport.deserializeUser(serialization.deserializeUser);

  // Add our session function and passport to our app's
  // middleware
  logger.silly('adding session and Passport middleware');
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  logger.silly('setting up a logout handler');
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.status(200).end();
  });

  // Add a local authentication endpoint
  logger.silly('setting up a local login handler');
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res
      .status(200)
      .send({ id: req.user.id })
      .end();
  });
};
