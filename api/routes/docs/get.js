const logger = require('../../logger')('document routes');
const { getFile: get } = require('../../files');

const HELP_DOC = 'EUAAccountRegistration.pdf';

module.exports = (app, { getFile = get } = {}) => {
  logger.silly('setting up GET /docs/account-registration route');

  app.get('/docs/account-registration', async (req, res, next) => {
    try {
      const file = await getFile(HELP_DOC);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${HELP_DOC}`);
      return res.send(file).end();
    } catch (e) {
      return next(e);
    }
  });
};
