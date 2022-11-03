const logger = require('../../logger')('apds route post');
const { createAPD: ga, getStateProfile: gs } = require('../../db');
const { can } = require('../../middleware');

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

        apd.keyStatePersonnel.medicaidDirector = {
          ...apd.keyStatePersonnel.medicaidDirector,
          ...stateProfile.medicaidDirector
        };

        apd.keyStatePersonnel.medicaidOffice = {
          ...apd.keyStatePersonnel.medicaidOffice,
          ...stateProfile.medicaidOffice
        };
      }

      try {
        const id = await createAPD({
          stateId: req.user.state.id,
          status: 'draft',
          ...apd,
          ...req.body
        });

        return res.send({
          ...apd,
          id,
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        });
      } catch (e) {
        // This is just here to protect us from the case where the APD schema changed but the
        // APD creation function was not also updated
        logger.error({
          id: req.id,
          message: 'Newly-created APD fails validation'
        });
        logger.error({ id: req.id, message: e.errors });
        return next({ status: 400, message: e.errors });
      }
    } catch (e) {
      logger.error({ id: req.id, message: e });
      return next(e);
    }
  });
};
