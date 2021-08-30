/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import ActivityPage from '../../page-objects/activity-page';
import PopulatePage from '../../page-objects/populate-page';

describe('Filling out Outcomes and Milestones page', () => {
  const populatePage = new PopulatePage();
  const activityPage = new ActivityPage();

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

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('fills out outcomes in activity 1', function () {
    cy.contains('Edit').click();
    cy.contains('Outcomes and milestones').click();

    const outcomes = this.data.outcomes[0];
    for (let i = 0; i < 2; i += 1) {
      if (i === 0) {
        cy.findByRole('button', { name: /Add Outcome/i }).click();
      } else {
        cy.findByRole('button', { name: /Add Outcome/i }).click();
        cy.findByRole('button', { name: /Done/i }).click();
        cy.findAllByText('Edit').eq(1).click();
      }

      populatePage.fillOutcomeForm(
        outcomes.names[i],
        outcomes.metrics[i][0],
        outcomes.metrics[i][1]
      );

      activityPage.checkOutcomeOutput(
        outcomes.names[i],
        outcomes.metrics[i][0],
        outcomes.metrics[i][1]
      );
    }

    cy.contains('Edit').click();
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.findAllByText('Delete').eq(3).click();
    cy.findByRole('button', { name: /Done/i }).click();
    cy.contains('Delete Metric?').should('not.exist');
    cy.contains(outcomes.metrics[0][0]).should('not.exist');
    cy.contains(`1. ${outcomes.metrics[0][1]}`).should('exist');

    cy.contains('Delete').click();
    cy.contains('Delete Outcome and Metrics?').should('exist');
    cy.findAllByText('Delete').eq(2).click();
    cy.contains(outcomes.names[0]).should('not.exist');
    cy.contains(`Outcome: ${outcomes.names[1]}`).should('exist');
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.goToActivityDashboard();
  });

  it('fills out milestones in activity 1', function () {
    cy.contains('Edit').click();
    cy.contains('Outcomes and milestones').click();

    const milestones = this.data.milestones[0];
    for (let i = 0; i < 2; i += 1) {
      if (i === 0) {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
      } else {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
        cy.findByRole('button', { name: /Done/i }).click();
        cy.findAllByText('Edit').eq(2).click();
      }

      populatePage.fillMilestoneForm(milestones.names[i], milestones.dates[i]);

      activityPage.checkMilestoneOutput(
        `${i + 1}. ${milestones.names[i]}`,
        `${milestones.dates[i][0]}/${milestones.dates[i][1]}/${milestones.dates[i][2]}`
      );
    }

    cy.findAllByText('Delete').eq(1).click();
    cy.contains('Delete Milestone?').should('exist');
    cy.findAllByText('Delete').eq(3).click();
    cy.contains('Delete Milestone?').should('not.exist');
    cy.contains(milestones.names[0]).should('not.exist');
    cy.contains(`1. ${milestones.names[1]}`).should('exist');
    cy.goToActivityDashboard();
  });

  it('fills out outcomes and milestones in activity 2', function () {
    cy.findAllByText('Edit').eq(1).click();
    cy.findAllByText('Outcomes and milestones').eq(1).click();

    const outcomes = this.data.outcomes[1];
    const milestones = this.data.milestones[1];

    for (let i = 0; i < 2; i += 1) {
      cy.findByRole('button', { name: /Add Outcome/i }).click();
      populatePage.fillOutcomeForm(
        outcomes.names[i],
        outcomes.metrics[i][0],
        outcomes.metrics[i][1]
      );

      cy.findByRole('button', { name: /Add Milestone/i }).click();
      populatePage.fillMilestoneForm(milestones.names[i], milestones.dates[i]);
    }
    cy.goToActivityDashboard();
  });
});
