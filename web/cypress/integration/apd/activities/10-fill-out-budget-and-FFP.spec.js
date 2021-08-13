/* eslint-disable no-loop-func */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';

// Assumes a 2nd activity exists
describe('Filling out budget and FFP', () => {
  const populatePage = new PopulatePage();
  const budgetPage = new BudgetPage();

  let dashboardUrl;
  const splitVals = ['90-10', '75-25', '50-50'];
  const years = [2021, 2022];

  before(() => {
    cy.useStateStaff();
    // cy.findByRole('button', { name: /Create new/i }).click();
    cy.contains('HITECH IAPD').click();

    // Gets to the activity page
    for (let i = 0; i < 3; i += 1) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function before() {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('Tests cost split table', function costSplit() {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });
    const a1TotalCost2021 =
      this.data.a1_2021_staff_total +
      this.data.a1_2021_other_exp_total +
      this.data.a1_2021_ontractor_total;

    for (let i = 0; i < splitVals.length; i += 1) {
      cy.get('[class="ds-c-field"]').eq(0).select(splitVals[i]);
      let fedSplit = 0;
      let stateSplit = 0;
      if (splitVals[i] === '90-10') {
        fedSplit = 90;
        stateSplit = 10;
      } else if (splitVals[i] === '75-25') {
        fedSplit = 75;
        stateSplit = 25;
      } else if (splitVals[i] === '50-50') {
        fedSplit = 50;
        stateSplit = 50;
      }

      cy.get('[class="budget-table activity-budget-table"]')
        .eq(2)
        .within(() => {
          budgetPage.checkCostSplitTable(fedSplit, stateSplit, a1TotalCost2021);
        });
    }
  });

  it.only('fills out Budget and FFP for activity 1', function activity1() {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });
    let totalActivityCost = 0;
    let otherFundingTotal = 0;

    for (let i = 0; i < years.length; i += 1) {
      cy.findAllByText(`Activity 1 Budget for FFY ${years[i]}`)
        .parent()
        .parent()
        .within(() => {
          cy.get('[class="budget-table activity-budget-table"]')
            .eq(0)
            .within(() => {
              const totals = this.data.a1_FFY_totals[i];
              const totalYearCost =
                totals.staff_total +
                totals.other_exp_total +
                totals.contractor_total;

              totalActivityCost += totalYearCost;

              const staff = this.data.staff[1];
              budgetPage.checkTableRow(
                staff.title,
                budgetPage.addCommas(staff.costs[i]),
                staff.ftes[i]
              );

              const expenses = this.data.expenses[1];
              budgetPage.checkTableRow(
                expenses.category,
                budgetPage.addCommas(expenses.costs[i])
              );

              const contractor = this.data.contractor_FFY_costs[1];
              budgetPage.checkTableRow(
                contractor.name,
                budgetPage.addCommas(contractor.costs[i])
              );

              const string = budgetPage.addCommas(totalYearCost);
              budgetPage.checkTableRow(
                'Activity 1 Total Computable Medicaid Cost',
                string
              );
            });

          const otherFunding = this.data.other_funding[0];
          cy.findAllByText('Other Funding')
            .parent()
            .should('contain', otherFunding.costs[i]);
          otherFundingTotal += otherFunding.costs[i];

          // let staffTotal = 0;
          // let contractorTotal = 0;
          // if (i === 0) {
          //   cy.get('[class="ds-c-field"]').select('75-25');
          //   staffTotal *= 0.75;
          //   contractorTotal *= 0.75;
          // } else {
          //   cy.get('[class="ds-c-field"]').select('50-50');
          //   staffTotal *= 0.5;
          //   contractorTotal *= 0.5;
          // }

          // cy.get('[class="budget-table"]').within(() => {
          //   populatePage.fillQuarter(1, 25, 25, staffTotal, contractorTotal);
          //   populatePage.fillQuarter(2, 25, 25, staffTotal, contractorTotal);
          //   populatePage.fillQuarter(3, 25, 25, staffTotal, contractorTotal);
          //   populatePage.fillQuarter(4, 25, 25, staffTotal, contractorTotal);
          // });
        });
    }
    const totalMedicaid = totalActivityCost - otherFundingTotal;
    budgetPage.checkFFYtotals(
      years,
      this.data.a1_name,
      budgetPage.addCommas(totalActivityCost),
      budgetPage.addCommas(otherFundingTotal),
      budgetPage.addCommas(totalMedicaid),
      '75/25 (FFY 2021) and 50/50 (FFY 2022)'
    );
  });

  it('fills out Budget and FFP for activity 2', function activity1() {
    cy.findAllByText('Budget and FFP').eq(1).click({ force: true });
    const a2TotalCost2021 = 25000;

    for (let i = 0; i < years.length; i += 1) {
      // CHECK FIRST TABLE
      cy.findAllByText(`Activity 1 Budget for FFY ${years[i]}`)
        .parent()
        .parent()
        .within(() => {
          let fedTotal = 0;
          if (i === 0) {
            cy.get('[class="ds-c-field"]').select('75-25');
            fedTotal = a2TotalCost2021 * 0.75;
          } else {
            cy.get('[class="ds-c-field"]').select('50-50');
            fedTotal = a2TotalCost2021 * 0.5;
          }

          cy.get('[class="budget-table"]').within(() => {
            populatePage.fillQuarter(1, 25, 25, fedTotal);
            populatePage.fillQuarter(2, 25, 25, fedTotal);
            populatePage.fillQuarter(3, 25, 25, fedTotal);
            populatePage.fillQuarter(4, 25, 25, fedTotal);
            // Found an inconsistency, one rounds up, another rounds down
          });
        });
    }
  });
});
