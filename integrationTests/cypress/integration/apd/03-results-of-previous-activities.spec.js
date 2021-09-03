// E2E tests for the key state personnel page & associated data as state staff.
// Uses the fixture "users.json" for filling in personnel data.

import ExportPage from '../../page-objects/export-page';
import PreviousActivitiesPage from '../../page-objects/previous-activities-page';

/* eslint func-names: "off", prefer-arrow-callback: "off", no-return-assign: "off" */

describe('Results of Previous Activities', function () {
  const previousActivitiesPage = new PreviousActivitiesPage();
  const exportPage = new ExportPage();
  // Create APD as state staff
  let apdURL;

  before(function () {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => (apdURL = pathname));
  });

  /*
  function calcApprovedFFP (cost, share) {
    return Math.round(cost * share);
  }
*/
  // Get URL for export view and the years the previous activities reference
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

      // Get the FFYs for which previous activities should report on from
      // the first budget table found
      exportPage.getPrevActYears();
    });

    beforeEach(function () {
      cy.useStateStaff(apdExportURL);

      // Get div with data for results of previous activities
      cy.findByRole('heading', { name: /Results of Previous Activities/i })
        .parent()
        .as('previousActivitiesDiv');
    });

    it('Prior Activities Overview is blank', function () {
      cy.get('@previousActivitiesDiv')
        .findByRole('heading', { name: /Prior Activities Overview/i })
        .next()
        .should('have.text', '');
    });

    it('HIT + HIE Federal share 90% FFP has all $0 values', function () {
      cy.get('@previousActivitiesDiv')
        .contains('HIT + HIE Federal share 90% FFP')
        .parent()
        .find('td.budget-table--number')
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });

    it('MMIS Federal share 90% FFP has all $0 values', function () {
      cy.get('@previousActivitiesDiv')
        .contains('MMIS Federal share 90% FFP')
        .parent()
        .find('td.budget-table--number')
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });

    it('MMIS Federal share 75% FFP has all $0 values', function () {
      cy.get('@previousActivitiesDiv')
        .contains('MMIS Federal share 75% FFP')
        .parent()
        .find('td.budget-table--number')
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });

    it('MMIS Federal share 50% FFP has all $0 values', function () {
      cy.get('@previousActivitiesDiv')
        .contains('MMIS Federal share 50% FFP')
        .parent()
        .find('td.budget-table--number')
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });

    it('Grand Total has all $0 values', function () {
      cy.get('@previousActivitiesDiv')
        .contains('Grand totals: Federal HIT, HIE, MMIS')
        .parent()
        .find('td.budget-table--number')
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });
  });

  describe('Fill out previous activities page', function () {
    // Get URL specifically for the "Results of Previous Activities page"
    let apdPreviousActivitiesURL;
    before(function () {
      cy.useStateStaff(apdURL);
      // Expand nav menu option
      cy.get('.ds-c-vertical-nav__label--parent')
        .contains('Results of Previous Activities')
        .click();
      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains('Results of Previous Activities')
        .click();
      cy.url().should('contain', '/previous-activities');
      cy.location('pathname').then(
        pathname => (apdPreviousActivitiesURL = pathname)
      );

      // Get the years referenced by previous activities
      previousActivitiesPage.getYears();
    });

    beforeEach(function () {
      cy.fixture('results-of-previous-activities-test.json').as('activityData');
      cy.useStateStaff(apdPreviousActivitiesURL);
    });

    it('Fill Previous Activities Summary', function () {
      previousActivitiesPage.setSummary(this.activityData.summary);

      // Wait to save
      cy.contains('Saving').should('exist');
      cy.contains('Saved').should('exist');
    });

    it('Fill budget fields', function () {
      previousActivitiesPage.setExpenditures(this.activityData.expenditures);

      cy.contains('Saving').should('exist');
      cy.contains('Saved').should('exist');
    });

    it('Verify calculated FFPs', function () {
      previousActivitiesPage.verifyFFP();
    });

    it('Verify Total FFP', function () {
      previousActivitiesPage.verifyTotalFFP();
    });

    it('Verify Total Expenditures', function () {
      previousActivitiesPage.verifyTotalExpenditures();
    });
  });

  describe('Check for input values in export view', function () {
    before(function () {
      cy.useStateStaff(apdExportURL);
      exportPage.getPrevActExpenditureVals();
    });

    beforeEach(function () {
      cy.fixture('results-of-previous-activities-test.json').as('activityData');

      cy.useStateStaff(apdExportURL);

      // Get div with data for results of previous activities
      cy.findByRole('heading', { name: /Results of Previous Activities/i })
        .parent()
        .as('previousActivitiesDiv');
    });

    it('Prior Activities Overview has input data', function () {
      cy.get('@previousActivitiesDiv')
        .findByRole('heading', { name: /Prior Activities Overview/i })
        .next()
        .should('have.text', this.activityData.summary);
    });

    it('Actual Expenditures has input data', function () {
      exportPage.verifyPrevActInputs(this.activityData.expenditures);
    });

    it('FFY was calculated correctly', function () {
      exportPage.verifyPrevActFFY();
    });

    it('Verify totals', function () {
      exportPage.verifyPrevActTotals();
    });
  });
});
