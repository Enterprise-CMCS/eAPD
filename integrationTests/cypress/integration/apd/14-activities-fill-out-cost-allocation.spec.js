/* eslint-disable func-names */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import BudgetPage from '../../page-objects/budget-page';
import PopulatePage from '../../page-objects/populate-page';

// Assumes a 2nd activity exists
describe('Filling out cost allocation page', () => {
  const populatePage = new PopulatePage();
  const budgetPage = new BudgetPage();

  let dashboardUrl;
  const years = [2021, 2022];

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function before() {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('fills out cost allocation page for activity 1', function () {
    const allocation = this.data.costAllocation[0];
    cy.findAllByText('Edit').eq(0).click();
    cy.contains('Cost allocation and other funding').click();

    populatePage.fillCostAllocation(
      allocation.description,
      allocation.FFYdescriptions,
      allocation.costs,
      years
    );

    // Deleted the first one from each catagory
    const staff = this.data.staff[1];
    const expenses = this.data.expenses[1];
    const contractor = this.data.privateContractors[0];

    for (let i = 0; i < years.length; i += 1) {
      const FFYtotal =
        staff.costs[i] * staff.ftes[i] +
        expenses.costs[i] +
        contractor.FFYcosts[1][i];
      budgetPage.checkActivityTotalCostTable(FFYtotal, allocation.costs[i], i);
    }

    cy.wait(1000);
    cy.goToActivityDashboard();
  });

  it('fills out cost allocation page for activity 2', function () {
    const allocation = this.data.costAllocation[1];
    cy.findAllByText('Edit').eq(1).click();
    cy.findAllByText('Cost allocation and other funding').eq(1).click();

    populatePage.fillCostAllocation(
      allocation.description,
      allocation.FFYdescriptions,
      allocation.costs,
      years
    );

    const staff1 = this.data.staff[2];
    const staff2 = this.data.staff[3];
    const expense1 = this.data.expenses[2];
    const expense2 = this.data.expenses[3];
    const contractor = this.data.privateContractors[1];

    for (let i = 0; i < years.length; i += 1) {
      const staffTotal =
        staff1.costs[i] * staff1.ftes[i] + staff2.costs[i] * staff2.ftes[i];

      const expenseTotal = expense1.costs[i] + expense2.costs[i];

      const contractorTotal =
        contractor.FFYcosts[0][i] +
        contractor.FFYcosts[1][i][0] * contractor.FFYcosts[1][i][1];

      const FFYtotal = staffTotal + expenseTotal + contractorTotal;

      budgetPage.checkActivityTotalCostTable(FFYtotal, allocation.costs[i], i);
    }

    cy.wait(2000);
    cy.goToActivityDashboard();
  });
});
