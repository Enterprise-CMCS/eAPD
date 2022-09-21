const { defineConfig } = require('cypress'); // eslint-disable-line import/no-extraneous-dependencies
const webpackConfig = require('../web/webpack.config.dev');
const setupNodeEvents = require('./cypress/plugins/index');

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
    numTestsKeptInMemory: 50,
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
