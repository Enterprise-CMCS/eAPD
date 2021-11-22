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

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit'); // eslint-disable-line import/no-extraneous-dependencies
const browserify = require('@cypress/browserify-preprocessor'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('./knex');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('cypress-grep/src/plugin')(config); // eslint-disable-line global-require, import/no-extraneous-dependencies

  // eslint-disable-next-line no-unused-vars
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);

    if (browser.family === 'chromium') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });
  on(
    'file:preprocessor',
    browserify({
      parser: 'babel-eslint'
    })
  );

  on('task', {
    'db:resetnorole': async () => {
      const oktaUser = await knex('okta_users')
        .where('login', 'norole')
        .first();
      if (oktaUser) {
        await knex('auth_affiliations')
          .where('user_id', oktaUser.user_id)
          .delete();
      }
      return null;
    },
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y() // calling the function is important
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
};
