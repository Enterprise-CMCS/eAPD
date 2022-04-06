const logger = require('./logger')('main');
const api = require('./api');

const { PORT } = process.env;

logger.debug('starting the server');
api.listen(PORT, () => {
  logger.verbose(`server listening on :${PORT}`);
});
