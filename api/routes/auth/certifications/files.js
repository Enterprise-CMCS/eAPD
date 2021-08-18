const multer = require('multer');
const nodeCrypto = require('crypto');

const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications post');

const { getFile: get, putFile: put } = require('../../../files');
const { validateDoc } = require('../../../util/fileValidation');

module.exports = (
  app,
  {
    getFile = get,
    putFile = put,
    crypto = nodeCrypto
  } = {}
) => {
  logger.silly('setting up POST /auth/certificates/files route');

  app.post(
    '/auth/certificates/files',
    loggedIn,
    can('edit-state-certifications'),
    multer().single('file'),
    async (req, res, next) => {
      try {
        const { size = 0, buffer = null } = req.file;
        
        const fileId = crypto
          .createHash('sha256')
          .update(buffer)
          .digest('hex');
        
        const { error = null } = await validateDoc(buffer);
        if (error) {
          res
            .status(415)
            .send({ error })
            .end();
          return;
        } else {
          try {
            await putFile(fileId, buffer);
          } catch (e) {
            logger.error({ error: `error persisting file: ${e}`})
            throw e;
          }
          res.send({ url: `/auth/certificates/files/${fileId}` });        
        }       
      } catch (e) {
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to upload file' });
      }
    }
  );
};
