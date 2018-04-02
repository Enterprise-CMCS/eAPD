const middlewareCache = {};
const cache = (key, getMiddleware) => {
  if (!middlewareCache[key]) {
    middlewareCache[key] = getMiddleware();
  }
  return middlewareCache[key];
};

const knownModels = [];
const modelIndex = model => {
  if (!knownModels.includes(model)) {
    knownModels.push(model);
  }
  return knownModels.indexOf(model);
};

module.exports = { cache, modelIndex };
