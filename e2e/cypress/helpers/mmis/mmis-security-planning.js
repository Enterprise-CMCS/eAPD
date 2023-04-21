export const testSecurityPlanning = function () {
  beforeEach(function () {
    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  it('fills out Security Planning page', function () {
    const mmisData = this.mmisData;
    const securityPlanningData = mmisData.securityPlanning;

    cy.goToSecurityPlanning();
    cy.setTinyMceContent(
      'security-interface-plan',
      securityPlanningData.securityAndInterfacePlan
    );
    cy.setTinyMceContent(
      'bc-dr-plan',
      securityPlanningData.businessContinuityAndDisasterRecovery
    );
  });
};
