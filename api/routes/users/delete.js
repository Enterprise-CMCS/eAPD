const logger = require('../../logger')('users route get');
const { deleteUserByID: du, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;
const auditor = require('../../audit');

module.exports = (app, { deleteUserByID = du, getUserByID = gu } = {}) => {
  logger.silly('setting up DELETE /users/:id route');
  app.delete('/users/:id', can('delete-users'), async (req, res) => {
    logger.silly(req, 'handling DELETE /users/:id route');
    logger.verbose(req, 'got a request to delete a user', req.params.id);

    try {
      const audit = auditor(auditor.actions.REMOVE_ACCOUNT, req);
      const targetID = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(targetID)) {
        return res.status(400).end();
      }

      if (req.user.id === targetID) {
        logger.verbose(req, 'User attempting to delete self');
        return res.status(403).end();
      }

      const targetUser = await getUserByID(targetID);

      if (!targetUser) {
        logger.info(
          req,
          `requested to delete a user [${req.params.id}] that does not exist`
        );
        return res.status(404).end();
      }
      logger.verbose(req, `request to delete user [${targetUser.email}]`);
      audit.target({ id: targetID, email: targetUser.email });

      logger.silly(req, 'destroying user');
      await deleteUserByID(targetID);
      audit.log();
      logger.silly(req, 'okay, all good');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
