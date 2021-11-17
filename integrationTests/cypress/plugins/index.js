/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const knex = require('./knex')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    'db:resetnorole': async () => {
      const okta_user = await knex('okta_users').where('login',  'norole').first()
      if (okta_user) {
        await knex('auth_affiliations').where('user_id', okta_user.user_id).delete();
      }
      return null;
    },
    'db:resetcertification': async ({email}) => {
      const cert = await knex('state_admin_certifications').where('email', email).first();
      if (cert) {
        await knex('state_admin_certifications_audit').where('certificationId', cert.id).delete();
        await knex('state_admin_certifications').where('email', email).delete();
      }
      return null;
    },
    'db:resetcertificationmatch': async () => {
      await knex('state_admin_certifications_audit').where('certificationId', 1002).delete();
      await knex('state_admin_certifications').where('id', 1002).update({'affiliationId': null});
      await knex('auth_affiliations').where('id', 1001).update({'role_id': null, 'status': 'requested'});
      return null;      
    }
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
