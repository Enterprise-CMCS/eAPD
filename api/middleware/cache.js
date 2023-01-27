const middlewareCache = {};

/**
 * @description Stuff a middleware instance into the cache
 * @param {object} key The unique key to cache the middleware
 *    instance with.  Must be stringable
 * @param {function} getMiddleware A function that returns the
 *    middleware function.  Called with no arguments.
 *
 * @returns {object} The middleware function that was cached.
 */
const cache = (key, getMiddleware) => {
  if (!middlewareCache[key]) {
    middlewareCache[key] = getMiddleware();
  }
  return middlewareCache[key];
};

export default cache;
