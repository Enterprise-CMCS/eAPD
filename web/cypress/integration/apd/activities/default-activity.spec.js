/// <reference types="cypress" />

import { ActivityPage } from '../../../page-objects/activity-page';
import { BudgetPage } from '../../../page-objects/budget-page';

describe('checking default values in Activities section', () => {
  const activityPage = new ActivityPage();
  const budgetPage = new BudgetPage();

  let apdUrl;
  const years = [];
  const activities = [['Program Administration', 'HIT']];

  before(() => {
    cy.useStateStaff();
    // cy.findByRole('button', { name: /Create new/i }).click();
    cy.get('[href="/apd/333"]').click();

    // Gets list of available years
    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );

    // Gets to the activity page
    for (let i = 0; i < 3; i += 1) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      apdUrl = pathname;
    });
  });

  beforeEach(() => {
    cy.useStateStaff(apdUrl);
  });

  const checkFFYtotals = activityName => {
    cy.then(() => {
      cy.contains(`FFY ${years[0]}-${years[years.length - 1]} Totals`)
        .next()
        .within(() => {
          cy.contains(`${activityName} activity is $0`).should('exist');
          cy.contains('other funding of $0').should('exist');
          cy.contains('Medicaid cost is $0').should('exist');
          cy.contains('90/10').should('exist');
          cy.contains('federal share of $0').should('exist');
          cy.contains('Alaska share of $0').should('exist');

          for (let i = 0; i < years.length; i += 1) {
            cy.contains(years[i]).should('exist');
          }
        });
    });
  };

  const checkSubtotalTable = (msg, subtotalMsg) => {
    cy.contains(msg).parent().next().should('contain', '$0');
    cy.contains(subtotalMsg).parent().should('contain', '$0');
  };

  const checkFFYbudgetTable = () => {
    checkSubtotalTable('State Staff', 'State Staff Subtotal');
    checkSubtotalTable('Other State Expenses', 'Other State Expenses Subtotal');
    checkSubtotalTable('Private Contractor', 'Private Contractor Subtotal');
    cy.contains('Total Computable Medicaid Cost')
      .parent()
      .should('contain', '$0');
  };

  const costSplitTableRow = (fedOrState, split) => {
    cy.contains(fedOrState)
      .parent()
      .within(() => {
        cy.get('[class="budget-table--number"]').eq(0).should('contain', '$0');
        cy.get('[class="budget-table--number ds-u-padding--0"]').should(
          'have.text',
          '×'
        );
        cy.get('[class="budget-table--number ds-u-text-align--left"]').should(
          'contain',
          split
        );
        cy.get('[class="budget-table--number"]').eq(1).should('contain', '=');
        cy.get('[class="budget-table--number"]').eq(2).should('contain', '$0');
      });
  };

  // const costSplitTable = (federal, state) => {
  //   cy.get('[class="data-entry-box ds-u-margin-bottom--5"]')
  //     .next()
  //     .within(() => {
  //       cy.contains('Total Computable Medicaid Cost')
  //         .parent()
  //         .should('contain', '$0');

  //       costSplitTableRow('Federal Share', federal);
  //       costSplitTableRow('State Share', state);
  //     });
  // };

  const quarterTableInputRow = (row, defaultOrExport) => {
    cy.contains(row)
      .parent()
      .within(() => {
        if (defaultOrExport === 'default') {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="ds-c-field budget-table--input__number"]')
              .eq(i)
              .should('have.value', 0);
          }
        } else {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="budget-table--number"]')
              .eq(i)
              .should('contain', '0 %');
          }
        }
        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '+0%'
        );
      });
  };

  const quarterTableSubtotalRow = row => {
    cy.contains(row)
      .parent()
      .next()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number"]')
            .eq(i)
            .should('contain', '$0');
        }
        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '$0'
        );
      });
  };

  const quarterTableTotalRow = () => {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .should('contain', '$0');
        }

        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '$0'
        );
      });
  };

  const quarterTabledefault = () => {
    quarterTableInputRow(
      'State Staff and Expenses (In-House Costs)',
      'default'
    );
    quarterTableSubtotalRow('State Staff and Expenses (In-House Costs)');

    quarterTableInputRow('Private Contractor Costs', 'default');
    quarterTableSubtotalRow('Private Contractor Costs');

    quarterTableTotalRow();
  };

  const quarterTableExport = () => {
    quarterTableInputRow('State Staff and Expenses (In-House Costs)', 'export');
    quarterTableSubtotalRow('State Staff and Expenses (In-House Costs)');

    quarterTableInputRow('Private Contractor Costs', 'export');
    quarterTableSubtotalRow('Private Contractor Costs');

    quarterTableTotalRow();
  };

  it.only('tests default values', () => {
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

    cy.findByRole('button', { name: /Add another outcome/i }).click();
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

    cy.findByRole('button', { name: /Add another milestone/i }).click();
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

    cy.findByRole('button', { name: /Add another state staff/i }).click();

    activityPage.checkInputField('Personnel title', '');
    activityPage.checkInputField('Description', '');
    activityPage.checkStateStaffFFY(years, '');

    cy.findByRole('button', { name: /Done/i }).click();
    cy.contains('Personnel title not specified').should('exist');

    // CAN FTEs DEFAULT TO ZERO?
    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        cy.contains(`FFY ${years[i]}`)
          .parent()
          .within(() => {
            cy.contains('Cost: $0').should('exist');
            cy.contains('FTEs:').should('exist');
            cy.contains('Total: $0');
          });
      }
    });

    activityPage.checkDeleteButton(
      'State staff have not been added for this activity.',
      'Delete State Staff Expenses?',
      'Personnel title not specified'
    );

    cy.findByRole('button', { name: /Add another state expense/i }).click();
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

    cy.findByRole('button', { name: /Add another contractor/i }).click();

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
          });
      }
    });

    cy.pause();

    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        cy.contains(`Budget for FFY ${years[i]}`)
          .parent()
          .parent()
          .within(() => {
            // checkFFYbudgetTable();
            // checkTotalCostTable();

            // cy.contains('Federal-State Split').parent().next().click();
            // cy.contains('90-10').should('exist');
            // cy.contains('75-25').should('exist');
            // cy.contains('50-50').should('exist');

            // cy.contains('Federal-State Split')
            //   .parent()
            //   .next('div')
            //   .find(':selected')
            //   .contains('90-10');

            // costSplitTable('90%', '10%');

            // cy.get('[class="ds-c-field"]').select('75-25');
            // costSplitTable('75%', '25%');

            // cy.get('[class="ds-c-field"]').select('50-50');
            // costSplitTable('50%', '50%');

            // cy.get('[class="ds-c-field"]').select('90-10');

            quarterTabledefault();
          });
      }

      checkFFYtotals('Program Administration');
    });

    // Testing add activity button at end of Activitiy
    cy.contains('Add another activity').click();
    cy.url().should('include', '/activities');
    cy.contains('Activity 2').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.contains('Activity 2').should('not.exist');
  });

  it('checks default activity export view', () => {
    cy.contains('Export and Submit').click();
    cy.contains('Continue to Review').click();

    cy.contains('Executive Summary')
      .parent()
      .within(() => {
        cy.contains('Activity 1: Program Administration').should('exist');
        cy.contains('Date not specified - Date not specified').should('exist');
        cy.contains('Total cost of activity: $0').should('exist');
        cy.contains(
          'Total Computable Medicaid Cost: $0 ($0 Federal share)'
        ).should('exist');

        cy.then(() => {
          for (let i = 0; i < years.length; i += 1) {
            cy.contains(
              `FFY ${years[i]}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`
            ).should('exist');
          }
        });
      });

    cy.contains('Activities')
      .parent()
      .next()
      .next()
      .within(() => {
        cy.then(() => {
          for (let i = 0; i < activities.length; i += 1) {
            cy.contains(
              `${i + 1}. ${activities[i][0]} | ${activities[i][1]}`
            ).should('exist');
          }

          for (let i = 0; i < activities.length; i += 1) {
            cy.contains(`Activity ${i + 1} (${activities[i][0]})`)
              .parent()
              .within(() => {
                cy.contains('Provide a short overview of the activity:')
                  .next()
                  .should('have.text', '');
                cy.contains('Start date')
                  .parent()
                  .should('contain', 'Date not specified');
                cy.contains('End date')
                  .parent()
                  .should('contain', 'Date not specified');

                cy.contains('Activity Overview').next().should('be.empty');
                cy.contains('Supporting Justification')
                  .next()
                  .should('be.empty');

                cy.contains('This activity supports')
                  .parent()
                  .next()
                  .should(
                    'contain',
                    'No response was provided for how this activity will support the Medicaid standards and conditions.'
                  );
                cy.contains('This activity does not support')
                  .parent()
                  .next()
                  .should(
                    'contain',
                    'No response was provided for how this activity will support the Medicaid standards and conditions.'
                  );

                cy.contains('Outcomes and Metrics')
                  .next()
                  .next()
                  .should('contain', 'Milestones');
                cy.contains('Milestones')
                  .next()
                  .should('contain', 'State staff');
                cy.contains('State staff')
                  .next()
                  .should('contain', 'Other state expenses');
                cy.contains('Other state expenses')
                  .next()
                  .should('contain', 'Private Contractor Costs');
                cy.contains('Private Contractor Costs')
                  .next()
                  .should('contain', 'Cost Allocation');
                cy.contains('Description of Cost Allocation Methodology')
                  .next()
                  .should('be.empty');

                for (let k = 0; k < years.length; k += 1) {
                  cy.contains(`FFY ${years[k]}`)
                    .next()
                    .should('contain', 'Other Funding Description')
                    .next()
                    .should('be.empty')
                    .next()
                    .should('contain', 'Other Funding Amount: $0');

                  cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
                    .next()
                    .within(() => {
                      checkFFYbudgetTable();
                      cy.contains(
                        `Activity ${i + 1} Total Computable Medicaid Cost`
                      )
                        .parent()
                        .next()
                        .should('contain', '$0')
                        .next()
                        .should('contain', '$0');

                      costSplitTableRow('Federal Share', '90%');
                      costSplitTableRow('State Share', '10%');
                    });
                  cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
                    .parent()
                    .next()
                    .within(() => {
                      quarterTableExport();
                    });
                }

                checkFFYtotals(activities[i][0]);
              });
          }
        });
      });
  });
});
