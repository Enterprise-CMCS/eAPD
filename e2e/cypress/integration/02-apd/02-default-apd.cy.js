// <reference types="cypress" />
import { testDateDollarInlineValidation } from '../../helpers/apd/date-dollar-inline-validation.js';
import { testDefaultAPDOverview } from '../../helpers/apd/apd-overview.js';
import { testDefaultKeyStatePersonnel } from '../../helpers/apd/key-state-personnel.js';
import { testDefaultResultsOfPreviousActivities } from '../../helpers/apd/results-of-previous-activities.js';
import { testDefaultActivityScheduleSummary } from '../../helpers/apd/activity-schedule-summary.js';
import { testDefaultProposedBudget } from '../../helpers/apd/proposed-budget.js';
import { testDefaultHitechAssurancesAndCompliance } from '../../helpers/apd/assurances-and-compliance.js';
import { testDefaultExecutiveSummary } from '../../helpers/apd/executive-summary.js';
import { checkDefaultActivity } from '../../helpers/apd/activity/check-default-activity.js';

// Tests the default values of an APD

Cypress.session.clearAllSavedSessions();

describe('Default APD', { tags: ['@apd', '@default', '@slow'] }, function () {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();
    cy.visit('/');

    cy.findAllByText('Create new').click();
    cy.findByRole('radio', { name: /HITECH/i }).click();
    cy.findByLabelText('APD Name').clear().type('HITECH IAPD').blur();
    cy.findByRole('checkbox', { name: /Annual Update/i }).click();
    cy.findByRole('button', { name: /Create an APD/i }).click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"][checked]').each((_, index, list) =>
        years.push(list[index].value)
      );
    });
  });

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.useStateStaff();
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Form View', function () {
    describe('default APD Overview', function () {
      testDefaultAPDOverview();

      it('should have two checked years', function () {
        cy.get('[data-cy=yearList]').within(() => {
          cy.get('[type="checkbox"][checked]').should('have.length', 2);
        });
      });
    });

    describe.only('default Date and Dollar Inline Validation', function () {
      testDateDollarInlineValidation();
    });

    describe('default Key State Personnel', function () {
      testDefaultKeyStatePersonnel();
    });

    describe('default Results of Previous Activities', function () {
      testDefaultResultsOfPreviousActivities();
    });

    describe('Checks Default Activity', function () {
      checkDefaultActivity();
    });

    describe('default Activity Schedule Summary', function () {
      testDefaultActivityScheduleSummary();
    });

    describe('default Proposed Budget', function () {
      testDefaultProposedBudget();
    });

    describe('default Assurances and Compliance', function () {
      testDefaultHitechAssurancesAndCompliance();
    });

    describe('default Executive Summary', function () {
      testDefaultExecutiveSummary();
    });
  });
});
