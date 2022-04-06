const multer = require('multer');
const nodeCrypto = require('crypto');

const { loggedIn } = require('../../../../middleware/auth');
const { can } = require('../../../../middleware');
const logger = require('../../../../logger')('auth certifications files post');

const { putFile: put } = require('../../../../files');
const { validateDoc: validDoc } = require('../../../../util/fileValidation');

module.exports = (
  app,
  { putFile = put, crypto = nodeCrypto, validateDoc = validDoc } = {}
) => {
  logger.silly('setting up POST /auth/certifications/files route');

  app.post(
    '/auth/certifications/files',
    loggedIn,
    can('edit-state-certifications'),
    multer().single('file'),
    async (req, res, next) => {
      try {
        const { buffer = null } = req.file;

        const fileId = crypto.createHash('sha256').update(buffer).digest('hex');

        const { error = null } = await validateDoc(buffer);
        if (error) {
          res.status(415).json({ error }).end();
          return;
        }

        try {
          await putFile(fileId, buffer);
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
