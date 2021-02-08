const db = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = app => {
  app.get('/states', (request, response, next) => {
    db.raw('states')
      .select('id', 'name')
      .then(rows => response.status(200).json(rows))
      .catch(next);
  });

  app.get('/states/:id', loggedIn, (request, response, next) => {
    const { id } = request.params;
    db.raw('states')
      .where({ id })
      .first()
      .then(row => {
        if (row) {
          stateAdmins = db.getStateAdmins(id);
          response.status(200).json({ ...row, stateAdmins });
        } else {
          response.status(400).end();
        }
      })
      .catch(next);
  });
};
