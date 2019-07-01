const logger = require('../../../logger')('submitted apds route get');
const defaultApdModel = require('../../../db').models.apd;
const { can } = require('../../../middleware');

module.exports = (app, ApdModel = defaultApdModel) => {
  logger.silly('setting up GET /apds/submitted route');

  app.get(
    '/apds/submitted',
    can('submit-federal-response'),
    async (req, res) => {
      logger.silly(req, 'handling GET /apds/submitted');

      try {
        const apds = (await ApdModel.query(
          'whereNot',
          'status',
          'draft'
        ).fetchAll({
          withRelated: ApdModel.withRelated
        })).toJSON();

        logger.silly(req, `got apds:`);
        logger.silly(req, apds);
        return res.send(apds);
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
