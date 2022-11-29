import { addYears, format } from 'date-fns';
import { raw as knex } from '../../../db/index.js';
import { loggedIn } from '../../../middleware/index.js';
import loggerFactory from '../../../logger/index.js';

const logger = loggerFactory('affiliations route post');

export default app => {
  app.post(
    '/states/:stateId/affiliations',
    loggedIn,
    (request, response, next) => {
      const userId = request.user.id;
      const { stateId } = request.params;

      try {
        knex('auth_affiliations')
          .returning(['id'])
          .insert({
            user_id: userId,
            state_id: stateId,
            username: request.user.username,
            expires_at: format(addYears(new Date(), 1), 'yyyy-MM-dd HH:mm:ss')
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
