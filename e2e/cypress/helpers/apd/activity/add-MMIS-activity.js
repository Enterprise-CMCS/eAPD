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
    cy.fixture('mmis-basics-budget.json').as('budget');
    cy.fixture('mmis-basics-table-data.json').as('tableData');
  });

  describe('Add a MMIS Activity', function () {
    it('Adds an MMIS Activity and checks the export view', function () {
      const years = this.years;
      const mmisBasic = this.mmisBasic;
      const budget = this.budget;
      const tableData = this.tableData;

      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );

      cy.contains('Add Activity').click();
      cy.contains('Activity 1: Untitled').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(0).click();

      // Fill out Activity Overview
      cy.findByLabelText('Activity name').type(mmisBasic.activities[0].name);
      cy.findAllByText(`Activity 1: ${mmisBasic.activities[0].name}`).should(
        'exist'
      );

      cy.goToBudgetAndFFP(0);

      fillOutActivityPage.checkMmisBudgetAndFFPTables({
        years,
        costAllocation: mmisBasic.activities[0].costAllocation,
        expectedTableData: tableData.activityFedSplitTable
      });

      budgetPage.checkMmisFFYtotals({
        years,
        activityIndex: 0,
        activityId: mmisBasic.activities[0].activityId,
        activityName: mmisBasic.activities[0].name,
        state: 'New Apdland',
        fundingSplit: `90/10 DDI (FFY ${years[0]}) and 50/50 M&O (FFY ${years[1]})`,
        totalOtherFunding: 0,
        totals:
          budget.activities[mmisBasic.activities[0].activityId].costsByFFY.total
      });

      cy.waitForSave();
    });
  });
};
