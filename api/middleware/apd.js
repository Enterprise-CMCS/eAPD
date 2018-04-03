const logger = require('../logger')('apd middleware');
const { cache, modelIndex } = require('./cache');

const {
  apd: defaultApdModel,
  apdActivity: defaultActivityModel
} = require('../db').models;

module.exports.loadApd = (model = defaultApdModel, idParam = 'id') =>
  cache(['loadApd', modelIndex(model), idParam], () => {
    const loadApd = async (req, res, next) => {
      logger.silly(req, 'loading APD for request');
      try {
        if (model.modelName === 'apd') {
          req.meta.apd = await model
            .where({
              id: +req.params[idParam]
            })
            .fetch({
              withRelated: model.withRelated
            });
        } else {
          const obj = await model
            .where({ id: req.params[idParam] })
            .fetch({ withRelated: model.withRelated });
          if (obj) {
            req.meta.apd = obj.related('apd');
          } else {
            logger.verbose(req, 'requested object does not exist');
          }
        }

        if (!req.meta.apd) {
          logger.verbose(req, 'no APD associated with request');
          res.status(404).end();
        } else {
          next();
        }
      } catch (e) {
        logger.error(req, e);
        res.status(500).end();
      }
    };
    return loadApd;
  });

module.exports.userCanEditAPD = (model = defaultApdModel, idParam = 'id') =>
  cache(['userCanEditAPD', modelIndex(model), idParam], () => {
    const userCanEditAPD = async (req, res, next) => {
      logger.silly(req, 'verifying the user can access this APD');
      await module.exports.loadApd(model, idParam)(req, res, async () => {
        const userApds = await req.user.model.apds();
        if (userApds.includes(req.meta.apd.get('id'))) {
          next();
        } else {
          logger.verbose(req, 'user does not have access to the APD');
          res.status(404).end();
        }
      });
    };
    return userCanEditAPD;
  });

module.exports.loadActivity = (idParam = 'id', model = defaultActivityModel) =>
  cache(['loadActivity', modelIndex(model), idParam], () => {
    const loadActivity = async (req, res, next) => {
      try {
        logger.silly(req, 'loading APD activity for request');
        const activity = await model
          .where({
            id: +req.params[idParam]
          })
          .fetch({
            withRelated: model.withRelated
          });

        if (!activity) {
          logger.verbose(req, 'activity not found');
          res.status(404).end();
        } else {
          req.meta.activity = activity;
          next();
        }
      } catch (e) {
        logger.error(req, e);
        res.status(500).end();
      }
    };
    return loadActivity;
  });
