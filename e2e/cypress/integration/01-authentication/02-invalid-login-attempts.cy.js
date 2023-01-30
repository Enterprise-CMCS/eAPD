// invalid-password.spec.js created with Cypress

Cypress.session.clearAllSavedSessions();

describe('Invalid Login Attempts', { tags: ['@auth'] }, function () {
  beforeEach(function () {
    cy.clearAuthCookies();
    cy.setCookie('gov.cms.eapd.hasConsented', 'true');
    cy.visit('/');
  });

  describe('password issues', function () {
    it('disabled the login button until there is a username and password', function () {
      cy.findByRole('button', { name: /Log in/i }).should('be.disabled');

      cy.findByLabelText('EUA ID').clear().type(Cypress.env('statestaff'));
      cy.findByRole('button', { name: /Log in/i }).should('be.disabled');

      cy.findByLabelText('Password')
        .clear()
        .type(Cypress.env('statestaff_pw'), {
          log: false
        });
      cy.findByRole('button', { name: /Log in/i }).should('be.enabled');
    });

    it('uses the wrong username and password', function () {
      cy.login('bad user', 'bad password');
      cy.findByRole('button', { name: /Logging in/i }).should('exist');

      cy.wait(6000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.findByText('Your username and/or password is incorrect.').should(
        'exist'
      );
    });

    it('uses the wrong password', function () {
      cy.login(Cypress.env('lockedoutmfa'), 'bad password');

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.url().then(url => {
        // This is to prevent the tests from failing if they are run quickly more
        // than 3 times and the lockedoutmfa account becomes locked.
        if (url.endsWith('/login')) {
          cy.findByText('Your username and/or password is incorrect.').should(
            'exist'
          );
        } else {
          cy.findByText('Account Locked').should('exist');
        }
      });
    });
  });

  it('locks the user out if they have three failed password attempts', function () {
    const attemptLogin = () => {
      cy.wait(3000); // eslint-disable-line cypress/no-unnecessary-waiting
      return cy.url().then(url => {
        // reset the EUA ID and password fields if they are visible
        if (url.endsWith('/login')) {
          cy.findByLabelText('EUA ID').clear();
          cy.findByLabelText('Password').clear();
          // if not on the locked page yet, try to login again
          cy.login(Cypress.env('lockedout'), 'bad password');
        }
      });
    };

    // A user will get three failed password attempts before they are locked out,
    // but this test has to use a variable number of attempts because the user
    // might already be locked out from previous test runs.
    cy.login(Cypress.env('lockedout'), 'bad password');

    attemptLogin();
    attemptLogin();

    cy.findByText(/Your account will reset automatically in one hour/).should(
      'exist'
    );

    cy.findByRole('button', { name: 'Cancel' }).click();
    cy.findByLabelText('EUA ID').should('exist');
  });

  it('shows error message for expired password', function () {
    cy.loginWithEnv('expired');

    cy.findByText(/Your password has expired/).should('exist');
  });
});
