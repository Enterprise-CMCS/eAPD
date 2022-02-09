/// <reference types="cypress" />
const goTotStateAdminPortal = () => {
  cy.useRegularUser();
  cy.get(
    // Click dropdown menu, username doesn't load so you cant search that
    '[aria-label="Logged in as undefined. Click to manage your account."]'
  ).click();
  cy.contains('AK State admin').click();
};

const clickButton = (role, button) => {
  cy.findAllByText(role)
    .parent()
    .within(() => {
      cy.contains(button).click();
    });
};

const verifyRole = (name, role) => {
  cy.findAllByText(name)
    .parent()
    .within(() => {
      cy.contains(role);
    });
};

describe('tests state admin portal', () => {
  it('state admin manages roles', { tags: ['@state', '@admin'] }, () => {
    // Request access on No Role
    cy.loginWithEnv('norole');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500); // Allows time to log in
    cy.get('[class="ds-c-field"]').type('Alask');
    cy.contains('Alaska').click();
    cy.findByRole('button', { name: 'Submit' }).click();
    cy.findByRole('button', { name: 'Ok' }).click();
    cy.contains('norole').click();
    cy.contains('Log out').click();
    // cy.wait(2000);

    goTotStateAdminPortal();
    // cy.useRegularUser();
    // cy.pause();

    // Test approving access on Requested Role and Denying on No Role
    clickButton('Requested Role', 'Approve');
    cy.contains('Edit Role');
    cy.findByRole('button', { name: 'Cancel' }).click();

    clickButton('Requested Role', 'Approve');
    cy.get('select').select('eAPD State Staff');
    cy.findByRole('button', { name: 'Save' }).click();

    clickButton('No Role', 'Deny');
    cy.contains('Deny');
    cy.findByRole('button', { name: 'Cancel' }).click();

    clickButton('No Role', 'Deny');
    cy.findByRole('button', { name: 'Confirm' }).click();

    cy.contains('Active').click();
    verifyRole('Requested Role', 'eAPD State Staff');

    // Test changing roles on State Staff
    clickButton('State Staff', 'Edit Role');
    cy.get('select').select('eAPD State Contractor');
    cy.findByRole('button', { name: 'Save' }).click();
    verifyRole('State Staff', 'eAPD State Contractor');

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

    cy.contains('Active').click();
    verifyRole('Denied Role', 'eAPD State Staff');

    // Verify Requested Role was approved
    cy.loginWithEnv('requestedrole');
    cy.contains('HITECH IAPD');
    cy.contains('requestedrole').click();
    cy.contains('Log out').click();

    // Verify State Contractor was revoked
    cy.loginWithEnv('statecontractor');
    cy.contains('Approval Permissions Revoked');
    cy.contains('statecontractor').click();
    cy.contains('Log out').click();

    // Verify Revoked Role has access
    cy.loginWithEnv('deniedrole');
    cy.contains('HITECH IAPD');
    cy.contains('deniedrole').click();
    cy.contains('Log out').click();

    // Verify No Role was denined
    cy.loginWithEnv('norole');
    cy.contains('Approval Has Been Denied');
  });
});
