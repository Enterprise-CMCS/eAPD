import ExportPage from '../../page-objects/export-page';
import PreviousActivitiesPage from '../../page-objects/previous-activities-page';

export const testDefaultResultsOfPreviousActivities = () => {
  let previousActivitiesPage;

  before(() => {
    previousActivitiesPage = new PreviousActivitiesPage();
    cy.goToPreviousActivities();
    // Get the years referenced by previous activities
    previousActivitiesPage.getYears();
  });

  beforeEach(() => {
    cy.goToPreviousActivities();
    cy.url().should('contain', '/previous-activities');
  });

  it('should be on the correct page', () => {
    cy.url().should('include', '/previous-activities');
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');
  });

  it('Verify calculated FFPs', () => {
    previousActivitiesPage.verifyFFP();
  });

  it('Verify Total FFP', () => {
    previousActivitiesPage.verifyTotalFFP();
  });

  it('Verify Total Expenditures', () => {
    previousActivitiesPage.verifyTotalExpenditures();
  });
};

export const testDefaultResultsOfPreviousActivitiesExportView = () => {
  let exportPage;
  // eslint-disable-next-line prefer-arrow-callback, func-names
  before(function () {
    exportPage = new ExportPage();
    exportPage.getPrevActYears();
  });
  beforeEach(() => {
    cy.findByRole('heading', { name: /Results of Previous Activities/i })
      .parent()
      .as('previousActivitiesDiv');
  });

  it('Prior Activities Overview is blank', () => {
    cy.get('@previousActivitiesDiv')
      .findByRole('heading', { name: /Prior Activities Overview/i })
      .next()
      .should('have.text', '');
  });

  it('HIT + HIE Federal share 90% FFP has all $0 values', () => {
    cy.get('@previousActivitiesDiv')
      .contains('HIT + HIE Federal share 90% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
  });

  it('MMIS Federal share 90% FFP has all $0 values', () => {
    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 90% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
  });

  it('MMIS Federal share 75% FFP has all $0 values', () => {
    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 75% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
  });

  it('MMIS Federal share 50% FFP has all $0 values', () => {
    cy.get('@previousActivitiesDiv')
      .contains('MMIS Federal share 50% FFP')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
  });

  it('Grand Total has all $0 values', () => {
    cy.get('@previousActivitiesDiv')
      .contains('Grand totals: Federal HIT, HIE, MMIS')
      .parent()
      .find('td.budget-table--number')
      .each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
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
    cy.fixture('results-of-previous-activities-test.json').then(
      activityData => {
        resultsOfPreviousActivities = activityData;
      }
    );
    cy.goToPreviousActivities();
  });

  it('fill form', () => {
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
