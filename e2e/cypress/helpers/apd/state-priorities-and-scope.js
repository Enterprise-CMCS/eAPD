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
    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  it('Fill out State Priorities and Scope', function () {
    const mmisData = this.mmisData;
    const prioritiesAndScope = mmisData.statePrioritiesAndScope;

    cy.goToStatePrioritiesAndScope();

    cy.url().should('include', '/state-priorities-and-scope');
    cy.findByRole('heading', {
      name: /State Priorities and Scope of APD/
    }).should('exist');

    cy.setTinyMceContent(
      'medicaid-program-priorities-field',
      prioritiesAndScope.priorities
    );
    cy.setTinyMceContent(
      'medicaid-enterprise-system-intro',
      prioritiesAndScope.mesIntro
    );
    cy.setTinyMceContent('scope-of-apd', prioritiesAndScope.scopeOfApd);

    cy.waitForSave();
  });
};
