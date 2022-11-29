import nodeCrypto from 'crypto';
import { can, loggedIn } from '../../../../middleware/index.js';
import loggerFactory from '../../../../logger/index.js';
import { validateDoc as validDoc } from '../../../../util/fileValidation.js';
import { putFile as put } from '../../../../files/index.cjs';

const logger = loggerFactory('auth certifications files post');

export default (
  app,
  { putFile = put, crypto = nodeCrypto, validateDoc = validDoc } = {}
) => {
  logger.silly('setting up POST /auth/certifications/files route');

  app.post(
    '/auth/certifications/files',
    loggedIn,
    can('edit-state-certifications'),
    async (req, res, next) => {
      try {
        const { data = null } = req.files.file;
        const fileId = crypto.createHash('sha256').update(data).digest('hex');

        const { error = null } = await validateDoc(data);
        if (error) {
          res.status(415).json({ error }).end();
          return;
        }

        try {
          await putFile(fileId, data);
        } catch (e) {
          logger.error(`Error persisting file`);
          throw e;
        }
        res.send({ url: `/auth/certifications/files/${fileId}` });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to upload file' });
      }
    }
  );
};
