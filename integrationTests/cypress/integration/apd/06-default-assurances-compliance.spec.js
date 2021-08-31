// E2E tests for the assurances and compliance page.
// Uses the fixture "assurances-compliance-test.json" for filling in and checking data.

import AssurancesCompliancePage from '../../page-objects/assurances-compliance-page';
import ExportPage from '../../page-objects/export-page';

/* eslint func-names: "off", prefer-arrow-callback: "off", 
no-return-assign: "off", no-restricted-syntax: "off" */

const categories = [
  'Procurement Standards (Competition / Sole Source)',
  'Access to Records, Reporting and Agency Attestations',
  'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports',
  'Security and Interface Requirements to Be Employed for All State HIT Systems'
];

describe('Assurances and Compliance', function () {
  const assurancesCompliancePage = new AssurancesCompliancePage();
  const exportPage = new ExportPage();
  // Create APD as state staff
  let apdURL;

  before(function () {
    cy.useStateStaff();
    cy.findByRole('button', { name: /Create new/i }).click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => (apdURL = pathname));
  });

  // Get URL for export view
  let apdExportURL;

  describe('Check for default values in export view', function () {
    before(function () {
      cy.useStateStaff(apdURL);

      // Navigate to export data page
      cy.get('a.ds-c-vertical-nav__label')
        .contains('Export and Submit')
        .click();
      cy.findByRole('button', { name: /Continue to Review/i }).click();
      cy.url().should('contain', '/print');
      cy.location('pathname').then(pathname => (apdExportURL = pathname));
    });

    beforeEach(function () {
      cy.fixture('assurances-compliance-test.json').as('data');
      cy.useStateStaff(apdExportURL);

      // Get div with data, also makes sure page is loaded
      cy.findByRole('heading', { name: /Assurances and Compliance/i })
        .parent()
        .as('previousActivitiesDiv');
    });

    for (const category of categories) {
      it(`${category}`, function () {
        const val = this.data[`${category}`];

        for (let i = 0; i < val.regulations.length; i += 1) {
          cy.log(`Testing for regulation ${val.regulations[i]}`);
          // Check that regulations link to the correct URLs
          exportPage.assurancesComplianceAssertLink(
            category,
            val.regulations[i],
            val.links[i]
          );
          // Check that no response is reported
          exportPage
            .assurancesComplianceResponse(category, val.regulations[i])
            .should('eq', 'No response was provided');
        }
      });
    }
  });

  let apdAssurancesComplianceURL;
  describe('Fill out Assurances and Compliance', function () {
    before(function () {
      cy.useStateStaff(apdURL);

      // Navigate to export data page
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Assurances and compliance/i)
        .click();
      cy.url().should('contain', '/assurances-and-compliance');
      cy.location('pathname').then(
        pathname => (apdAssurancesComplianceURL = pathname)
      );
    });

    beforeEach(function () {
      cy.fixture('assurances-compliance-test.json').as('data');
      cy.useStateStaff(apdAssurancesComplianceURL);

      // Get div with data, also makes sure page is loaded
      cy.findByRole('heading', { name: /Assurances and Compliance/i })
        .parent()
        .as('previousActivitiesDiv');
    });

    for (const category of categories) {
      it(`${category}`, function () {
        const val = this.data[`${category}`];

        for (let i = 0; i < val.regulations.length; i += 1) {
          cy.log(`Testing for regulation ${val.regulations[i]}`);
          // Check that regulations link to the correct URLs
          assurancesCompliancePage.assertLink(
            category,
            val.regulations[i],
            val.links[i]
          );

          assurancesCompliancePage.fillRegulation(
            category,
            val.regulations[i],
            val.responses[i]
          );
        }

        cy.contains('Saving').should('exist');
        cy.contains('Saved').should('exist');
      });
    }
  });

  describe('Check for input values in export view', function () {
    beforeEach(function () {
      cy.fixture('assurances-compliance-test.json').as('data');
      cy.useStateStaff(apdExportURL);

      // Get div with data, also makes sure page is loaded
      cy.findByRole('heading', { name: /Assurances and Compliance/i })
        .parent()
        .as('previousActivitiesDiv');
    });

    for (const category of categories) {
      it(`${category}`, function () {
        const val = this.data[`${category}`];

        for (let i = 0; i < val.regulations.length; i += 1) {
          cy.log(`Testing for regulation ${val.regulations[i]}`);

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
            .assurancesComplianceResponse(category, val.regulations[i])
            .should('contain', expectedResponse);
        }
      });
    }
  });
});
