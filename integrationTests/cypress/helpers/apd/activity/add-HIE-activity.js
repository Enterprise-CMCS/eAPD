/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import ActivitiesStateStaffExpensesPage from '../../../page-objects/activities-state-staff-expenses-page';
import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page';
import PopulatePage from '../../../page-objects/populate-page';

// Check export view

export const addHIEActivity = years => {
  let populatePage;
  let activityPage;
  let staffExpensesPage;
  let budgetPage;
  let fillOutActivityPage;

  let activityData;

  before(() => {
    populatePage = new PopulatePage();
    activityPage = new ActivityPage();
    staffExpensesPage = new ActivitiesStateStaffExpensesPage();
    budgetPage = new BudgetPage();
    fillOutActivityPage = new FillOutActivityPage();

    cy.fixture('HIE-activity-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Add a HIE Activity and check in export view', () => {
    it('Adds an HIE Activity and checks the export view', () => {
      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );
      cy.contains('Add Activity').click();
      cy.contains('Activity 2: Untitled').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(1).click();

      // Fill out Activity Overview
      cy.findByLabelText('Activity name').type(activityData.activityName);
      cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
      cy.findAllByText(`Activity 2: ${activityData.activityName}`).should(
        'exist'
      );
      fillOutActivityPage.fillActivityOverview(activityData.activityOverview);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Outcomes and Milestones
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillOutcomesAndMilestones(
        activityData.outcomes,
        activityData.milestones
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out State Staff and Other State Expenses
      cy.findByRole('heading', {
        name: /Activity 2:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillStateStaffAndExpenses(
        activityData.staff,
        activityData.expenses
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Private Contractor Costs
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillPrivateContactors(
        activityData.privateContractors,
        years
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Cost Allocation
      fillOutActivityPage.fillCostAllocation(
        activityData.costAllocation,
        years
      );

      const staff1 = activityData.staff[0];
      const staff2 = activityData.staff[1];
      const expense1 = activityData.expenses[0];
      const expense2 = activityData.expenses[1];
      const contractor1 = activityData.privateContractors[0];
      const contractor2 = activityData.privateContractors[1];

      years.forEach((year, i) => {
        const staffTotal =
          staff1.costs[i] * staff1.ftes[i] + staff2.costs[i] * staff2.ftes[i];

        const expenseTotal = expense1.costs[i] + expense2.costs[i];

        const contractorTotal =
          contractor1.FFYcosts[i] +
          contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1];

        const activityTotalCosts = staffTotal + expenseTotal + contractorTotal;

        const otherFunding = activityData.costAllocation.costs[i];

        budgetPage.checkActivityTotalCostTable({
          activityTotalCosts,
          otherFunding,
          totalComputableMedicaidCost: activityTotalCosts - otherFunding,
          index: i
        });
      });

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Budget and FFP
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.checkBudgetAndFFPTables({
        budgetData: activityData.budgetAndFFPTables,
        years,
        firstSplit: '90-10',
        secondSplit: '75-25'
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = activityData.FFYTotalDescription;
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 1,
        activityName: activityData.activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `90/10 (FFY ${years[0]}) and 75/25 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.waitForSave();

      // Check values in export view
    });
  });
};
