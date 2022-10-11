const logger = require('../../logger')('apds route get');
const {
  getAllAPDsByState: gas,
  getAPDByIDAndState: ga,
  adminCheckAPDDocument: validate
} = require('../../db');
const { can } = require('../../middleware');

module.exports = (
  app,
  {
    getAllAPDsByState = gas,
    getAPDByIDAndState = ga,
    adminCheckAPDDocument = validate
  } = {}
) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', can('view-document'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling GET /apds' });

    try {
      const stateId = req.user.state.id;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res
          .status(403)
          .send({ error: 'user does not have an associated state' })
          .end();
      }

      const apds = (await getAllAPDsByState(stateId)).map(
        ({
          _id: id,
          createdAt: created,
          updatedAt: updated,
          stateId: state,
          name,
          status,
          years
        }) => ({
          id,
          created,
          updated,
          state,
          name,
          status,
          years
        })
      );

      logger.silly({
        id: req.id,
        message: `got apds: ${apds.map(({ id, name }) => ({ id, name }))}`
      });
      return res.send(apds);
    } catch (e) {
      return next(e);
    }
  });

  app.get(
    '/apds/:id([0-9a-fA-F]{24}$)',
    can('view-document'),
    async (req, res, next) => {
      logger.silly({ id: req.id, message: 'handling GET /apds/:id' });

      try {
        const stateId = req.user.state.id;

        if (!stateId) {
          logger.verbose('user does not have an associated state');
          return res
            .status(403)
            .send({ error: 'user does not have an associated state' })
            .end();
        }

        logger.info(`id: ${req.params.id}, state: ${stateId}`);
        const apdFromDB = await getAPDByIDAndState(req.params.id, stateId);

        const adminCheck = await adminCheckAPDDocument(req.params.id);

        if (apdFromDB) {
          const {
            _id: id,
            createdAt: created,
            updatedAt: updated,
            stateId: state,
            ...rest
          } = apdFromDB;
          const apd = {
            ...rest,
            id,
            created,
            updated,
            state
          };

          logger.silly({
            id: req.id,
            message: `got single apd, id=${apd.id}, name="${apd.name}"`
          });
          return res.send({ apd, adminCheck });
        }

        logger.verbose({ id: req.id, message: 'apd does not exist' });
        return res.status(404).send({ error: 'apd does not exist' }).end();
      } catch (e) {
        return next(e);
      }
    }
  );
};
