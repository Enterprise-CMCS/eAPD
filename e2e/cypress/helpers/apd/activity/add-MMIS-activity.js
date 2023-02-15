/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import BudgetPage from '../../../page-objects/budget-page.js';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page.js';
import ExportPage from '../../../page-objects/export-page.js';

const { _ } = Cypress;

export const addMMISActivity = function () {
  let budgetPage;
  let exportPage;
  let fillOutActivityPage;

  before(function () {
    budgetPage = new BudgetPage();
    exportPage = new ExportPage();
    fillOutActivityPage = new FillOutActivityPage();
  });

  beforeEach(function () {
    cy.fixture('mmis-basics.json').as('mmisBasic');
  });

  describe('Add a MMIS Activity', function () {
    it('Adds an MMIS Activity and checks the export view', function () {
      const years = this.years;
      const mmisBasic = this.mmisBasic;
      const budget = {
        activityTotals: [
          {
            id: 'abc123',
            data: {
              combined: {
                2023: 0,
                2024: 0,
                total: 0
              },
              otherFunding: {
                2023: {
                  contractors: 0,
                  expenses: 0,
                  statePersonnel: 0,
                  total: 0
                },
                2024: {
                  contractors: 0,
                  expenses: 0,
                  statePersonnel: 0,
                  total: 0
                }
              }
            }
          }
        ],
        activities: {
          abc123: {
            costsByFFY: {
              2023: {
                federal: 0,
                medicaid: 0,
                state: 0,
                total: 0
              },
              2024: {
                federal: 0,
                medicaid: 0,
                state: 0,
                total: 0
              },
              total: {
                federal: 0,
                medicaid: 0,
                state: 0,
                total: 0
              }
            }
          }
        }
      };

      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );
      cy.contains('Add Activity').click();
      cy.contains('Activity 1: Untitled').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(2).click();

      // Fill out Activity Overview
      cy.findByLabelText('Activity name').type(mmisBasic.activities[0].name);
      cy.findAllByText(`Activity 1: ${mmisBasic.activities[0].name}`).should(
        'exist'
      );

      cy.goToBudgetAndFFP(0);

      fillOutActivityPage.checkMmisBudgetAndFFPTables({
        costAllocation: mmisBasic.activities[0].costAllocation,
        activityTotal: budget.activityTotals[0],
        costsByFFY: budget.activities[budget.activityTotals[0].id].costsByFFY,
        years
      });

      budgetPage.checkMmisFFYtotals({
        years,
        activityIndex: 0,
        activityId: mmisBasic.activities[0].activityId,
        activityName: mmisBasic.activities[0].name,
        state: 'Alaska',
        fundingSplit: `90/10 DDI (FFY ${years[0]}) and 50/50 M&O (FFY ${years[1]})`,
        totalOtherFunding: 0,
        budget
      });

      cy.waitForSave();
    });
  });
};
