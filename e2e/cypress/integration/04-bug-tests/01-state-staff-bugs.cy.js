/// <reference types="cypress" />

// Tests out bugs that have been fixed
// so the same bugs don't happen twice

describe('APD builder bugs', { tags: ['@apd'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  before(() => {
    cy.useStateStaff();
    cy.updateFeatureFlags({ validation: false, enableMmis: false });
    cy.reload();

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

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  it('tests out FTE number bug, #4168', () => {
    cy.get('#continue-button').click();
    cy.get('.ds-h2').should('contain', 'Key State Personnel');

    cy.findByRole('button', { name: 'Add Primary Contact' }).click();
    cy.get('input[type="radio"][value="yes"]').check({ force: true });

    cy.get('[data-cy="key-person-0-0__fte"]').type('0.001');
    cy.get('[data-cy="key-person-0-1__fte"]').click(); //Triggers blur
    cy.get('[data-cy="key-person-0-0__fte"]').should('have.value', 0.001);
  });
});
