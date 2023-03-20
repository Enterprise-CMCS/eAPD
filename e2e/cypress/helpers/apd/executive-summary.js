import ExecutiveSummaryPage from '../../page-objects/executive-summary-page.js';
import ExportPage from '../../page-objects/export-page.js';

const tableTitles = ['HIT + HIE', 'MMIS'];

export const testDefaultExecutiveSummary = function () {
  let summaryPage;
  let exportPage;

  before(function () {
    summaryPage = new ExecutiveSummaryPage();
    exportPage = new ExportPage();
  });

  it.skip('should display the default values for Executive Summary page', function () {
    const years = this.years;
    cy.goToExecutiveSummary();

    cy.url().should('contain', '/executive-summary');
    cy.findByRole('heading', { name: /^Executive Summary$/i }).should('exist');

    summaryPage.checkActivitySummary({
      index: 0,
      years,
      activityName: 'Program Administration',
      activityTotalCosts: 0,
      totalComputableMedicaidCost: 0,
      federalShareAmount: 0,
      ffys: [
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        },
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        }
      ]
    });

    summaryPage.checkTotalCostSummary({
      years,
      totalCost: 0,
      totalTotalMedicaidCost: 0,
      totalFederalShare: 0,
      ffys: [
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        },
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        }
      ]
    });

    tableTitles.forEach(title => {
      years.forEach(year => {
        summaryPage.getTableRows({ title, year }).each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
      });

      summaryPage.getTableRows({ title }).each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
    });
  });

  // To Do: Fix test
  it.skip('should display the default values in the export view', function () {
    const years = this.years;
    cy.goToExportView();

    exportPage.checkExecutiveSummaryTotalCostSummary({
      years,
      totalCost: 0,
      totalTotalMedicaidCost: 0,
      totalFederalShare: 0,
      ffys: [
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        },
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        }
      ]
    });

    exportPage.checkExecutiveSummaryActivitySummary({
      index: 0,
      years,
      activityName: 'Program Administration',
      activityTotalCosts: 0,
      totalComputableMedicaidCost: 0,
      federalShareAmount: 0,
      ffys: [
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        },
        {
          activityTotalCosts: 0,
          totalComputableMedicaidCost: 0,
          federalShareAmount: 0
        }
      ]
    });

    tableTitles.forEach(title => {
      years.forEach(year => {
        exportPage
          .getExecutiveSummaryProgramBudgetTableRow({ title, year })
          .each($el => {
            cy.wrap($el).should('have.text', '$0');
          });
      });

      exportPage
        .getExecutiveSummaryProgramBudgetTableRow({ title })
        .each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testExecutiveSummaryWithData = function () {
  let summaryPage;
  let exportPage;

  before(function () {
    summaryPage = new ExecutiveSummaryPage();
    exportPage = new ExportPage();
  });

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('activityData');
    cy.fixture('executive-summary-test.json').as('executiveSummaryData');
  });

  it('should display the correct values for Executive Summary page', function () {
    const years = this.years;
    const activityData = this.activityData;
    const executiveSummaryData = this.executiveSummaryData;

    cy.goToExecutiveSummary();

    cy.url().should('contain', '/executive-summary');
    cy.findByRole('heading', { name: /^Executive Summary$/i }).should('exist');

    executiveSummaryData.activitySummaries.forEach(
      (
        {
          activityTotalCosts,
          totalComputableMedicaidCost,
          federalShareAmount,
          ffys
        },
        index
      ) => {
        const {
          name: activityName,
          shortOverview,
          startDate,
          endDate
        } = activityData.activityOverview[index];

        summaryPage.checkActivitySummary({
          index,
          years,
          activityName,
          shortOverview,
          startDate,
          endDate,
          activityTotalCosts,
          totalComputableMedicaidCost,
          federalShareAmount,
          ffys
        });
      }
    );

    const { totalCost, totalTotalMedicaidCost, totalFederalShare, ffys } =
      executiveSummaryData.totalCostSummary;
    summaryPage.checkTotalCostSummary({
      years,
      totalCost,
      totalTotalMedicaidCost,
      totalFederalShare,
      ffys
    });
  });

  it('should display the default values in the export view', function () {
    const years = this.years;
    const activityData = this.activityData;
    const executiveSummaryData = this.executiveSummaryData;

    cy.goToExportView();

    const { totalCost, totalTotalMedicaidCost, totalFederalShare, ffys } =
      executiveSummaryData.totalCostSummary;
    exportPage.checkExecutiveSummaryTotalCostSummary({
      years,
      totalCost,
      totalTotalMedicaidCost,
      totalFederalShare,
      ffys
    });

    executiveSummaryData.activitySummaries.forEach(
      (
        {
          activityTotalCosts,
          totalComputableMedicaidCost,
          federalShareAmount,
          ffys: activityFFYs
        },
        index
      ) => {
        const {
          name: activityName,
          shortOverview,
          startDate,
          endDate
        } = activityData.activityOverview[index];

        exportPage.checkExecutiveSummaryActivitySummary({
          index,
          years,
          activityName,
          shortOverview,
          startDate,
          endDate,
          activityTotalCosts,
          totalComputableMedicaidCost,
          federalShareAmount,
          ffys: activityFFYs
        });
      }
    );

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
