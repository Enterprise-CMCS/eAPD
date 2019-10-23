const Ajv = require('ajv');
const moment = require('moment');

const logger = require('../../logger')('apds route post');
const { createAPD: ga, getStateProfile: gs } = require('../../db');
const { can } = require('../../middleware');

const getNewApd = require('./post.data');

const apdSchema = require('../../schemas/apd.json');

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  removeAdditional: true
});

const validatorFunction = ajv.compile({
  ...apdSchema,
  additionalProperties: false
});

module.exports = (app, { createAPD = ga, getStateProfile = gs } = {}) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res) => {
    logger.silly(req, 'handling POST /apds route');

    try {
      const apd = getNewApd();

      apd.name = `${req.user.state.id.toUpperCase()}-${moment(
        Date.now()
      ).format('YYYY-MM-DD')}-HITECH-APD`;

      const stateProfile = await getStateProfile(req.user.state.id);

      if (stateProfile && stateProfile.medicaid_office) {
        // Merge the state profile from the states table into the default
        // values so that if the states table info is missing any fields,
        // we preserve the defaults

        apd.stateProfile.medicaidDirector = {
          ...apd.stateProfile.medicaidDirector,
          ...stateProfile.medicaid_office.medicaidDirector
        };

        apd.stateProfile.medicaidOffice = {
          ...apd.stateProfile.medicaidOffice,
          ...stateProfile.medicaid_office.medicaidOffice
        };
        // An old version of the model had the director info contained inside the office field, so
        // just in case we're still hitting a really old source, delete the director from the office
        delete apd.stateProfile.medicaidOffice.director;
      }

      const valid = validatorFunction(apd);
      if (!valid) {
        // This is just here to protect us from the case where the APD schema changed but the
        // APD creation function was not also updated
        logger.error(req, 'Newly-created APD fails validation');
        logger.error(req, validatorFunction.errors);
        return res.status(500).end();
      }

      const id = await createAPD({
        state_id: req.user.state.id,
        status: 'draft',
        document: apd
      });

      return res.send({
        ...apd,
        id,
        updated: new Date().toISOString()
      });
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
