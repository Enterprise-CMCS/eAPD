const logger = require('./logger')('main');
const api = require('./api');
const sockets = require('./sockets')

const { PORT } = process.env;

logger.debug('starting the server');
const server = api.listen(PORT, () => {
  logger.verbose(`server listening on :${PORT}`);
});
// setup the socket connection and put it on the api
api.io = sockets(server)

