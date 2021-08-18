/* eslint-disable radix */
/* eslint-disable cypress/no-unnecessary-waiting */
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
    cy.contains('HITECH IAPD').click();

    cy.goToActivityDashboard();

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

  it('Tests cost split table (Activity 1 - 2021)', function costSplit() {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });
    const staff = this.data.staff[1];
    const expenses = this.data.expenses[1];
    const contractor = this.data.privateContractors[0];
    const allocation = this.data.costAllocation[0];

    let FFYtotal = budgetPage.computeActivityTotal(
      staff.costs[0] * staff.ftes[0],
      expenses.costs[0],
      contractor.FFYcosts[1][0]
    );

    FFYtotal -= allocation.costs[0];

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
          budgetPage.checkCostSplitTable(fedSplit, stateSplit, FFYtotal);
        });
    }
  });

  it.only('fills out Budget and FFP for activity 1', function activity1() {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });

    const staff = this.data.staff[1];
    const expenses = this.data.expenses[1];
    const contractor = this.data.privateContractors[0];
    const allocation = this.data.costAllocation[0];

    for (let i = 0; i < years.length; i += 1) {
      cy.findAllByText(`Activity 1 Budget for FFY ${years[i]}`)
        .parent()
        .parent()
        .within(() => {
          cy.get('[class="budget-table activity-budget-table"]')
            .eq(0)
            .within(() => {
              budgetPage.checkTableRow(
                staff.title,
                budgetPage.addCommas(staff.costs[i]),
                staff.ftes[i]
              );

              budgetPage.checkTableRow(
                expenses.category,
                budgetPage.addCommas(expenses.costs[i])
              );

              budgetPage.checkTableRow(
                contractor.names[1],
                budgetPage.addCommas(contractor.FFYcosts[1][i])
              );

              budgetPage.checkSubtotalRows(years[i], 1);
            });

          const otherFFYfunding = allocation.costs[i];
          cy.findAllByText('Other Funding')
            .parent()
            .should('contain', `$${budgetPage.addCommas(otherFFYfunding)}`);

          cy.get('[class="budget-table--number"]').should($td => {
            const staffSubtotal = budgetPage.convertStringToNum(
              $td.eq(4).text()
            );
            const expensesSubtotal = budgetPage.convertStringToNum(
              $td.eq(9).text()
            );
            let contractorTotal = budgetPage.convertStringToNum(
              $td.eq(14).text()
            );

            let staffTotal = staffSubtotal + expensesSubtotal;

            if (i === 0) {
              cy.get('[class="ds-c-field"]').select('75-25');
              staffTotal *= 0.75;
              contractorTotal *= 0.75;
            } else {
              cy.get('[class="ds-c-field"]').select('50-50');
              staffTotal *= 0.5;
              contractorTotal *= 0.5;
            }
          });

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
    // const activityTotal = budgetPage.computeActivityTotal(
    //   staff.costs,
    //   staff.ftes,
    //   expenses.costs,
    //   contractor.FFYcosts[1],
    //   years
    // );

    // const otherFundingTotal = budgetPage.computeTotalOtherFunding(
    //   allocation.costs
    // );

    // const totalMedicaid = activityTotal - otherFundingTotal;
    // budgetPage.checkFFYtotals(
    //   years,
    //   'Program Administration',
    //   budgetPage.addCommas(activityTotal),
    //   budgetPage.addCommas(otherFundingTotal),
    //   budgetPage.addCommas(totalMedicaid),
    //   '75/25 (FFY 2021) and 50/50 (FFY 2022)'
    //   // CALCULATE FEDERAL AND STATE SHARE SOMEHOW
    // );
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
