/* eslint-disable func-names */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import PopulatePage from '../../page-objects/populate-page';

// This test assumes a 2nd activity already exists
describe('Filling out section in the activity overview page', () => {
  const populatePage = new PopulatePage();

  let dashboardUrl;

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function before() {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('Fills in fields on first activity', function () {
    const overview = this.data.activityOverview[0];
    cy.findAllByText('Edit').eq(0).click();
    cy.wait(1000);

    populatePage.fillActivityOverview(
      overview.shortOverview,
      overview.startDate,
      overview.endDate,
      overview.detailedDescription,
      overview.supportingJustificaions
    );

    cy.setTinyMceContent(
      'standards-and-conditions-supports-field',
      overview.supportsMedicaid
    );

    cy.wait(1000);
    cy.goToActivityDashboard();
  });

  it('Fills in fields on second activity', function () {
    const overview = this.data.activityOverview[1];
    cy.findAllByText('Edit').eq(1).click();
    cy.wait(1000);

    populatePage.fillActivityOverview(
      overview.shortOverview,
      overview.startDate,
      overview.endDate,
      overview.detailedDescription,
      overview.supportingJustificaions
    );

    cy.get('[class="ds-c-field visibility--screen"]').type(
      overview.supportsMedicaid
    );

    cy.wait(1000);
    cy.goToActivityDashboard();
  });
});
