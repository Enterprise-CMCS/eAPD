---
to: api/routes/<%= httpPath %>/<%= httpVerb %>.js
---

const { loggedIn } = require('../../../middleware/auth');
// const { can } = require('../../../middleware');
const logger = require('../../../logger')('<%= httpPath %> <%= httpVerb %>');

module.exports = (
  app,
  {

    // add direct injections here
  } = {}
) => {
  logger.silly('setting up <%= httpVerb.toUpperCase() %> /<%= httpPath %> route');

  app.<%= httpVerb %>(
    '/<%= httpPath %>',
    loggedIn,
    // can('foo')
    async (req, res, next) => {
      try {
        const result = {result: 'success'}
        res.send(result);
      } catch (e) {
        logger.error({ id: req.id, message: 'change me' });
        logger.error({ id: req.id, message: e });
        next({ message: 'change me' });
      }
    }
  );
};
