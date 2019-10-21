const validate = require('./validate');
const defaultHash = require('../../auth/passwordHash');
const logger = require('../../logger')('users route post');
const { knex } = require('../../db');
const can = require('../../middleware').can;
const auditor = require('../../audit');

module.exports = (app, { db = knex, hash = defaultHash } = {}) => {
  logger.silly('setting up PUT /users/:id route');
  app.put('/users/:id', can('add-users'), async (req, res) => {
    const audit = auditor(auditor.actions.MODIFY_ACCOUNT, req);
    logger.silly(req, 'handling PUT /users/:id route');
    logger.silly(req, `attempting to update user [${req.params.id}]`);

    try {
      const targetID = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(targetID)) {
        return res.status(400).end();
      }

      if (+req.user.id === targetID) {
        // Don't allow users to modify their own permissions via this route.
        logger.verbose(
          req,
          'User attempting to edit self; stripping out any auth role changes'
        );
        delete req.body.role;
      }

      const targetUser = await db('users')
        .where('id', targetID)
        .first();
      if (!targetUser) {
        logger.info(
          req,
          `requested to modify a user [${req.params.id}] that does not exist`
        );
        return res.status(404).end();
      }
      audit.target({
        id: targetUser.id,
        emmail: targetUser.email
      });
      logger.verbose(req, `request to modify user [${targetUser.email}]`);

      const update = {};

      ['email', 'name', 'password', 'position', 'phone'].forEach(field => {
        if (req.body[field]) {
          audit.set(field, req.body[field]);
          update[field] = req.body[field];
        }
      });
      if (req.body.state) {
        update.state_id = req.body.state;
      }
      if (req.body.role) {
        update.auth_role = req.body.role;
      }

      // Provide a way to unset the user's state or role.
      if (req.body.state === '') {
        audit.set('state_id', null);
        update.state_id = null;
      }
      if (req.body.role === '') {
        audit.set('auth_role', null);
        update.auth_role = null;
      }

      try {
        await validate(update);
      } catch (e) {
        return res
          .status(400)
          .send({ error: `edit-account.${e.message}` })
          .end();
      }

      if (update.password) {
        update.password = hash.hashSync(update.password);
      }
      if (update.phone) {
        update.phone = update.phone.replace(/[^\d]/g, '');
      }

      if (Object.keys(update).length) {
        await db('users')
          .where('id', targetID)
          .update(update);
      }

      audit.log();
      logger.silly(req, 'all done');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
