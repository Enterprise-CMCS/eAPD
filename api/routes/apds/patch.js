import loggerFactory from '../../logger/index.js';
import sanitize from '../../util/sanitize.js';
import {
  updateAPDDocument as ua,
  adminCheckAPDDocument as validate
} from '../../db/index.js';
import { can, userCanEditAPD } from '../../middleware/index.js';
import staticFields from '../../util/apds.js';

const logger = loggerFactory('apds route put');

export default (
  app,
  { updateAPDDocument = ua, adminCheckAPDDocument = validate } = {}
) => {
  logger.silly('setting up PATCH /apds/:id route');
  app.patch(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    async (req, res, next) => {
      logger.silly({ id: req.id, message: 'handling PATCH /apds/:id route' });
      if (!Array.isArray(req.body)) {
        logger.error({ id: req.id, message: 'request body must be an array' });
        return res.status(400).end();
      }

      logger.silly({
        id: req.id,
        message: `attempting to update APD [${req.params.id}]`
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

        const {
          errors,
          apd: {
            createdAt: created,
            updatedAt: updated,
            stateId: state,
            budget = {},
            ...apd
          } = {}
        } = await updateAPDDocument({
          id: req.params.id,
          stateId: req.user.state.id,
          patch: sanitizedPatch
        });

        if (errors) {
          // Rather than send back the full error from the validator, pull out just the relevant bits
          // and fetch the value that's causing the error.
          logger.error({ id: req.id, message: errors });
        }

        const adminCheck = await adminCheckAPDDocument(req.params.id);

        return res.send({
          errors,
          apd: {
            ...apd,
            id: req.params.id,
            created,
            state,
            updated
          },
          adminCheck,
          budget
        });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return next(e);
      }
    }
  );
};
