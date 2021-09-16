import '@testing-library/cypress/add-commands'; // eslint-disable-line import/no-extraneous-dependencies
import '@foreachbe/cypress-tinymce';
import 'tinymce/tinymce';
import 'cypress-file-upload';

import tokens from '../../../api/seeds/test/tokens.json';
import { API_COOKIE_NAME } from '../../../web/src/constants';

const EXPIRY_DATE = Math.ceil(
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime() / 1000
);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login methods
Cypress.Commands.add('login', (username, password) => {
  cy.setCookie('gov.cms.eapd.hasConsented', 'true', {
    expiry: EXPIRY_DATE
  });
  cy.visit('/');
  cy.findByLabelText('EUA ID').type(username);
  cy.findByLabelText('Password').type(password, {
    log: false
  });
  cy.findByRole('button', { name: /Log in/i }).click();
});

Cypress.Commands.add('loginWithEnv', username => {
  cy.login(Cypress.env(username), Cypress.env(`${username}_pw`));
});

Cypress.Commands.add('useJwtUser', (username, url) => {
  cy.setCookie('gov.cms.eapd.hasConsented', 'true', {
    expiry: EXPIRY_DATE
  });
  cy.setCookie(
    API_COOKIE_NAME,
    JSON.stringify({ accessToken: tokens[username] }),
    {
      expiry: EXPIRY_DATE,
      sameSite: 'strict'
    }
  );
  cy.visit(url || '/');
});

Cypress.Commands.add('useSysAdmin', url => {
  cy.useJwtUser('sysadmin', url);
});

Cypress.Commands.add('useRegularUser', url => {
  cy.useJwtUser('em@il.com', url);
});

Cypress.Commands.add('useFedAdmin', url => {
  cy.useJwtUser('fedadmin', url);
});

Cypress.Commands.add('useStateAdmin', url => {
  cy.useJwtUser('stateadmin', url);
});

Cypress.Commands.add('useStateStaff', url => {
  cy.useJwtUser('statestaff', url);
});

Cypress.Commands.add('useStateContractor', url => {
  cy.useJwtUser('statecontractor', url);
});

Cypress.Commands.add('useRequestedRole', url => {
  cy.useJwtUser('requestedrole', url);
});

Cypress.Commands.add('useDeniedRole', url => {
  cy.useJwtUser('deniedrole', url);
});

Cypress.Commands.add('useJWTrevokedrole', url => {
  cy.useJwtUser('revokedrole', url);
});

// TinyMCE
Cypress.Commands.add('waitForTinyMCELoaded', tinyMceId => {
  const eventName = `tinymceLoaded.${tinyMceId}`;
  cy.document().then($doc => {
    return new Cypress.Promise(resolve => {
      // Cypress will wait for this Promise to resolve
      const onTinyMceLoaded = () => {
        $doc.removeEventListener(eventName, onTinyMceLoaded); // cleanup
        resolve(); // resolve and allow Cypress to continue
      };
      $doc.addEventListener(eventName, onTinyMceLoaded);
    });
  });
});

Cypress.Commands.add('ignoreTinyMceError', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });
});

Cypress.Commands.add('goToKeyStatePersonnel', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Key State Personnel/i)
    .click();
  // Click on nav submenu button
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Key State Personnel/i)
    .click();
});

Cypress.Commands.add('goToPreviousActivities', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Results of Previous Activities/i)
    .click();
  // Click on nav submenu button
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Results of Previous Activities/i)
    .click();
});

Cypress.Commands.add('goToActivityDashboard', () => {
  cy.contains(/Activities Dashboard/i)
    .click({ force: true });
});


Cypress.Commands.add('goToProposedBudget', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .click();
  // Click on nav submenu button
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Proposed Budget/i)
    .click();
});

Cypress.Commands.add('goToAssurancesCompliance', () => {
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Assurances and Compliance/i)
    .click();
});

Cypress.Commands.add('goToExecutiveSummary', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Executive Summary/i)
    .click();
  // Click on nav submenu button
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Executive Summary/i)
    .click();
});

Cypress.Commands.add('goToExportView', () => {
  cy.contains('Export and Submit').click();
  cy.contains('Continue to Review').click();
});
