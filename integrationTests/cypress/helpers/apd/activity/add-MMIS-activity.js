/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import ActivitiesStateStaffExpensesPage from '../../../page-objects/activities-state-staff-expenses-page';
import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page';
import PopulatePage from '../../../page-objects/populate-page';

// Check export view

export const addMMISActivity = years => {
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

    cy.fixture('MMIS-activity-template.json').then(data => {
      activityData = data;
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
        cy.findByRole('button', { name: 'Next' }).click();

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
        cy.findByRole('button', { name: 'Next' }).click();

        // Fill out State Staff and Other State Expenses
        cy.findByRole('heading', {
          name: /Activity 3:/i,
          level: 2
        }).should('exist');

        cy.waitForSave();
        cy.findByRole('button', { name: 'Next' }).click();

        // Fill out Private Contractor Costs
        cy.findByRole('heading', {
          name: /^Activity 3:/i,
          level: 2
        }).should('exist');
        cy.findByRole('heading', {
          name: /Private Contractor Costs/i,
          level: 3
        }).should('exist');

        const [contractor1, contractor2] =
          activityData.privateContractors.slice(2);

        cy.findByRole('button', { name: /Add Contractor/i }).click();
        cy.findByLabelText(/Private Contractor or Vendor Name/i).should(
          'exist'
        );
        populatePage.fillContractorForm({ ...contractor1, years, index: 0 });

        // Add another private contractor
        cy.findByRole('button', { name: /Add Contractor/i }).click();
        cy.findByLabelText(/Private Contractor or Vendor Name/i).should(
          'exist'
        );

        populatePage.fillContractorForm({
          ...contractor2,
          hourly: true,
          years,
          index: 1
        });
        cy.waitForSave();
        cy.findByRole('button', { name: 'Next' }).click();

        // Fill out Cost Allocation
        const allocation = activityData.costAllocation[1];

        populatePage.fillCostAllocation({
          ...allocation,
          years
        });

        const staff1 = activityData.staff[2];
        const staff2 = activityData.staff[3];
        const expense1 = activityData.expenses[2];
        const expense2 = activityData.expenses[3];
        // const contractor1 = activityData.privateContractors[2];
        // const contractor2 = activityData.privateContractors[3];

        years.forEach((year, i) => {
          const staffTotal =
            staff1.costs[i] * staff1.ftes[i] + staff2.costs[i] * staff2.ftes[i];

          const expenseTotal = expense1.costs[i] + expense2.costs[i];

          const contractorTotal =
            contractor1.FFYcosts[i] +
            contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1];

          const activityTotalCosts =
            staffTotal + expenseTotal + contractorTotal;

          budgetPage.checkActivityTotalCostTable({
            activityTotalCosts,
            otherFunding: allocation.costs[i],
            totalComputableMedicaidCost:
              activityTotalCosts - allocation.costs[i],
            index: i
          });
        });

        cy.waitForSave();
        cy.findByRole('button', { name: 'Next' }).click();

        // Fill out Budget and FFP
        cy.findByRole('heading', {
          name: /^Activity 2:/i,
          level: 2
        }).should('exist');
        cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
          'exist'
        );

        // years.forEach((year, i) => {
        //   const {
        //     expenses,
        //     totalComputableMedicaidCost,
        //     activityTotalCosts,
        //     otherFunding
        //   } = budgetData.budgetTableByActivities[1].ffys[i];

        //   cy.findAllByText(`Activity 2 Budget for FFY ${year}`)
        //     .parent()
        //     .parent()
        //     .within(() => {
        //       cy.get('[class="budget-table activity-budget-table"]')
        //         .eq(0)
        //         .within(() => {
        //           Object.keys(expenses).forEach(key => {
        //             const {
        //               title,
        //               items,
        //               otherFunding: expenseOtherFunding,
        //               subtotal
        //             } = expenses[key];
        //             items.forEach(item => {
        //               budgetPage.checkTableRow(item);
        //             });
        //             budgetPage.checkSubtotalTable({
        //               title,
        //               subtotal,
        //               otherFunding: expenseOtherFunding
        //             });
        //           });

        //           budgetPage.checkSubtotalRows();

        //           budgetPage.checkTotalComputableMedicaidCost({
        //             label: 'Activity 2 Total Computable Medicaid Cost',
        //             totalComputableMedicaidCost
        //           });
        //         });

        //       budgetPage.checkActivityTotalCostTable({
        //         index: 1,
        //         activityTotalCosts,
        //         otherFunding,
        //         totalComputableMedicaidCost
        //       });

        //       const { split } = activityData.splitConstants[i + 1];

        //       cy.get('[class="ds-c-field"]').select(split);

        //       const {
        //         federalSharePercentage,
        //         federalShareAmount,
        //         stateSharePercentage,
        //         stateShareAmount
        //       } = budgetData.fedStateSplitTableByActivity[1].ffys[i];

        //       budgetPage.checkCostSplitTable({
        //         federalSharePercentage,
        //         federalShareAmount,
        //         stateSharePercentage,
        //         stateShareAmount,
        //         totalComputableMedicaidCost
        //       });

        //       const {
        //         stateQuarterlyPercentage,
        //         stateSubtotalPercentage,
        //         stateQuarterlyCosts,
        //         stateSubtotalCost,
        //         contractorQuarterlyPercentage,
        //         contractorSubtotalPercentage,
        //         contractorQuarterlyCosts,
        //         contractorSubtotalCost
        //       } = budgetData.estimatedQuarterlyExpenditureByActivity[1].ffys[i];
        //       for (let quarter = 0; quarter < 4; quarter += 1) {
        //         const stateValue = stateQuarterlyPercentage[quarter];
        //         const contractorValue = contractorQuarterlyPercentage[quarter];

        //         populatePage.fillQuarter({
        //           quarter,
        //           stateValue,
        //           contractorValue
        //         });
        //       }

        //       budgetPage.checkSubtotalPercentage({
        //         stateSubtotalPercentage,
        //         contractorSubtotalPercentage
        //       });

        //       budgetPage.checkSubtotalCost({
        //         stateSubtotalCost,
        //         contractorSubtotalCost
        //       });

        //       budgetPage.checkQuarterSubtotal({
        //         stateQuarterlyCosts,
        //         contractorQuarterlyCosts
        //       });

        //       budgetPage.checkEachQuarterSubtotal();
        //     });
        // });

        // const {
        //   totalCost,
        //   totalOtherFunding,
        //   totalTotalMedicaidCost,
        //   totalFederalShare,
        //   totalStateShare
        // } = budgetData.ffyTotalDescription[1];
        // budgetPage.checkFFYtotals({
        //   years,
        //   activityIndex: 1,
        //   activityName,
        //   totalCost,
        //   totalOtherFunding,
        //   totalTotalMedicaidCost,
        //   fundingSplit: `50/50 (FFY ${years[0]}) and 90/10 (FFY ${years[1]})`,
        //   totalFederalShare,
        //   state: 'Alaska',
        //   totalStateShare
        // });

        cy.waitForSave();
      });
    });
  });
};
