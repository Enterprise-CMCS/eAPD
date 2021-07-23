const logger = require('../../logger')('affiliations route delete');
const { can } = require('../../middleware');
const { removeAffiliationsForUser: ra } = require('../../db/cypressUtils');

module.exports = (app, { removeAffiliationsForUser = ra } = {}) => {
  logger.debug('setting up DELETE /cypress/affiliations/:username route');

  app.delete(
    '/cypress/affiliations/:username',
    can('edit-affiliations'),
    async (req, res, next) => {
      if (req.user.role === 'eAPD Federal Admin') {
        try {
          await removeAffiliationsForUser({
            username: req.params.username
          });
          return res.status(204).end();
        } catch (err) {
          return next(err);
        }
      }
      logger.info({
        id: req.id,
        message: `user does not have permission to delete affiliations`
      });
      return res.status(403).end();
    }
  );
};
