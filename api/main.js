import loggerFactory from './logger/index';
import api from './api';

const logger = loggerFactory('main');

const { PORT } = process.env;

logger.debug('starting the server');
api.listen(PORT, () => {
  logger.verbose(`server listening on :${PORT}`);
});
