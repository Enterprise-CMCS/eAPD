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
    cy.findByRole('heading', {
      name: /Results of Previous Activities/i
    }).should('exist');
  });

  it('Fill Previous Activities Summary', () => {
    previousActivitiesPage.setSummary(resultsOfPreviousActivities.summary);
  });

  it('Fill budget fields', () => {
    previousActivitiesPage.setExpenditures(
      resultsOfPreviousActivities.expenditures
    );
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

export const testResultsOfPreviousActivitiesExportViewWithData = () => {
  let exportPage;
  let resultsOfPreviousActivities;
  // eslint-disable-next-line prefer-arrow-callback, func-names
  before(function () {
    exportPage = new ExportPage();
    exportPage.getPrevActExpenditureVals();
  });

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(function () {
    cy.fixture('results-of-previous-activities-test.json').then(
      activityData => {
        resultsOfPreviousActivities = activityData;
      }
    );
    cy.findByRole('heading', { name: /Results of Previous Activities/i })
      .parent()
      .as('previousActivitiesDiv');
  });

  it('Prior Activities Overview has input data', () => {
    cy.get('@previousActivitiesDiv')
      .findByRole('heading', { name: /Prior Activities Overview/i })
      .next()
      .should('have.text', resultsOfPreviousActivities.summary);
  });

  it('Actual Expenditures has input data', () => {
    exportPage.verifyPrevActInputs(resultsOfPreviousActivities.expenditures);
  });

  it('FFY was calculated correctly', () => {
    exportPage.verifyPrevActFFY();
  });

  it('Verify totals', () => {
    exportPage.verifyPrevActTotals();
  });
};
