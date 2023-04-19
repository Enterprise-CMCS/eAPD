// affiliated-statestaff.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

Cypress.session.clearAllSavedSessions();

describe(
  'Logging in with a state staff user (no MFA) with an approved affiliation',
  {
    tags: ['@auth'],
    retries: {
      runMode: 1,
      openMode: 1
    }
  },
  function () {
    it('accept notice and login', function () {
      cy.visit('/');

      cy.findByRole('button', { name: /Agree and continue/i }).click();
      cy.findByRole('heading', { name: /Log in/i }).should('exist');

      cy.findByLabelText('EUA ID').clear().type(Cypress.env('statestaff'));
      cy.findByLabelText('Password')
        .clear()
        .type(Cypress.env('statestaff_pw'), {
          log: false
        });
      cy.findByRole('button', { name: /Log in/i }).click();
      cy.findByRole('button', { name: /Logging in/i }).should('exist');

      cy.findByRole('heading', { name: /New Apdland APDs/i }).should('exist');
    });
  }
);
