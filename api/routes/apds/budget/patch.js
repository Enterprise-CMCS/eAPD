const logger = require('../../../logger')('apds budget route');
const { updateAPDBudget: ub } = require('../../../db');
const { can, userCanEditAPD } = require('../../../middleware');
const { staticFields } = require('../../../util/apds');
const sanitize = require('../../../util/sanitize');

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
      if (!Array.isArray(req.body)) {
        logger.error({ id: req.id, message: 'request body must be an array' });
        return res.status(400).end();
      }

      logger.silly({
        id: req.id,
        message: `attempting to update APD [${req.params.id}] budget`
      });

      try {
        // Filter out any patches that target unchangeable properties
        // deepcode ignore HTTPSourceWithUncheckedType: we are sanitizing everything right after this
        const patch = req.body.filter(
          ({ path }) => !staticFields.includes(path)
        );

        const sanitizedPatch = patch.map(({ value = '', ...rest }) => ({
          ...rest,
          value: sanitize(value)
        }));

        const { errors, updatedBudget } = await updateAPDBudget(
          req.params.id,
          req.user.state.id,
          sanitizedPatch
        );

        if (errors) {
          // Rather than send back the full error from the validator, pull out just the relevant bits
          // and fetch the value that's causing the error.
          logger.error({ id: req.id, message: errors });
        }

        return res.send({
          errors,
          budget: updatedBudget
        });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return next(e);
      }
    }
  );
};
