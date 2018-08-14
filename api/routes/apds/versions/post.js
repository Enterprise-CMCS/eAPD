const logger = require('../../../logger')('apd activites route post');
const {
  apd: defaultApdModel,
  apdVersion: defaultVersionModel
} = require('../../../db').models;
const { can, userCanEditAPD, loadApd } = require('../../../middleware');

module.exports = (
  app,
  { ApdModel = defaultApdModel, VersionModel = defaultVersionModel } = {}
) => {
  logger.silly('setting up POST /apds/:id/versions route');
  app.post(
    '/apds/:id/versions',
    can('submit-document'),
    userCanEditAPD(),
    loadApd(),
    async (req, res) => {
      const tables = req.body.tables || null;
      const apd = await ApdModel.where({ id: req.meta.apd.get('id') }).fetch({
        withRelated: ApdModel.withRelated
      });

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
