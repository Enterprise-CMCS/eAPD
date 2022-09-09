const logger = require('../../../logger')('apds budget route put');
const { updateAPDBudget: ub } = require('../../../db');
const { can, userCanEditAPD } = require('../../../middleware');

module.exports = (app, { updateAPDBudget = ub } = {}) => {
  logger.silly('setting up PATCH /apds/:id/budget route');
  app.patch(
    '/apds/:id/budget',
    can('edit-document'),
    userCanEditAPD(),
    async (req, res, next) => {
      logger.silly({
        id: req.id,
        message: 'handling PATCH /apds/:id/budget route'
      });

      if (!req?.params?.id) {
        logger.error({ id: req.id, message: 'must have an APD id' });
        return res.status(400).end();
      }

      if (!req?.user?.state?.id) {
        logger.error({ id: req.id, message: 'must have a state id' });
        return res.status(400).end();
      }

      logger.silly({
        id: req.id,
        message: `attempting to update the budget for APD [${req.params.id}]`
      });

      try {
        const budget = await updateAPDBudget(
          req?.params?.id || null,
          req?.user?.state?.id || null
        );

        return res.send({
          budget
        });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return next(e);
      }
    }
  );
};
