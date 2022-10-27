// <reference types="cypress" />
import { testDefaultAPDOverview } from '../../helpers/apd/apd-overview';
import { testDefaultKeyStatePersonnel } from '../../helpers/apd/key-state-personnel';
import { testDefaultResultsOfPreviousActivities } from '../../helpers/apd/results-of-previous-activities';
import { testDefaultActivityScheduleSummary } from '../../helpers/apd/activity-schedule-summary';
import { testDefaultProposedBudget } from '../../helpers/apd/proposed-budget';
import { testDefaultAssurancesAndCompliance } from '../../helpers/apd/assurances-and-compliance';
import { testDefaultExecutiveSummary } from '../../helpers/apd/executive-summary';
import { checkDefaultActivity } from '../../helpers/apd/activity/check-default-activity';

// Tests the default values of an APD
describe('Default APD', { tags: ['@apd', '@default', '@slow'] }, () => {
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
      cy.log({ apdUrl });
      apdId = apdUrl.split('/').pop();
      cy.log({ apdId });
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.updateFeatureFlags();
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Form View', () => {
    /* eslint-disable-next-line prefer-arrow-callback, func-names */
    beforeEach(function () {
      cy.updateFeatureFlags();
      cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
    });

    describe('default APD Overview', () => {
      testDefaultAPDOverview(years);

      it('should have two checked years', () => {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
      });
    });

    describe('default Key State Personnel', () => {
      testDefaultKeyStatePersonnel(years);
    });

    describe('default Results of Previous Activities', () => {
      testDefaultResultsOfPreviousActivities(years);
    });

    describe('Checks Default Activity', () => {
      checkDefaultActivity(years);
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
});
