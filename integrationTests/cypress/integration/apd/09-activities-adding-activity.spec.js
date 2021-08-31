/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import ExportPage from '../../page-objects/export-page';

describe('Adding an activity in the Activity Dashboard', () => {
  const exportPage = new ExportPage();

  let dashboardUrl;
  const activities = [['Program Administration', 'HIT']];

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      cy.fixture('activity-overview-template.json').as('data');
      dashboardUrl = pathname;
    });
  });

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('tests default added activity export view', () => {
    cy.contains('Add Activity').click();
    cy.contains('Untitled').should('exist');
    cy.contains('Add Activity').click();

    cy.contains('Delete').click();
    cy.contains('Delete Activity?').should('exist');
    cy.contains('Cancel').click();
    cy.contains('Activity 3: Untitled').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.contains('Activity 3: Untitled').should('not.exist');

    cy.goToExportView();
    cy.contains('2. |');
    exportPage.checkActivityHeader('', 2);
    exportPage.checkActivityNameAtEnd('Activity 2');
  });

  it('tests naming an activity', function () {
    cy.findAllByText('Edit').eq(1).click();

    cy.findByLabelText('Activity name').type(this.data.newActivityName);
    cy.findByRole('radio', { name: /HIT/i }).check({ force: true });
    activities.push([this.data.newActivityName, 'HIT']);

    cy.findAllByText(`Activity 2: ${this.data.newActivityName}`).eq(0);
    cy.findAllByText(`Activity 2: ${this.data.newActivityName}`).eq(1);

    cy.goToExportView();
    exportPage.checkActivityList(activities);
    exportPage.checkActivityHeader(activities[1][0], 2);
    exportPage.checkActivityNameAtEnd(activities[1][0]);

    cy.contains('Back to APD').click();
    cy.goToActivityDashboard();
  });
});
