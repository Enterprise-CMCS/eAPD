import loggerFactory from './logger/index.js';
import api from './api.js';

const logger = loggerFactory('main');

const { PORT } = process.env;

logger.debug('starting the server');
api.listen(PORT, () => {
  logger.verbose(`server listening on :${PORT}`);
});
