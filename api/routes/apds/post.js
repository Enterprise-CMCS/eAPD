const logger = require('../../logger')('apds route post');
const { createAPD: ga, getStateProfile: gs } = require('../../db');
const { can } = require('../../middleware');
const { validateApd } = require('../../schemas');

const getNewApd = require('./post.data');

module.exports = (app, { createAPD = ga, getStateProfile = gs } = {}) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling POST /apds route' });

    try {
      const apd = getNewApd();

      const stateProfile = await getStateProfile(req.user.state.id);

      if (stateProfile) {
        // Merge the state profile from the states table into the default
        // values so that if the states table info is missing any fields,
        // we preserve the defaults

        apd.stateProfile.medicaidDirector = {
          ...apd.stateProfile.medicaidDirector,
          ...stateProfile.medicaidDirector
        };

        apd.stateProfile.medicaidOffice = {
          ...apd.stateProfile.medicaidOffice,
          ...stateProfile.medicaidOffice
        };
        // An old version of the model had the director info contained inside the office field, so
        // just in case we're still hitting a really old source, delete the director from the office
        delete apd.stateProfile.medicaidOffice.director;
      }

      const valid = validateApd(apd);
      if (!valid) {
        // This is just here to protect us from the case where the APD schema changed but the
        // APD creation function was not also updated
        logger.error({
          id: req.id,
          message: 'Newly-created APD fails validation'
        });
        logger.error({ id: req.id, message: validateApd.errors });
        return next({ status: 400, message: validateApd.errors });
      }

      const { id } = await createAPD({
        state_id: req.user.state.id,
        status: 'draft',
        document: apd
      });

      return res.send({
        ...apd,
        id,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      });
    } catch (e) {
      logger.error({ id: req.id, message: e });
      return next(e);
    }
  });
};
