const multer = require('multer');

const { loggedIn } = require('../../../middleware/auth');
const logger = require('../../../logger')('auth certifications post');

const { getFile: get, putFile: put } = require('../../../files');

const { validateDoc } = require('../../../util/fileValidation');

module.exports = (
  app,
  {
    addStateAdminCertification = ac,
    deleteStateAdminCertification = dc,
    getFile = get,
    putFile = put
  } = {}
) => {
  logger.silly('setting up POST /auth/certificates/files route');
  
  app.post(
    '/auth/certificates',
    loggedIn,
    multer().single('file'),
    async (req, res, next) => {
      const { state, certifiedBy, email, metadata = null } = req.body;
      const { size = 0, buffer = null } = req.file;
      const username = req.user.id;
      
      // Todo: Consider switching this to a lookup
      if (req.user.role !== 'eAPD Federal Admin') {
        logger.error({
          id: req.id,
          message: `authorization failed when attempting to add state admin certificate`
        });
        res.status(403).end();
        return;
      }
      
      // Validate filetype
      const { error = null } = await validateDoc(req.file);
      if (error) {
        res
          .status(415)
          .send({ error })
          .end();
        return;
      }
      
      try {
        // insert the data into the database. no file written locally or sent to s3 yet
        const fileID = await addStateAdminCertification(
          buffer,
          username,
          state,
          certifiedBy,
          email,
          size,
          metadata
        );
        
        // attempt to save the file to local/s3 with the 
        // fileID we generated + the binary data
        try {
          await putFile(fileID, buffer);
        } catch (e) {
          console.log("error on the putFile");
          await deleteStateAdminCertification(fileID);
          throw e;
        }
        
        res.send({ url: `/auth/certificates/${fileID}` });
      } catch (e) {
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to upload file' });
      }
    }
  );
};
