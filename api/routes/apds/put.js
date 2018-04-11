const logger = require('../../logger')('apds route put');
const { loggedIn, userCanEditAPD } = require('../../middleware');

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put('/apds/:id', loggedIn, userCanEditAPD(), async (req, res) => {
    logger.silly(req, 'handling PUT /apds/:id route');
    logger.silly(req, `attempting to update apd [${req.params.id}]`);

    try {
      await req.meta.apd.synchronize(req.body);

      logger.silly(req, 'all done');
      const apd = await req.meta.apd.fetch({
        withRelated: req.meta.apd.static.withRelated
      });
      res.send(apd.toJSON());
    } catch (e) {
      if (e.statusCode) {
        res
          .status(e.statusCode)
          .send({ action: 'update-apd', ...e.error })
          .end();
      } else {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  });
};
