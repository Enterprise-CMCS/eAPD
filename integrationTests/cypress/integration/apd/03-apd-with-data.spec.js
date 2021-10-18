// <reference types="cypress" />
import {
  testAPDOverviewWithData,
  testAPDOverviewExportViewWithData
} from '../../helpers/apd/apd-overview';
import {
  testKeyStatePersonnelWithData,
  testKeytStatePersonnelExportViewWithData
} from '../../helpers/apd/key-state-personnel';
import {
  testResultsOfPreviousActivitiesWithData,
  testResultsOfPreviousActivitiesExportViewWithData
} from '../../helpers/apd/results-of-previous-activities';
import {
  testActivityDashboardWithData,
  testActivityDashboardExportViewWithData
} from '../../helpers/apd/activity/activity-dashboard';
import {
  testActivityOverviewWithData,
  testActivityOverviewExportViewWithData
} from '../../helpers/apd/activity/activity-overview';
import {
  testOutcomesAndMilestonesWithData,
  testOutcomesAndMilestonesExportViewWithData
} from '../../helpers/apd/activity/outcomes-and-milestones';
import {
  testStateStaffAndExpensesWithData,
  testStateStaffAndExpensesExportViewWithData
} from '../../helpers/apd/activity/state-staff-and-expenses';
import {
  testPrivateContractorCostsWithData,
  testPrivateContractorCostsExportViewWithData
} from '../../helpers/apd/activity/private-contractor-costs';
import {
  testCostAllocationAndOtherFundingWithData,
  testCostAllocationAndOtherFundingExportViewWithData
} from '../../helpers/apd/activity/cost-allocation-and-other-funding';
import {
  testBudgetAndFFPWithData,
  testBudgetAndFFPExportViewWithData
} from '../../helpers/apd/activity/budget-and-ffp';
import {
  testActivityScheduleSummaryWithData,
  testActivityScheduleSummaryExportViewWithData
} from '../../helpers/apd/activity-schedule-summary';
import {
  testProposedBudgetWithData,
  testProposedBudgetExportViewWithData
} from '../../helpers/apd/proposed-budget';
import {
  testAssurancesAndComplianceWithData,
  testAssurancesAndComplianceExportViewWithData
} from '../../helpers/apd/assurances-and-compliance';
import {
  testExecutiveSummaryWithData,
  testExecutiveSummaryExportViewWithData
} from '../../helpers/apd/executive-summary';

// Tests an APD by adding data and checking the results
describe('APD with Data', () => {
  let apdUrl;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      apdUrl = pathname;
    });
  });

  beforeEach(() => {
    cy.visit(apdUrl);
  });

  describe('Form View', () => {
    /* eslint-disable-next-line prefer-arrow-callback, func-names */
    beforeEach(function () {
      cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
    });

    afterEach(() => {
      // wait for another save cycle to trigger
      cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
      // wait for the save cycle to complete
      cy.waitForSave();
    });

    describe('APD Overview', () => {
      testAPDOverviewWithData(years);

      it('should have two checked years', () => {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
        cy.get('[type="checkbox"][checked]').each((_, index, list) =>
          years.push(list[index].value)
        );
      });
    });

    describe('Key State Personnel', () => {
      testKeyStatePersonnelWithData(years);
    });

    describe('Results of Previous Activities', () => {
      testResultsOfPreviousActivitiesWithData(years);
    });

    describe('Activities', () => {
      describe('Activity Dashboard', () => {
        testActivityDashboardWithData(years);
      });

      describe('Activity Overview', () => {
        testActivityOverviewWithData(years);
      });

      describe('Outcomes and Milestones', () => {
        testOutcomesAndMilestonesWithData(years);
      });

      describe('State Staff and Expenses', () => {
        testStateStaffAndExpensesWithData(years);
      });

      describe('Private Contractor Costs', () => {
        testPrivateContractorCostsWithData(years);
      });

      describe('Cost Allocation and Other Funding', () => {
        testCostAllocationAndOtherFundingWithData(years);
      });

      describe('Budget and FFP', () => {
        testBudgetAndFFPWithData(years);
      });
    });

    describe('Activity Schedule Summary', () => {
      testActivityScheduleSummaryWithData(years);
    });

    describe('Proposed Budget', () => {
      testProposedBudgetWithData(years);
    });

    describe('Assurances and Compliance', () => {
      testAssurancesAndComplianceWithData(years);
    });

    describe('Executive Summary', () => {
      testExecutiveSummaryWithData(years);
    });
  });

  describe('Export View', () => {
    beforeEach(() => {
      cy.goToExportView();
    });

    describe('APD Overview', () => {
      testAPDOverviewExportViewWithData(years);
    });

    describe('Key State Personnel', () => {
      testKeytStatePersonnelExportViewWithData(years);
    });

    describe('Results of Previous Activities', () => {
      testResultsOfPreviousActivitiesExportViewWithData(years);
    });

    describe('Activities', () => {
      describe('Activity Dashboard', () => {
        testActivityDashboardExportViewWithData(years);
      });

      describe('Activity Overview', () => {
        testActivityOverviewExportViewWithData(years);
      });

      describe('Outcomes and Milestones', () => {
        testOutcomesAndMilestonesExportViewWithData(years);
      });

      describe('State Staff and Expenses', () => {
        testStateStaffAndExpensesExportViewWithData(years);
      });

      describe('Private Contractor Costs', () => {
        testPrivateContractorCostsExportViewWithData(years);
      });

      describe('Cost Allocation and Other Funding', () => {
        testCostAllocationAndOtherFundingExportViewWithData(years);
      });

      describe('Budget and FFP', () => {
        testBudgetAndFFPExportViewWithData(years);
      });
    });

    describe('Activity Schedule Summary', () => {
      testActivityScheduleSummaryExportViewWithData(years);
    });

    describe('Proposed Budget', () => {
      testProposedBudgetExportViewWithData(years);
    });

    describe('Assurances and Compliance', () => {
      testAssurancesAndComplianceExportViewWithData(years);
    });

    describe('Executive Summary', () => {
      testExecutiveSummaryExportViewWithData(years);
    });
  });
});
