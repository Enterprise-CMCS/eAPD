/* eslint-disable func-names */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

// import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';

// Assumes a 2nd activity exists
describe('Filling out section in the activity overview page', () => {
  const populatePage = new PopulatePage();
  // const budgetPage = new BudgetPage();

  let dashboardUrl;
  const years = [2021, 2022];

  before(() => {
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

    // budgetPage.checkActivityTotalCostTable();

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

    // budgetPage.checkActivityTotalCostTable(); FOR QUARTER, CHECK TIF DMs
    cy.wait(1000);
    cy.goToActivityDashboard();
  });
});
