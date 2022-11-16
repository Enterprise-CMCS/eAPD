// <reference types="cypress" />

// Tests the MMIS workflow of an APD
describe('Default APD', { tags: ['@apd', '@default', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();
    cy.updateFeatureFlags();

    cy.findAllByText('Create new').click();

    // cy.wait(50000);

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
      cy.log({ apdUrl });
      apdId = apdUrl.split('/').pop();
      cy.log({ apdId });
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.updateFeatureFlags();
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Form View', () => {
    /* eslint-disable-next-line prefer-arrow-callback, func-names */
    beforeEach(function () {
      cy.updateFeatureFlags();
      cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
    });

    describe('default APD Overview', () => {
      it('should have two checked years', () => {
        cy.contains('Export and Submit').click();
        cy.wait(500000);
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
      });
    });
  });
});
