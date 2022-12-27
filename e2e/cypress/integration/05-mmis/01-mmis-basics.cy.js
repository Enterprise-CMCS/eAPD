/// <reference types="cypress" />

// Tests performing basic MMIS APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('MMIS Basics', { tags: ['@apd', '@default', '@mmis'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  before(() => {
    cy.useStateStaff();
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.reload();

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

  beforeEach(() => {
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Create MMIS APD', () => {
    it('tests Create New page', () => {
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
      years.forEach(year => {
        cy.findByRole('checkbox', { name: year }).click();
      });
      cy.contains('Select at least one year.').should('exist');

      years.forEach(year => {
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

      // Once MMIS pages have been implemented, we can actually create the
      // apd here and check that the information saved on the right pages.

      cy.findByRole('button', { name: /Cancel/i }).click();

      // Should redirect to dashboard and not save
      cy.contains('MMIS APD Test').should('exist');
    });
  });
});
