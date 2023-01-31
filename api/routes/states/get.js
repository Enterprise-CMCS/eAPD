import { raw, getStateAdmins } from '../../db/index.js';
import { validForState } from '../../middleware/auth.js';

export default app => {
  app.get('/states', (request, response, next) => {
    raw('states')
      .select('id', 'name')
      .then(rows => response.status(200).json(rows))
      .catch(next);
  });

  app.get('/states/:id', validForState('id'), (request, response, next) => {
    const { id } = request.params;
    Promise.all([raw('states').where({ id }).first(), getStateAdmins(id)])
      .then(([row, stateAdmins]) => {
        if (row) {
          response.status(200).json({ ...row, stateAdmins });
        } else {
          response.status(404).end();
        }
      })
      .catch(next);
  });
};
