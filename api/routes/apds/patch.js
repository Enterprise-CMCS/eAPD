const Ajv = require('ajv');
const { apply_patch: applyPatch } = require('jsonpatch');
const jsonpointer = require('jsonpointer');

const logger = require('../../logger')('apds route put');
const { getAPDByID: ga, updateAPDDocument: ua } = require('../../db');
const { can, userCanEditAPD } = require('../../middleware');
const apdSchema = require('../../schemas/apd.json');

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  // The validator will remove any fields that aren't in the schema
  removeAdditional: true
});

const validatorFunction = ajv.compile({
  ...apdSchema,
  additionalProperties: false
});

// This is a list of property paths that cannot be changed with this endpoint.
// Any patches pointing at these paths will be ignored.
const staticFields = ['/name'];

module.exports = (
  app,
  {
    getAPDByID = ga,
    patchObject = applyPatch,
    updateAPDDocument = ua,
    validateApd = validatorFunction
  } = {}
) => {
  logger.silly('setting up PATCH /apds/:id route');
  app.patch(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    async (req, res) => {
      logger.silly(req, 'handling PATCH /apds/:id route');
      if (!req.params.id) {
        logger.error(req, 'no ID given');
        return res.status(400).end();
      }
      if (!Array.isArray(req.body)) {
        logger.error(req, 'request body must be an array');
        return res.status(400).end();
      }

      logger.silly(req, `attempting to update APD [${req.params.id}]`);

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
          logger.error(req, 'error patching the document');
          logger.error(null, e);
          return res.status(400).end();
        }

        const valid = validateApd(updatedDocument);
        if (!valid) {
          logger.error(
            req,
            // Rather than send back the full error from the validator, pull out just the relevant bits
            // and fetch the value that's causing the error.
            validateApd.errors.map(({ dataPath, message }) => ({
              dataPath,
              message,
              value: jsonpointer.get(updatedDocument, dataPath)
            }))
          );
          return res
            .status(400)
            .send(validateApd.errors.map(v => ({ path: v.dataPath })))
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
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
