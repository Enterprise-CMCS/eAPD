/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

describe('Filling out section in the activity overview page', () => {
  const populatePage = new PopulatePage();
  const activityPage = new ActivityPage();

  let dashboardUrl;

  before(() => {
    cy.url().should('include', '/activities');
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
    cy.contains('Edit').click();
    cy.contains('Outcomes and milestones').click();
  });

  it('fills out outcomes', function () {
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

    const checkOutcomes = this.data.outcomes[0];

    cy.contains('Edit').click();
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.findAllByText('Delete').eq(3).click();
    cy.findByRole('button', { name: /Done/i }).click();
    cy.contains('Delete Metric?').should('not.exist');
    cy.contains(checkOutcomes.metrics[0][0]).should('not.exist');
    cy.contains(`1. ${checkOutcomes.metrics[0][1]}`).should('exist');

    cy.contains('Delete').click();
    cy.contains('Delete Outcome and Metrics?').should('exist');
    cy.findAllByText('Delete').eq(2).click();
    cy.contains(checkOutcomes.names[0]).should('not.exist');
    cy.contains(`Outcome: ${checkOutcomes.names[1]}`).should('exist');
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.goToActivityDashboard();
  });

  it('fills out milestones', function () {
    const milestone = this.data.milestones[0];
    for (let i = 0; i < 2; i += 1) {
      if (i === 0) {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
      } else {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
        cy.findByRole('button', { name: /Done/i }).click();
        cy.findAllByText('Edit').eq(2).click();
      }

      populatePage.fillMilestoneForm(milestone.names[i], milestone.dates[i]);

      activityPage.checkMilestoneOutput(
        `${i + 1}. ${milestone.names[i]}`,
        `${milestone.dates[i][0]}/${milestone.dates[i][1]}/${milestone.dates[i][2]}`
      );
    }

    cy.findAllByText('Delete').eq(1).click();
    cy.contains('Delete Milestone?').should('exist');
    cy.findAllByText('Delete').eq(3).click();
    cy.contains('Delete Milestone?').should('not.exist');
    cy.contains(milestone.names[0]).should('not.exist');
    cy.contains(`1. ${milestone.names[1]}`).should('exist');
    cy.goToActivityDashboard();
  });
});
