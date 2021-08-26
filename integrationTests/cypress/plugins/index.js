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

  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
