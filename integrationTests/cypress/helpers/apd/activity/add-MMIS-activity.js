/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import BudgetPage from '../../../page-objects/budget-page';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page';
import ExportPage from '../../../page-objects/export-page';

const { _ } = Cypress;

export const addMMISActivity = years => {
  let budgetPage;
  let exportPage;
  let fillOutActivityPage;

  let activityData;

  before(() => {
    budgetPage = new BudgetPage();
    exportPage = new ExportPage();
    fillOutActivityPage = new FillOutActivityPage();

    cy.fixture('MMIS-activity-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Add a MMIS Activity and check in export view', () => {
    it('Adds an MMIS Activity and checks the export view', () => {
      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );
      cy.contains('Add Activity').click();
      cy.contains('Activity 3: Untitled').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(2).click();

      // Fill out Activity Overview
      cy.findByLabelText('Activity name').type(activityData.activityName);
      cy.findByRole('radio', { name: /MMIS/i }).check({ force: true });
      cy.findAllByText(`Activity 3: ${activityData.activityName}`).should(
        'exist'
      );
      fillOutActivityPage.fillActivityOverview(activityData.activityOverview);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Outcomes and Milestones
      cy.findByRole('heading', {
        name: /^Activity 3:/i,
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
        name: /Activity 3:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillStateStaff(years, activityData.staff);

      fillOutActivityPage.fillStateExpenses(years, activityData.expenses);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Private Contractor Costs
      cy.findByRole('heading', {
        name: /^Activity 3:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.addPrivateContractors(
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

      _.forEach(years, (year, i) => {
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
        name: /^Activity 3:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.checkBudgetAndFFPTables({
        budgetData: activityData.budgetAndFFPTables,
        years,
        firstSplit: '90-10',
        secondSplit: '50-50'
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
        activityIndex: 2,
        activityName: activityData.activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `90/10 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.waitForSave();
      cy.goToExportView();

      // Check activity list list in export view
      cy.findAllByText('Activities')
        .next()
        .within(() => {
          cy.contains(`3. ${activityData.activityName} | MMIS`);
        });

      // Check activity section in export view
      cy.findAllByText('Activities')
        .parent()
        .within(() => {
          cy.findAllByText(`Activity 3: ${activityData.activityName}`)
            .parent()
            .within(() => {
              // Check Activity Overview
              const overviewData = activityData.activityOverview;
              exportPage.checkActivityOverview({
                ...overviewData,
                doesNotSupportsMedicaid:
                  'No response was provided for how this activity will support the Medicaid standards and conditions.',
                startDate: overviewData.startDate.join('/'),
                endDate: overviewData.endDate.join('/')
              });

              // Check Outcomes and Milestones
              Cypress._.times(2, i => {
                exportPage.checkOutcomes({
                  outcome: activityData.outcomes.names[i],
                  metrics: activityData.outcomes.metrics[i]
                });

                exportPage.checkMilestones({
                  milestone: activityData.milestones.names[i],
                  milestoneCompletionDate:
                    activityData.milestones.dates[i].join('/')
                });
              });

              // Check State Staff and Expenses
              exportPage.checkStateStaff({
                staff: activityData.staff,
                years
              });
              exportPage.checkStateExpenses({
                expenses: activityData.expenses,
                years
              });

              // Check Private Contractors
              exportPage.checkPrivateContractorCosts({
                contractors: activityData.privateContractors,
                years
              });

              // Check Cost Allocation
              exportPage.checkCostAllocationAndOtherFunding({
                years,
                costAllocation: activityData.costAllocation
              });

              // Check Budget and FFP
              fillOutActivityPage.checkBudgetAndFFPTables({
                budgetData: activityData.budgetAndFFPTables,
                years,
                firstSplit: '50-50',
                secondSplit: '75-25',
                isViewOnly: true
              });
            });
        });
    });
  });
};
