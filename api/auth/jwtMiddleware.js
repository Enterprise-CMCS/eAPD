const { jwtExtractor, verifyWebToken } = require('./jwtUtils');
const { getUserByID: gu } = require('../db');
const logger = require('../logger')('jwt middleware');

/**
 * Extracts and verifies the JWT in the request Authorization header.
 * Attaches the user to the request, if JWT is valid.
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
    getUserByID = gu,
    extractor = jwtExtractor,
    verifyToken = verifyWebToken
  } = {}
) => {
  const jwt = extractor(req);
  console.log({ jwt });
  try {
    const claims = jwt ? await verifyToken(jwt) : false;
    if (!claims) return next();

    // some values like group and application profile variables
    // are returned by the claims for conviences, but not retrieved
    // by the standard getUser call to Okta, so these values should
    // be passed in as additional values when possible.
    const { uid, ...additionalValues } = claims;
    const user = await getUserByID(uid, { additionalValues });
    // const user = claims;
    if (user) {
      req.user = user;
    }
  } catch (err) {
    logger.error(`error message: ${err.message}`);
  }
  return next();
};

module.exports = jwtMiddleware;
