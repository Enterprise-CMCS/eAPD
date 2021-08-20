/// <reference types="cypress" />

import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import ExportPage from '../../../page-objects/export-page';

describe('checking default values in Activities section', () => {
  // const activityPage = new ActivityPage();
  const activityPage = new ActivityPage();
  const budgetPage = new BudgetPage();
  const exportPage = new ExportPage();

  let apdUrl;
  const years = [];
  const activities = [['Program Administration', 'HIT']];

  before(() => {
    cy.useStateStaff();
    cy.findByRole('button', { name: /Create new/i }).click();

    // Gets list of available years
    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );

    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      apdUrl = pathname;
    });
  });

  beforeEach(() => {
    cy.useStateStaff(apdUrl);
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

    // Activity overview
    cy.url().should('contain', '/activity/0/overview');

    activityPage.checkDate('Start date');
    activityPage.checkDate('End date');

    activityPage.checkTinyMCE('activity-short-overview-field', '');
    activityPage.checkTinyMCE('activity-description-field', '');
    activityPage.checkTinyMCE('activity-alternatives-field', '');
    activityPage.checkTinyMCE('standards-and-conditions-supports-field', '');
    activityPage.checkTextField('ds-c-field visibility--screen', '');

    // Outcomes and Milestones
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/oms');

    cy.contains('Outcomes have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Milestones have not been added for this activity.').should(
      'exist'
    );

    cy.findByRole('button', { name: /Add Outcome/i }).click();
    activityPage.checkTextField('ds-c-field', '', 0); // Outcome
    activityPage.checkTextField('ds-c-field', '', 1); // Metric
    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkOutcomeOutput(
      'Outcome not specified',
      'Metric not specified'
    );

    cy.contains('Edit').click();
    activityPage.checkMetricFunctionality();

    activityPage.checkDeleteButton(
      'Outcomes have not been added for this activity.',
      'Delete Outcome and Metrics?',
      'Outcome not specified'
    );

    cy.findByRole('button', { name: /Add Milestone/i }).click();
    activityPage.checkInputField('Name', '');
    activityPage.checkDate('Target completion date');
    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkMilestoneOutput(
      'Milestone not specified',
      'Date not specified'
    );

    activityPage.checkDeleteButton(
      'Milestones have not been added for this activity.',
      'Delete Milestone?',
      'Milestone not specified'
    );

    // State Staff and Expenses
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/state-costs');

    cy.contains('State staff have not been added for this activity.').should(
      'exist'
    );
    cy.contains(
      'Other state expenses have not been added for this activity.'
    ).should('exist');

    cy.findByRole('button', { name: /Add State Staff/i }).click();

    activityPage.checkInputField('Personnel title', '');
    activityPage.checkInputField('Description', '');
    activityPage.checkStateStaffFFY(years, '');

    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkStateStaffOutput(
      'Personnel title not specified',
      years,
      0,
      0
    );

    activityPage.checkDeleteButton(
      'State staff have not been added for this activity.',
      'Delete State Staff Expenses?',
      'Personnel title not specified'
    );

    cy.findByRole('button', { name: /Add State Expense/i }).click();
    activityPage.checkInputField('Description', '');
    activityPage.checkFFYinputCostFields(years, 0);
    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkOtherStateExpensesOutput(
      'Hardware, software, and licensing',
      years,
      0
    );

    activityPage.checkDeleteButton(
      'Other state expenses have not been added for this activity.',
      'Delete Other State Expense?',
      'Hardware, software, and licensing'
    );

    // Private Contractor Costs
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/contractor-costs');
    cy.contains(
      'Private contractors have not been added for this activity.'
    ).should('exist');

    cy.findByRole('button', { name: /Add Contractor/i }).click();

    activityPage.checkTextField('ds-c-field', '');
    activityPage.checkTinyMCE('contractor-description-field-0', '');
    activityPage.checkDate('Contract start date');
    activityPage.checkDate('Contract end date');
    activityPage.checkTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      0,
      0
    );
    cy.get('[type="radio"][checked]').should('have.value', 'no');
    activityPage.checkFFYinputCostFields(years, 0);

    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkPrivateContractorOutput(
      'Private Contractor or Vendor Name not specified',
      'Procurement Methodology and Description of Services not specified',
      'Full Contract Term: Date not specified - Date not specified',
      'Total Contract Cost: $0',
      years,
      0
    );

    activityPage.checkDeleteButton(
      'Private contractors have not been added for this activity',
      'Delete Private Contractor?',
      'Private Contractor or Vendor Name not specified'
    );

    // Cost Allocation and Other Funding
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/cost-allocation');

    activityPage.checkTinyMCE('cost-allocation-methodology-field', '');

    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        activityPage.checkTinyMCE(
          `cost-allocation-narrative-${years[i]}-other-sources-field`,
          ''
        );
        activityPage.checkTextField('ds-c-field ds-c-field--currency', 0, i);
        budgetPage.checkActivityTotalCostTable(0, 0, 0, i);
      }
    });

    // Budget and FFP
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/ffp');

    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        cy.contains(`Budget for FFY ${years[i]}`)
          .parent()
          .parent()
          .within(() => {
            budgetPage.checkSubtotalTable('State Staff', 0, 0);
            budgetPage.checkSubtotalTable('Other State Expenses', 0);
            budgetPage.checkSubtotalTable('Private Contractor', 0);
            budgetPage.checkTotalComputableMedicaidCost(0);
            budgetPage.checkActivityTotalCostTable(0, 0, 0, 1);

            budgetPage.checkSplitFunctionality();
            budgetPage.checkCostSplitTable(90, 10, 0, 0, 0);

            cy.get('[class="ds-c-field"]').select('75-25');
            budgetPage.checkCostSplitTable(75, 25, 0, 0, 0);

            cy.get('[class="ds-c-field"]').select('50-50');
            budgetPage.checkCostSplitTable(50, 50, 0, 0, 0);

            cy.get('[class="ds-c-field"]').select('90-10');

            budgetPage.checkQuarterTable('default', 0, 0);
          });
      }
      budgetPage.checkFFYtotals(
        years,
        activities[0][0],
        0,
        0,
        0,
        '90/10',
        0,
        'Alaska',
        0
      );
    });

    // Testing add activity button at end of Activitiy
    activityPage.checkAddActivityButton();
  });

  it('checks default activity export view', () => {
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

    for (let i = 0; i < activities.length; i += 1) {
      cy.contains(`Activity ${i + 1} (${activities[i][0]})`)
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

          for (let k = 0; k < years.length; k += 1) {
            exportPage.checkOtherFunding(years[i], '', 0);

            cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
              .next()
              .within(() => {
                budgetPage.checkSubtotalTable('State Staff', 0, 0);
                budgetPage.checkSubtotalTable('Other State Expenses', 0);
                budgetPage.checkSubtotalTable('Private Contractor', 0);
                budgetPage.checkTotalComputableMedicaidCost(0);
                exportPage.checkRowTotals(0, 0);
              });
            cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
              .parent()
              .next()
              .within(() => {
                budgetPage.checkCostSplitTable(90, 10, 0, 0, 0);
              });
            cy.contains('Estimated Quarterly Expenditure')
              .next()
              .within(() => {
                budgetPage.checkQuarterTable('export', 0, 0);
              });
          }
          budgetPage.checkFFYtotals(
            years,
            activities[i][0],
            0,
            0,
            0,
            '90/10',
            0,
            'Alaska',
            0
          );
        });
    }
  });
});
