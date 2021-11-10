import BudgetPage from '../../../page-objects/budget-page';
import ExportPage from '../../../page-objects/export-page';

const activities = [['Program Administration', 'HIT']];

export const testDefaultActivityDashboard = () => {
  beforeEach(() => {
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    // cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/activities');
  });

  it('tests default values in an activity', () => {
    cy.url().should('include', '/activities');

    // Tests Continue button on Activities Dashboard
    cy.contains('Continue').click();
    cy.url().should('contain', '/schedule-summary');
    cy.contains('Back').click();
    cy.url().should('include', '/activities');

    cy.contains('Activity 1: Program Administration (HIT)').should('exist');
    cy.contains('Activity 2').should('not.exist');

    cy.contains('Delete').should('not.exist');
    cy.contains('Edit').should('exist');

    cy.contains('Edit').click();
    cy.url().should('contain', '/activity/0/overview');
    cy.goToActivityDashboard();

    // Testing add activity button at end of Activitiy
    cy.contains('Add Activity').click();
    cy.waitForSave();
    cy.url().should('include', '/activities');
    cy.contains('Activity 2').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.waitForSave();
    cy.contains('Activity 2').should('not.exist');
  });
};

export const testDefaultActivityDashboardExportView = years => {
  let exportPage;
  let budgetPage;

  before(() => {
    exportPage = new ExportPage();
    budgetPage = new BudgetPage();
  });

  it('checks default activity export view', () => {
    exportPage.checkExecutiveSummary(
      activities,
      years,
      'Date not specified - Date not specified',
      0,
      0,
      0
    );

    exportPage.checkActivityList(activities);

    activities.forEach((activity, activityIndex) => {
      cy.findByRole('heading', { name: /^Activities$/i })
        .parent()
        .contains(`Activity ${activityIndex + 1}: ${activity[0]}`)
        .parent()
        .within(() => {
          exportPage.checkActivityOverview(
            '',
            'Date not specified',
            'Date not specified',
            '',
            '',
            'No response was provided for how this activity will support the Medicaid standards and conditions.',
            'No response was provided for how this activity will support the Medicaid standards and conditions.'
          );

          exportPage.checkOutcomesAndMilestones('empty');
          exportPage.checkStateExpenses('empty');
          exportPage.checkPrivateContractorCosts('empty');
          exportPage.checkCostAllocation('');

          years.forEach(year => {
            exportPage.checkOtherFunding(year, '', 0);

            cy.contains(`Activity ${activityIndex + 1} Budget for FFY ${year}`)
              .next()
              .within(() => {
                budgetPage.checkSubtotalTable('State Staff', 0, 0);
                budgetPage.checkSubtotalTable('Other State Expenses', 0);
                budgetPage.checkSubtotalTable('Private Contractor', 0);
                budgetPage.checkTotalComputableMedicaidCost(0);
              });
            cy.contains(`Activity ${activityIndex + 1} Budget for FFY ${year}`)
              .parent()
              .next()
              .within(() => {
                exportPage.checkRowTotals(0, 0);
                budgetPage.checkCostSplitTable(90, 10, 0);
              });
            cy.contains('Estimated Quarterly Expenditure')
              .next()
              .within(() => {
                budgetPage.checkQuarterTable('export', '', 0);
              });
          });
          budgetPage.checkFFYtotals(
            years,
            activity[0],
            0,
            0,
            0,
            '90/10',
            0,
            'Alaska',
            0
          );
        });
    });
  });
};

export const testActivityDashboardWithData = () => {
  let activityOverview;

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityOverview = data;
    });
    cy.goToActivityDashboard();
    cy.url().should('include', '/activities');
    cy.findByRole('heading', { name: /Activities/i, level: 2 }).should('exist');
  });

  it('tests naming an activity', () => {
    cy.contains('Add Activity').click();
    cy.waitForSave();
    cy.contains('Activity 2: Untitled').should('exist');
    cy.findAllByText('Edit').eq(1).click();

    cy.findByLabelText('Activity name').type(activityOverview.newActivityName);
    cy.waitForSave();
    cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
    cy.waitForSave();
    activities.push([activityOverview.newActivityName, 'HIE']);

    cy.findAllByText(`Activity 2: ${activityOverview.newActivityName}`).should(
      'exist'
    );
    cy.goToActivityDashboard();
  });
};

export const testActivityDashboardExportViewWithData = () => {
  let exportPage;
  before(() => {
    exportPage = new ExportPage();
  });

  it('tests naming an activity', () => {
    exportPage.checkActivityList(activities);
    exportPage.checkActivityHeader(activities[1][0], 2);
    exportPage.checkActivityNameAtEnd(activities[1][0]);
  });
};
