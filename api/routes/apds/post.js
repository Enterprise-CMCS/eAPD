const logger = require('../../logger')('apds route post');
const { apd: defaultApdModel } = require('../../db').models;
const { can } = require('../../middleware');

module.exports = (app, ApdModel = defaultApdModel) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res) => {
    logger.silly(req, 'handling POST /apds route');

    try {
      const newApd = ApdModel.forge({
        state_id: req.user.state,
        status: 'draft'
      });
      await newApd.save();

      const apd = await ApdModel.where({ id: newApd.get('id') }).fetch({
        withRelated: ApdModel.withRelated
      });
      res.send(apd);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
