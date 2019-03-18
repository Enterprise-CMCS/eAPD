const logger = require('../../logger')('users route post');
const defaultRoleModel = require('../../db').models.role;
const defaultStateModel = require('../../db').models.state;
const defaultUserModel = require('../../db').models.user;
const can = require('../../middleware').can;

module.exports = (
  app,
  {
    RoleModel = defaultRoleModel,
    StateModel = defaultStateModel,
    UserModel = defaultUserModel
  } = {}
) => {
  logger.silly('setting up PUT /users/:id route');
  app.put('/users/:id', can('add-users'), async (req, res) => {
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

      const targetUser = await UserModel.where({ id: targetID }).fetch();
      if (!targetUser) {
        logger.info(
          req,
          `requested to modify a user [${req.params.id}] that does not exist`
        );
        return res.status(404).end();
      }
      logger.verbose(
        req,
        `request to modify user [${targetUser.get('email')}]`
      );

      // These fields aren't related to other tables, so we can update them
      // all willy-nilly.
      ['email', 'name', 'position', 'phone'].forEach(field => {
        if (req.body[field]) {
          targetUser.set(field, req.body[field]);
        }
      });

      // For state and role, however, they're related to other tables, so we
      // need to make sure the provided values are valid.
      if (req.body.state) {
        const validStates = await StateModel.fetchAll({
          columns: ['id']
        });

        const validStateIDs = validStates.map(state => state.get('id'));

        if (validStateIDs.some(role => role === req.body.state)) {
          targetUser.set('state_id', req.body.state);
        } else {
          logger.verbose(`state [${req.body.state}] is invalid`);
          return res
            .status(400)
            .send('update-user-invalid-state')
            .end();
        }
      }

      if (req.body.role) {
        const validRoles = await RoleModel.fetchAll({
          columns: ['name']
        });

        const validRoleNames = validRoles.map(role => role.get('name'));

        if (validRoleNames.some(role => role === req.body.role)) {
          targetUser.set('auth_role', req.body.role);
        } else {
          logger.verbose(`role [${req.body.role}] is invalid`);
          return res
            .status(400)
            .send('update-user-invalid-role')
            .end();
        }
      }

      // And provide a way to unset the user's state or role.
      if (req.body.state === '') {
        targetUser.set('state_id', null);
      }
      if (req.body.role === '') {
        targetUser.set('auth_role', null);
      }

      try {
        await targetUser.validate();
      } catch (e) {
        return res
          .status(400)
          .send(`update-user-${e.message}`)
          .end();
      }

      await targetUser.save();
      logger.silly(req, 'all done');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
