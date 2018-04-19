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

    async apds() {
      logger.silly('getting user apds');
      if (!this.relations.state || !this.relations.state.apds) {
        logger.silly('user apds are not loaded yet... loading them');
        await this.load('state.apds');
      }

      return this.related('state')
        .related('apds')
        .pluck('id');
    },

    async validate() {
      logger.silly('validating user data model');
      if (this.hasChanged('email')) {
        logger.silly('email address changed; making sure it is unique');

        const otherUsersWithThisEmail = await this.where({
          email: this.attributes.email
        }).fetchAll();

        if (otherUsersWithThisEmail.length) {
          logger.verbose(
            `user with email already exists [${this.attributes.email}]`
          );
          throw new Error('email-exists');
        }

        logger.silly('new email is unique!');
      }

      if (this.hasChanged('password')) {
        logger.silly('password changed; verifying complexity/strength');

        const passwordScore = zxcvbn(this.attributes.password, [
          this.attributes.email,
          this.attributes.name
        ]);
        if (passwordScore.score < 3) {
          logger.verbose(`password is too weak: score ${passwordScore.score}`);
          throw new Error('weak-password');
        }

        logger.silly('password is sufficiently complex; hashing it');
        this.set({ password: bcrypt.hashSync(this.attributes.password) });
      }

      if (this.hasChanged('phone')) {
        logger.silly('phone changed; verifying that it is just 10 digits');

        const phone = this.attributes.phone.replace(/[^\d]/g, '');
        if (phone.length > 10) {
          logger.verbose(`phone number is invalid [${this.attributes.phone}]`);
          throw new Error('invalid-phone');
        }

        logger.silly('phone is valid; updating to just numbmers');
        this.set({ phone });
      }

      logger.silly('model is valid!');
    },

    toJSON() {
      return {
        id: this.get('id'),
        email: this.get('email'),
        name: this.get('name'),
        position: this.get('position'),
        phone: this.get('phone'),
        state_id: this.get('state_id')
      };
    }
  }
});
