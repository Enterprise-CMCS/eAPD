const middlewareCache = {};
const cache = (key, getMiddleware) => {
  if (!middlewareCache[key]) {
    middlewareCache[key] = getMiddleware();
  }
  return middlewareCache[key];
};

const knownModels = [];
const modelIndex = model => {
  if (knownModels.includes(model)) {
    return knownModels.indexOf(model);
  }
  knownModels.push(model);
  return knownModels.length - 1;
};

module.exports = { cache, modelIndex };
