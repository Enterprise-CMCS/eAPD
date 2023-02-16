import ActivityPage from '../../page-objects/activity-page';

/// <reference types="cypress" />

// Tests performing basic MMIS APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

Cypress.session.clearAllSavedSessions();

describe('MMIS Basics', { tags: ['@apd', '@default', '@mmis'] }, function () {
  let activityPage;
  let apdUrl;
  let apdId;
  const years = [];

  before(() => {
    activityPage = new ActivityPage();
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit('/');

    // Create a new MMIS APD
    cy.findAllByText('Create new').click();
    cy.findByRole('radio', { name: /MMIS/i }).click();
    cy.findByLabelText('APD Name').clear().type('MMIS APD Name!').blur();
    cy.findByRole('radio', { name: /No, this is for a new project./i }).click();
    cy.findByRole('checkbox', {
      name: /1115 or Waiver Support Systems/i
    }).click();
    cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled').click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');

    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.fixture('mmis-basics.json').as('mmisBasics');

    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Create MMIS APD', function () {
    it('tests Create New page', function () {
      cy.contains('AK APD Home').click();
      cy.findAllByText('Create new').click();

      cy.contains(
        'This selection cannot be changed after creating a new APD.'
      ).should('exist');

      cy.findByRole('radio', { name: /MMIS/i }).focus().blur();
      cy.contains('Select an APD Type').should('exist');

      cy.findByRole('radio', { name: /HITECH/i }).click();
      cy.findAllByText('Select an APD Type').should('not.exist');

      // Verify HITECH fields show
      cy.findAllByText('Update Type').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('not.exist');

      cy.findByRole('radio', { name: /MMIS/i }).click();

      // Verify MMIS fields show
      cy.findAllByText('Is this an APD update?').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.findByLabelText('APD Name').clear().type('MMIS APD Test').blur();

      // Year validation
      this.years.forEach(year => {
        cy.findByRole('checkbox', { name: year }).click();
      });
      cy.contains('Select at least one year.').should('exist');

      this.years.forEach(year => {
        cy.findByRole('checkbox', { name: year }).click();
      });
      cy.contains('Select at least one year.').should('not.exist');

      // Update section validation
      cy.findByRole('radio', { name: /No, this is for a new project./i })
        .focus()
        .blur();
      cy.contains('Indicate whether this APD is an update.').should('exist');

      cy.findByRole('radio', {
        name: /No, this is for a new project./i
      }).click();
      cy.contains('Indicate whether this APD is an update.').should(
        'not.exist'
      );
      cy.findAllByText('Update Type').should('not.exist');

      cy.findByRole('radio', { name: /Yes, it is an update./i }).click();
      cy.findAllByText('Update Type').should('exist');

      cy.findByRole('checkbox', { name: /Annual update/i })
        .focus()
        .blur();
      cy.contains('Select at least one type of update.').should('exist');

      cy.findByRole('checkbox', { name: /As-needed update/i }).click();
      cy.contains('Select at least one type of update.').should('not.exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      // Medicaid Business Area validation
      cy.findByRole('checkbox', {
        name: /1115 or Waiver Support Systems/i
      })
        .focus()
        .blur();
      cy.contains('Provide an other Medicaid Business Area(s)').should('exist');

      cy.findByRole('checkbox', {
        name: /Program Integrity/i
      }).click();
      cy.contains('Provide an other Medicaid Business Area(s)').should(
        'not.exist'
      );

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');

      // Other MBA Validation
      cy.findByText('Other').click();

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.get(`[data-cy='other_details']`).focus().blur();
      cy.contains('Provide an other Medicaid Business Area(s)').should(
        'not.exist'
      );

      cy.get(`[data-cy='other_details']`).type('This is other stuff.').blur();

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');
      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.contains('MMIS APD Test').should('not.exist');
    });
  });
  describe('MMIS Pages', function () {
    it('tests Activity Overview page', function () {
      const mmisBasics = this.mmisBasics;

      cy.goToActivityDashboard();

      // Create new Activity
      cy.contains('Add Activity').click();
      cy.contains('Activity 1').should('exist');

      // Check Activity Overview
      cy.goToActivityOverview(0);
      cy.url().should('contain', '/activity/0/overview');
      cy.findAllByRole('heading', { name: /Activity Overview/i }).should(
        'exist'
      );

      // Defaults to empty field values
      cy.contains('Activity name').should('exist');
      cy.checkTinyMCE('activity-name-field', '');
      cy.contains('Activity snapshot').should('exist');
      cy.checkTinyMCE('activity-snapshot-field', '');
      cy.contains('Problem statement').should('exist');
      cy.checkTinyMCE('activity-problem-statement-field', '');
      cy.contains('Proposed solution').should('exist');
      cy.checkTinyMCE('activity-proposed-solution-field', '');

      // Check validation errors
      cy.turnOnAdminCheck();

      // Validation errors within admin check list
      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Activity 1 Activity Overview').should('exist');
        cy.get(list).contains('Provide an Activity name').should('exist');
        cy.get(list).contains('Provide an Activity snapshot').should('exist');
        cy.get(list).contains('Provide a Problem statement').should('exist');
        cy.get(list).contains('Provide a Proposed solution').should('exist');
      });

      // Verifies Activity Overview exists in the admin check list and navigates to that page
      cy.checkAdminCheckHyperlinks(
        'Activity 1 Activity Overview',
        'Activity Overview',
        3
      );

      // Validation errors on the Activity Overview page
      cy.contains('Provide an Activity name').should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide an Activity snapshot')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide a Problem statement')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide a Proposed solution')
        .should('exist');

      cy.collapseAdminCheck();

      // Fill out fields and check that each validation error is cleared
      cy.get(`[data-cy="activity-name"]`)
        .click()
        .type(mmisBasics.activities[0].name);
      cy.waitForSave();
      cy.contains('Provide an Activity name').should('not.exist');

      cy.setTinyMceContent(
        'activity-snapshot-field',
        mmisBasics.activities[0].activityOverview.activitySnapshot
      );
      cy.waitForSave();
      cy.contains('Provide an Activity snapshot').should('not.exist');

      cy.setTinyMceContent(
        'activity-problem-statement-field',
        mmisBasics.activities[0].activityOverview.problemStatement
      );
      cy.waitForSave();
      cy.contains('Provide a Problem statement').should('not.exist');

      cy.setTinyMceContent(
        'activity-proposed-solution-field',
        mmisBasics.activities[0].activityOverview.proposedSolution
      );
      cy.waitForSave();
      cy.contains('Provide a Proposed solution').should('not.exist');

      // Check validation errors are gone from admin check
      cy.expandAdminCheck();
      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list)
          .contains('Activity 1 Activity Overview')
          .should('not.exist');
      });
      cy.turnOffAdminCheck();

      // Verify that fields save
      // Navigates away from page and back to check persistence of entered data
      cy.goToApdOverview();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.goToActivityOverview(0);

      cy.contains('Activity name').should('exist');
      cy.checkTinyMCE('activity-name-field', mmisBasics.activities[0].name);
      cy.contains('Activity snapshot').should('exist');
      cy.checkTinyMCE(
        'activity-snapshot-field',
        `<p>${mmisBasics.activities[0].activityOverview.activitySnapshot}</p>`
      );
      cy.contains('Problem statement').should('exist');
      cy.checkTinyMCE(
        'activity-problem-statement-field',
        `<p>${mmisBasics.activities[0].activityOverview.problemStatement}</p>`
      );
      cy.contains('Proposed solution').should('exist');
      cy.checkTinyMCE(
        'activity-proposed-solution-field',
        `<p>${mmisBasics.activities[0].activityOverview.proposedSolution}</p>`
      );
    });

    it('tests Key State Personnel page', function () {
      const mmisBasics = this.mmisBasics;

      cy.goToKeyStatePersonnel();
      cy.contains('Key Personnel and Program Management').should('exist');

      cy.findByRole('button', { name: /Add Primary Contact/i }).click();

      cy.get('[data-cy="key-person-0__name"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].name);

      cy.get('[data-cy="key-person-0__email"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].email);

      cy.get('[data-cy="key-person-0__position"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].position);

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();
      cy.findByRole('button', { name: /Save/i }).click();

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();

      cy.get('[data-cy="key-person-1__name"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].name);

      cy.get('[data-cy="key-person-1__email"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].email);

      cy.get('[data-cy="key-person-1__position"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].position);

      cy.get('input[type="radio"][value="yes"]').check({ force: true }).blur();
      cy.get('[data-cy="key-person-1-0__cost"]').clear().type('1000');
      cy.get('[data-cy="key-person-1-0__fte"]').clear().type('.5');
      cy.get('[data-cy="key-person-1-0__medicaidShare"]')
        .eq(0)
        .clear()
        .type('50');
      cy.findAllByRole('radio', { name: '90/10 DDI' }).check({ force: true });

      cy.get('[data-cy="key-person-1-1__cost"]').clear().type('2000');
      cy.get('[data-cy="key-person-1-1__fte"]').clear().type('1');
      cy.get('[data-cy="key-person-1-1__medicaidShare"]').clear().type('100');
      cy.findAllByRole('radio', { name: '90/10 DDI' })
        .eq(1)
        .check({ force: true });

      cy.findByRole('button', { name: /Save/i }).click();

      cy.contains(
        'Total Computable Medicaid: $250 (50% Medicaid Share) '
      ).should('exist');
      cy.contains('Federal Share: $225').should('exist');
      cy.contains(
        'Total Computable Medicaid: $2,000 (100% Medicaid Share)'
      ).should('exist');
      cy.contains('Federal Share: $1,800').should('exist');
    });

    it('tests the Security Planning page', function () {
      const mmisBasics = this.mmisBasics;

      cy.turnOnAdminCheck();
      cy.checkAdminCheckHyperlinks('Security Planning', 'Security Planning', 2);

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('exist');
      });

      cy.contains('Provide Security and Interface Plan').should('exist');
      cy.checkTinyMCE('security-interface-plan', '');

      cy.setTinyMceContent(
        'security-interface-plan',
        mmisBasics.securityPlanning.securityAndInterfacePlan
      );

      cy.waitForSave();

      cy.contains('Provide Security and Interface Plan').should('not.exist');

      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );
      cy.checkTinyMCE('bc-dr-plan', '');

      cy.setTinyMceContent(
        'bc-dr-plan',
        mmisBasics.securityPlanning.businessContinuityAndDisasterRecovery
      );
      cy.waitForSave();

      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      // Verify fields saved
      cy.goToApdOverview();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.goToSecurityPlanning();

      cy.checkTinyMCE(
        'security-interface-plan',
        `<p>${mmisBasics.securityPlanning.securityAndInterfacePlan}</p>`
      );
      cy.checkTinyMCE(
        'bc-dr-plan',
        `<p>${mmisBasics.securityPlanning.businessContinuityAndDisasterRecovery}</p>`
      );

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('not.exist');
      });

      // Verify validation disappears when Admin Check is off
      cy.setTinyMceContent('security-interface-plan', '');
      cy.contains('Provide Security and Interface Plan').should('exist');

      cy.setTinyMceContent('bc-dr-plan', '');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );

      cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
        force: true
      });

      cy.contains('Provide Security and Interface Plan').should('not.exist');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      // Todo: TEST CONTINUE AND BACK BUTTONS, Assurances and Compliance page crashes though.
    });

    it('tests the Results of Previous Activities section', function () {
      const mmisBasics = this.mmisBasics;

      cy.goToPreviousActivities();

      cy.findAllByText('Grand totals: Federal MMIS').should('exist');
      cy.findAllByText('HIT + HIE Federal share 90% FFP').should('not.exist');

      cy.checkTinyMCE('previous-activity-summary-field', '');
      cy.setTinyMceContent(
        'previous-activity-summary-field',
        mmisBasics.previousActivities.previousActivitySummary
      );
      cy.waitForSave();
      cy.goToApdOverview();
      cy.wait(2000);
      cy.goToPreviousActivities();
      cy.checkTinyMCE(
        'previous-activity-summary-field',
        `<p>${mmisBasics.previousActivities.previousActivitySummary}</p>`
      );
    });

    it.only('mmis navigation and cypress-axe', function () {
      // Decided to omit the activities page since the first subnav doesn't match the page title
      const pageTitles = [
        ['APD Overview'],
        ['State Priorities and Scope of APD'],
        [
          'Key State Personnel',
          'State Director and Office Address',
          'Key Personnel and Program Management'
        ],
        [
          'Results of Previous Activities',
          'Prior Activities Overview',
          'Actual Expenditures'
        ],
        ['Activity Schedule Summary'],
        ['Proposed Budget', 'Combined Activity Costs', 'Summary Budget Table'],
        ['Security Planning'],
        ['Assurances and Compliance'],
        ['Executive Summary', 'Activities Summary', 'Program Budget Tables'],
        ['Export and Submit']
      ];

      const activityPageTitles = [
        ['Activities', 'Activities Dashboard'],
        'Activity Overview',
        'Analysis of Alternatives and Risks',
        'Activity Schedule and Milestones',
        'Conditions for Enhanced Funding',
        'Outcomes and Metrics',
        'State Staff and Expenses',
        'Private Contractor Costs',
        'Cost Allocation and Other Funding',
        'Budget and FFP'
      ];

      cy.log('Click through Continue buttons');
      cy.get('.ds-c-vertical-nav__item').contains('APD Overview').click();
      pageTitles.forEach((titles, index) => {
        cy.get('.ds-h2').should('contain', titles[0]);
        if (index < titles.length - 1) {
          cy.get('#continue-button').click();
          if (index === 4)
            // Skips over activity page index
            cy.get('#continue-button').click();
        }
      });

      cy.log('Click through Previous buttons');
      cy.get('.ds-c-vertical-nav__item').contains('Export and Submit').click();
      cy.wrap(pageTitles.reverse()).forEach((titles, index) => {
        cy.get('.ds-h2').should('contain', titles[0]);
        if (index < titles.length - 1) {
          cy.get('#continue-button').click();
          if (index === 5)
            // Skips over activity page index
            cy.get('#continue-button').click();
        }
      });

      cy.log('Click through sidenav');
      pageTitles.forEach(title => {
        cy.get('.ds-c-vertical-nav__item').contains(title[0]).click();

        if (title.length > 1) {
          title.forEach((subnav, index) => {
            cy.get('.ds-c-vertical-nav__subnav').contains(subnav).click();
            if (index !== 0) cy.get('.ds-h3').should('contain', subnav);
          });
        }
        cy.get('.ds-h2').should('contain', title[0]);
      });

      // cy.log('Click through Continue buttons');
      // cy.wrap([...pageTitles]).each((title, index, titles) => {
      //   // split this up, into one continue and one clicking sidenav, how to test subnav?
      //   if (
      //     title !== 'Proposed Budget' &&
      //     title !== 'Assurances and Compliance'
      //   ) {
      //     cy.get('.ds-c-vertical-nav__item').contains(title).click();
      //     cy.pause();
      //     cy.get('.ds-h2').should('contain', title);

      //     cy.log(`${titles[index + 1]}`);
      //     if (
      //       index < titles.length - 1 &&
      //       title !== 'Activity Schedule Summary' &&
      //       title !== 'Security Planning'
      //     ) {
      //       cy.get('#continue-button').click();
      //       cy.get('.ds-h2').should('contain', titles[index + 1]);
      //     }
      //   }
      // });

      // cy.log('Click through Previous buttons');
      // cy.wrap([...pageTitles].reverse()).each((title, index, reverseTitles) => {
      //   cy.get('.ds-c-vertical-nav__item').contains(title).click();
      //   cy.get('.ds-h2').should('contain', title);

      //   if (index < reverseTitles.length - 1) {
      //     cy.get('#previous-button').click();
      //     cy.get('.ds-h2').should('contain', reverseTitles[index + 1]);
      //   }
      // });

      // cy.log('confirms side nav buttons redirect to correct sections');
      // const pages = [
      //   { parent: 'APD Overview', label: '' },
      //   {
      //     parent: 'Key State Personnel',
      //     label: 'Key Personnel and Program Management'
      //   },
      //   {
      //     parent: 'Results of Previous Activities',
      //     label: 'Results of Previous Activities'
      //   },
      //   { parent: 'Activities', label: '' },
      //   { parent: 'Activity Schedule Summary', label: '' },
      //   { parent: 'Proposed Budget', label: 'Proposed Budget' },
      //   { parent: 'Assurances and Compliance', label: '' },
      //   { parent: 'Executive Summary', label: 'Executive Summary' },
      //   { parent: 'Export and Submit', label: '' }
      // ];

      // cy.wrap(pages).each(index => {
      //   if (index.label !== '') {
      //     // Expand nav menu option
      //     cy.get('.ds-c-vertical-nav__label--parent')
      //       .contains(index.parent)
      //       .then($el => {
      //         if ($el.attr('aria-expanded') === 'false') {
      //           // if it's not expanded, expand it
      //           cy.wrap($el).click();
      //         }

      //         // Click on nav submenu button
      //         cy.get('a.ds-c-vertical-nav__label')
      //           .contains(index.label)
      //           .click();
      //       });
      //   } else {
      //     cy.get('a.ds-c-vertical-nav__label').contains(index.parent).click();
      //   }

      //   cy.get('.ds-h2').should('contain', index.parent);
      // });

      // cy.log('confirms anchor links redirect to correct sections');
      // const pageWithAnchors = [
      //   {
      //     parent: 'Key State Personnel',
      //     label: 'Key Personnel and Program Management',
      //     subnav: '#apd-state-profile-key-personnel'
      //   },
      //   {
      //     parent: 'Results of Previous Activities',
      //     label: 'Prior Activities Overview',
      //     subnav: ['#prev-activities-outline', '#prev-activities-table']
      //   },
      //   {
      //     parent: 'Proposed Budget',
      //     label: 'Combined Activity Costs',
      //     subnav: [
      //       '#combined-activity-costs-table',
      //       '#budget-summary-table',
      //       '#budget-federal-by-quarter',
      //       '#budget-incentive-by-quarter'
      //     ]
      //   },
      //   {
      //     parent: 'Executive Summary',
      //     label: 'Activities Summary',
      //     subnav: [
      //       '#executive-summary-summary',
      //       '#executive-summary-budget-table'
      //     ]
      //   }
      // ];

      // cy.wrap(pageWithAnchors).each(index => {
      //   const { subnav } = index;

      //   cy.get('.ds-c-vertical-nav__label--parent')
      //     .contains(index.parent)
      //     .then($el => {
      //       if ($el.attr('aria-expanded') === 'false') {
      //         // if it's not expanded, expand it
      //         cy.wrap($el).click();
      //       }

      //       // Click on anchor link
      //       cy.get('a.ds-c-vertical-nav__label').contains(index.label).click();
      //     });

      //   if (Array.isArray(subnav)) {
      //     cy.wrap(subnav).each(sub => {
      //       cy.get(sub)
      //         .then(element => element[0].offsetTop)
      //         .then(() => cy.window().its('scrollY').should('be.gt', 0))
      //         .then(offset => cy.window().its('scrollY').should('eq', offset));
      //     });
      //   } else {
      //     cy.get(subnav)
      //       .then(element => element[0].offsetTop)
      //       .then(() => cy.window().its('scrollY').should('be.gt', 0))
      //       .then(offset => cy.window().its('scrollY').should('eq', offset));
      //   }
      // });

      // cy.log(
      //   'should go to the Activity Overview page when edit is clicked in Executive Summary'
      // );
      // cy.goToExecutiveSummary();

      // cy.get('#executive-summary-summary')
      //   .parent()
      //   .contains('div', 'Activity 1: Program Administration')
      //   .parent()
      //   .parent()
      //   .findByRole('link', { name: 'Edit' })
      //   .click();

      // cy.findByRole('heading', {
      //   name: /^Activity 1:/i,
      //   level: 2
      // }).should('exist');
      // cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');
    });
  });
});
