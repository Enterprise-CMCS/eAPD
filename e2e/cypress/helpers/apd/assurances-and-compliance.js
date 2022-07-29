import AssurancesCompliancePage from '../../page-objects/assurances-compliance-page';
import ExportPage from '../../page-objects/export-page';

const categories = [
  'Procurement Standards (Competition / Sole Source)',
  'Access to Records, Reporting and Agency Attestations',
  'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports',
  'Security and Interface Requirements to Be Employed for All State HIT Systems'
];

export const testDefaultAssurancesAndCompliance = () => {
  let assurancesAndCompliance;

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });
  });

  it('should display the default settings in Assurance and Compliance', () => {
    const assurancesCompliancePage = new AssurancesCompliancePage();

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

    cy.findAllByText('Select yes or no', {
      selector: 'span',
      ignore: 'div'
    }).should('have.length', 15);

    cy.waitForSave();
  });

  it('should display default Assurance and Compliance in export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    categories.forEach(category => {
      const val = assurancesAndCompliance[category];

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

export const testAssurancesAndComplianceWithData = () => {
  let assurancesAndCompliance;

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });
    cy.goToAssurancesAndCompliance();
  });

  it('should handle setting Assurance and Compliance', () => {
    const assurancesCompliancePage = new AssurancesCompliancePage();
    cy.url().should('contain', '/assurances-and-compliance');
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');

    cy.findAllByText('Select yes or no', {
      selector: 'span',
      ignore: 'div'
    }).should('have.length', 15);

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

  it('should display Assurance and Compliance in export view', () => {
    const exportPage = new ExportPage();

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
