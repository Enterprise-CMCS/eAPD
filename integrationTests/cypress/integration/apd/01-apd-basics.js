/// <reference types="cypress" />

// Tests performing basic APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('filling out APD overview section', function () {
  const page_titles = ['APD Overview', 'Key State Personnel', 'Results of Previous Activities', 'Activities', 'Activity Schedule Summary', 'Proposed Budget', 'Assurances and Compliance', 'Executive Summary', 'Export and Submit'];

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
  });

  it('confirms Continue buttons redirect to correct sections', () => {
    cy.wrap(page_titles).each((index) => {
      cy.get('.ds-h2')
        .should('contain', index);

      if(index != page_titles[page_titles.length - 1]) {
        cy.get('#continue-button').click();
      }
    });
  });

  it('confirms Back buttons redirect to correct sections', () => {
    const reverse_page_titles = page_titles.reverse()

    cy.wrap(reverse_page_titles).each((index) => {
      cy.get('.ds-h2')
        .should('contain', index);

      if(index != reverse_page_titles[reverse_page_titles.length - 1]) {
        cy.get('#previous-button').click();
      }
    });
  });

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
  });

  it('confirms anchor links redirect to correct sections', () => {
    cy.goToKeyStateProgramManagememt();

    cy.get('#apd-state-profile-key-personnel')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToPriorActOverview();

    cy.get('#prev-activities-outline')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToActualExpenditures();

    cy.get('#prev-activities-table')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToProposedSummary();

    cy.get('#summary-schedule-by-activity-table')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToProposedSummaryTable();

    cy.get('#budget-summary-table')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToQuarterlyFedShare();

    cy.get('#budget-federal-by-quarter')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToEstimatedQuarterly();

    cy.get('#budget-incentive-by-quarter')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToActivitiesSummary();

    cy.get('#executive-summary-summary')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));

    cy.goToProgramBudgetTable();

    cy.get('#executive-summary-budget-table')
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its('scrollY').should('be.gt', 0))
      .then((offset) => cy.window().its('scrollY').should('eq', offset));
  });

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
