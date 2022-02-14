// affiliation.spec.js created with Cypress

describe('Affiliation', { tags: ['@auth', '@affiliations'] }, () => {
  beforeEach(() => {
    cy.clearAuthCookies();
  });

  after(() => cy.task('db:resetnorole'));

  describe('Logging in with a user that does not have an affiliation', () => {
    before(() => cy.task('db:resetnorole'));

    it('should let the user cancel selecting an affiliation', () => {
      cy.loginWithEnv('norole');
      cy.findByRole('button', { name: /Back to Login/ }).click();

      cy.findByRole('heading', { name: /Log in/ }).should('exist');
    });

    it('should ask a user without affiliations to request one', () => {
      cy.loginWithEnv('norole');
      cy.findByLabelText(/Select your State Affiliation/i)
        .clear()
        .type('alas');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();
      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
    });

    it('should not ask the user to select an affiliation on next login', () => {
      cy.loginWithEnv('norole');
      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
    });

    it('should let the user open the account management page', () => {
      cy.loginWithEnv('norole');
      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('heading', { name: /Pending/ }).should('exist');
      cy.findByRole('heading', { name: /Pending/ })
        .next()
        .should('contain', 'Alaska');

      cy.findByRole('button', { name: 'APD Home' }).click();

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
    });

    it('should let the user request additional affiliations', () => {
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

    it('should show the newly requested affiliations on the account management page', () => {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByLabelText('Alaska').should('exist');
      cy.findByLabelText('Alabama').should('exist');

      cy.findByText(/Alaska/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('heading', { name: /Pending/ }).should('exist');

      cy.findByRole('heading', { name: /Pending/ })
        .next('span')
        .within(() => {
          cy.findByText(/Alaska/).should('exist');
          cy.findByText(/Alabama/).should('exist');
        });

      cy.findByRole('button', { name: /AK APD Home/ }).click();

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
    });

    it('should allow the user to close the accounts management page', () => {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByText(/Alaska/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Manage Account/).click();

      cy.findByRole('button', { name: 'APD Home' }).click();

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');
    });

    it('should show the newly requested affiliation on the switch states page', () => {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByLabelText(/Alaska/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
    });

    it('should let users switch states', () => {
      cy.loginWithEnv('norole');

      // select from the new affiliations
      cy.findByText(/Alaska/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('button', { name: /norole/ }).click();
      cy.findByText(/Switch State Affiliation/).click();

      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: /Submit/ }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
    });
  });

  describe('New user selecting multiple affiliation the first time', () => {
    before(() => cy.task('db:resetnorole'));

    it('should allow a new user to select multiple affiliations the first time', () => {
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

      cy.findByLabelText(/Alaska/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByLabelText(/Colorado/).should('exist');
      cy.findByText(/Alabama/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Alabama APDs/ }).should('exist');
    });

    it('should allow the user to select one of those affiliations when they log in again', () => {
      cy.loginWithEnv('norole');

      cy.findByLabelText(/Alaska/).should('exist');
      cy.findByLabelText(/Alabama/).should('exist');
      cy.findByLabelText(/Colorado/).should('exist');
      cy.findByText(/Colorado/).click();
      cy.findByRole('button', { name: 'Submit' }).click();

      cy.findByRole('heading', { name: /Colorado APDs/ }).should('exist');
    });
  });

  describe('New user selecting affiliation the first time and the requesting multiple additional affiliations', () => {
    before(() => cy.task('db:resetnorole'));

    it('should handle a user selecting one affiliation and then requesting multiple additional affiliations', () => {
      cy.loginWithEnv('norole');
      
      cy.findByLabelText(/Select your State Affiliation/i, { timeout: 3000 })
        .clear()
        .type('alas');
      cy.get('li').should('have.length', 1);
      cy.get('li:first-of-type').click();
      cy.findByRole('button', { name: /Submit/ }).click();
      cy.findByRole('heading', { name: /Thank you/ }).should('exist');
      cy.findByRole('button', { name: /Ok/ }).click();

      cy.findByRole('heading', { name: /Alaska APDs/ }).should('exist');

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

      cy.findByRole('heading', { name: /(Alabama|Alaska) APDs/ }).should(
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
