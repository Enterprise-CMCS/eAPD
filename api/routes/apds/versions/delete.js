const logger = require('../../../logger')('apd versions route delete');
const { can, userCanAccessAPD, loadApd } = require('../../../middleware');

module.exports = app => {
  logger.silly('setting up DELETE /apds/:id/versions route');
  app.delete(
    '/apds/:id/versions',
    can('submit-document'),
    userCanAccessAPD(),
    loadApd(),
    async (req, res) => {
      try {
        logger.silly(req, 'withdrawing APD');
        req.meta.apd.set({ status: 'draft' });
        await req.meta.apd.save();

        res.status(204).end();
      } catch (e) {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  );
};
