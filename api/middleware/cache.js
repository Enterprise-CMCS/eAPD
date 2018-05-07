const middlewareCache = {};

/**
 * @description Stuff a middleware instance into the cache
 * @param {object} key The unique key to cache the middleware
 *    instance with.  Must be stringable, so objects should be
 *    converted into unique integers first (see the modelIndex
 *    method)
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

const knownModels = [];

/**
 * @description Converts an object into a unique integer
 * @param {object} model The object to convert to an integer.
 * @returns {number} The integer corresponding to the object.
 */
const modelIndex = model => {
  if (!knownModels.includes(model)) {
    knownModels.push(model);
  }
  return knownModels.indexOf(model);
};

module.exports = { cache, modelIndex };
