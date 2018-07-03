const logger = require('../../../logger')('apd activites route post');
const { apdVersion: defaultVersionModel } = require('../../../db').models;
const { can, userCanEditAPD, loadApd } = require('../../../middleware');

module.exports = (app, VersionModel = defaultVersionModel) => {
  logger.silly('setting up POST /apds/:id/versions route');
  app.post(
    '/apds/:id/versions',
    can('submit-document'),
    userCanEditAPD(),
    loadApd(),
    async (req, res) => {
      const tables = req.body.tables || null;
      const apd = req.meta.apd;

      const version = VersionModel.forge({
        apd_id: apd.get('id'),
        user_id: req.user.id,
        content: { ...tables, ...apd.toJSON() }
      });

      apd.set({ status: 'in review' });
      await apd.save();

      await version.save();

      res.status(204).end();
    }
  );
};
