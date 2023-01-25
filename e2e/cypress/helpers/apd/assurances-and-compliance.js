import AssurancesCompliancePage from '../../page-objects/assurances-compliance-page.js';
import ExportPage from '../../page-objects/export-page.js';

const categories = [
  'Procurement Standards (Competition / Sole Source)',
  'Access to Records, Reporting and Agency Attestations',
  'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports',
  'Security and Interface Requirements to Be Employed for All State HIT Systems'
];

export const testDefaultAssurancesAndCompliance = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('assurances-compliance-test.json').as('assurancesAndCompliance');
    cy.useStateStaff();
    cy.visit(this.apdUrl);
  });

  it('should display the default settings in Assurance and Compliance', function () {
    const assurancesCompliancePage = new AssurancesCompliancePage();
    const assurancesAndCompliance = this.assurancesAndCompliance;

    cy.goToAssurancesAndCompliance();
    cy.url().should('contain', '/assurances-and-compliance');

    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('previousActivitiesDiv');

    categories.forEach(category => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        // Check that regulations link to the correct URLs
        assurancesCompliancePage.assertLink(category, regulation, val.links[i]);
        assurancesCompliancePage.verifyRegulationValue(category, regulation);
      });
    });

    cy.waitForSave();
  });

  it('should display default Assurance and Compliance in export view', function () {
    const exportPage = new ExportPage();

    cy.goToExportView();

    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    categories.forEach(category => {
      const val = this.assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        // Check that regulations link to the correct URLs
        exportPage.assurancesComplianceAssertLink(
          category,
          regulation,
          val.links[i]
        );
        // Check that no response is reported
        exportPage
          .assurancesComplianceResponse(category, regulation)
          .should('eq', 'No response was provided.');
      });
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testAssurancesAndComplianceWithData = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('assurances-compliance-test.json').as('assurancesAndCompliance');
    cy.useStateStaff();
    cy.visit(this.apdUrl);
  });

  it('should handle setting Assurance and Compliance', function () {
    const assurancesCompliancePage = new AssurancesCompliancePage();
    const assurancesAndCompliance = this.assurancesAndCompliance;

    cy.goToAssurancesAndCompliance();
    cy.url().should('contain', '/assurances-and-compliance');
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    categories.forEach(category => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        // Check that regulations link to the correct URLs
        assurancesCompliancePage.assertLink(category, regulation, val.links[i]);

        assurancesCompliancePage.fillRegulation(
          category,
          regulation,
          val.responses[i]
        );
      });
    });

    cy.contains('Select yes or no').should('not.exist');

    cy.waitForSave();
  });

  it('should display Assurance and Compliance in export view', function () {
    const exportPage = new ExportPage();
    const assurancesAndCompliance = this.assurancesAndCompliance;

    cy.goToExportView();

    categories.forEach(category => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        let expectedResponse = '';

        if (val.responses[i] === null) {
          expectedResponse = 'Yes';
        } else {
          expectedResponse = `No${val.responses[i]}`;

          if (val.responses[i].length === 0) {
            expectedResponse += 'No response was provided';
          }
        }
        // Check that no response is reported
        exportPage
          .assurancesComplianceResponse(category, regulation)
          .should('contain', expectedResponse);
      });
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
