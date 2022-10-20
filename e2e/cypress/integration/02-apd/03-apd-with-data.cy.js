// <reference types="cypress" />
import { testAPDOverviewWithData } from '../../helpers/apd/apd-overview';
import { testKeyStatePersonnelWithData } from '../../helpers/apd/key-state-personnel';
import { testResultsOfPreviousActivitiesWithData } from '../../helpers/apd/results-of-previous-activities';
import { testActivityScheduleSummaryWithData } from '../../helpers/apd/activity-schedule-summary';
import { testProposedBudgetWithData } from '../../helpers/apd/proposed-budget';
import { testAssurancesAndComplianceWithData } from '../../helpers/apd/assurances-and-compliance';
import { testExecutiveSummaryWithData } from '../../helpers/apd/executive-summary';
import { addHITActivity } from '../../helpers/apd/activity/add-HIT-activity';
import { addHIEActivity } from '../../helpers/apd/activity/add-HIE-activity';
import { addMMISActivity } from '../../helpers/apd/activity/add-MMIS-activity';

// Tests an APD by adding data and checking the results
describe('APD with Data', { tags: ['@apd', '@data', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.updateFeatureFlags({ validation: true });
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Form View', () => {
    describe('APD Overview', () => {
      testAPDOverviewWithData(years);

      it('should have two checked years', () => {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
      });
    });

    describe('Key State Personnel', () => {
      testKeyStatePersonnelWithData(years);
    });

    describe('Results of Previous Activities', () => {
      testResultsOfPreviousActivitiesWithData(years);
    });

    describe('Activities', () => {
      describe('Add HIT Activity', () => {
        addHITActivity(years);
      });

      describe('Add HIE Activity', () => {
        addHIEActivity(years);
      });

      describe('Add MMIS Activity', () => {
        addMMISActivity(years);
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
