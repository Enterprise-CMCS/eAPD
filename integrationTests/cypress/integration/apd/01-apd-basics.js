/// <reference types="cypress" />

// Tests filling out APD overview section

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
    const pages = [{parent: 'APD Overview', label: ''},
                   {parent: 'Key State Personnel', label: 'Key Personnel and Program Management'},
                   {parent: 'Results of Previous Activities', label: 'Results of Previous Activities'},
                   {parent: 'Activities', label: ''},
                   {parent: 'Activity Schedule Summary', label: ''},
                   {parent: 'Proposed Budget', label: 'Proposed Budget'},
                   {parent: 'Assurances and Compliance', label: ''},
                   {parent: 'Executive Summary', label: 'Executive Summary'},
                   {parent: 'Export and Submit', label: ''}]

    cy.wrap(pages).each((index) => {
      if (index.label != '') {
        // Expand nav menu option
        cy.get('.ds-c-vertical-nav__label--parent')
          .contains(index.parent)
          .then($el => {
            if($el.attr('aria-expanded') === 'false') {
              // if it's not expanded, expand it
              cy.wrap($el).click();
            }

            // Click on nav submenu button
            cy.get('a.ds-c-vertical-nav__label')
              .contains(index.label)
              .click();
          });
      } else {
        cy.get('a.ds-c-vertical-nav__label')
          .contains(index.parent)
          .click();
      };

      cy.get('.ds-h2')
        .should('contain', index.parent);
    })
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