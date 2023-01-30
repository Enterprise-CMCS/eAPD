/* eslint-disable import/prefer-default-export */

import ActivityPage from '../../../page-objects/activity-page.js';
import BudgetPage from '../../../page-objects/budget-page.js';
import ExportPage from '../../../page-objects/export-page.js';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page.js';

const { _ } = Cypress;

export const checkDefaultActivity = function () {
  let activityPage;
  let budgetPage;
  let exportPage;
  let fillOutActivityPage;

  context('Check Default Activity', function () {
    before(function () {
      activityPage = new ActivityPage();
      budgetPage = new BudgetPage();
      exportPage = new ExportPage();
      fillOutActivityPage = new FillOutActivityPage();
    });

    beforeEach(function () {
      cy.fixture('default-activity-template.json').as('defaultData');
    });

    describe('Check default activity values and check in export view', function () {
      it('Check default activity values and check in export view', function () {
        // cy.get('@years').then(years => {
        const years = this.years;
        const defaultData = this.defaultData;
        // Check Activity Dashboard
        cy.goToActivityDashboard();

        cy.url().should('include', '/activities');
        cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
          'exist'
        );

        cy.contains('Activity 1: Program Administration (HIT)').should('exist');
        cy.contains('Activity 2').should('not.exist');

        cy.contains('Delete').should('not.exist');

        cy.get('#activities')
          .contains('Edit')
          .should('exist')
          .contains('Edit')
          .click();

        cy.url().should('contain', '/activity/0/overview');

        cy.waitForSave();

        // Check Activity Overview
        cy.findByRole('heading', { name: /Activity Overview/i }).should(
          'exist'
        );

        cy.checkTinyMCE('activity-short-overview-field', '');
        cy.checkTinyMCE('activity-description-field', '');
        cy.checkTinyMCE('activity-alternatives-field', '');
        cy.checkTinyMCE('standards-and-conditions-supports-field', '');
        activityPage.checkTextField('ds-c-field visibility--screen', '');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Activity Schedule and Milestones
        cy.findByRole('heading', { name: /Activity Schedule/i }).should(
          'exist'
        );
        cy.findByRole('heading', { name: /Milestones/i }).should('exist');

        activityPage.checkDate('Start date');
        activityPage.checkDate('End date');
        cy.contains('Add milestone(s) for this activity.').should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Outcomes and Metrics
        cy.findByRole('heading', {
          name: /Outcomes and Metrics/i,
          level: 3
        }).should('exist');

        cy.contains('Add at least one outcome for this activity.').should(
          'exist'
        );

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check State Staff and Other State Expenses
        cy.findByRole('heading', {
          name: /State Staff and Expenses/i,
          level: 3
        }).should('exist');

        cy.contains(
          'State staff have not been added for this activity.'
        ).should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Private Contractor Costs
        cy.findByRole('heading', {
          name: /Private Contractor Costs/i,
          level: 3
        }).should('exist');

        cy.contains('Add private contractor(s) for this activity.').should(
          'exist'
        );

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Default Cost Allocation and Other Funding
        cy.findByRole('heading', {
          name: /^Activity 1:/i,
          level: 2
        }).should('exist');
        cy.findByRole('heading', {
          name: /Cost Allocation/i,
          level: 3
        }).should('exist');
        cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
        activityPage.checkTinyMCE('cost-allocation-methodology-field', '');

        _.forEach(years, (year, i) => {
          cy.checkTinyMCE(
            `cost-allocation-narrative-${year}-other-sources-field`,
            ''
          );
          activityPage.checkTextField('ds-c-field ds-c-field--currency', 0, i);

          cy.get('[class="budget-table activity-budget-table"]')
            .eq(i)
            .then(table => {
              cy.get(table)
                .getActivityTable()
                .then(tableData => {
                  _.forEach(defaultData.costAllocationTables, data => {
                    _.forEach(data, elem => {
                      expect(tableData).to.deep.include(elem);
                    });
                  });
                });
            });
        });

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Budget and FFP
        cy.findByRole('heading', {
          name: /Budget and FFP/i,
          level: 2
        }).should('exist');

        // Check Federal State Split Functionality
        defaultData.splits.forEach(split => {
          cy.get('[data-cy="cost-allocation-dropdown"]').eq(0).select(split);
          cy.waitForSave();

          cy.get('[data-cy="FFPFedStateSplitTable"]')
            .eq(0)
            .then(table => {
              cy.get(table)
                .getActivityTable()
                .then(tableData => {
                  _.forEach(tableData, data => {
                    if (split === '90-10') {
                      expect(defaultData.ninteyTenSplit).to.deep.include(data);
                    } else if (split === '75-25') {
                      expect(
                        defaultData.seventyFiveTwentyFiveSplit
                      ).to.deep.include(data);
                    } else {
                      expect(defaultData.fiftyFiftySplit).to.deep.include(data);
                    }
                  });
                });
            });
        });

        fillOutActivityPage.checkBudgetAndFFPTables({
          budgetData: defaultData.budgetAndFFPTables,
          years,
          firstSplit: '90-10',
          secondSplit: '90-10',
          isViewOnly: false,
          isDefaultTest: true
        });

        const {
          totalCost,
          totalOtherFunding,
          totalTotalMedicaidCost,
          totalFederalShare,
          totalStateShare
        } = defaultData.FFYTotalDescription;
        budgetPage.checkFFYtotals({
          years,
          activityIndex: 0,
          activityName: defaultData.activityName,
          totalCost,
          totalOtherFunding,
          totalTotalMedicaidCost,
          fundingSplit: `90/10 (FFY ${years[0]} and FFY ${years[1]})`,
          totalFederalShare,
          state: 'Alaska',
          totalStateShare
        });

        // Check Export View
        cy.goToExportView();

        // Check activity list list in export view
        cy.findAllByText('Activities')
          .next()
          .within(() => {
            cy.contains(`1. ${defaultData.activityName} | HIT`);
          });

        // Check activity section in export view
        cy.findAllByText('Activities')
          .parent()
          .within(() => {
            cy.findAllByText(`Activity 1: ${defaultData.activityName}`)
              .first()
              .parent()
              .within(() => {
                // Check Activity Overview
                const overviewData = defaultData.activityOverview;
                exportPage.checkActivityOverview({
                  ...overviewData
                });

                // Check Outcomes and Metrics
                exportPage.checkOutcomes({});

                exportPage.checkMilestones({});

                // Check State Staff and Expenses
                exportPage.checkStateStaff({});
                exportPage.checkStateExpenses({});

                // Check Private Contractors
                exportPage.checkPrivateContractorCosts({});

                // Check Cost Allocation
                exportPage.checkCostAllocationAndOtherFunding({
                  years,
                  costAllocation: defaultData.costAllocation
                });

                // Check Budget and FFP
                fillOutActivityPage.checkBudgetAndFFPTables({
                  budgetData: defaultData.budgetAndFFPTables,
                  years,
                  firstSplit: '90-10',
                  secondSplit: '90-10',
                  isViewOnly: true,
                  isDefaultTest: true
                });
              });
          });
      });
    });
  });
};
