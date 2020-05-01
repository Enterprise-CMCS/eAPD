const { jwtExtractor, verifyWebToken } = require('./jwtUtils');
const { deserializeUser } = require('./serialization');
const logger = require('../logger')('jwt middleware');

/**
 * Extracts and verifies the JWT in the request Authorization header.
 * Attaches the JWT payload and user to the request, if JWT is valid.
 * Responds with 400 status and errors, if we cannot deserialize the user.
 * @name jwtMiddleware
 * @function
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const jwtMiddleware = async (req, res, next) => {
  const jwt = jwtExtractor(req);
  const payload = jwt ? verifyWebToken(jwt) : false;

  if (payload) {
    req.payload = payload;
    await deserializeUser(payload.sub, (err, user) => {
      if (err) {
        logger.error(err);
        res.status(400).send(err).end();
      }
      if (user) req.user = user;
    });
  }

  next();
}

module.exports = jwtMiddleware;
