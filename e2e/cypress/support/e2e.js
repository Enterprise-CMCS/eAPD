// ***********************************************************
// This example support/e2e.js is processed and
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

// TODO: reenable cypress axe
// import 'cypress-axe-core'; // eslint-disable-line import/no-extraneous-dependencies
import 'cypress-react-selector'; // eslint-disable-line import/no-extraneous-dependencies
import { commandTimings } from 'cypress-timings'; // eslint-disable-line import/no-extraneous-dependencies
import 'cypress-axe'; // eslint-disable-line import/no-extraneous-dependencies
import '@cypress/code-coverage/support';
import grep from '@cypress/grep';

// Import commands.js using ES2015 syntax:
import './commands.js';

grep();
commandTimings();

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', err => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
