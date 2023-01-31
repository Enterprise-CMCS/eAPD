export const testStatePrioritiesAndScope = function () {
  it('should verify the default values for the fields of Priorities and Scope', function () {
    cy.goToStatePrioritiesAndScope();

    cy.url().should('include', '/state-priorities-and-scope');
    cy.findByRole('heading', {
      name: /State Priorities and Scope of APD/
    }).should('exist');

    cy.get('[id="medicaid-program-priorities-field"]').should('have.value', '');
    cy.get('[id="medicaid-enterprise-system-intro"]').should('have.value', '');
    cy.get('[id="scope-of-apd"]').should('have.value', '');

    cy.waitForSave();
  });
};

export const testStatePrioritiesAndScopeWithData = function () {
  beforeEach(function () {
    cy.fixture('state-priorities-and-scope.json').as('prioritiesAndScope');
  });

  it('Fill out State Priorities and Scope', function () {
    const prioritiesAndScope = this.prioritiesAndScope;

    cy.turnOnAdminCheck();
    cy.collapseAdminCheck();
    cy.goToStatePrioritiesAndScope();

    cy.url().should('include', '/state-priorities-and-scope');
    cy.findByRole('heading', {
      name: /State Priorities and Scope of APD/
    }).should('exist');

    cy.findByText('Provide Medicaid Program and Priorities').should('exist');
    cy.findByText('Provide a Medicaid Enterprise System Introduction').should(
      'exist'
    );
    cy.findByText("Provide an Overview of the APD's Scope").should('exist');

    cy.setTinyMceContent(
      'medicaid-program-priorities-field',
      prioritiesAndScope.priorities
    );
    cy.findByText('Provide Medicaid Program and Priorities').should(
      'not.exist'
    );
    cy.setTinyMceContent(
      'medicaid-enterprise-system-intro',
      prioritiesAndScope.mesIntro
    );
    cy.findByText('Provide a Medicaid Enterprise System Introduction').should(
      'not.exist'
    );
    cy.setTinyMceContent('scope-of-apd', prioritiesAndScope.scopeOfApd);
    cy.findByText("Provide an Overview of the APD's Scope").should('not.exist');

    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });
};
