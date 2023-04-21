import ExportPage from '../../page-objects/export-page.js';
import PreviousActivitiesPage from '../../page-objects/previous-activities-page.js';

export const testDefaultResultsOfPreviousActivities = function () {
  it('should have the default values for Results of Previous Activities', function () {
    const previousActivitiesPage = new PreviousActivitiesPage();
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears('HITECH');

    cy.goToPreviousActivities();

    cy.url().should('include', '/previous-activities');
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');

    previousActivitiesPage.verifyFFP();
    previousActivitiesPage.verifyTotalFFP();
    previousActivitiesPage.verifyTotalExpenditures();
  });

  it('should display the default values in the export view', function () {
    cy.goToExportView();

    const exportPage = new ExportPage();
    exportPage.getPrevActYears();

    cy.findByRole('heading', { name: /Results of Previous Activities/i })
      .parent()
      .as('previousActivitiesDiv');

    cy.get('@previousActivitiesDiv')
      .findByRole('heading', { name: /Prior Activities Overview/i })
      .next()
      .should('have.text', '');

    cy.get('@previousActivitiesDiv')
      .contains('HIT + HIE Federal share 90% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });

    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 90% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });

    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 75% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });

    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 50% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });

    cy.get('@previousActivitiesDiv')
      .contains('Grand totals: Federal HIT, HIE, MMIS')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testResultsOfPreviousActivitiesWithData = function () {
  let previousActivitiesPage;

  before(function () {
    previousActivitiesPage = new PreviousActivitiesPage();

    cy.useStateStaff();
    cy.visit(this.apdUrl);
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears('HITECH');
  });

  beforeEach(function () {
    cy.fixture('results-of-previous-activities-test.json').as(
      'resultsOfPreviousActivities'
    );
  });

  it('fill form', function () {
    const resultsOfPreviousActivities = this.resultsOfPreviousActivities;
    cy.goToPreviousActivities();

    cy.url().should('include', '/previous-activities');
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');

    previousActivitiesPage.setSummary(resultsOfPreviousActivities.summary);
    previousActivitiesPage.setExpenditures(
      resultsOfPreviousActivities.expenditures
    );

    previousActivitiesPage.verifyFFP();
    previousActivitiesPage.verifyTotalFFP();
    previousActivitiesPage.verifyTotalExpenditures();

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
  });

  it('should have the correct values on the export view', function () {
    const resultsOfPreviousActivities = this.resultsOfPreviousActivities;
    const exportPage = new ExportPage();
    exportPage.getPrevActExpenditureVals();

    cy.goToExportView();

    cy.findByRole('heading', { name: /Prior Activities Overview/i })
      .next()
      .should('have.text', resultsOfPreviousActivities.summary);

    exportPage.verifyPrevActInputs(resultsOfPreviousActivities.expenditures);
    exportPage.verifyPrevActFFY();
    exportPage.verifyPrevActTotals();

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testMmisResultsOfPreviousActivitiesWithData = function () {
  let previousActivitiesPage;

  before(function () {
    previousActivitiesPage = new PreviousActivitiesPage();

    cy.useStateStaff();
    cy.visit(this.apdUrl);
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears('MMIS');
  });

  beforeEach(function () {
    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  it('fill out Results of Previous Activities', function () {
    const mmisData = this.mmisData;
    const resultsOfPreviousActivitiesData = mmisData.previousActivities;

    cy.goToPreviousActivities();

    cy.url().should('include', '/previous-activities');
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');

    previousActivitiesPage.setSummary(
      resultsOfPreviousActivitiesData.previousActivitySummary
    );
    previousActivitiesPage.setMmisExpenditures(
      resultsOfPreviousActivitiesData.actualExpenditures
    );

    previousActivitiesPage.verifyMmisFFP();
    previousActivitiesPage.verifyTotalMmisFFP();
    previousActivitiesPage.verifyTotalMmisExpenditures();

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
  });

  it.skip('should have the correct values on the export view', function () {
    const resultsOfPreviousActivities = this.resultsOfPreviousActivities;
    const exportPage = new ExportPage();
    exportPage.getPrevActExpenditureVals();

    cy.goToExportView();

    cy.findByRole('heading', { name: /Prior Activities Overview/i })
      .next()
      .should('have.text', resultsOfPreviousActivities.summary);

    exportPage.verifyPrevActInputs(resultsOfPreviousActivities.expenditures);
    exportPage.verifyPrevActFFY();
    exportPage.verifyPrevActTotals();

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
