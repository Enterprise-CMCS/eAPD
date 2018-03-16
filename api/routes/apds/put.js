const pick = require('lodash.pick');

const logger = require('../../logger')('apds route put');
const defaultApdModel = require('../../db').models.apd;
const loggedIn = require('../../auth/middleware').loggedIn;
const { userCanEditAPD: defaultUserCanEditAPD } = require('./utils');

module.exports = (
  app,
  ApdModel = defaultApdModel,
  userCanEditAPD = defaultUserCanEditAPD
) => {
  logger.silly('setting up PUT /apds/:id route');
  app.put('/apds/:id', loggedIn, async (req, res) => {
    logger.silly(req, 'handling PUT /apds/:id route');
    logger.silly(req, `attempting to update apd [${req.params.id}]`);

    try {
      const apdID = +req.params.id;
      const apd = await ApdModel.where({ id: apdID }).fetch();

      if (!apd) {
        logger.verbose(req, `no such apd [${apdID}]`);
        return res.status(404).end();
      }

      if (!await userCanEditAPD(req.user.id, apdID)) {
        logger.verbose(req, 'user (state) not associated with this apd');
        return res.status(404).end();
      }

      logger.silly(req, 'updating apd fields');
      logger.silly(req, 'filter body data to editable fields');
      const newData = pick(req.body, ['status', 'period']);
      apd.set(newData);

      await apd.save();
      logger.silly(req, 'all done');
      return res.send(apd.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
