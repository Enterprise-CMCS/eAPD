const logger = require('../logger')('sync middleware');
const { cache, modelIndex } = require('./cache');

/**
 * @description Middleware to synchronize all instances of a model based
 * on incoming request data
 * @param {function} getSpecifics Function that returns the
 *    specific information detailing what to synchronize.
 *    Called with the request object.
 *
 *    Must return:
 *      - modelClass: the model class that is being synced
 *      - foreignKey: an object constraining which model
 *          instances are being synced; of the form
 *          { parent_id: id }
 *      - action: (optional) the name of the action being
 *          performed; sent to the client in the case of
 *          a client error (e.g., validation failure)
 */
const synchronizeAll = getSpecifics =>
  cache(
    ['sync-all', modelIndex(getSpecifics)],
    () => async (req, res, next) => {
      let action;

      try {
        const { modelClass, foreignKey, action: actionToReport } = getSpecifics(
          req
        );
        action = actionToReport;

        // Sync based on what we got from the callback
        await modelClass.synchronize(req.body, foreignKey, false);

        // Now re-fetch what we synced; this makes sure we
        // send the updated data
        const synced = await modelClass.where(foreignKey).fetchAll({
          withRelated: modelClass.withRelated
        });
        res.send(synced.toJSON());
        next();
      } catch (e) {
        if (e.statusCode) {
          res
            .status(e.statusCode)
            .send({ action, ...e.error })
            .end();
        } else {
          logger.error(req, e);
          res.status(500).end();
        }
      }
    }
  );

/**
 * @description Middleware to synchronize a single model instance
 * based on incoming request data
 * @param {function} getModelToSync Function that returns the
 *    specific information detailing what to synchronize.
 *    Called with the request object.
 *
 *    Must return:
 *      - model: the model that is being synced
 *      - action: (optional) the name of the action being
 *          performed; sent to the client in the case of
 *          a client error (e.g., validation failure)
 */
const synchronizeSpecific = getModelToSync =>
  cache(
    ['sync-one', modelIndex(getModelToSync)],
    () => async (req, res, next) => {
      let action;
      try {
        const { model, modelClass, action: actionToReport } = getModelToSync(
          req
        );
        action = actionToReport;

        // Sync based on what we got from the callback
        await model.synchronize(req.body);

        // Now re-fetch what we synced; this makes sure we
        // send the updated data
        const updated = modelClass
          ? await modelClass
              .where({ id: model.get('id') })
              .fetch({ withRelated: modelClass.withRelated })
          : await model.fetch({
              withRelated: model.static.withRelated
            });
        res.send(updated.toJSON());
        next();
      } catch (e) {
        if (e.statusCode) {
          res
            .status(e.statusCode)
            .send({ action, ...e.error })
            .end();
        } else {
          logger.error(req, e);
          res.status(500).end();
        }
      }
    }
  );

module.exports = { synchronizeAll, synchronizeSpecific };
