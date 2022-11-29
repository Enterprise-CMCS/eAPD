// For auditing events. Create an auditor object, set its target, then use
// set on each field that was changed. Finally call log when you're done to
// persist the audit log. Uses the standard logger

import loggerFactory from './logger/index.js';

const logger = loggerFactory('AUDIT');

const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
const DISABLE_ACCOUNT = 'DISABLE_ACCOUNT';
const ENABLE_ACCOUNT = 'ENABLE_ACCOUNT';
const MODIFY_ACCOUNT = 'MODIFY_ACCOUNT';
const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

const actionsToProps = {
  [CREATE_ACCOUNT]: 'createAccount',
  [DISABLE_ACCOUNT]: 'disableAccount',
  [ENABLE_ACCOUNT]: 'enableAccount',
  [MODIFY_ACCOUNT]: 'modifyAccount',
  [REMOVE_ACCOUNT]: 'removeAccount'
};

export const actions = {
  CREATE_ACCOUNT,
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  MODIFY_ACCOUNT,
  REMOVE_ACCOUNT
};

/**
 * @typedef {Object} Auditor
 * @property {function} log Log the set of changes in the audit log
 * @property {function} set Set a property on the audit target object. First arg is the property name, second argument is the new value
 * @property {function} target Set the object that is the target of the audit.
 */

/**
 * Create an auditor
 *
 * @param {Symbol} action The auditable action to capture.
 * @param {Object} req The HTTP request object assocaited with the audit
 * @return {Auditor} An auditor object for the action and request
 *
 * */
export default (action, req) => {
  try {
    if (!actionsToProps[action]) {
      throw new Error(`don't know how to audit ${action}`);
    }

    const data = {};
    let target = {};

    return {
      log: () => {
        try {
          logger.info(`AUDIT ACTION: ${action.toString()}`, {
            actor: {
              id: req.user.id,
              email: req.user.email,
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
