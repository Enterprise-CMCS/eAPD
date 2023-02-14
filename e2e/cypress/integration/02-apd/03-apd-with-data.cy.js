// <reference types="cypress" />
import { testAPDOverviewWithData } from '../../helpers/apd/apd-overview.js';
import { testKeyStatePersonnelWithData } from '../../helpers/apd/key-state-personnel.js';
import { testResultsOfPreviousActivitiesWithData } from '../../helpers/apd/results-of-previous-activities.js';
import { testActivityScheduleSummaryWithData } from '../../helpers/apd/activity-schedule-summary.js';
import { testProposedBudgetWithData } from '../../helpers/apd/proposed-budget.js';
import { testHitechAssurancesAndComplianceWithData } from '../../helpers/apd/assurances-and-compliance.js';
import { testExecutiveSummaryWithData } from '../../helpers/apd/executive-summary.js';
import { addHITActivity } from '../../helpers/apd/activity/add-HIT-activity.js';
import { addHIEActivity } from '../../helpers/apd/activity/add-HIE-activity.js';
import { addMMISActivity } from '../../helpers/apd/activity/add-MMIS-activity.js';

// Tests an APD by adding data and checking the results
describe('APD with Data', { tags: ['@apd', '@data', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit('/');

    cy.findAllByText('Create new').click();
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

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Form View', function () {
    describe('APD Overview', function () {
      testAPDOverviewWithData();

      it('should have two checked years', function () {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
      });
    });

    describe('Key State Personnel', function () {
      testKeyStatePersonnelWithData();
    });

    describe('Results of Previous Activities', function () {
      testResultsOfPreviousActivitiesWithData();
    });

    describe('Activities', function () {
      describe('Add HIT Activity', function () {
        addHITActivity();
      });

      describe('Add HIE Activity', function () {
        addHIEActivity();
      });

      describe('Add MMIS Activity', function () {
        addMMISActivity();
      });
    });

    describe('Activity Schedule Summary', function () {
      testActivityScheduleSummaryWithData();
    });

    describe('Proposed Budget', function () {
      testProposedBudgetWithData();
    });

    describe('Assurances and Compliance', function () {
      testHitechAssurancesAndComplianceWithData();
    });

    describe('Executive Summary', function () {
      testExecutiveSummaryWithData();
    });
  });
});
