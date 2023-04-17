import PopulatePage from '../../page-objects/populate-page';
const populatePage = new PopulatePage();

describe('tests state admin portal', () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.updateFeatureFlags({ enableMmis: false });
    cy.useStateStaff();
    cy.visit('/');

    cy.findAllByText('Create new').click();
    cy.findByLabelText('APD Name').clear().type('HITECH IAPD').blur();
    cy.findByRole('checkbox', { name: /Annual Update/i }).click();
    cy.findByRole('button', { name: /Create an APD/i }).click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"][checked]').each((_, index, list) =>
        years.push(list[index].value)
      );
    });
  });

  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Admin Check', function () {
    it(
      'tests basic admin check functionality',
      { tags: ['@state', '@admin'] },
      function () {
        cy.turnOnAdminCheck();

        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');

        cy.goToApdOverview();
        cy.get('[data-cy="validationError"]').should('exist');

        cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
          force: true
        });
        cy.get('[data-cy="validationError"]').should('not.exist');

        cy.turnOnAdminCheck();

        cy.get('[data-cy="numRequired"]').should('have.text', '34');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check-list"]').should('not.exist');
        cy.findByRole('button', { name: /Stop Administrative Check/i }).should(
          'not.exist'
        );

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.checkAdminCheckHyperlinks('APD Overview', 'APD Overview', 2);
        cy.checkAdminCheckHyperlinks(
          'Key State Personnel',
          'Key State Personnel',
          2
        );
        cy.checkAdminCheckHyperlinks(
          'Activity 1 Activity Overview',
          'Activity Overview',
          3
        );
        cy.checkAdminCheckHyperlinks(
          'Activity 1 Cost Allocation',
          'Cost Allocation',
          3
        );
        cy.checkAdminCheckHyperlinks(
          'Activity 1 Budget and FFP',
          'Budget and FFP',
          2
        );
        cy.checkAdminCheckHyperlinks(
          'Assurances and Compliance',
          'Assurances and Compliance',
          2
        );

        cy.goToApdOverview();
        cy.get('[data-cy="validationError"]')
          .contains('Provide a brief introduction to the state program.')
          .should('exist');

        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.setTinyMceContent(
          'program-introduction-field',
          'No validation error under me!'
        );
        cy.get('[data-cy="validationError"]')
          .contains('Provide a brief introduction to the state program.')
          .should('not.exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '33');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.get('[data-cy="validationError"]')
          .contains('Provide a summary of HIT-funded activities.')
          .should('exist');

        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.setTinyMceContent(
          'hit-overview-field',
          'No Inline validation under here!'
        );

        cy.get('[data-cy="validationError"]').should('not.exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '32');

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('not.exist');
        });

        cy.setTinyMceContent('program-introduction-field', '');
        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.get('[data-cy="validationError"]')
          .contains('Provide a brief introduction to the state program.')
          .should('exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '33');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.setTinyMceContent('hit-overview-field', '');
        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.get('[data-cy="validationError"]')
          .contains('Provide a summary of HIT-funded activities.')
          .should('exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '34');

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('exist');
        });
      }
    );

    it(
      'tests dates in activity schedule',
      { tags: ['@state', '@admin'] },
      function () {
        cy.turnOnAdminCheck();
        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');
        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.log('Start date required');
        cy.goToActivitySchedule(0);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]')
          .contains('Provide a valid start date.')
          .should('exist');
        populatePage.fillDate('Start date', ['11', '16', '1990']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]').should(
          'not.exist'
        );

        cy.log('Start date requires valid year (between 1960 and 2151)');
        populatePage.fillDate('Start date', ['11', '16', '1900']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]')
          .contains('Provide a valid start year.')
          .should('exist');
        populatePage.fillDate('Start date', ['11', '16', '3000']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]')
          .contains('Provide a valid start year.')
          .should('exist');
        populatePage.fillDate('Start date', ['11', '16', '1990']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]').should(
          'not.exist'
        );

        cy.log('End date required to be after start date');
        populatePage.fillDate('End date', ['09', '15', '1990']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]')
          .contains('Provide an end date that is after the start date.')
          .should('exist');
        populatePage.fillDate('End date', ['09', '15', '1992']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]').should(
          'not.exist'
        );

        cy.log('End date requires valid year (between 1960 and 2151)');
        populatePage.fillDate('End date', ['09', '15', '3002']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]')
          .contains('Provide a valid end year.')
          .should('exist');
        populatePage.fillDate('End date', ['09', '15', '1992']);
        cy.get('[class="ds-c-inline-error ds-c-field__error-message"]').should(
          'not.exist'
        );
      }
    );

    it.skip(
      'runs cypress-axe (accessibility test) on the help panel',
      { tags: ['@state', '@admin'] },
      function () {
        cy.turnOnAdminCheck();

        // Skipping test for now while problems with CMS Design System - Drawer and Help Drawer get resolved
        cy.checkPageA11y();
      }
    );

    it(
      'tests admin check on a functionally complete APD',
      { tags: ['@state', '@admin'] },
      function () {
        cy.contains('NA APD Home').click();
        cy.findAllByText('HITECH IAPD Complete').eq(0).click();

        cy.turnOnAdminCheck();

        cy.goToApdOverview();

        cy.get('[data-cy="numRequired"]').should('have.text', '0');

        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list)
            .contains('Administrative Check is Complete')
            .should('exist');
          cy.contains('export and submit').click();
        });

        cy.get('.ds-h2').should('contain', 'Export and Submit');

        cy.findByRole('button', { name: /Close/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('not.exist');
      }
    );
  });
});
