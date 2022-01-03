// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// TODO: reenable cypress axe
// import 'cypress-axe-core'; // eslint-disable-line import/no-extraneous-dependencies
import 'cypress-react-selector'; // eslint-disable-line import/no-extraneous-dependencies
import { commandTimings } from 'cypress-timings'; // eslint-disable-line import/no-extraneous-dependencies

import './commands';

import {
  API_COOKIE_NAME,
  CONSENT_COOKIE_NAME
} from '../../../web/src/cookie-constants';

// Alternatively you can use CommonJS syntax:
require('cypress-grep')(); // eslint-disable-line import/no-extraneous-dependencies
// require('./commands')

Cypress.Cookies.defaults({
  preserve: [CONSENT_COOKIE_NAME, API_COOKIE_NAME]
});
Cypress.Cookies.debug(true, { verbose: true });

commandTimings();

Cypress.on('uncaught:exception', err => {
  cy.log(err.message);
  cy.log(err.stack);
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
