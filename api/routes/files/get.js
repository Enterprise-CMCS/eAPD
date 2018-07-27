const logger = require('../../logger')('files route get');
const loggedIn = require('../../middleware').loggedIn;

const { file: defaultFileModel } = require('../../db').models;
const defaultStore = require('../../store');

module.exports = (
  app,
  { FileModel = defaultFileModel, store = defaultStore } = {}
) => {
  logger.silly('setting up GET endpoint');
  app.get('/files/:id', loggedIn, async (req, res) => {
    try {
      const { id } = req.params;
      logger.silly(req, `asked for file with id ${id}`);

      const file = await FileModel.where({ id }).fetch({
        withRelated: ['activities.apd', 'contractors.activity.apd']
      });

      if (!file) {
        logger.info(req, `No file with id ${id}`);
        return res.status(404).end();
      }

      const key = file.get('key');

      if (await store.exists(key)) {
        const userApds = await req.user.model.apds();
        logger.silly(req, `user has access to apds: [${userApds}]`);

        const fileApds = [
          ...file.related('activities').map(a => a.related('apd').get('id')),
          ...file.related('contractors').map(c =>
            c
              .related('activity')
              .related('apd')
              .get('id')
          )
        ];
        logger.silly(req, `file is mapped to apds: [${fileApds}]`);

        if (fileApds.some(a => userApds.includes(a))) {
          logger.silly(req, `user has access!`);
          return store.getReadStream(key).pipe(res);
        }
        logger.info(req, `User does not have permission to file ${id}`);
      } else {
        logger.info(req, `No file in blob store with key ${key}`);
      }

      return res.status(404).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
