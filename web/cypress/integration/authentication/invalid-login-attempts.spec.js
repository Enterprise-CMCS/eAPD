// invalid-password.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Invalid Login Attempts', () => {
    before(() => {
        cy.setCookie('gov.cms.eapd.hasConsented', 'true');
        cy.visit('/');
    });

    afterEach(() => {
        cy.findByLabelText('EUA ID').clear();
        cy.findByLabelText('Password').clear();
    });

    it('disabled the login button until there is a username and password', () => {
        cy.findByRole('button', { name: /Log in/i }).should('be.disabled');

        cy.findByLabelText('EUA ID').type(Cypress.env('statestaff'));
        cy.findByRole('button', { name: /Log in/i }).should('be.disabled');
        
        cy.findByLabelText('Password').type(Cypress.env('statestaff_pw'), { log: false });
        cy.findByRole('button', { name: /Log in/i }).should('be.enabled');
    });

    it('uses the wrong username and password', () => {
        cy.findByLabelText('EUA ID').type('bad user');
        cy.findByLabelText('Password').type('bad password', { log: false });
        cy.findByRole('button', { name: /Log in/i }).click();
        
        cy.findByText('Your username and/or password is incorrect.').should('exist');
    });

    it('uses the wrong password', () => {
        cy.findByLabelText('EUA ID').type(Cypress.env('statestaff'));
        cy.findByLabelText('Password').type('bad password', { log: false });
        cy.findByRole('button', { name: /Log in/i }).click();
        
        cy.findByText('Your username and/or password is incorrect.').should('exist');
    });
})