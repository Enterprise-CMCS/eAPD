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

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('@cypress/grep/src/plugin')(config); // eslint-disable-line global-require, import/no-extraneous-dependencies
  require('@cypress/code-coverage/task')(on, config);

  // eslint-disable-next-line no-unused-vars, default-param-last
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);

    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-dev-shm-usage');
    } else if (browser.name === 'electron') {
      launchOptions.args['disable-dev-shm-usage'] = true;
    } else if (browser.family === 'chromium') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });

  const browserifyOptions = browserify.defaultOptions;
  // print options to find babelify, it is inside transforms at index 1
  // and it is [filename, options]
  const babelOptions = browserifyOptions.browserifyOptions.transform[1][1];
  babelOptions.babelrc = true;
  babelOptions.global = true;
  babelOptions.sourceMap = true;
  // ignore all modules except files in lodash-es
  babelOptions.ignore = [/\/node_modules\/(?!@cms-eapd\/)/];
  // if you want to see the final options
  // console.log('%o', babelOptions)
  on('file:preprocessor', browserify(browserifyOptions));

  on('task', {
    'db:resetnorole': () => {
      return import('@cms-eapd/api/shared.js').then(({ knex }) => {
        return knex('okta_users')
          .where('login', 'norole')
          .first()
          .then(oktaUser => {
            if (oktaUser) {
              return knex('auth_affiliations')
                .where('user_id', oktaUser.user_id)
                .delete()
                .then(() => ({ success: true }))
                .catch(error => ({ success: false, error }));
            }
            return { success: false, error: 'User not found' };
          })
          .catch(error => ({ success: false, error }));
      });
    },
    'db:resetcertification': ({ email }) => {
      return import('@cms-eapd/api/shared.js').then(({ knex }) => {
        return knex('state_admin_certifications')
          .where('email', email)
          .first()
          .then(cert => {
            if (cert) {
              return knex('state_admin_certifications_audit')
                .where('certificationId', cert.id)
                .delete()
                .then(() => {
                  return knex('state_admin_certifications')
                    .where('email', email)
                    .delete()
                    .then(() => ({ success: true }))
                    .catch(error => ({ success: false, error }));
                })
                .catch(error => ({ success: false, error }));
            }
            return { success: false, error: 'no certificate found' };
          })
          .catch(error => ({ success: false, error }));
      });
    },
    'db:resetcertificationmatch': () => {
      return import('@cms-eapd/api/shared.js').then(({ knex }) => {
        return knex('state_admin_certifications_audit')
          .where('certificationId', 1002)
          .delete()
          .then(() => {
            return knex('state_admin_certifications')
              .where('id', 1002)
              .update({ affiliationId: null })
              .then(() => {
                return knex('auth_affiliations')
                  .where('id', 1001)
                  .update({ role_id: null, status: 'requested' })
                  .then(() => ({ success: true }))
                  .catch(error => ({ success: false, error }));
              })
              .catch(error => ({ success: false, error }));
          })
          .catch(error => ({ success: false, error }));
      });
    },
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y() // calling the function is important
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
};
