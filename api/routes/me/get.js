const logger = require('../../logger')('me route get');
const { jwtExtractor, verifyEAPDToken, exchangeToken } = require('../../auth/jwtUtils');

module.exports = (
  app,
  {
    extractor = jwtExtractor,
    eapdTokenVerifier = verifyEAPDToken,
    tokenExchanger = exchangeToken

  } = {}
) => {
  logger.debug('setting up GET endpoint');
  app.get('/me',
    async (req, res) => {

    try{
      const jwt = extractor(req)
      const claims = jwt ? await eapdTokenVerifier(jwt) : false;
      if (!claims) return res.status(401).end();
      res.send(claims);

    }
    catch(error){
      res.status(500).send(error)
    }
    return null
  });

  app.get('/me/jwToken', async (req, res) => {
    try{
      const user = await tokenExchanger(req)
      if (!user) res.status(401).send()
      res.send(user);
    }
    catch(error){
      res.status(500).send(error)
    }
    return null
  });
};
