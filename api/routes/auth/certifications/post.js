const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications post');

const { addStateAdminCertification: addCert } = require('../../../db/certifications');

module.exports = (
  app,
  {
    addStateAdminCertification = addCert
  } = {}
) => {
  logger.silly('setting up POST /auth/certifications route');

  app.post(
    '/auth/certifications',
    loggedIn,
    can('edit-state-certifications'),
    async (req, res, next) => {
      const { 
        name, 
        email, 
        phone, 
        state, 
        certifiedByName,
        certifiedByTitle,
        certifiedByEmail,
        certifiedBySignature,
        fileUrl
      } = req.body;

      try {        
        const { error = null } = await addStateAdminCertification({
          uploadedBy: req.user.id,
          name: name, 
          email: email, 
          phone: phone, 
          state: state, 
          certifiedByName: certifiedByName,
          certifiedByTitle: certifiedByTitle,
          certifiedByEmail: certifiedByEmail,
          certifiedBySignature: certifiedBySignature,
          fileUrl: fileUrl            
        });
        if (error) {
          res.status(400).end();
        }
        res.send(200);
      } catch (e) {
        logger.error({ id: req.id, message: 'error adding new state admin certification' });
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to save state admin certification' });
      }
    }
  );
};