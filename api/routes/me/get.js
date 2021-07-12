const logger = require('../../logger')('me route get');
const {
  jwtExtractor,
  verifyEAPDToken,
  exchangeToken,
  verifyWebToken
} = require('../../auth/jwtUtils');
const { createOrUpdateOktaUserFromOkta } = require('../../db/oktaUsers')


module.exports = (
  app,
  {
    extractor = jwtExtractor,
    verifier = verifyEAPDToken,
    tokenExchanger = exchangeToken,
    updateFromOkta = createOrUpdateOktaUserFromOkta

  } = {}
) => {
  logger.debug('setting up GET endpoint');
  app.get('/me', async (req, res) => {
    try {
      const jwt = extractor(req);
      const claims = jwt ? await verifyWebToken(jwt, { verifier }) : false;
      if (!claims) return res.status(401).end();
      await updateFromOkta(claims.id)
      res.send(claims);
    } catch (error) {
      res.status(500).send(error);
    }
    return null;
  });

  app.get('/me/jwToken', async (req, res) => {
    try {
      const user = await tokenExchanger(req, res);
      if (!user) res.status(401).send();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
    return null;
  });
};
