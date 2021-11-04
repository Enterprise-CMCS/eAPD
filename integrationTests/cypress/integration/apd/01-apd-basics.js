/// <reference types="cypress" />

// Tests performing basic APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('filling out APD overview section', () => {
  const pageTitles = [
    'APD Overview',
    'Key State Personnel',
    'Results of Previous Activities',
    'Activities',
    'Activity Schedule Summary',
    'Proposed Budget',
    'Assurances and Compliance',
    'Executive Summary',
    'Export and Submit'
  ];

  before(() => {
    cy.useStateStaff();
    // Delete all existing APDs
    cy.get('button').each($el => {
      if ($el.text().includes('Delete')) {
        cy.wrap($el).click();
        cy.findAllByText('Delete APD').click();
      }
    });
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it('creates a new APD with current date', () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    cy.contains('Create new').click();

    cy.get('.apd--title').contains(
      `Created: ${today.toLocaleDateString('en-US', options)}`
    );
  });

  it('confirms Continue buttons redirect to correct sections', () => {
    cy.wrap(pageTitles).each(index => {
      cy.get('.ds-h2').should('contain', index);

      if (index !== pageTitles[pageTitles.length - 1]) {
        cy.get('#continue-button').click();
      }
    });
  });

  it('confirms Back buttons redirect to correct sections', () => {
    const reversePageTitles = pageTitles.reverse();

    cy.wrap(reversePageTitles).each(index => {
      cy.get('.ds-h2').should('contain', index);

      if (index !== reversePageTitles[reversePageTitles.length - 1]) {
        cy.get('#previous-button').click();
      }
    });
  });

  it('confirms side nav buttons redirect to correct sections', () => {
    const pages = [
      { parent: 'APD Overview', label: '' },
      {
        parent: 'Key State Personnel',
        label: 'Key Personnel and Program Management'
      },
      {
        parent: 'Results of Previous Activities',
        label: 'Results of Previous Activities'
      },
      { parent: 'Activities', label: '' },
      { parent: 'Activity Schedule Summary', label: '' },
      { parent: 'Proposed Budget', label: 'Proposed Budget' },
      { parent: 'Assurances and Compliance', label: '' },
      { parent: 'Executive Summary', label: 'Executive Summary' },
      { parent: 'Export and Submit', label: '' }
    ];

    cy.wrap(pages).each(index => {
      if (index.label !== '') {
        // Expand nav menu option
        cy.get('.ds-c-vertical-nav__label--parent')
          .contains(index.parent)
          .then($el => {
            if ($el.attr('aria-expanded') === 'false') {
              // if it's not expanded, expand it
              cy.wrap($el).click();
            }

            // Click on nav submenu button
            cy.get('a.ds-c-vertical-nav__label').contains(index.label).click();
          });
      } else {
        cy.get('a.ds-c-vertical-nav__label').contains(index.parent).click();
      }

      cy.get('.ds-h2').should('contain', index.parent);
    });
  });

  it('confirms anchor links redirect to correct sections', () => {
    const pagesWithAnchors = [
      {
        parent: 'Key State Personnel',
        label: 'Key Personnel and Program Management',
        subnav: '#apd-state-profile-key-personnel'
      },
      {
        parent: 'Results of Previous Activities',
        label: 'Prior Activities Overview',
        subnav: ['#prev-activities-outline', '#prev-activities-table']
      },
      {
        parent: 'Proposed Budget',
        label: 'Summary Budget by Activity',
        subnav: [
          '#summary-schedule-by-activity-table',
          '#budget-summary-table',
          '#budget-federal-by-quarter',
          '#budget-incentive-by-quarter'
        ]
      },
      {
        parent: 'Executive Summary',
        label: 'Activities Summary',
        subnav: [
          '#executive-summary-summary',
          '#executive-summary-budget-table'
        ]
      }
    ];

    cy.wrap(pagesWithAnchors).each(index => {
      const { subnav } = index;

      cy.get('.ds-c-vertical-nav__label--parent')
        .contains(index.parent)
        .then($el => {
          if ($el.attr('aria-expanded') === 'false') {
            // if it's not expanded, expand it
            cy.wrap($el).click();
          }

          // Click on anchor link
          cy.get('a.ds-c-vertical-nav__label').contains(index.label).click();
        });

      if (Array.isArray(subnav)) {
        cy.wrap(subnav).each(subNavIndex => {
          cy.get(subNavIndex)
            .then(element => element[0].offsetTop)
            .then(() => cy.window().its('scrollY').should('be.gt', 0))
            .then(offset => cy.window().its('scrollY').should('eq', offset));
        });
      } else {
        cy.get(subnav)
          .then(element => element[0].offsetTop)
          .then(() => cy.window().its('scrollY').should('be.gt', 0))
          .then(offset => cy.window().its('scrollY').should('eq', offset));
      }
    });
  });

  it('deletes the APD', () => {
    cy.visit('/');

    cy.contains('HITECH IAPD').should('have.length', 1);

    cy.contains('Delete').click();

    cy.get('.ds-c-button--danger').click();

    cy.contains('HITECH IAPD').should('have.length', 0);
  });
});
