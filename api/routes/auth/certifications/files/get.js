
const { loggedIn } = require('../../../../middleware/auth');
const { can } = require('../../../../middleware');
const logger = require('../../../../logger')('auth certifications post');

const { getFile: get} = require('../../../../files');

module.exports = (
  app,
  {
    getFile = get,
  } = {}
) => {
  logger.silly('setting up GET /auth/certifications/files/:fileID route');

  app.get(
    '/auth/certifications/files/:fileID',
    loggedIn,
    can('view-state-certifications'),
    async (req, res, next) => {
      try {
        const file = await getFile(req.params.fileID);
        if(file) {
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=upload.pdf` // Todo: Capture metadata when file is uploaded and return it back
          );
          res.send(file).end();
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
