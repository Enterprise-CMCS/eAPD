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
  strategies.forEach(strategy => passport.use(strategy));

  // Register our user serialization methods with passport
  passport.serializeUser(serialization.serializeUser);
  passport.deserializeUser(serialization.deserializeUser);

  // Add our session function and passport to our app's
  // middleware
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.status(200).end();
  });

  // Add a local authentication endpoint
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.status(200).end();
  });
};
