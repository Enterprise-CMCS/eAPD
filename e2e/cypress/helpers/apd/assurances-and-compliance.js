import AssurancesCompliancePage from '../../page-objects/assurances-compliance-page.js';
import ExportPage from '../../page-objects/export-page.js';

const hitechCategories = [
  'Procurement Standards (Competition / Sole Source)',
  'Access to Records, Reporting and Agency Attestations',
  'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports',
  'Security and Interface Requirements to Be Employed for All State HIT Systems'
];

export const testDefaultHitechAssurancesAndCompliance = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('hitech-assurances-compliance-test.json').as(
      'assurancesAndCompliance'
    );
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

    hitechCategories.forEach(category => {
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

    hitechCategories.forEach(category => {
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

export const testHitechAssurancesAndComplianceWithData = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('hitech-assurances-compliance-test.json').as(
      'assurancesAndCompliance'
    );
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

    hitechCategories.forEach(category => {
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

    cy.contains('Select yes or no.').should('not.exist');

    cy.waitForSave();
  });

  it('should display Assurance and Compliance in export view', function () {
    const exportPage = new ExportPage();
    const assurancesAndCompliance = this.assurancesAndCompliance;

    cy.goToExportView();

    hitechCategories.forEach(category => {
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

export const testDefaultMmisAssurancesAndCompliance = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('mmis-assurances-compliance-test.json').as(
      'assurancesAndCompliance'
    );
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

    Object.keys(assurancesAndCompliance).forEach(category => {
      const { regulations, label } = assurancesAndCompliance[category];
      regulations.forEach(({ regulation, link }) => {
        assurancesCompliancePage.assertLink(label, regulation, link);
        assurancesCompliancePage.verifyRegulationValue(label, regulation);
      });
    });

    cy.waitForSave();
  });

  // TODO: Skipping until the export page is working
  it.skip('should display default Assurance and Compliance in export view', function () {
    const exportPage = new ExportPage();
    const assurancesAndCompliance = this.assurancesAndCompliance;

    cy.goToExportView();

    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    Object.keys(assurancesAndCompliance).forEach(category => {
      const { regulations, label } = assurancesAndCompliance[category];
      regulations.forEach(({ regulation, link }) => {
        // Check that regulations link to the correct URLs
        exportPage.assurancesComplianceAssertLink(label, regulation, link);
        // Check that no response is reported
        exportPage
          .assurancesComplianceResponse(label, regulation)
          .should('eq', 'No response was provided.');
      });
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testMmisAssurancesAndComplianceWithData = function () {
  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('mmis-assurances-compliance-test.json').as(
      'assurancesAndCompliance'
    );
    cy.fixture('mmis-data.json').as('mmisData');
    cy.useStateStaff();
    cy.visit(this.apdUrl);
  });

  it('should handle setting Assurance and Compliance', function () {
    const assurancesCompliancePage = new AssurancesCompliancePage();
    const assurancesAndCompliance = this.assurancesAndCompliance;
    const { assurancesAndCompliances: data } = this.mmisData;

    cy.goToAssurancesAndCompliance();
    cy.url().should('contain', '/assurances-and-compliance');
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    Object.keys(assurancesAndCompliance).forEach(category => {
      const { regulations, label } = assurancesAndCompliance[category];
      const values = data[category];
      if (values) {
        regulations.forEach(({ regulation, link }) => {
          const found = values.find(value => value.title === regulation);
          const { checked = null, explanation = '' } = found || {};

          cy.log({ regulation, checked, explanation });
          assurancesCompliancePage.assertLink(label, regulation, link);

          assurancesCompliancePage.fillRegulationSeed(
            label,
            regulation,
            checked,
            explanation
          );
        });
      }
    });

    cy.contains('Select yes or no.').should('not.exist');

    cy.waitForSave();
  });

  // TODO: Skipping until the export page is working
  it.skip('should display Assurance and Compliance in export view', function () {
    const exportPage = new ExportPage();
    const assurancesAndCompliance = this.assurancesAndCompliance;
    const { assurancesAndCompliances: data } = this.mmis;

    cy.goToExportView();

    Object.keys(assurancesAndCompliance).forEach(category => {
      const { regulations, label } = assurancesAndCompliance[category];
      const { values } = data[category];
      regulations.forEach(({ regulation }) => {
        const { checked, explanation } = values.find(
          value => value.title === regulation
        );
        let expectedResponse = '';

        if (checked === true) {
          expectedResponse = 'Yes';
        } else if (checked === false) {
          expectedResponse = 'No';

          if (!explanation || explanation.length === 0) {
            expectedResponse += 'No response was provided';
          }
        } else {
          expectedResponse = 'No response was provided';
        }
        // Check that no response is reported
        exportPage
          .assurancesComplianceResponse(label, regulation)
          .should('contain', expectedResponse);
      });
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
