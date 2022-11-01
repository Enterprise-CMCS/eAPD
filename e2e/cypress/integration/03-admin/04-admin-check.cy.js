const checkHyperlinks = (link, heading, level) => {
  cy.get('[class="eapd-admin-check-list"]').within(() => {
    cy.contains(link).click();
  });

  cy.get(`.ds-h${level}`).should('contain', heading);

  // if (level === 2) {
  //   cy.get('.ds-h2').should('contain', heading);
  // } else if (level === 3) {
  //   cy.get('.ds-h3').should('contain', heading);
  // }
};

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
    //   cy.updateFeatureFlags({ validation: true });
    cy.visit(apdUrl);
  });

  // after(() => {
  //   cy.deleteAPD(apdId);
  // });

  describe('Admin Check', () => {
    //REMEMBER TO USE CYPRESS AXE ON THE ADMIN CHECK
    it(
      'tests basic admin check functionality',
      { tags: ['@state', '@admin'] },
      () => {
        cy.contains('Export and Submit').click();
        cy.findByRole('button', { name: /Run Administrative Check/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');

        cy.goToApdOverview();
        cy.get('[data-cy="validationError"]').should('exist');

        cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
          force: true
        });
        cy.get('[data-cy="validationError"]').should('not.exist');

        cy.contains('Export and Submit').click();
        cy.findByRole('button', { name: /Run Administrative Check/i }).click({
          force: true
        });

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

        checkHyperlinks('APD Overview', 'APD Overview', 2);
        checkHyperlinks('Key State Personnel', 'Key State Personnel', 2);
        checkHyperlinks('Activity 1 Activity Overview', 'Activity Overview', 3);
        checkHyperlinks('Activity 1 Cost Allocation', 'Cost Allocation', 3);
        checkHyperlinks('Activity 1 Budget and FFP', 'Budget and FFP', 2);
        checkHyperlinks(
          'Assurances and Compliance',
          'Assurances and Compliance',
          2
        );

        cy.goToApdOverview();
        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE')
          .should('exist');

        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.setTinyMceContent(
          'program-introduction-field',
          'No validation error under me!'
        );
        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE INTRO')
          .should('not.exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '34');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE HIT')
          .should('exist');

        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.setTinyMceContent(
          'hit-overview-field',
          'No Inline validation under here!'
        );

        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE HIT')
          .should('not.exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '33');

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('not.exist');
        });

        cy.setTinyMceContent('program-introduction-field', '');
        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE')
          .should('exist');
        cy.get('[data-cy="numRequired"]').should('have.text', '34');

        cy.findByRole('button', { name: /Collapse/i }).click({
          force: true
        });

        cy.setTinyMceContent('hit-overview-field', '');
        cy.get('[data-cy="validationError"]')
          .contains('ERROR MESSAGE HERE HIT')
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
  });
});
