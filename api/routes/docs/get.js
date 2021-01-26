const logger = require('../../logger')('document routes');
const { getFile: get } = require('../../files');

const HELP_DOC = 'EUAAccountRegistration.pdf';

module.exports = (app, { getFile = get } = {}) => {
  logger.silly('setting up GET /docs/account-registration route');

  app.get('/docs/account-registration', async (req, res, next) => {
    getFile(HELP_DOC)
      .then(file => {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${HELP_DOC}`
        );
        res.send(file).end();
      })
      .catch(error => {
        console.log({ error });
        next(error);
      });
  });
};
