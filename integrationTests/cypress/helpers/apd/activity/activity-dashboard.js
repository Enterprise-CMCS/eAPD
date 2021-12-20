import BudgetPage from '../../../page-objects/budget-page';
import ExportPage from '../../../page-objects/export-page';

const activities = [['Program Administration', 'HIT']];

export const testDefaultActivityDashboard = years => {
  it('tests default values in an activity', () => {
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.findByRole('heading', { name: /Activities/i, level: 2 }).should('exist');

    cy.contains('Activity 1: Program Administration (HIT)').should('exist');
    cy.contains('Activity 2').should('not.exist');

    cy.contains('Delete').should('not.exist');
    cy.contains('Edit').should('exist');

    cy.contains('Edit').click();
    cy.url().should('contain', '/activity/0/overview');

    cy.waitForSave();
  });

  it('checks default activity export view', () => {
    const exportPage = new ExportPage();
    const budgetPage = new BudgetPage();

    cy.goToExportView();

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

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testActivityDashboardWithData = () => {
  let activityOverview;

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityOverview = data;
    });
    cy.goToActivityDashboard();
  });

  it('tests naming an activity', () => {
    cy.url().should('include', '/activities');
    cy.findByRole('heading', { name: /Activities/i, level: 2 }).should('exist');

    cy.contains('Add Activity').click();
    cy.contains('Activity 2: Untitled').should('exist');
    cy.findAllByText('Edit').eq(1).click();

    cy.findByLabelText('Activity name').type(activityOverview.newActivityName);
    cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
    activities.push([activityOverview.newActivityName, 'HIE']);

    cy.findAllByText(`Activity 2: ${activityOverview.newActivityName}`).should(
      'exist'
    );
    cy.waitForSave();

    cy.goToActivityDashboard();
  });

  it('should show the correct values on the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkActivityList(activities);
    exportPage.checkActivityHeader(activities[1][0], 2);
    exportPage.checkActivityNameAtEnd(activities[1][0]);

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
