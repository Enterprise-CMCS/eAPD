export const testApdName = function () {
  it('Allows APD name to be changed', function () {
    const titleA = 'My Awesome eAPD';
    const titleB = 'Magnus Archive Project';

    // Change name in APD Summary text box
    cy.findByLabelText('APD Name').clear().type(`${titleA}`).blur();
    cy.findByLabelText('APD Name').should('have.value', `${titleA}`);

    // APD name in Header reflects change
    cy.get(`[data-cy='apd-name-header']`).contains(`${titleA}`).click();

    // Change name via APD Header
    cy.focused()
      .should('have.attr', 'id', 'apd-title-input')
      .clear()
      .type(`${titleB}`)
      .blur();

    // APD name in Summary text box reflects change
    cy.get(`[data-cy='apd-name-header']`).contains(`${titleB}`);
    cy.findByLabelText('APD Name').should('have.value', `${titleB}`);

    // Change name by clicking EDIT button
    cy.get('#title-edit-link').click();

    cy.focused()
      .should('have.attr', 'id', 'apd-title-input')
      .clear()
      .type(`${titleA}`)
      .blur();

    cy.get(`[data-cy='apd-name-header']`).contains(`${titleA}`);
  });

  it('Validates APD Name', function () {
    const untitledName = 'Untitled APD';
    const untitledErrorMessage = 'APD name cannot contain "untitled".';
    const newName = 'Project of the Ages';

    // Clear the existing APD Name and see that the field populates with Untitled APD name
    cy.goToApdOverview();
    cy.findByLabelText('APD Name').clear().blur();
    cy.findByLabelText('APD Name').should('have.value', `${untitledName}`);

    // Check validation error in admin check
    cy.turnOnAdminCheck();
    cy.get('[class="eapd-admin-check-list"]').within(list => {
      cy.get(list).contains('APD Overview').should('exist');
      cy.get(list).contains(untitledErrorMessage).should('exist');
    });
    cy.collapseAdminCheck();

    // Check validation error in form field
    cy.goToApdOverview();
    cy.contains(untitledErrorMessage).should('exist');

    // Change name to see error removed from form field
    cy.findByLabelText('APD Name').clear().type(`${newName}`).blur();
    cy.findByLabelText('APD Name').should('have.value', `${newName}`);
    cy.contains(untitledErrorMessage).should('not.exist');

    // Check validation error removed from admin check
    cy.expandAdminCheck();
    cy.get('[class="eapd-admin-check-list"]').within(list => {
      cy.get(list).contains(untitledErrorMessage).should('not.exist');
    });
  });
};
