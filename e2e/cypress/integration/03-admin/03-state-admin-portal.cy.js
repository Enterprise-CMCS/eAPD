/// <reference types="cypress" />
const goToStateAdminPortal = function () {
  Cypress.session.clearAllSavedSessions();
  cy.useRegularUser();
  cy.get(
    '[class="nav--dropdown__trigger ds-c-button ds-c-button--small ds-c-button--transparent"]'
  ).click();
  cy.contains('NA State admin').click();
};

const clickButton = function (role, button) {
  cy.findAllByText(role)
    .filter(':visible')
    .parent()
    .within(() => {
      cy.contains(button).click();
    });
};

const verifyRole = function (name, role) {
  cy.findAllByText(name)
    .filter(':visible')
    .parent()
    .within(() => {
      cy.contains(role);
    });
};

describe('tests state admin portal', async function () {
  before(function () {
    cy.task('db:resetnorole');
  });

  it('tests state admin portal', { tags: ['@state', '@admin'] }, function () {
    cy.updateFeatureFlags({ supportStateAvailable: true });
    // Request access on No Role
    cy.visit('/');
    cy.loginWithEnv('norole');
    cy.contains('Verify Your Identity');
    cy.get('[class="ds-c-field"]').type('New Apd');
    cy.contains('New Apdland').click();
    cy.findByRole('button', { name: 'Submit' }).click();
    cy.findByRole('button', { name: 'Ok' }).click();
    cy.logout();

    goToStateAdminPortal();
    // cy.wait(2000);
    cy.contains('Active').click();
    cy.contains('Requests').click();
    cy.contains('New Apdland eAPD State Administrator Portal');

    // Test approving access on Requested Role and Denying on No Role
    clickButton('Requested Role', 'Approve');
    cy.contains('Edit Role');
    cy.findByRole('button', { name: 'Cancel' }).click();

    clickButton('Requested Role', 'Approve');
    cy.get('select').select('eAPD State Staff');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting

    clickButton('No Role', 'Deny');
    cy.contains('Deny');
    cy.findByRole('button', { name: 'Cancel' }).click();

    clickButton('No Role', 'Deny');
    cy.findByRole('button', { name: 'Confirm' }).click();

    cy.contains('Active').click();
    verifyRole('Requested Role', 'eAPD State Staff');

    // Test changing roles on State Staff to State Contractor
    clickButton('State Staff', 'Edit Role');
    cy.get('select').select('eAPD State Contractor');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
    verifyRole('State Staff', 'eAPD State Contractor');

    // Test changing roles on State Contractor to State Staff
    clickButton('State Contractor', 'Edit Role');
    cy.get('select').select('eAPD State Staff');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
    verifyRole('State Contractor', 'eAPD State Staff');

    // Test revoking access on State Contractor
    clickButton('State Contractor', 'Revoke');
    cy.contains('Revoke');
    cy.findByRole('button', { name: 'Cancel' }).click();

    clickButton('State Contractor', 'Revoke');
    cy.findByRole('button', { name: 'Confirm' }).click();

    cy.contains('Inactive').click();
    verifyRole('State Contractor', 'Revoked');

    // Verify No Role was moved to Inactive
    verifyRole('No Role', 'Denied');

    // Test restoring access on Denied Role
    clickButton('Denied Role', 'Restore Access');
    cy.get('select').select('eAPD State Staff');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.contains('Active').click();
    verifyRole('Denied Role', 'eAPD State Staff');

    // Verify Requested Role was approved
    cy.loginWithEnv('requestedrole');
    cy.findByRole('heading', { name: 'New Apdland APDs' }).should('exist');
    cy.contains('HITECH IAPD');
    cy.logout();

    // Verify State Contractor was revoked
    cy.loginWithEnv('statecontractor');
    cy.findByRole('heading', { name: 'New Apdland APDs' }).should('exist');
    cy.contains('Approval Permissions Revoked');
    cy.logout();

    // Verify Revoked Role has access
    cy.loginWithEnv('deniedrole');
    cy.findByRole('heading', { name: 'New Apdland APDs' }).should('exist');
    cy.contains('HITECH IAPD');
    cy.logout();

    // Verify No Role was denined
    cy.loginWithEnv('norole');
    cy.findByRole('heading', { name: 'New Apdland APDs' }).should('exist');
    cy.contains('Approval Has Been Denied');
  });
});
