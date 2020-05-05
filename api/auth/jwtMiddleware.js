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
 * @param {Function} next
 */
const jwtMiddleware = async (
  req,
  res,
  next,
  {
    deserialize = deserializeUser,
    extractor = jwtExtractor,
    verifyToken = verifyWebToken
  } = {}
) => {
  const jwt = extractor(req);
  const payload = jwt ? verifyToken(jwt) : false;

  if (!payload) return next();

  await deserialize(payload.sub, (err, user) => {
    if (err) {
      logger.error(err);
      res.status(400);
      res.send(err);
      res.end();
    }

    if (user) {
      req.user = user;
      req.payload = payload;
    }
  });

  return next();
};

module.exports = jwtMiddleware;
