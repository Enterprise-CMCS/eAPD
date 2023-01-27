// affiliation-statuses.spec.js created with Cypress

Cypress.session.clearAllSavedSessions();

describe(
  'Invalid Login Attempts',
  { tags: ['@auth', '@affiliations'] },
  function () {
    beforeEach(function () {
      cy.clearAuthCookies();
    });

    it('show the pending page for a user with a pending request', function () {
      cy.loginWithEnv('requestedrole');

      cy.findByRole('heading', { name: 'Alaska APDs' }).should('exist');
      cy.findByRole('heading', {
        name: 'Approval Pending From State Administrator'
      }).should('exist');
    });

    it('show the denied page for a user with a denied request', function () {
      cy.loginWithEnv('deniedrole');

      cy.findByRole('heading', { name: 'Alaska APDs' }).should('exist');
      cy.findByRole('heading', { name: 'Approval Has Been Denied' }).should(
        'exist'
      );
    });

    it('show the revoked page for a user with a revoked request', function () {
      cy.loginWithEnv('revokedrole');

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
      cy.findByRole('heading', { name: 'Approval Permissions Revoked' }).should(
        'exist'
      );
    });
  }
);
