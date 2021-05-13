const logger = require('../../logger')('me route get');
const { sign } = require('../../auth/jwtUtils')
const { jwtExtractor, verifyEAPDToken, verifyWebToken } = require('../../auth/jwtUtils');
const { verifyJWT } = require('../../auth/oktaAuth');
const { getUserByID } = require('../../db');


module.exports = app => {
  logger.debug('setting up GET endpoint');
  app.get('/me',
    async (req, res) => {

    try{
      const jwt = jwtExtractor(req)
      const claims = jwt ? await verifyEAPDToken(jwt) : false;

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
      const jwt = jwtExtractor(req)
      // verify the token using the okta verifier.
      const claims = jwt ? await verifyWebToken(jwt, {verifier:verifyJWT}) : false;

      if (!claims) return res.status(401).end();

      const { uid, ...additionalValues } = claims;
      const user = await getUserByID(uid, true, { additionalValues });
      user.jwt = sign(user)
      req.user = user
      res.send(req.user);
    }
    catch(error){
      res.status(500).send(error)
    }
    return null
  });
};
