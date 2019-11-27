/* eslint-disable camelcase */

const defaultZxcvbn = require('zxcvbn');
const { knex } = require('../../db');
const logger = require('../../logger')('user validation');

module.exports = async (
  { id, email, password, auth_role, phone, state_id },
  { db = knex, zxcvbn = defaultZxcvbn } = {}
) => {
  if (email) {
    logger.silly('checking email');

    const usersWithEmail = await db('users')
      .whereRaw('LOWER(email) = ?', [email.toLowerCase()])
      .select('id')
      .first();

    if (usersWithEmail && usersWithEmail.id !== id) {
      logger.verbose(`user with email already exists [${email}]`);
      throw new Error('email-exists');
    }

    logger.silly('email is unique');
  }

  if (password) {
    logger.silly('checking password complexity/strength');

    const compare = [];
    if (id) {
      const user = await db('users')
        .where('id', id)
        .select('email', 'name')
        .first();

      compare.push(email || user.email);
      compare.push(user.name);
    }

    const passwordScore = zxcvbn(password, compare);
    if (passwordScore.score < 3) {
      logger.verbose(`password is too weak: score ${passwordScore.score}`);
      throw new Error('weak-password');
    }

    logger.silly('password is sufficiently complex');
  }

  if (phone) {
    logger.silly('checking phone is just 10 digits');

    const numericPhone = phone.replace(/[^\d]/g, '');
    if (numericPhone.length > 10) {
      logger.verbose(`phone number is invalid [${phone}]`);
      throw new Error('invalid-phone');
    }

    logger.silly('phone is valid');
  }

  if (auth_role) {
    logger.silly('checking auth role');
    if (
      !(await db('auth_roles')
        .where('name', auth_role)
        .first())
    ) {
      logger.verbose(`auth role is invalid [${auth_role}]`);
      throw new Error('invalid-role');
    }
    logger.silly('auth role is valid');
  }

  if (state_id) {
    logger.silly('checking state ID');
    if (
      !(await db('states')
        .where('id', state_id)
        .first())
    ) {
      logger.verbose(`state ID is invalid [${state_id}]`);
      throw new Error('invalid-state');
    }
    logger.silly('state ID is valid');
  }
};
