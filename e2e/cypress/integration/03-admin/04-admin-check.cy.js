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
    it(
      'tests basic admin check functionality',
      { tags: ['@state', '@admin'] },
      () => {
        cy.contains('Export and Submit').click();
        cy.findByRole('button', { name: /Run Administrative Check/i }).click({
          force: true
        });

        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');
        // check if validation is on

        cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
          force: true
        });
        cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('not.exist');
        // check if validation is off

        cy.findByRole('button', { name: /Run Administrative Check/i }).click({
          force: true
        });
      }
    );
  });
});
