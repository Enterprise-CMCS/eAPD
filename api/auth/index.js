const Passport = require('passport');
const LocalStrategy = require('passport-local');

const authenticate = require('./authenticate');
const serialization = require('./serialization');
const sessionFunction = require('./session').getSessionFunction();

module.exports.strategies = [
  new LocalStrategy(authenticate)
];

module.exports.setup = function setup(
  app,
  passport = Passport,
  strategies = module.exports.strategies,
  session = sessionFunction
) {
  strategies.forEach(strategy => passport.use(strategy));

  passport.serializeUser(serialization.serializeUser);
  passport.deserializeUser(serialization.deserializeUser);

  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.send({ bearer: req.user.id });
  });
};
