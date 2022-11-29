import { jwtExtractor, verifyEAPDToken } from './jwtUtils.js';
import loggerFactory from '../logger/index.js';

const logger = loggerFactory('jwt middleware');

/**
 * Extracts and verifies the JWT in the request Authorization header.
 * Attaches the user to the request, if JWT is valid.
 * 401/403 responses are handled by `can` and `loggedIn`.
 * @name jwtMiddleware
 * @function
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @param {Object}
 * an extractor that defines how to extract the JWT from the request
 * a verify function that is used to verify the token.  This could be a request to Okta
 * or a local verification with a local secret.
 */
const jwtMiddleware = async (
  req,
  res,
  next,
  { extractor = jwtExtractor, verifyToken = verifyEAPDToken } = {}
) => {
  try {
    const jwt = extractor(req);
    const claims = jwt ? await verifyToken(jwt) : false;
    if (!claims) return next();
    req.user = claims;
  } catch (err) {
    logger.error(`error message: ${err.message || err.error}`);
    return next(err);
  }
  return next();
};

export default jwtMiddleware;
