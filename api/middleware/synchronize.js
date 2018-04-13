const logger = require('../logger')('sync middleware');
const { cache, modelIndex } = require('./cache');

const synchronizeAll = getSpecifics =>
  cache(['sync-all', modelIndex(getSpecifics)], () => async (req, res) => {
    try {
      const { modelClass, foreignKey } = getSpecifics(req);
      await modelClass.synchronize(req.body, foreignKey, false);

      const synced = await modelClass.fetchAll({
        withRelated: modelClass.withRelated
      });
      res.send(synced.toJSON());
    } catch (e) {
      if (e.statusCode) {
        res
          .status(e.statusCode)
          .send({ action: 'add-activity', ...e.error })
          .end();
      } else {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  });

const synchronizeSpecific = getModelToSync =>
  cache(['sync-one', modelIndex(getModelToSync)], () => async (req, res) => {
    try {
      const model = getModelToSync(req);
      await model.synchronize(req.body);

      const updated = await model.fetch({
        withRelated: model.static.withRelated
      });
      res.send(updated.toJSON());
    } catch (e) {
      if (e.statusCode) {
        res
          .status(e.statusCode)
          .send({ action: 'update-activity', ...e.error })
          .end();
      } else {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  });

module.exports = { synchronizeAll, synchronizeSpecific };
