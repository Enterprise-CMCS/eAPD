import loggerFactory from '../../logger';
import { getFile as get } from '../../files/index.cjs';

const logger = loggerFactory('document routes');

const ACCOUNT_REGISTRATION_DOC = 'EUAAccountRegistration.pdf';
const SYSTEM_ACCESS_DOC = 'eAPDSystemAccess.pdf';

export default (app, { getFile = get } = {}) => {
  logger.silly('setting up GET /docs/account-registration route');

  app.get('/docs/account-registration', async (req, res, next) => {
    try {
      const file = await getFile(ACCOUNT_REGISTRATION_DOC);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${ACCOUNT_REGISTRATION_DOC}`
      );
      res.send(file).end();
    } catch (e) {
      next(e);
    }
  });

  logger.silly('setting up GET /docs/system-access route');

  app.get('/docs/system-access', async (req, res, next) => {
    try {
      const file = await getFile(SYSTEM_ACCESS_DOC);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${SYSTEM_ACCESS_DOC}`
      );
      res.send(file).end();
    } catch (e) {
      next(e);
    }
  });
};
