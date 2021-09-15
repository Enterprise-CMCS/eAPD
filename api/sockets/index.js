const logger = require('../logger')('sockets index');

const registerJoinHandlers = require("./joinHandler");

module.exports = (
  expressWs
) =>{
  logger.debug('setting up sockets');
  expressWs.app.ws('/join', (ws, req) => {
    registerJoinHandlers(expressWs, ws, req)
  });

}
