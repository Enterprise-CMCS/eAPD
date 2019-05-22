const logger = require('./logger')('AUDIT');

const CREATE_ACCOUNT = Symbol('audit: create account');
const DISABLE_ACCOUNT = Symbol('audit: disable account');
const ENABLE_ACCOUNT = Symbol('audit: enable account');
const MODIFY_ACCOUNT = Symbol('audit: modify account');
const REMOVE_ACCOUNT = Symbol('audit: remove account');

const actionsToProps = {
  [CREATE_ACCOUNT]: 'createAccount',
  [DISABLE_ACCOUNT]: 'disableAccount',
  [ENABLE_ACCOUNT]: 'enableAccount',
  [MODIFY_ACCOUNT]: 'modifyAccount',
  [REMOVE_ACCOUNT]: 'removeAccount'
};

module.exports = (action, req) => {
  try {
    if (!actionsToProps[action]) {
      throw new Error(`don't know how to audit ${action}`);
    }

    const data = {};
    let target = {};

    return {
      log: () => {
        try {
          logger.audit(`AUDIT ACTION: ${action.toString()}`, {
            actor: {
              id: req.user.id,
              email: req.user.model.get('email'),
              ip: req.ip
            },
            action: { [actionsToProps[action]]: data },
            target
          });
        } catch (e) {
          logger.error('ERROR LOGGING AUDIT', e);
        }
      },
      set: (field, value) => {
        try {
          if (field === 'password') {
            data.password = '<new password>';
          } else {
            data[field] = value;
          }
        } catch (e) {
          logger.error('ERROR SETTING AUDIT VALUE', e);
        }
      },
      target: t => {
        try {
          target = t;
        } catch (e) {
          logger.error('ERROR SETTING AUDIT TARGET', e);
        }
      }
    };
  } catch (e) {
    logger.error('ERROR CREATING AUDITOR', e);
    throw e;
  }
};

module.exports.actions = {
  CREATE_ACCOUNT,
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  MODIFY_ACCOUNT,
  REMOVE_ACCOUNT
};
