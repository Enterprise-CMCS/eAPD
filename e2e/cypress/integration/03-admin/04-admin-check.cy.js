describe('tests state admin portal', () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useRegularUser();

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      cy.log({ apdUrl });
      apdId = apdUrl.split('/').pop();
      cy.log({ apdId });
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.updateFeatureFlags({ validation: false });
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Admin Check', () => {
    it(
      'tests basic admin check functionality',
      { tags: ['@state', '@admin'] },
      () => {
        cy.turnOnAdminCheck();

        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');

        cy.goToApdOverview();
        cy.get('[data-cy="validationError"]').should('exist');

        cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
          force: true
        });
        cy.get('[data-cy="validationError"]').should('not.exist');

        cy.turnOnAdminCheck();

        cy.get('[data-cy="numRequired"]').should('have.text', '35');

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
        cy.get('[data-cy="numRequired"]').should('have.text', '34');

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
        cy.get('[data-cy="numRequired"]').should('have.text', '33');

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
        cy.get('[data-cy="numRequired"]').should('have.text', '34');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.setTinyMceContent('hit-overview-field', '');
        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.get('[data-cy="validationError"]')
          .contains('Provide a summary of HIT-funded activities.')
          .should('exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '35');

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('exist');
        });
      }
    );

    it.skip(
      'runs cypress-axe (accessibility test) on the help panel',
      { tags: ['@state', '@admin'] },
      () => {
        cy.turnOnAdminCheck();

        // Skipping test for now while problems with CMS Design System - Drawer and Help Drawer get resolved
        cy.checkPageA11y();
      }
    );

    it(
      'tests admin check on a functionally complete APD',
      { tags: ['@state', '@admin'] },
      () => {
        cy.contains('AK APD Home').click();
        cy.findAllByText('HITECH IAPD').eq(0).click();

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
