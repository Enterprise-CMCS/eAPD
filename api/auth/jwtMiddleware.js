const { jwtExtractor, verifyWebToken } = require('./jwtUtils');
const { deserializeUser } = require('./serialization');
const logger = require('../logger')('jwt middleware');

/**
 * Extracts and verifies the JWT in the request Authorization header.
 * Attaches the JWT payload and user to the request, if JWT is valid.
 * 401/403 responses are handled by `can` and `loggedIn`.
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

  try {
    const user = await deserialize(payload.sub);
    if (user) {
      req.user = user;
      req.payload = payload;
    }
  } catch (err) {
    logger.error(err);
  }
  return next();
};

module.exports = jwtMiddleware;
