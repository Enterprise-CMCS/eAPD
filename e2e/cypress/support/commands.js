import { recurse } from 'cypress-recurse'; // eslint-disable-line import/no-extraneous-dependencies

import '@testing-library/cypress/add-commands'; // eslint-disable-line import/no-extraneous-dependencies
import 'cypress-audit/commands'; // eslint-disable-line import/no-extraneous-dependencies
import '@foreachbe/cypress-tinymce';
import 'tinymce/tinymce';
import 'cypress-iframe';
import 'cypress-file-upload'; // eslint-disable-line import/no-extraneous-dependencies

import tokens from '@cms-eapd/api/seeds/test/tokens.json';

const API_COOKIE_NAME = 'gov.cms.eapd.api-token';
const CONSENT_COOKIE_NAME = 'gov.cms.eapd.hasConsented';

const EXPIRY_DATE = Math.ceil(
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime() / 1000
);

const convertDollarStrToNum = string => {
  if (!string || string === '') {
    return '';
  }
  const numString = string.replace(/[^0-9.-]+/g, '');
  if (Number.isNaN(numString)) {
    return '';
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
  cy.waitForReact(1000, '#app', '../node_modules/resq/dist/index.js');
  cy.findByLabelText('EUA ID').type(username);
  cy.findByLabelText('Password').type(password, {
    log: false
  });
  cy.findByRole('button', { name: /Log in/i }).click();
});

Cypress.Commands.add('logout', () => {
  cy.get(
    '[class="nav--dropdown__trigger ds-c-button ds-c-button--small ds-c-button--transparent"]'
  ).click();
  cy.get('a[href*="/logout"]').click();
  cy.clearAuthCookies();
  cy.findByText(/You have securely logged out/).should('be.visible');
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
  cy.waitForReact(1000, '#app', '../node_modules/resq/dist/index.js');
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
  'shouldHaveValue',
  { prevSubject: true },
  ($element, expected) => {
    expect(convertDollarStrToNum($element.text())).to.equal(expected);
  }
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
  // Adding a wait initially to allow the save to complete
  // and another save to start if it was queued
  cy.wait(400); // eslint-disable-line cypress/no-unnecessary-waiting
  return recurse(
    () => cy.document().its('body').find('header'),
    $header => !$header.text().includes('Saving'),
    {
      log: true,
      limit: 10, // max number of iterations
      timeout: 30000, // time limit in ms
      delay: 400 // delay before next iteration, ms
    }
  );
});

Cypress.Commands.add('deleteAPD', apdId => {
  if (apdId) {
    cy.useStateStaff();
    cy.get(`a[href='/apd/${apdId}']`).then($el => {
      cy.intercept('DELETE', `${Cypress.env('API')}/apds/${apdId}`).as(
        'delete'
      );

      cy.wrap($el).parent().parent().parent().contains('Delete').click();

      cy.get('.ds-c-button--danger').click();
      cy.wait('@delete');
    });
  }

  cy.get(`a[href='/apd/${apdId}']`).should('not.exist');
});

Cypress.Commands.add('goToApdOverview', () => {
  cy.get('a.ds-c-vertical-nav__label')
    .contains(/APD Overview/i)
    .click();
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

Cypress.Commands.add('goToActivitySchedule', activityIndex => {
  openActivitySection(activityIndex, 'Activity Schedule and Milestones');
});

Cypress.Commands.add('goToOutcomesAndMetrics', activityIndex => {
  openActivitySection(activityIndex, 'Outcomes and Metrics');
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
        .contains(/Combined Activity Costs/i)
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
        .contains(/Combined Activity Costs/i)
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

Cypress.Commands.add('getEAPDTable', { prevSubject: true }, subject => {
  if (subject.get().length > 1)
    throw new Error(
      `Selector "${subject.selector}" returned more than 1 element.`
    );

  const tableElement = subject.get()[0];
  const headers = [...tableElement.querySelectorAll('tbody tr')].map(row => {
    return [...row.querySelectorAll('th')].map(e => e.textContent);
  });

  // transform rows into array of array of strings for each td
  const rows = [...tableElement.querySelectorAll('tbody tr')].map(row => {
    return [...row.querySelectorAll('td')].map(e => e.textContent);
  });

  return Object.assign(...headers.map((k, i) => ({ [k]: rows[i] })));
});

Cypress.Commands.add('getActivityTable', { prevSubject: true }, subject => {
  if (subject.get().length > 1)
    throw new Error(
      `Selector "${subject.selector}" returned more than 1 element.`
    );

  const tableElement = subject.get()[0];

  // transform rows into array of array of strings for each td
  const rows = [...tableElement.querySelectorAll('tbody tr')].map(row => {
    return [...row.querySelectorAll('td')].map(e => e.textContent);
  });

  return rows;
});

Cypress.Commands.add('injectAxeForA11y', () => {
  cy.readFile('../node_modules/axe-core/axe.min.js').then(source => {
    return cy.window({ log: false }).then(window => {
      window.eval(source);
    });
  });
});

const severityIndicators = {
  minor: 'S',
  moderate: 'M',
  serious: 'L',
  critical: 'XL'
};

function callback(violations) {
  violations.forEach(violation => {
    const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','));

    Cypress.log({
      name: `${severityIndicators[violation.impact]} Size A11Y`,
      consoleProps: () => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: '🔧',
        consoleProps: () => violation,
        $el: Cypress.$(target.join(',')),
        message: target
      });
    });
  });
}

Cypress.Commands.add('checkPageA11y', () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2500);
  cy.injectAxeForA11y();
  cy.checkA11y(
    { exclude: [['#tinymce-wrapper'], ['[aria-label="Main Navigation"]']] },
    null,
    callback
  ); // Remove ignored nav when upgrading cms design system
});

// Cypress command to turn on a feature flag for launch darkly
Cypress.Commands.add('updateFeatureFlags', featureFlags => {
  Cypress.Commands.add('updateFeatureFlags', featureFlags => {
    // ignore api calls to events endpoint
    cy.intercept(
      { method: 'POST', hostname: /.*events.launchdarkly.us/ },
      { body: {} }
    ).as('LDEvents');

    // turn off push (EventSource) updates from LaunchDarkly
    cy.intercept(
      { method: 'GET', hostname: /.*stream.launchdarkly.us/ },
      req => {
        req.reply('Random message');
      }
    ).as('LDClientStream');

    // return feature flag values in format expected by launchdarkly client
    return cy
      .intercept(
        { method: 'GET', hostname: /.*clientsdk.launchdarkly.us/ },
        req => {
          req.reply(({ body }) => {
            Cypress._.map(featureFlags, (ffValue, ffKey) => {
              body[ffKey] = { value: ffValue };
              return body;
            });
          });
        }
      )
      .as('LDApp');
  });
  // return feature flag values in format expected by launchdarkly client
  return cy
    .intercept(
      { method: 'GET', hostname: /.*clientsdk.launchdarkly.us/ },
      req => {
        req.reply(({ body }) => {
          Cypress._.map(featureFlags, (ffValue, ffKey) => {
            body[ffKey] = { value: ffValue };
            return body;
          });
        });
      }
    )
    .as('LDApp');
});

Cypress.Commands.add('turnOnAdminCheck', () => {
  cy.contains('Export and Submit').click();
  cy.findByRole('button', { name: /Run Administrative Check/i }).click({
    force: true
  });
});

Cypress.Commands.add('checkAdminCheckHyperlinks', (link, heading, level) => {
  cy.get('[class="eapd-admin-check-list"]').within(() => {
    cy.contains(link).click();
  });

  cy.get(`.ds-h${level}`).should('contain', heading);
});
