const logger = require('../../logger')('apds route get');
const { can, userCanEditAPD } = require('../../middleware');
const { raw: knex } = require('../../db');

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up DELETE /apds/:id route');

  app.delete(
    '/apds/:id',
    can('view-document'),
    userCanEditAPD(),
    async (req, res) => {
      try {
        await db('apds')
          .where('id', req.meta.apd.id)
          .update({ status: 'archived' });
        res.status(204).end();
      } catch (e) {
        logger.error(req, e);
        res.status(500).end();
      }
    }
  );
};
