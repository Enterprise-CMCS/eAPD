// <reference types="cypress" />
import {
  testDefaultAPDOverview,
  testDefaultAPDOverviewExportView
} from '../../helpers/apd/apd-overview';
import {
  testDefaultKeyStatePersonnel,
  testDefaultKeyStatePersonnelExportView
} from '../../helpers/apd/key-state-personnel';
import {
  testDefaultResultsOfPreviousActivities,
  testDefaultResultsOfPreviousActivitiesExportView
} from '../../helpers/apd/results-of-previous-activities';
import {
  testDefaultActivityDashboard,
  testDefaultActivityDashboardExportView
} from '../../helpers/apd/activity/activity-dashboard';
import {
  testDefaultActivityOverview,
  testDefaultActivityOverviewExportView
} from '../../helpers/apd/activity/activity-overview';
import {
  testDefaultOutcomesAndMilestones,
  testDefaultOutcomesAndMilestonesExportView
} from '../../helpers/apd/activity/outcomes-and-milestones';
import {
  testDefaultStateStaffAndExpenses,
  testDefaultStateStaffAndExpensesExportView
} from '../../helpers/apd/activity/state-staff-and-expenses';
import {
  testDefaultPrivateContractorCosts,
  testDefaultPrivateContractorCostsExportView
} from '../../helpers/apd/activity/private-contractor-costs';
import {
  testDefaultCostAllocationAndOtherFunding,
  testDefaultCostAllocationAndOtherFundingExportView
} from '../../helpers/apd/activity/cost-allocation-and-other-funding';
import {
  testDefaultBudgetAndFFP,
  testDefaultBudgetAndFFPExportView
} from '../../helpers/apd/activity/budget-and-ffp';
import {
  testDefaultActivityScheduleSummary,
  testDefaultActivityScheduleSummaryExportView
} from '../../helpers/apd/activity-schedule-summary';
import {
  testDefaultProposedBudget,
  testDefaultProposedBudgetExportView
} from '../../helpers/apd/proposed-budget';
import {
  testDefaultAssurancesAndCompliance,
  testDefaultAssurancesAndComplianceExportView
} from '../../helpers/apd/assurances-and-compliance';
import {
  testDefaultExecutiveSummary,
  testDefaultExecutiveSummaryExportView
} from '../../helpers/apd/executive-summary';

// Tests the default values of an APD
describe('Default APD', { tags: ['@apd', '@default'] }, () => {
  let apdUrl;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
    });
  });

  beforeEach(() => {
    cy.visit(apdUrl);
  });

  after(() => {
    cy.useStateStaff();
    cy.get(`a[href='${apdUrl}']`).should('exist');

    cy.get(`a[href='${apdUrl}']`)
      .parent()
      .parent()
      .parent()
      .contains('Delete')
      .click();

    cy.get('.ds-c-button--danger').click();

    cy.get(`a[href='${apdUrl}']`).should('not.exist');
  });

  describe('Form View', () => {
    /* eslint-disable-next-line prefer-arrow-callback, func-names */
    beforeEach(function () {
      cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
    });

    afterEach(() => {
      // wait for the save cycle to complete
      cy.waitForSave();
    });

    describe('default APD Overview', () => {
      testDefaultAPDOverview(years);

      it('should have two checked years', () => {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
        cy.get('[type="checkbox"][checked]').each((_, index, list) =>
          years.push(list[index].value)
        );
      });
    });

    describe('default Key State Personnel', () => {
      testDefaultKeyStatePersonnel(years);
    });

    describe('default Results of Previous Activities', () => {
      testDefaultResultsOfPreviousActivities(years);
    });

    describe('default Activities', () => {
      describe('default Activity Dashboard', () => {
        testDefaultActivityDashboard(years);
      });

      describe('default Activity Overview', () => {
        testDefaultActivityOverview(years);
      });

      describe('default Outcomes and Milestones', () => {
        testDefaultOutcomesAndMilestones(years);
      });

      describe('default State Staff and Expenses', () => {
        testDefaultStateStaffAndExpenses(years);
      });

      describe('default Private Contractor Costs', () => {
        testDefaultPrivateContractorCosts(years);
      });

      describe('default Cost Allocation and Other Funding', () => {
        testDefaultCostAllocationAndOtherFunding(years);
      });

      describe('default Budget and FFP', () => {
        testDefaultBudgetAndFFP(years);
      });
    });

    describe('default Activity Schedule Summary', () => {
      testDefaultActivityScheduleSummary(years);
    });

    describe('default Proposed Budget', () => {
      testDefaultProposedBudget(years);
    });

    describe('default Assurances and Compliance', () => {
      testDefaultAssurancesAndCompliance(years);
    });

    describe('default Executive Summary', () => {
      testDefaultExecutiveSummary(years);
    });
  });

  describe('Export View', () => {
    beforeEach(() => {
      cy.goToExportView();
    });

    describe('default APD Overview', () => {
      testDefaultAPDOverviewExportView(years);
    });

    describe('default Key State Personnel', () => {
      testDefaultKeyStatePersonnelExportView(years);
    });

    describe('default Results of Previous Activities', () => {
      testDefaultResultsOfPreviousActivitiesExportView(years);
    });

    describe('default Activities', () => {
      describe('default Activities Dashboard', () => {
        testDefaultActivityDashboardExportView(years);
      });

      describe('default Activity Overview', () => {
        testDefaultActivityOverviewExportView(years);
      });

      describe('default Outcomes and Milestones', () => {
        testDefaultOutcomesAndMilestonesExportView(years);
      });

      describe('default State Staff and Expenses', () => {
        testDefaultStateStaffAndExpensesExportView(years);
      });

      describe('default Private Contractor Costs', () => {
        testDefaultPrivateContractorCostsExportView(years);
      });

      describe('default Cost Allocation and Other Funding', () => {
        testDefaultCostAllocationAndOtherFundingExportView(years);
      });

      describe('default Budget and FFP', () => {
        testDefaultBudgetAndFFPExportView(years);
      });
    });

    describe('default Activity Schedule Summary', () => {
      testDefaultActivityScheduleSummaryExportView(years);
    });

    describe('default Proposed Budget', () => {
      testDefaultProposedBudgetExportView(years);
    });

    describe('default Assurances and Compliance', () => {
      testDefaultAssurancesAndComplianceExportView(years);
    });

    describe('default Executive Summary', () => {
      testDefaultExecutiveSummaryExportView(years);
    });
  });
});
