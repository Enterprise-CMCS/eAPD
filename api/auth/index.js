const crypto = require('crypto');
const sessions = require('client-sessions');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const session = sessions({
  cookieName: 'user', // this is the cookie name passport writes to
  secret: crypto.randomBytes(256),
  duration: 14 * 24 * 60 * 60 * 1000, // session lifetime, in milliseconds
  cookie: {
    httpOnly: true
  }
});

const authenticate = (username, password, done) => {
  if (username === 'hello' && password === 'world') {
    done(null, { username, email: 'hello@world.com', token: 'auth-token' });
  } else {
    done('No idea who that is');
  }
};

const serializeUser = (user, done) => {
  done(null, user.token);
};

const deserializeUser = (token, done) => {
  done(null, { username: 'hello', email: 'hello@world.com', token });
};

module.exports.setup = function setup(app) {
  passport.use(new LocalStrategy(authenticate));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    req.user = req.headers.authorization;
    next();
  });

  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.send({ bearer: req.user.token });
  });
};
