const logger = require('../logger')('apd middleware');
const {
  apd: defaultApdModel,
  apdActivity: defaultActivityModel
} = require('../db').models;

const cache = {};

module.exports.loadApd = (
  model = defaultApdModel,
  idParam = 'id',
  ApdModel = defaultApdModel
) => {
  const key = ['loadApd', model, idParam, ApdModel];
  if (!cache[key]) {
    const loadApd = async (req, res, next) => {
      logger.silly(req, 'loading APD for request');
      try {
        if (model === ApdModel) {
          req.meta.apd = await ApdModel.where({
            id: +req.params[idParam]
          }).fetch({
            withRelated: ['activities']
          });
          next();
        } else {
          const obj = await model
            .where({ id: req.params[idParam] })
            .fetch({ withRelated: ['apd.activities'] });
          if (obj) {
            req.meta.apd = obj.related('apd');
          }
          next();
        }
      } catch (e) {
        logger.error(req, e);
        next();
      }
    };
    cache[key] = loadApd;
  }
  return cache[key];
};

module.exports.requireApd = (model = defaultApdModel, idParam = 'id') => {
  const key = ['requireApd', model, idParam];
  if (!cache[key]) {
    const requireApd = async (req, res, next) => {
      logger.silly(req, 'verifying that APD exists');
      await module.exports.loadApd(model, idParam)(req, res, () => {
        if (!req.meta.apd) {
          logger.verbose(req, 'no APD associated with request');
          res.status(404).end();
        } else {
          next();
        }
      });
    };
    cache[key] = requireApd;
  }
  return cache[key];
};

module.exports.userCanEditAPD = (model = defaultApdModel, idParam = 'id') => {
  const key = ['userCanEditAPD', model, idParam];
  if (!cache[key]) {
    const userCanEditAPD = async (req, res, next) => {
      logger.silly(req, 'verifying the user can access this APD');
      await module.exports.requireApd(model, idParam)(req, res, async () => {
        const userApds = await req.user.model.apds();
        if (userApds.includes(req.meta.apd.get('id'))) {
          next();
        } else {
          logger.verbose(req, 'user does not have access to the APD');
          res.status(404).end();
        }
      });
    };
    cache[key] = userCanEditAPD;
  }
  return cache[key];
};

module.exports.loadActivity = (
  idParam = 'id',
  model = defaultActivityModel
) => {
  const key = ['loadActivity', model, idParam];
  if (!cache[key]) {
    const loadActivity = async (req, res, next) => {
      try {
        logger.silly(req, 'loading APD activity for request');
        const activity = await model
          .where({
            id: +req.params[idParam]
          })
          .fetch({
            withRelated: ['goals.objectives', 'approaches', 'expenses.entries']
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
    cache[key] = loadActivity;
  }
  return cache[key];
};
