const logger = require('../../logger')('document routes');
const { getFile: get } = require('../../files');

const HELP_DOC = 'EUAAccountRegistration.pdf';

module.exports = (app, { getFile = get } = {}) => {
  logger.silly('setting up GET /docs/help route');

  app.get('/docs/help', async (req, res) => {
    try {
      const file = await getFile(HELP_DOC);
      res.send(file).end();
    } catch (e) {
      logger.error({ id: req.id, message: 'error fetching file' });
      res.status(400).end();
    }
  });
};
