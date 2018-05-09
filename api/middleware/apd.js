const logger = require('../logger')('apd middleware');
const { cache, modelIndex } = require('./cache');

const {
  apd: defaultApdModel,
  apdActivity: defaultActivityModel
} = require('../db').models;

// Prepend "apd" to relationship names. Note that since
// the "withRelated" values can be objects, we have to
// preserve the objecty-ness and just change the keys.
//
// We prepend "apd" because if we're loading an APD
// via a different model, we want to make sure when
// we load the intermediary object, we also get the
// APD and alll of its related data.  That way, we can
// shortcut and return the APD in full directly from
// the intermediary model rather than making another
// fetch call.
// --
// For some reason, in unit testing, the defaultApdModel
// object doesn't have a "withRelated" property, so
// default to an empty array.
const apdRelations = (defaultApdModel ? defaultApdModel.withRelated : []).map(
  relation => {
    if (typeof relation === 'object') {
      const out = {};
      Object.keys(relation).forEach(key => {
        out[`apd.${key}`] = relation[key];
      });
      return out;
    }
    return `apd.${relation}`;
  }
);

/**
 * @description Middleware to load an APD into the request "meta" property
 * @param {object} model The model class to use; defaults to Apd model
 * @param {string} idParam The request parameter to use as the model ID
 */
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
            // Here's where we use that "apd" prepended
            // list of relations
            .fetch({ withRelated: apdRelations });
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

/**
 * @description Middleware to determine if the current user can
 *    edit the APD they would load.  Also calls loadApd middleware
 * @param {object} model The APD model class to use; defaults to Apd model
 * @param {string} idParam The request parameter to use as the model ID
 */
module.exports.userCanEditAPD = (model = defaultApdModel, idParam = 'id') =>
  cache(['userCanEditAPD', modelIndex(model), idParam], () => {
    const userCanEditAPD = async (req, res, next) => {
      logger.silly(req, 'verifying the user can access this APD');

      // Load the APD first...
      await module.exports.loadApd(model, idParam)(req, res, async () => {
        // ...then get a list of APDs this user is associated with
        const userApds = await req.user.model.apds();

        // ...and make sure there's overlap
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

/**
 * @description Middleware to load an activity into the request "meta" property
 * @param {string} idParam The request parameter to use as the model ID
 * @param {object} model The model class to use; defaults to ApdActivity model;
 *    this parameter is primarily for DI in unit tests
 */
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
