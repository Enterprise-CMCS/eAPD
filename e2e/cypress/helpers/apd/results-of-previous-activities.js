import ExportPage from '../../page-objects/export-page';
import PreviousActivitiesPage from '../../page-objects/previous-activities-page';

export const testDefaultResultsOfPreviousActivities = () => {
  it('should have the default values for Results of Previous Activities', () => {
    const previousActivitiesPage = new PreviousActivitiesPage();
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears();

    cy.goToPreviousActivities();

    cy.url().should('include', '/previous-activities');
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');

    previousActivitiesPage.verifyFFP();
    previousActivitiesPage.verifyTotalFFP();
    previousActivitiesPage.verifyTotalExpenditures();
  });

  it('should display the default values in the export view', () => {
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

export const testResultsOfPreviousActivitiesWithData = () => {
  let previousActivitiesPage;
  let resultsOfPreviousActivities;

  before(() => {
    previousActivitiesPage = new PreviousActivitiesPage();
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.updateFeatureFlags();
    cy.fixture('results-of-previous-activities-test.json').then(
      activityData => {
        resultsOfPreviousActivities = activityData;
      }
    );
  });

  it('fill form', () => {
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

  it('should have the correct values on the export view', () => {
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
