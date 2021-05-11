const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;
const { sign } = require('../../auth/jwtUtils')

module.exports = app => {
  logger.debug('setting up GET endpoint');
  app.get('/me',
    (req, res) => {
    console.log('got a request for the ME endpoint')
    console.log(req)
    res.send(req.user);
  });

  app.get('/me/jwToken', loggedIn, (req, res) => {
    const jwt = sign(req.user)
    res.send({token:jwt});
  });
};
