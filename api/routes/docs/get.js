const logger = require('../../logger')('document routes');
const { getFile: get } = require('../../files');

const HELP_DOC = 'EUAAccountRegistration.pdf';

module.exports = (app, { getFile = get } = {}) => {
  logger.silly('setting up GET /docs/account-registration route');

  app.get('/docs/account-registration', async (req, res) => {
    try {
      const file = await getFile(HELP_DOC);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${HELP_DOC}`);
      res.send(file).end();
    } catch (e) {
      logger.error({ id: req.id, message: 'error fetching file' });
      res.status(400).end();
    }
  });
};
