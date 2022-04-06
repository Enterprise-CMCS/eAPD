const logger = require('../../../logger')('apds file routes');
const { can } = require('../../../middleware');
const { fileBelongsToAPD: fb } = require('../../../db');
const { getFile: get } = require('../../../files');

module.exports = (app, { fileBelongsToAPD = fb, getFile = get } = {}) => {
  logger.silly('setting up GET /apds/:id/files/:fileID route');

  app.get(
    '/apds/:id/files/:fileID',
    can('view-document'),
    async (req, res, next) => {
      try {
        const { id, fileID } = req.params;

        if (await fileBelongsToAPD(fileID, id)) {
          const file = await getFile(fileID);
          // deepcode ignore XSS: files are stored by our system after they have been sanitized
          res.end(file);
        } else {
          res.status(400).end();
        }
      } catch (e) {
        logger.error({ id: req.id, message: 'error fetching file' });
        logger.error({ id: req.id, message: e });
        next(e);
      }
    }
  );
};
