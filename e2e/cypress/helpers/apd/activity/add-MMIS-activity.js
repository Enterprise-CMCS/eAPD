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

  const fillDate = (string, list) => {
    cy.findAllByText(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').clear().type(list[0]);
        cy.findByLabelText('Day').clear().type(list[1]);
        cy.findByLabelText('Year').clear().type(list[2]).blur();
      });
  };

  before(function () {
    budgetPage = new BudgetPage();
    exportPage = new ExportPage();
    fillOutActivityPage = new FillOutActivityPage();
  });

  beforeEach(function () {
    // cy.fixture('mmis-basics.json').as('mmisBasic');
    // cy.fixture('mmis-basics-budget.json').as('budget');
    // cy.fixture('mmis-basics-table-data.json').as('tableData');

    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  describe('Add a MMIS Activity', function () {
    it('Adds an MMIS Activity and checks the export view', function () {
      // const years = this.years;
      // const mmisBasic = this.mmisBasic;
      // const budget = this.budget;
      // const tableData = this.tableData;

      const mmisData = this.mmisData;
      const activityData = mmisData.activities;

      activityData.forEach((activity, index) => {
        cy.goToActivityDashboard();

        cy.contains('Add Activity').click();
        cy.get('#activities').findAllByText('Edit').eq(index).click();

        // Activity Overview
        const activityOverviewData = activity.activityOverview;
        cy.findByLabelText('Activity name').type(activity.name);
        cy.setTinyMceContent(
          'activity-snapshot-field',
          activityOverviewData.activitySnapshot
        );
        cy.setTinyMceContent(
          'activity-problem-statement-field',
          activityOverviewData.problemStatement
        );
        cy.setTinyMceContent(
          'activity-proposed-solution-field',
          activityOverviewData.proposedSolution
        );

        cy.get('#continue-button').click();

        // Analysis of Alternatives and Risk
        const analysisOfAlternativesAndRisksData =
          activity.analysisOfAlternativesAndRisks;
        cy.setTinyMceContent(
          'alternative-analysis-field',
          analysisOfAlternativesAndRisksData.alternativeAnalysis
        );
        cy.setTinyMceContent(
          'cost-benefit-analysis-field',
          analysisOfAlternativesAndRisksData.costBenefitAnalysis
        );
        cy.setTinyMceContent(
          'feasibility-study-field',
          analysisOfAlternativesAndRisksData.feasibilityStudy
        );
        cy.setTinyMceContent(
          'requirements-analysis-field',
          analysisOfAlternativesAndRisksData.requirementsAnalysis
        );
        cy.setTinyMceContent(
          'forseeable-risks-field',
          analysisOfAlternativesAndRisksData.forseeableRisks
        );

        cy.get('#continue-button').click();

        // Activity Schedule and Milestones
        const activityScheduleData = activity.activitySchedule;

        const startDate = activityScheduleData.plannedStartDate;
        fillDate('Start date', startDate.split('-'));

        const endDate = activityScheduleData.plannedEndDate;
        fillDate('End date', endDate.split('-'));

        const milestonesData = activity.milestones;
        milestonesData.forEach(milestone => {
          cy.contains('Add Milestone').click();

          cy.findByLabelText('Name', milestone.milestone);
          fillDate('Target completion date', milestone.endDate.split('-'));
          cy.findByRole('button', { name: /Save/i }).click();
          cy.waitForSave();
        });

        cy.get('#continue-button').click();

        // Conditions for Enhanced Funding
        const conditionForEnhancedFundingData =
          activity.conditionsForEnhancedFunding;
        if (conditionForEnhancedFundingData.enhancedFundingQualification) {
          cy.findByRole('radio', {
            name: /Yes, this activity is qualified for enhanced funding./i
          }).click();
          cy.setTinyMceContent(
            'justification-field',
            conditionForEnhancedFundingData.enhancedFundingJustification
          );
        } else {
          cy.findByRole('radio', {
            name: /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
          }).click();
        }

        cy.get('#continue-button').click();

        // Outcomes and Metrics
      });

      // cy.goToActivityDashboard();

      // Add activity
      // cy.url().should('include', '/activities');
      // cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
      //   'exist'
      // );

      // cy.contains('Add Activity').click();
      // cy.contains('Activity 1: Untitled').should('exist');
      // cy.get('#activities').findAllByText('Edit').eq(0).click();

      // Fill out Activity Overview
      // cy.findByLabelText('Activity name').type(mmisBasic.activities[0].name);
      // cy.findAllByText(`Activity 1: ${mmisBasic.activities[0].name}`).should(
      //   'exist'
      // );

      // cy.goToBudgetAndFFP(0);

      // fillOutActivityPage.checkMmisBudgetAndFFPTables({
      //   years,
      //   costAllocation: mmisBasic.activities[0].costAllocation,
      //   expectedTableData: tableData.activityFedSplitTable
      // });

      // budgetPage.checkMmisFFYtotals({
      //   years,
      //   activityIndex: 0,
      //   activityId: mmisBasic.activities[0].activityId,
      //   activityName: mmisBasic.activities[0].name,
      //   state: 'Alaska',
      //   fundingSplit: `90/10 DDI (FFY ${years[0]}) and 50/50 M&O (FFY ${years[1]})`,
      //   totalOtherFunding: 0,
      //   totals:
      //     budget.activities[mmisBasic.activities[0].activityId].costsByFFY.total
      // });

      // cy.waitForSave();
    });
  });
};
