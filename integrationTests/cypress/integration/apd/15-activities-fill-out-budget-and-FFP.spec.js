/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-loop-func */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import BudgetPage from '../../page-objects/budget-page';
import PopulatePage from '../../page-objects/populate-page';

// Assumes a 2nd activity exists
describe('Filling out budget and FFP', () => {
  const populatePage = new PopulatePage();
  const budgetPage = new BudgetPage();

  let dashboardUrl;
  const years = [2021, 2022];
  const split = ['75-25', '50-50', '90-10'];

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

  it('Tests cost split table (Activity 1 - 2021)', function () {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });
    const staff = this.data.staff[1];
    const expenses = this.data.expenses[1];
    const contractor = this.data.privateContractors[0];
    const allocation = this.data.costAllocation[0];

    let FFYtotal = budgetPage.computeFFYtotal(
      staff.costs[0] * staff.ftes[0],
      expenses.costs[0],
      contractor.FFYcosts[1][0]
    );

    FFYtotal -= allocation.costs[0];

    for (let i = 0; i < split.length; i += 1) {
      cy.get('[class="ds-c-field"]').eq(0).select(split[i]);
      let fedSplit = 0;
      let stateSplit = 0;
      if (split[i] === '90-10') {
        fedSplit = 90;
        stateSplit = 10;
      } else if (split[i] === '75-25') {
        fedSplit = 75;
        stateSplit = 25;
      } else if (split[i] === '50-50') {
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

  it('fills out Budget and FFP for activity 1', function () {
    cy.findAllByText('Budget and FFP').eq(0).click({ force: true });

    const staff = this.data.staff[1];
    const expenses = this.data.expenses[1];
    const contractor = this.data.privateContractors[0];
    const allocation = this.data.costAllocation[0];

    for (let i = 0; i < years.length; i += 1) {
      cy.get('[class="ds-c-field"]').eq(i).select(split[i]);
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

          // Fill out quarter table
          const inputs = this.data.quarterVals[0];
          let staffPercentageSum = 0;
          let contractorPercentageSum = 0;
          for (let k = 0; k < 4; k += 1) {
            populatePage.fillQuarter(
              k,
              inputs.stateVals[i][k],
              inputs.contractorVals[i][k]
            );
            staffPercentageSum += inputs.stateVals[i][k];
            contractorPercentageSum += inputs.stateVals[i][k];
          }
          populatePage.checkPercentageSubtotal(
            staffPercentageSum,
            contractorPercentageSum
          );

          cy.get('[data-cy="subtotal"]').should($td => {
            const staffSubtotal = budgetPage.convertStringToNum(
              $td.eq(0).text()
            );
            const expensesSubtotal = budgetPage.convertStringToNum(
              $td.eq(1).text()
            );
            let contractorTotal = budgetPage.convertStringToNum(
              $td.eq(2).text()
            );

            let staffTotal = staffSubtotal + expensesSubtotal;

            const splitMultipliers = this.data.splitConstants[i];

            staffTotal *= splitMultipliers.fed;
            contractorTotal *= splitMultipliers.fed;

            for (let k = 0; k < 4; k += 1) {
              populatePage.checkQuarterSubtotal(
                $td.eq(k + 4).text(), // +4 gets to the first quarter table state subtotal
                $td.eq(k + 8).text(), // +8 gets to the first quarter contractor subtotal
                staffTotal * (inputs.stateVals[i][k] * 0.01),
                contractorTotal * inputs.contractorVals[i][k] * 0.01
              );
            }
          });
          budgetPage.checkEachQuarterSubtotal();
        });
    }
    // Calculate totals for final section
    let activityTotal = 0;
    let otherFundingTotal = 0;
    let federalShare = 0;
    let stateShare = 0;

    for (let i = 0; i < years.length; i += 1) {
      let FFYtotal = budgetPage.computeFFYtotal(
        staff.costs[i] * staff.ftes[i],
        expenses.costs[i],
        contractor.FFYcosts[1][i]
      );

      activityTotal += FFYtotal;
      otherFundingTotal += allocation.costs[i];

      FFYtotal -= allocation.costs[i];

      const splitMultipliers = this.data.splitConstants[i];
      federalShare += FFYtotal * splitMultipliers.fed;
      stateShare += FFYtotal * splitMultipliers.state;
    }

    const totalMedicaid = activityTotal - otherFundingTotal;
    budgetPage.checkFFYtotals(
      years,
      'Program Administration',
      budgetPage.addCommas(activityTotal),
      budgetPage.addCommas(otherFundingTotal),
      budgetPage.addCommas(totalMedicaid),
      '75/25 (FFY 2021) and 50/50 (FFY 2022)',
      budgetPage.addCommas(federalShare),
      'Alaska',
      budgetPage.addCommas(stateShare)
    );
    cy.goToActivityDashboard();
  });

  xit('fills out Budget and FFP for activity 2', function () {
    cy.findAllByText('Edit').eq(1).click();
    cy.findAllByText('Budget and FFP').eq(1).click({ force: true });

    const staff = this.data.staff[2];
    const staff2 = this.data.staff[3];
    const expenses = this.data.expenses[2];
    const expenses2 = this.data.expenses[3];
    const contractor = this.data.privateContractors[1];
    const allocation = this.data.costAllocation[1];

    for (let i = 0; i < years.length; i += 1) {
      cy.get('[class="ds-c-field"]')
        .eq(i)
        .select(split[i + 1]);
      cy.findAllByText(`Activity 2 Budget for FFY ${years[i]}`)
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
                staff2.title,
                budgetPage.addCommas(staff2.costs[i]),
                staff2.ftes[i]
              );

              budgetPage.checkTableRow(
                expenses.category,
                budgetPage.addCommas(expenses.costs[i])
              );
              budgetPage.checkTableRow(
                expenses2.category,
                budgetPage.addCommas(expenses2.costs[i])
              );

              budgetPage.checkTableRow(
                contractor.names[0],
                budgetPage.addCommas(contractor.FFYcosts[0][i])
              );

              budgetPage.checkTableRow(
                contractor.names[1],
                budgetPage.addCommas(
                  contractor.FFYcosts[1][i][0] * contractor.FFYcosts[1][i][1]
                )
              );

              budgetPage.checkSubtotalRows(years[i], 2);
            });

          const otherFFYfunding = allocation.costs[i];
          cy.findAllByText('Other Funding')
            .parent()
            .should('contain', `$${budgetPage.addCommas(otherFFYfunding)}`);

          const inputs = this.data.quarterVals[1];
          let staffPercentageSum = 0;
          let contractorPercentageSum = 0;
          for (let k = 0; k < 4; k += 1) {
            populatePage.fillQuarter(
              k,
              inputs.stateVals[i][k],
              inputs.contractorVals[i][k]
            );
            staffPercentageSum += inputs.stateVals[i][k];
            contractorPercentageSum += inputs.stateVals[i][k];
          }
          populatePage.checkPercentageSubtotal(
            staffPercentageSum,
            contractorPercentageSum
          );

          cy.get('[data-cy="subtotal"]').should($td => {
            const staffSubtotal = budgetPage.convertStringToNum(
              $td.eq(0).text()
            );
            const expensesSubtotal = budgetPage.convertStringToNum(
              $td.eq(1).text()
            );
            let contractorTotal = budgetPage.convertStringToNum(
              $td.eq(2).text()
            );

            let staffTotal = staffSubtotal + expensesSubtotal;

            const splitMultipliers = this.data.splitConstants[i + 1];

            staffTotal *= splitMultipliers.fed;
            contractorTotal *= splitMultipliers.fed;

            for (let k = 0; k < 4; k += 1) {
              populatePage.checkQuarterSubtotal(
                $td.eq(k + 4).text(),
                $td.eq(k + 8).text(),
                staffTotal * (inputs.stateVals[i][k] * 0.01),
                contractorTotal * inputs.contractorVals[i][k] * 0.01
              );
            }
          });
          budgetPage.checkEachQuarterSubtotal();
        });
    }

    let activityTotal = 0;
    let otherFundingTotal = 0;
    let federalShare = 0;
    let stateShare = 0;

    for (let i = 0; i < years.length; i += 1) {
      let FFYtotal = budgetPage.computeFFYtotal(
        staff.costs[i] * staff.ftes[i] + staff2.costs[i] * staff2.ftes[i],
        expenses.costs[i] + expenses2.costs[i],
        contractor.FFYcosts[0][i] +
          contractor.FFYcosts[1][i][0] * contractor.FFYcosts[1][i][1]
      );

      activityTotal += FFYtotal;
      otherFundingTotal += allocation.costs[i];

      FFYtotal -= allocation.costs[i];

      const splitMultipliers = this.data.splitConstants[i + 1];
      federalShare += FFYtotal * splitMultipliers.fed;
      stateShare += FFYtotal * splitMultipliers.state;
    }

    federalShare = Math.ceil(federalShare);
    stateShare = Math.floor(stateShare);

    const totalMedicaid = activityTotal - otherFundingTotal;
    budgetPage.checkFFYtotals(
      years,
      this.data.newActivityName,
      budgetPage.addCommas(activityTotal),
      budgetPage.addCommas(otherFundingTotal),
      budgetPage.addCommas(totalMedicaid),
      '50/50 (FFY 2021) and 90/10 (FFY 2022)',
      budgetPage.addCommas(federalShare),
      'Alaska',
      budgetPage.addCommas(stateShare)
    );
  });
});
