// affiliation.spec.js created with Cypress

Cypress.session.clearAllSavedSessions();

describe('Affiliation', { tags: ['@auth', '@affiliations'] }, function () {
  beforeEach(function () {
    cy.clearAuthCookies();
  });

  after(function () {
    cy.task('db:resetnorole');
  });

  describe('Logging in with a user that does not have an affiliation', function () {
    before(function () {
      cy.task('db:resetnorole');
    });

    it('should let the user cancel selecting an affiliation', function () {
      cy.loginWithEnv('norole');
      cy.findByRole('button', { name: /Back to Login/ }).click();

      cy.findByRole('heading', { name: /Log in/ }).should('exist');
    });

    it('should ask a user without affiliations to request one', function () {
      cy.loginWithEnv('norole');
      cy.findByLabelText(/Select your State Affiliation/i)
        .clear()
        .type('alas');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();
      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');
    });

    it('should not ask the user to select an affiliation on next login', function () {
      cy.loginWithEnv('norole');
      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');
    });

    it('should let the user open the account management page', function () {
      cy.loginWithEnv('norole');
      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('heading', { name: /Pending/ }).should('exist');
      cy.findByRole('heading', { name: /Pending/ })
        .next()
        .should('contain', 'New Apdland');

      cy.findByRole('button', { name: 'APD Home' }).click();

      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');
    });

    it('should let the user request additional affiliations', function () {
      cy.loginWithEnv('norole');
      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByLabelText(/Request a new State Affiliation/i)
        .clear()
        .type('alab');
      cy.get('ul.ds-c-list--bare').children().should('have.length', 1);
      cy.get('ul.ds-c-list--bare').children('li:first-of-type').click();
      cy.findByRole('button', { name: /Submit/ }).click();
    });

    it('should show the newly requested affiliations on the account management page', function () {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByLabelText('New Apdland').should('exist');
      cy.findByLabelText('Alabama').should('exist');

      cy.findByText(/New Apdland/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('heading', { name: /Pending/ }).should('exist');

      cy.findByRole('heading', { name: /Pending/ })
        .next('span')
        .within(() => {
          cy.findByText(/New Apdland/).should('exist');
          cy.findByText(/Alabama/).should('exist');
        });

      cy.findByRole('button', { name: /AK APD Home/ }).click();

      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');
    });

    it('should allow the user to close the accounts management page', function () {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByText(/New Apdland/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('button', { name: 'APD Home' }).click();

      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');
    });

    it('should show the newly requested affiliation on the switch states page', function () {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByLabelText(/New Apdland/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
    });

    it('should let users switch states', function () {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByText(/New Apdland/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Switch State Affiliation/).click();

      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: /Submit/ }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
    });
  });

  describe('New user selecting multiple affiliation the first time', function () {
    it('should allow a new user to select multiple affiliations the first time', function () {
      cy.task('db:resetnorole');
      cy.loginWithEnv('norole');

      cy.findByLabelText(/Select your State Affiliation/i)
        .clear()
        .type('alas');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();

      cy.findByLabelText(/Select your State Affiliation/i)
        .clear()
        .type('alab');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();

      cy.findByLabelText(/Select your State Affiliation/i)
        .clear()
        .type('colo');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();

      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByLabelText(/New Apdland/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByLabelText(/Colorado/).should('exist');
      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
      cy.logout();

      cy.loginWithEnv('norole');

      cy.findByLabelText(/New Apdland/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByLabelText(/Colorado/).should('exist');
      cy.findByText(/Colorado/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Colorado APDs/ }).should('exist');
    });
  });

  describe('New user selecting affiliation the first time and the requesting multiple additional affiliations', function () {
    it('should handle a user selecting one affiliation and then requesting multiple additional affiliations', function () {
      cy.task('db:resetnorole');
      cy.loginWithEnv('norole');

      cy.findByLabelText(/Select your State Affiliation/i, { timeout: 30000 })
        .clear()
        .type('alas');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();
      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByRole('heading', { name: /New Apdland APDs/ }).should('exist');

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByLabelText(/Request a new State Affiliation/i)
        .clear()
        .type('alaba');
      cy.get('ul.ds-c-list--bare').children().should('have.length', 1);
      cy.get('ul.ds-c-list--bare').children('li:first-of-type').click();

      cy.findByLabelText(/Request a new State Affiliation/i)
        .clear()
        .type('colo');
      cy.get('ul.ds-c-list--bare').children().should('have.length', 1);
      cy.get('ul.ds-c-list--bare').children('li:first-of-type').click();

      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByRole('heading', { name: /(Alabama|New Apdland) APDs/ }).should(
        'exist'
      );

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Switch State Affiliation/).click();

      cy.get('.state-aff-item').then($elements => {
        const stateList = [...$elements].map($el => $el.innerText);
        expect(stateList).to.deep.equal([...stateList].sort());
      });

      cy.findByText(/Colorado/).click();

      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Colorado APDs/ }).should('exist');
    });
  });
});
