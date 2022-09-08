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
        message: 'handling PATCH /apds/:id/bduget route'
      });

      logger.silly({
        id: req.id,
        message: `attempting to update the budget for APD [${req.params.id}]`
      });

      try {
        const { errors, budget } = await updateAPDBudget(
          req.params.id,
          req.user.state.id
        );

        if (errors) {
          logger.error({ id: req.id, message: errors });
        }

        return res.send({
          errors,
          budget
        });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return next(e);
      }
    }
  );
};
