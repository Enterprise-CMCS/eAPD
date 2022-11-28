import loggerFactory from '../../../logger';
import { can, userCanEditAPD } from '../../../middleware';
import { validateImage as vf } from '../../../util/fileValidation';
import { createNewFileForAPD as cf, deleteFileByID as df } from '../../../db';
import { putFile as put } from '../../../files/index.cjs';

const logger = loggerFactory('apds file routes');

export default (
  app,
  {
    validateFile = vf,
    createNewFileForAPD = cf,
    deleteFileByID = df,
    putFile = put
  } = {}
) => {
  logger.silly('setting up POST /apds/:id/files route');

  app.post(
    '/apds/:id/files',
    can('view-document'),
    userCanEditAPD(),
    async (req, res, next) => {
      try {
        const { metadata = null } = req.body;
        const { size = 0, data = null } = req.files.file;

        const { error = null, image = null } = await validateFile(data);
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
