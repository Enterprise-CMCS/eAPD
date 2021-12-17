const logger = require('../../logger')('me route get');
const {
  jwtExtractor,
  verifyEAPDToken,
  exchangeToken,
  verifyWebToken,
  verifyExpirations,
  changeState
} = require('../../auth/jwtUtils');
const { createOrUpdateOktaUserFromOkta } = require('../../db/oktaUsers');

module.exports = (
  app,
  {
    extractor = jwtExtractor,
    verifier = verifyEAPDToken,
    tokenExchanger = exchangeToken,
    updateFromOkta = createOrUpdateOktaUserFromOkta,
    hasExpired = verifyExpirations
  } = {}
) => {
  logger.debug('setting up GET endpoint');
  app.get('/me', async (req, res, next) => {
    try {
      const jwt = extractor(req);
      const claims = jwt ? await verifyWebToken(jwt, { verifier }) : false;
      if (!claims) return res.status(401).end();      
      await updateFromOkta(claims.id);
      // check expiration dates
      // todo: if this method returns true, generate a new jwt
      await hasExpired(claims);
      // generate new jwt claim object
      return res.send(claims);
    } catch (e) {
      return next(e);
    }
  });

  app.get('/me/jwToken', async (req, res, next) => {
    try {
      const user = await tokenExchanger(req, res);
      if (!user) return res.status(401).send();
      return res.send(user);
    } catch (e) {
      return next(e);
    }
  });
};
