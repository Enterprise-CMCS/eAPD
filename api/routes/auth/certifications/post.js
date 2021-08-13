const { raw: knex } = require('../../../db');
const { loggedIn } = require('../../../middleware/auth');
const logger = require('../../../logger')('affiliations route post');

module.exports = app => {
  app.post(
    '/auth/certificates',
    loggedIn,
    (request, response, next) => {
      const { email, state, certified_by, file_id } = request.body;
      
      // Todo: Find out where exactly request.user is coming from.
      // I assume we can trust it but not positive. Also consider
      // not comparing it to a hardcoded string but rather a lookup
      if (request.user.role !== 'eAPD Federal Admin') {
        logger.error({
          id: request.id,
          message: `authorization failed when attempting to add state admin certificate`
        });
        response.status(403).end();
        return;
      }
      
      try {
        knex('state_admin_certifications')
          .insert({
            email: email,
            state: state,
            certifiedBy: certified_by,
            file_id: file_id
          })
          .then(rows => response.status(201).json(rows[0]))
          .catch(next);
      } catch (e) {
        logger.error({ id: request.id, message: e });
        next(e);
      }
    }
  );
};
