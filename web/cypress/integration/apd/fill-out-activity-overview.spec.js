/// <reference types="cypress" />

import PopulatePage from '../../page-objects/populate-page';

// This test assumes a 2nd activity already exists
describe('Filling out section in the activity overview page', () => {
  const populatePage = new PopulatePage();

  let apdUrl;

  before(() => {
    cy.useStateStaff();
    cy.get('[href="/apd/342"]').click();

    // Gets to the activity page
    for (let i = 0; i < 3; i += 1) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.location('pathname').then(pathname => {
      apdUrl = pathname;
    });
  });

  // eslint-disable-next-line prefer-arrow-callback
  beforeEach(function before() {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(apdUrl);
  });

  it('Fills in fields on first activity', function a1Test() {
    cy.findAllByText('Edit').eq(0).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.setTinyMceContent(
      'activity-short-overview-field',
      this.data.a1_short_overview
    );

    populatePage.fillDate(
      'Start date',
      this.data.a1_start_m,
      this.data.a1_start_d,
      this.data.a1_start_y
    );

    populatePage.fillDate(
      'End date',
      this.data.a1_end_m,
      this.data.a1_end_d,
      this.data.a1_end_y
    );

    cy.setTinyMceContent('activity-description-field', this.data.a1_detailed);
    cy.setTinyMceContent(
      'activity-alternatives-field',
      this.data.a1_supporting_justifications
    );
    cy.setTinyMceContent(
      'standards-and-conditions-supports-field',
      this.data.a1_supports_medicaid
    );

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  // eslint-disable-next-line prefer-arrow-callback
  it('Fills in fields on second activity', function a2Test() {
    cy.findAllByText('Edit').eq(1).click();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.setTinyMceContent(
      'activity-short-overview-field',
      this.data.a2_short_overview
    );

    populatePage.fillDate(
      'Start date',
      this.data.a2_start_m,
      this.data.a2_start_d,
      this.data.a2_start_y
    );

    populatePage.fillDate(
      'End date',
      this.data.a2_end_m,
      this.data.a2_end_d,
      this.data.a2_end_y
    );

    cy.setTinyMceContent('activity-description-field', this.data.a2_detailed);
    cy.setTinyMceContent(
      'activity-alternatives-field',
      this.data.a2_supporting_justifications
    );
    cy.get('[class="ds-c-field visibility--screen"]').type(
      this.data.a2_does_not_support_medicaid
    );

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });
});
