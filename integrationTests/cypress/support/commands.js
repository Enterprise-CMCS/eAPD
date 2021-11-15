import '@testing-library/cypress/add-commands'; // eslint-disable-line import/no-extraneous-dependencies
import 'cypress-audit/commands'; // eslint-disable-line import/no-extraneous-dependencies
import '@foreachbe/cypress-tinymce';
import 'tinymce/tinymce';

import tokens from '../../tokens.json';
import {
  CONSENT_COOKIE_NAME,
  API_COOKIE_NAME
} from '../../../web/src/constants';

const EXPIRY_DATE = Math.ceil(
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime() / 1000
);

const convertDollarStrToNum = string => {
  if (!string || string === '') {
    return 0;
  }
  const numString = string.replace(/[^0-9.-]+/g, '');
  if (Number.isNaN(numString)) {
    return 0;
  }
  return Number(numString);
};

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login methods
Cypress.Commands.add('clearAuthCookies', () => {
  cy.clearCookie(CONSENT_COOKIE_NAME);
  cy.clearCookie(API_COOKIE_NAME);
});

Cypress.Commands.add('login', (username, password) => {
  cy.clearAuthCookies();
  cy.setCookie(CONSENT_COOKIE_NAME, 'true', {
    expiry: EXPIRY_DATE
  });
  cy.visit('/');
  cy.waitForReact();
  cy.findByLabelText('EUA ID').type(username);
  cy.findByLabelText('Password').type(password, {
    log: false
  });
  cy.findByRole('button', { name: /Log in/i }).click();
});

Cypress.Commands.add('loginWithEnv', username => {
  cy.login(Cypress.env(username), Cypress.env(`${username}_pw`));
});

Cypress.Commands.add('useJwtUser', (username, url) => {
  cy.clearAuthCookies();
  cy.setCookie('gov.cms.eapd.hasConsented', 'true', {
    expiry: EXPIRY_DATE
  });
  cy.setCookie(
    API_COOKIE_NAME,
    JSON.stringify({ accessToken: tokens[username] }),
    {
      expiry: EXPIRY_DATE,
      sameSite: 'strict'
    }
  );
  cy.visit(url || '/');
  cy.waitForReact();
});

Cypress.Commands.add('useSysAdmin', url => {
  cy.useJwtUser('sysadmin', url);
});

Cypress.Commands.add('useRegularUser', url => {
  cy.useJwtUser('em@il.com', url);
});

Cypress.Commands.add('useFedAdmin', url => {
  cy.useJwtUser('fedadmin', url);
});

Cypress.Commands.add('useStateAdmin', url => {
  cy.useJwtUser('stateadmin', url);
});

Cypress.Commands.add('useStateStaff', url => {
  cy.useJwtUser('statestaff', url);
});

Cypress.Commands.add('useStateContractor', url => {
  cy.useJwtUser('statecontractor', url);
});

Cypress.Commands.add('useRequestedRole', url => {
  cy.useJwtUser('requestedrole', url);
});

Cypress.Commands.add('useDeniedRole', url => {
  cy.useJwtUser('deniedrole', url);
});

Cypress.Commands.add('useJWTrevokedrole', url => {
  cy.useJwtUser('revokedrole', url);
});

// TinyMCE
Cypress.Commands.add('ignoreTinyMceError', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });
});

Cypress.Commands.add(
  'findParent',
  { prevSubject: true },
  ($element, selector) =>
    cy.wrap($element).parentsUntil(selector).last().parent()
);

Cypress.Commands.add(
  'shouldBeCloseTo',
  { prevSubject: true },
  ($element, expected, delta = 1) => {
    expect(convertDollarStrToNum($element.text())).to.be.closeTo(
      expected,
      delta
    );
  }
);

Cypress.Commands.add('waitForSave', () => {
  cy.document()
    .its('body')
    .find('header')
    .then($header => {
      if ($header) {
        if ($header.text().includes('Saving')) {
          cy.wrap($header)
            .contains('Saved', { timeout: 10000 })
            .should('exist');
        }

        cy.wrap($header)
          .contains(/Saved|Last saved/i)
          .should('exist');
      }
    });
});

Cypress.Commands.add('goToKeyStateProgramManagememt', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Key State Personnel/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Key Personnel and Program Management/i)
        .click();
    });
});

Cypress.Commands.add('goToKeyStatePersonnel', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Key State Personnel/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Key State Personnel/i)
        .click();
    });
});

Cypress.Commands.add('goToPreviousActivities', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Results of Previous Activities/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Results of Previous Activities/i)
        .click();
    });
});

Cypress.Commands.add('goToPriorActOverview', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Results of Previous Activities/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Prior Activities Overview/i)
        .click();
    });
});

Cypress.Commands.add('goToActualExpenditures', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Results of Previous Activities/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Actual Expenditures/i)
        .click();
    });
});

Cypress.Commands.add('goToActivityDashboard', () => {
  // check to see if Activities is expanded
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/^Activities$/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }
      // click on Activities Dashboard
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Activities Dashboard/i)
        .click();
    });
});

const openActivitySection = (activityIndex, subNavName) => {
  // check to see if Activities is expanded
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/^Activities$/i)
    .then($activities => {
      if ($activities.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($activities).click();
      }

      cy.wrap($activities)
        .next()
        .within(() => {
          // find the Activity section with the correct index
          // check to see if Activity Index is expanded
          cy.get('.ds-c-vertical-nav__label--parent')
            .contains(`Activity ${activityIndex + 1}: `)
            .then($activity => {
              // if it's not expanded, expand it
              if ($activity.attr('aria-expanded') === 'false') {
                cy.wrap($activity).click();
              }

              cy.wrap($activity)
                .next()
                .within(() => {
                  // find the subNavName section and click on it
                  cy.get('a.ds-c-vertical-nav__label')
                    .contains(subNavName)
                    .click();
                });
            });
        });
    });
};

Cypress.Commands.add('goToActivityOverview', activityIndex => {
  openActivitySection(activityIndex, 'Activity Overview');
});

Cypress.Commands.add('goToOutcomesAndMilestones', activityIndex => {
  openActivitySection(activityIndex, 'Outcomes and Milestones');
});

Cypress.Commands.add('goToStateStaffAndExpenses', activityIndex => {
  openActivitySection(activityIndex, 'State Staff and Expenses');
});

Cypress.Commands.add('goToPrivateContractorCosts', activityIndex => {
  openActivitySection(activityIndex, 'Private Contractor Costs');
});

Cypress.Commands.add('goToCostAllocationAndOtherFunding', activityIndex => {
  openActivitySection(activityIndex, 'Cost Allocation and Other Funding');
});

Cypress.Commands.add('goToBudgetAndFFP', activityIndex => {
  openActivitySection(activityIndex, 'Budget and FFP');
});

Cypress.Commands.add('goToActivityScheduleSummary', () => {
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Activity Schedule Summary/i)
    .click();
});

Cypress.Commands.add('goToProposedBudget', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Proposed Budget/i)
        .click();
    });
});

Cypress.Commands.add('goToProposedSummary', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Summary Budget by Activity/i)
        .click();
    });
});

Cypress.Commands.add('goToProposedSummaryTable', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Summary Budget by Activity/i)
        .click();
    });
});

Cypress.Commands.add('goToQuarterlyFedShare', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Quarterly Federal Share/i)
        .click();
    });
});

Cypress.Commands.add('goToEstimatedQuarterly', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Proposed Budget/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Estimated Quarterly Incentive Payments/i)
        .click();
    });
});

Cypress.Commands.add('goToAssurancesAndCompliance', () => {
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/Assurances and Compliance/i)
    .click();
});

Cypress.Commands.add('goToExecutiveSummary', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Executive Summary/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Executive Summary/i)
        .click();
    });
});

Cypress.Commands.add('goToActivitiesSummary', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Executive Summary/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Activities Summary/i)
        .click();
    });
});

Cypress.Commands.add('goToProgramBudgetTable', () => {
  // Expand nav menu option
  cy.get('.ds-c-vertical-nav__label--parent')
    .contains(/Executive Summary/i)
    .then($el => {
      if ($el.attr('aria-expanded') === 'false') {
        // if it's not expanded, expand it
        cy.wrap($el).click();
      }

      // Click on nav submenu button
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Program Budget Tables/i)
        .click();
    });
});

Cypress.Commands.add('goToExportView', () => {
  cy.contains('Export and Submit').click();
  cy.contains('Continue to Review').click();
});
