const { defineConfig } = require('cypress'); // eslint-disable-line import/no-extraneous-dependencies
const webpackConfig = require('../web/webpack.config.dev');
const setupNodeEvents = require('./cypress/plugins/index');
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('@cms-eapd/api/db/knex');
const browserify = require('@cypress/browserify-preprocessor'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    environment: 'development',
    specPattern: 'cypress/integration/**/*.cy.js',
    projectId: 'j7o2hw',
    baseUrl: 'http://localhost:8080/',
    viewportWidth: 1000,
    viewportHeight: 1000,
    defaultCommandTimeout: 36000,
    videoUploadOnPasses: false,
    numTestsKeptInMemory: 0,
    env: {
      'cypress-react-selector': {
        root: '#app'
      },
      API: 'http://localhost:8081',
      fedadmin: 'fedadmin',
      fedadmin_pw: '',
      stateadmin: 'stateadmin',
      stateadmin_pw: '',
      statestaff: 'statestaff',
      statestaff_pw: '',
      statecontractor: 'statecontractor',
      statecontractor_pw: '',
      sysadmin: 'sysadmin',
      sysadmin_pw: '',
      requestedrole: 'requestedrole',
      requestedrole_pw: '',
      deniedrole: 'deniedrole',
      deniedrole_pw: '',
      revokedrole: 'revokedrole',
      revokedrole_pw: '',
      lockedout: 'lockedout',
      lockedout_pw: '',
      expired: 'expired',
      expired_pw: '',
      norole: 'norole',
      norole_pw: '',
      resetmfa: 'resetmfa',
      resetmfa_pw: '',
      lockedoutmfa: 'lockedoutmfa'
    },
    retries: {
      runMode: 1,
      openMode: 1
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

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

      on(
        'file:preprocessor',
        browserify({
          parser: '@babel/eslint-parser'
        })
      );

      on('task', {
        'db:resetnorole': () => {
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
        },
        'db:resetcertification': ({ email }) => {
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
        },
        'db:resetcertificationmatch': () => {
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
        },
        lighthouse: lighthouse(), // calling the function is important
        pa11y: pa11y() // calling the function is important
      });

      return config;
    }
  },

  component: {
    setupNodeEvents,
    environment: 'development',
    specPattern: '../web/src/**/*.cy.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        ...webpackConfig,
        resolve: {
          ...webpackConfig.resolve,
          modules: ['node_modules', '../web/src/shared']
        }
      }
    }
  }
});
