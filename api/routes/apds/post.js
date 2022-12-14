const logger = require('../../logger')('apds route post');
const { createAPD: ga, getStateProfile: gs } = require('../../db');
const { can } = require('../../middleware');

const getNewApd = require('./post.data');

module.exports = (app, { createAPD = ga, getStateProfile = gs } = {}) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling POST /apds route' });

    try {
      const { apdType, ...additionalValues } = req.body;
      const blankApd = getNewApd(apdType);
      const apd = {
        ...blankApd,
        ...additionalValues,
        apdOverview: {
          ...blankApd.apdOverview,
          ...additionalValues.apdOverview
        }
      };

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
        console.log('Is this working? 0');
        const id = await createAPD({
          stateId: req.user.state.id,
          status: 'draft',
          ...apd
        });
        console.log('Is this working? 1');

        return res.send({
          ...apd,
          id,
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        });
      } catch (e) {
        // This is just here to protect us from the case where the APD schema changed but the
        // APD creation function was not also updated
        logger.error(`error: ${JSON.stringify(e, null, 2)}`);
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
