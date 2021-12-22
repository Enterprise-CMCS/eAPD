// <reference types="cypress" />
import { testAPDOverviewWithData } from '../../helpers/apd/apd-overview';
import { testKeyStatePersonnelWithData } from '../../helpers/apd/key-state-personnel';
import { testResultsOfPreviousActivitiesWithData } from '../../helpers/apd/results-of-previous-activities';
import { testActivityDashboardWithData } from '../../helpers/apd/activity/activity-dashboard';
import { testActivityOverviewWithData } from '../../helpers/apd/activity/activity-overview';
import { testOutcomesAndMilestonesWithData } from '../../helpers/apd/activity/outcomes-and-milestones';
import { testStateStaffAndExpensesWithData } from '../../helpers/apd/activity/state-staff-and-expenses';
import { testPrivateContractorCostsWithData } from '../../helpers/apd/activity/private-contractor-costs';
import { testCostAllocationAndOtherFundingWithData } from '../../helpers/apd/activity/cost-allocation-and-other-funding';
import { testBudgetAndFFPWithData } from '../../helpers/apd/activity/budget-and-ffp';
import { testActivityScheduleSummaryWithData } from '../../helpers/apd/activity-schedule-summary';
import { testProposedBudgetWithData } from '../../helpers/apd/proposed-budget';
import { testAssurancesAndComplianceWithData } from '../../helpers/apd/assurances-and-compliance';
import { testExecutiveSummaryWithData } from '../../helpers/apd/executive-summary';

// Tests an APD by adding data and checking the results
describe('APD with Data', { tags: ['@apd', '@data', '@slow'] }, () => {
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
    if (apdUrl) {
      cy.intercept('DELETE', `/apds/${apdUrl}/`).as('delete');
      cy.useStateStaff();
      cy.get(`a[href='${apdUrl}']`).should('exist');

      cy.get(`a[href='${apdUrl}']`)
        .parent()
        .parent()
        .parent()
        .contains('Delete')
        .click();

      cy.get('.ds-c-button--danger').click();
      cy.wait('@delete');

      cy.get(`a[href='${apdUrl}']`).should('not.exist');
    }
  });

  describe('Form View', () => {
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
});
