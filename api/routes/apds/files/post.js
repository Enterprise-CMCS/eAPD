const multer = require('multer');
const logger = require('../../../logger')('apds file routes');
const { can, userCanEditAPD } = require('../../../middleware');
const { validateFile: vf } = require('../../../util/fileValidation');
const { createNewFileForAPD: cf, deleteFileByID: df } = require('../../../db');
const { putFile: put } = require('../../../files');

module.exports = (
  app,
  {
    validateFile = vf,
    createNewFileForAPD = cf,
    deleteFileByID = df,
    putFile = put
  } = {}
) => {
  logger.silly('setting up POST /apds/:id/files route');

  // "Never add multer as a global middleware since a malicious user could
  // upload files to a route that you didn't anticipate."
  // -- https://github.com/expressjs/multer#any
  app.post(
    '/apds/:id/files',
    can('view-document'),
    userCanEditAPD(),
    multer().single('file'),
    async (req, res, next) => {
      try {
        const { metadata = null } = req.body;
        const { size = 0, buffer = null } = req.file;

        const { error = null, image = null } = await validateFile(buffer);
        if (error) {
          return res.status(415).json({ error }).end();
        }
        const fileID = await createNewFileForAPD(
          image,
          req.params.id,
          metadata,
          size
        );

        try {
          await putFile(fileID, image);
        } catch (e) {
          await deleteFileByID(fileID);
          throw e;
        }

        return res.json({ url: `/apds/${req.params.id}/files/${fileID}` });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        return next({ message: 'Unable to upload file' });
      }
    }
  );
};
