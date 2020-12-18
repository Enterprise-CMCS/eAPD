const { apply_patch: applyPatch } = require('jsonpatch');
const jsonpointer = require('jsonpointer');

const logger = require('../../logger')('apds route put');
const { getAPDByID: ga, updateAPDDocument: ua } = require('../../db');
const { can, userCanEditAPD } = require('../../middleware');
const { validateApd } = require('../../schemas');

// This is a list of property paths that cannot be changed with this endpoint.
// Any patches pointing at these paths will be ignored.
const staticFields = ['/name'];

module.exports = (
  app,
  {
    getAPDByID = ga,
    patchObject = applyPatch,
    updateAPDDocument = ua,
    validate = validateApd
  } = {}
) => {
  logger.silly('setting up PATCH /apds/:id route');
  app.patch(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    async (req, res) => {
      logger.silly({ id: req.id, message: 'handling PATCH /apds/:id route' });
      if (!req.params.id) {
        logger.error({ id: req.id, message: 'no ID given' });
        return res.status(400).end();
      }
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
        const patch = req.body.filter(
          ({ path }) => !staticFields.includes(path)
        );

        const {
          created_at: created,
          document: currentDocument,
          state_id: stateID,
          status
        } = await getAPDByID(req.params.id);

        let updatedDocument;
        try {
          updatedDocument = patchObject(currentDocument, patch);
        } catch (e) {
          // This can happen for a variety of reasons. E.g., a patch tries to
          // operate on a property that doesn't currently exist.
          logger.error({ id: req.id, message: 'error patching the document' });
          logger.error({ id: req.id, message: e });
          return res.status(400).end();
        }

        const valid = validate(updatedDocument);
        if (!valid) {
          // Rather than send back the full error from the validator, pull out just the relevant bits
          // and fetch the value that's causing the error.
          const errors = validate.errors.map(({ dataPath, message }) => ({
            dataPath,
            message,
            value: jsonpointer.get(updatedDocument, dataPath)
          }));
          logger.error({ id: req.id, message: errors });
          return res
            .status(400)
            .send(validate.errors.map(v => ({ path: v.dataPath })))
            .end();
        }

        const updateTime = await updateAPDDocument(
          req.params.id,
          stateID,
          updatedDocument
        );

        return res.send({
          ...updatedDocument,
          id: req.params.id,
          created,
          state: stateID,
          status,
          updated: updateTime
        });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return res.status(500).end();
      }
    }
  );
};
