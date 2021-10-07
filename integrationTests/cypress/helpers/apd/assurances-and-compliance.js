import AssurancesCompliancePage from '../../page-objects/assurances-compliance-page';
import ExportPage from '../../page-objects/export-page';

const categories = [
  'Procurement Standards (Competition / Sole Source)',
  'Access to Records, Reporting and Agency Attestations',
  'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports',
  'Security and Interface Requirements to Be Employed for All State HIT Systems'
];

export const testDefaultAssurancesAndCompliance = () => {
  let assurancesCompliancePage;
  let assurancesAndCompliance;

  before(() => {
    assurancesCompliancePage = new AssurancesCompliancePage();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });

    cy.goToAssurancesAndCompliance();
    cy.url().should('contain', '/assurances-and-compliance');

    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('previousActivitiesDiv');
  });

  categories.forEach(category => {
    it(`${category}`, () => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        cy.log(`Testing for regulation ${regulation}`);
        // Check that regulations link to the correct URLs
        assurancesCompliancePage.assertLink(category, regulation, val.links[i]);
        assurancesCompliancePage.verifyRegulationValue(category, regulation);
      });
    });
  });
};

export const testDefaultAssurancesAndComplianceExportView = () => {
  let exportPage;
  let assurancesAndCompliance;

  before(() => {
    exportPage = new ExportPage();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });

    // Get div with data, also makes sure page is loaded
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');
  });

  categories.forEach(category => {
    it(`${category}`, () => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        cy.log(`Testing for regulation ${regulation}`);
        // Check that regulations link to the correct URLs
        exportPage.assurancesComplianceAssertLink(
          category,
          regulation,
          val.links[i]
        );
        // Check that no response is reported
        exportPage
          .assurancesComplianceResponse(category, regulation)
          .should('eq', 'No response was provided');
      });
    });
  });
};

export const testAssurancesAndComplianceWithData = () => {
  let assurancesCompliancePage;
  let assurancesAndCompliance;

  before(() => {
    assurancesCompliancePage = new AssurancesCompliancePage();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });

    cy.goToAssurancesAndCompliance();
    cy.url().should('contain', '/assurances-and-compliance');

    // Get div with data, also makes sure page is loaded
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesComplianceDiv');
  });

  categories.forEach(category => {
    it(`${category}`, () => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        cy.log(`Testing for regulation ${regulation}`);
        // Check that regulations link to the correct URLs
        assurancesCompliancePage.assertLink(category, regulation, val.links[i]);

        assurancesCompliancePage.fillRegulation(
          category,
          regulation,
          val.responses[i]
        );
        cy.waitForSave();
      });
    });
  });
};

export const testAssurancesAndComplianceExportViewWithData = () => {
  let exportPage;
  let assurancesAndCompliance;

  before(() => {
    exportPage = new ExportPage();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('assurances-compliance-test.json').then(data => {
      assurancesAndCompliance = data;
    });
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .as('assurancesCompliancesDiv');
  });

  categories.forEach(category => {
    it(`${category}`, () => {
      const val = assurancesAndCompliance[category];

      val.regulations.forEach((regulation, i) => {
        cy.log(`Testing for regulation ${regulation}`);

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
  });
};
