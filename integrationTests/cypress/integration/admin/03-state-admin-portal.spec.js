/// <reference types="cypress" />
const goTotStateAdminPortal = () => {
  cy.useRegularUser();
  cy.get(
    // Click dropdown menu, username doesn't load so you cant search that
    '[aria-label="Logged in as undefined. Click to manage your account."]'
  ).click();
  cy.contains('AK State admin').click();
};

// Approve requested role - make sure they are moved to active and have the right role log in as requested role and make sure you have access
// Restore revoked role - make sure they are moved to active log in as revoked role and make sure you have access
// Change state staff's role to state contractor - verify this change
// Revoke state contractor - make sure they are moved to inactive and have the revoked role; log in as state contractor and make sure they dont have access
// reset requested role and reject - make sure they are moved to inactive and have denied tag

// Test cancel buttons as well

// If a tab is empty this appears "No users on this tab at this time"

// Make a function for the UI of approving/restoring

describe('tests state admin portal', () => {
  it('state admin manages roles', { tags: ['@state', '@admin'] }, () => {
    goTotStateAdminPortal();
    cy.contains('Requested Role')
      .parent()
      .within(() => {
        cy.contains('Approve').click();
      });
  });
});
