/// <reference types="cypress" />

// Tests filling out APD overview section

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('filling out APD overview section', function () {
  before(() => {
    cy.useStateStaff();
    // Delete all existing APDs
    cy.get('button').each($el => {
      if ($el.text().includes('Delete')) {
        cy.wrap($el).click();
        cy.findAllByText('Delete APD').click();
      }
    });
    cy.wait(1000); // Wait for saving
  });

  it('creates a new APD with current date', () => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();

    cy.contains('Create new').click();

    cy.get('.apd--title').contains("Created: " + today.toLocaleDateString("en-US", options));
  })

  it('confirms side nav buttons redirect to correct sections', () => {
    cy.get('.ds-c-vertical-nav')
      .contains('APD Overview')
      .should('have.class', 'ds-c-vertical-nav__label--current');
    
    cy.get('.ds-h2')
      .should('contain', 'APD Overview');

    cy.goToKeyStatePersonnel();

    cy.get('.ds-c-vertical-nav')
      .contains('Key State Personnel')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Key State Personnel');

    cy.goToPreviousActivities();

    cy.get('.ds-c-vertical-nav')
      .contains('Results of Previous Activities')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Results of Previous Activities');

    cy.goToActivityDashboard();

    cy.get('.ds-c-vertical-nav')
      .contains('Activities Dashboard')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
      .should('contain', 'Activities');
    
    cy.get('#activities')
      .contains('Add Activity');

    cy.goToActivityScheduleSummary();

    cy.get('.ds-c-vertical-nav')
      .contains('Activity Schedule Summary')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Activity Schedule Summary');

    cy.goToProposedBudget();

    cy.get('.ds-c-vertical-nav')
      .contains('Proposed Budget')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Proposed Budget');

    cy.goToAssurancesAndCompliance();

    cy.get('.ds-c-vertical-nav')
      .contains('Assurances and Compliance')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Assurances and Compliance');

    cy.goToExecutiveSummary();

    cy.get('.ds-c-vertical-nav')
      .contains('Executive Summary')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
    .should('contain', 'Executive Summary');

    cy.contains('Export and Submit').click();

    cy.get('.ds-c-vertical-nav')
      .contains('Export and Submit')
      .should('have.class', 'ds-c-vertical-nav__label--current');

    cy.get('.ds-h2')
      .should('contain', 'Export and Submit');
  })

  it('deletes the APD', () => {
    cy.visit('/');

    cy.contains('HITECH IAPD')
      .should('have.length', 1);

    cy.contains('Delete').click();

    cy.get('.ds-c-button--danger').click();

    cy.contains('HITECH IAPD')
      .should('have.length', 0);
  });
});