import loggerFactory from '../../logger/index.js';
import {
  verifyEAPDToken,
  exchangeToken,
  updateUserToken,
  verifyWebToken
} from '../../auth/jwtUtils.js';

const logger = loggerFactory('me route get');

export default (
  app,
  {
    verifyOkta = verifyWebToken,
    verifyEAPD = verifyEAPDToken,
    tokenExchanger = exchangeToken,
    tokenUpdater = updateUserToken
  } = {}
) => {
  logger.debug('setting up GET endpoint');
  app.get('/me', async (req, res, next) => {
    try {
      // when getting the user's data, the eAPD token is supplied,
      // so the verifier should be the eAPD verifier
      const user = await tokenUpdater(req, { verifier: verifyEAPD });
      if (!user) return res.status(401).send();
      return res.send(user);
    } catch (e) {
      return next(e);
    }
  });

  app.get('/me/jwToken', async (req, res, next) => {
    try {
      // when exchaning tokens, you switch an Okta token for a EAPD token,
      // so the verifier should be the Okta verifier
      const user = await tokenExchanger(req, { verifier: verifyOkta });
      if (!user) return res.status(401).send();
      return res.send(user);
    } catch (e) {
      return next(e);
    }
  });
};
