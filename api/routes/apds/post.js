import loggerFactory from '../../logger/index.js';
import { createAPD as ga, getStateProfile as gs } from '../../db/index.js';
import { can } from '../../middleware/index.js';
import getNewApd from './post.data.js';

const logger = loggerFactory('apds route post');

export default (app, { createAPD = ga, getStateProfile = gs } = {}) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling POST /apds route' });

    try {
      const { apdType, years, ...additionalValues } = req.body;
      const blankApd = getNewApd(apdType, years);
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
        const id = await createAPD({
          stateId: req.user.state.id,
          status: 'draft',
          ...apd
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
