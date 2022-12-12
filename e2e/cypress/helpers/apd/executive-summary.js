import ExecutiveSummaryPage from '../../page-objects/executive-summary-page';
import ExportPage from '../../page-objects/export-page';

const tableTitles = ['HIT + HIE', 'MMIS'];

export const testDefaultExecutiveSummary = years => {
  let summaryPage;
  let exportPage;

  before(() => {
    summaryPage = new ExecutiveSummaryPage();
    exportPage = new ExportPage();
  });

  it('should display the default values for Executive Summary page', () => {
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

  it('should display the default values in the export view', () => {
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

export const testExecutiveSummaryWithData = years => {
  let summaryPage;
  let exportPage;

  let activityData;
  let executiveSummaryData;

  before(() => {
    summaryPage = new ExecutiveSummaryPage();
    exportPage = new ExportPage();
  });

  beforeEach(() => {
    cy.updateFeatureFlags({ validation: false, enableMmis: false });
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
    cy.fixture('executive-summary-test.json').then(data => {
      executiveSummaryData = data;
    });
    cy.goToBudgetAndFFP(0);
  });

  it('should display the correct values for Executive Summary page', () => {
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

  it('should display the default values in the export view', () => {
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
