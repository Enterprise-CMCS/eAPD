const logger = require('../../logger')('apds route get');
const { can, userCanEditAPD } = require('../../middleware');

module.exports = app => {
  logger.silly('setting up DELETE /apds/:id route');

  app.delete(
    '/apds/:id',
    can('view-document'),
    userCanEditAPD(),
    async (req, res) => {
      try {
        req.meta.apd.set('status', 'archived');
        await req.meta.apd.save();
        res.status(204).end();
      } catch (e) {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  );
};
