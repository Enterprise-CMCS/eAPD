const pick = require('lodash.pick');

const logger = require('../../logger')('apds route put');
const { loggedIn, userCanEditAPD } = require('../../middleware');

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put('/apds/:id', loggedIn, userCanEditAPD(), async (req, res) => {
    logger.silly(req, 'handling PUT /apds/:id route');
    logger.silly(req, `attempting to update apd [${req.params.id}]`);

    try {
      logger.silly(req, 'updating apd fields');
      logger.silly(req, 'filter body data to editable fields');
      // const newData = pick(req.body, ['status', 'period']);
      // const apd = req.meta.apd;
      // apd.set(newData);

      await req.meta.apd.update(req.body);

      // await apd.save();
      logger.silly(req, 'all done');
      const apd = await req.meta.apd.fetch({
        withRelated: req.meta.apd.static.withRelated
      });
      return res.send(apd.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
