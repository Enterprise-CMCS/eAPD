/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import BudgetPage from '../../../page-objects/budget-page';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page';
import ExportPage from '../../../page-objects/export-page';

const { _ } = Cypress;

export const addHITActivity = years => {
  let budgetPage;
  let exportPage;
  let fillOutActivityPage;

  let activityData;

  before(() => {
    budgetPage = new BudgetPage();
    exportPage = new ExportPage();
    fillOutActivityPage = new FillOutActivityPage();

    cy.fixture('HIT-activity-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Add a HIT Activity and check in export view', () => {
    it('Adds an HIT Activity and checks the export view', () => {
      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );
      cy.contains('Activity 1: Program Administration (HIT)').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(0).click();

      // Fill out Activity Overview
      cy.findAllByText(`Activity 1: ${activityData.activityName}`).should(
        'exist'
      );
      fillOutActivityPage.fillActivityOverview(activityData.activityOverview);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Outcomes and Milestones
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillOutcomesAndMilestones(
        activityData.outcomes,
        activityData.milestones,
        true // Test delete flag
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out State Staff and Other State Expenses
      cy.findByRole('heading', {
        name: /Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillStateStaff(years, activityData.staff, true);

      fillOutActivityPage.fillStateExpenses(years, activityData.expenses, true);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Private Contractor Costs
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.addPrivateContractors(
        activityData.privateContractors,
        years,
        true // Test delete flag
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Cost Allocation
      fillOutActivityPage.fillCostAllocation(
        activityData.costAllocation,
        years
      );
      cy.waitForSave();

      _.forEach(years, (year, i) => {
        budgetPage.checkActivityTotalCostTableNew({
          expectedTable: activityData.costAllocationActivityTotalCostTables[i],
          index: i
        });
      });

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Budget and FFP
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      fillOutActivityPage.checkBudgetAndFFPTables({
        budgetData: activityData.budgetAndFFPTables,
        years,
        firstSplit: '75-25',
        secondSplit: '50-50',
        isViewOnly: false
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
        activityIndex: 0,
        activityName: activityData.activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
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
          cy.contains(`1. ${activityData.activityName} | HIT`);
        });

      // Check activity section in export view
      cy.findAllByText('Activities')
        .parent()
        .within(() => {
          cy.findAllByText(`Activity 1: ${activityData.activityName}`)
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
              exportPage.checkOutcomes({
                outcome: activityData.outcomes.names[1],
                metrics: activityData.outcomes.metrics[1]
              });

              exportPage.checkMilestones({
                milestone: activityData.milestones.names[1],
                milestoneCompletionDate:
                  activityData.milestones.dates[1].join('/')
              });

              // Check State Staff and Expenses
              exportPage.checkStateStaff({
                staff: activityData.staff.slice(1),
                years
              });
              exportPage.checkStateExpenses({
                expenses: activityData.expenses.slice(1),
                years
              });

              // Check Private Contractors
              exportPage.checkPrivateContractorCosts({
                contractors: activityData.privateContractors.slice(1),
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
