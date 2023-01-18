import loggerFactory from '../../../logger/index.js';
import { can } from '../../../middleware/index.js';
import { fileBelongsToAPD as fb } from '../../../db/index.js';
import { getFile as get } from '../../../files/index.js';

const logger = loggerFactory('apds file routes');

export default (app, { fileBelongsToAPD = fb, getFile = get } = {}) => {
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
