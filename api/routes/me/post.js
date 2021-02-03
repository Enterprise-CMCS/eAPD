const logger = require('../../logger')('me route post');

module.exports = app => {
  logger.debug('setting up POST endpoint');
  app.post('/logout', (req, res) => {
    res.clearCookie('gov.cms.eapd.api-token');
    return res.status(200).end();
  });
};
