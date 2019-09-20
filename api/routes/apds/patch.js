const Ajv = require('ajv');
const { apply_patch: applyPatch } = require('jsonpatch');
const jsonpointer = require('jsonpointer');

const logger = require('../../logger')('apds route put');
const { raw: db } = require('../../db');
const { can, userCanEditAPD } = require('../../middleware');
const apdSchema = require('../../schemas/apd.json');

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  removeAdditional: true
});

const validateApd = ajv.compile({ ...apdSchema, additionalProperties: false });

// This is a list of property paths that cannot be changed with this endpoint.
// Any patches pointing at these paths will be ignored.
const staticFields = ['/name'];

module.exports = app => {
  logger.silly('setting up PATCH /apds/:id route');
  app.patch(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    async (req, res) => {
      logger.silly(req, 'handling PATCH /apds/:id route');
      logger.silly(req, `attempting to update APD [${req.params.id}]`);

      try {
        // Filter out any patches that target unchangeable properties
        const patch = req.body.filter(
          ({ path }) => !staticFields.includes(path)
        );

        const {
          document: currentDocument,
          state_id: stateID,
          status
        } = await db('apds')
          .where('id', req.params.id)
          .first('document', 'state_id', 'status');

        let updatedDocument;
        try {
          updatedDocument = applyPatch(currentDocument, patch);
        } catch (e) {
          // This can happen for a variety of reasons. E.g., a patch tries to
          // operate on a property that doesn't currently exist.
          logger.error(req, 'error patching the document');
          logger.error(null, e);
          return res.sendStatus(400).end();
        }

        const valid = validateApd(updatedDocument);
        if (!valid) {
          logger.error(
            req,
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

        const updateTime = new Date().toISOString();

        await db('apds')
          .where('id', req.params.id)
          .update({
            document: updatedDocument,
            updated_at: updateTime
          });

        const stateProfileChanged = patch.some(p =>
          p.path.startsWith('/stateProfile/')
        );

        // If the state profile was changed for the APD, also persist it to
        // the state, so future APDs will get it for free.
        if (stateProfileChanged) {
          await db('states')
            .where('id', stateID)
            .update({ medicaid_office: updatedDocument.stateProfile });
        }

        return res.send({
          ...updatedDocument,
          id: req.params.id,
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
