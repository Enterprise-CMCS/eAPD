const defaultBcrypt = require('bcryptjs');
const defaultZxcvbn = require('zxcvbn');
const logger = require('../logger')('db user model');

module.exports = (zxcvbn = defaultZxcvbn, bcrypt = defaultBcrypt) => ({
  user: {
    tableName: 'users',

    role() {
      return this.hasOne('role', 'name', 'auth_role');
    },

    state() {
      return this.hasOne('state', 'id', 'state_id');
    },

    async activities() {
      logger.silly('getting user activities');
      if (!this.relations.role || !this.relations.role.activities) {
        logger.silly('user activities are not loaded yet... loading them');
        await this.load('role.activities');
      }

      return this.related('role')
        .related('activities')
        .pluck('name');
    },

    async validate(model = this) {
      logger.silly('validating user data model');
      if (model.hasChanged('email')) {
        logger.silly('email address changed; making sure it is unique');

        const otherUsersWithThisEmail = await this.where({
          email: model.attributes.email
        }).fetchAll();

        if (otherUsersWithThisEmail.length) {
          logger.verbose(
            `user with email already exists [${model.attributes.email}]`
          );
          throw new Error('email-exists');
        }

        logger.silly('new email is unique!');
      }

      if (model.hasChanged('password')) {
        logger.silly('password changed; verifying complexity/strength');

        const passwordScore = zxcvbn(model.attributes.password, [
          model.attributes.email,
          model.attributes.name
        ]);
        if (passwordScore.score < 3) {
          logger.verbose(`password is too weak: score ${passwordScore.score}`);
          throw new Error('weak-password');
        }

        logger.silly('password is sufficiently complex; hashing it');
        model.set({ password: bcrypt.hashSync(model.attributes.password) });
      }

      if (model.hasChanged('phone')) {
        logger.silly('phone changed; verifying that it is just 10 digits');

        const phone = model.attributes.phone.replace(/[^\d]/g, '');
        if (phone.length > 10) {
          logger.verbose(`phone number is invalid [${model.attributes.phone}]`);
          throw new Error('invalid-phone');
        }

        logger.silly('phone is valid; updating to just numbmers');
        model.set({ phone });
      }

      logger.silly('model is valid!');
    }
  }
});
